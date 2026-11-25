#!/usr/bin/env node
/**
 * Runs Lighthouse (mobile + desktop) against the production build and prints the category scores.
 * Reports are written to .lighthouse/ (git-ignored).
 *
 * Usage: npm run build && npm run lighthouse [-- /projects/api-explorer]
 * Uses lighthouse@12.8.2 — the latest release that supports Node 20. Results can differ slightly from
 * Chrome DevTools / PageSpeed Insights, which run newer Lighthouse versions.
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, '.lighthouse')
const PORT = 4174
const route = process.argv[2] ?? '/'
const url = `http://localhost:${PORT}${route}`
const isWindows = process.platform === 'win32'

fs.mkdirSync(path.join(OUT, 'tmp'), { recursive: true })

function waitForPort(port, timeoutMs = 30_000) {
  const started = Date.now()
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const socket = net.connect(port, '127.0.0.1')
      socket.once('connect', () => {
        socket.destroy()
        resolve()
      })
      socket.once('error', () => {
        socket.destroy()
        if (Date.now() - started > timeoutMs) reject(new Error(`Preview server did not start on port ${port}`))
        else setTimeout(attempt, 300)
      })
    }
    attempt()
  })
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: ROOT, stdio: 'inherit', shell: isWindows, ...options })
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${command} exited with code ${code}`))))
  })
}

if (!fs.existsSync(path.join(ROOT, 'dist', 'index.html'))) {
  console.error('No production build found. Run `npm run build` first.')
  process.exit(1)
}

const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  cwd: ROOT,
  stdio: 'ignore',
  shell: isWindows,
})

const slug = route === '/' ? 'home' : route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')
const scores = []

try {
  await waitForPort(PORT)
  for (const preset of ['mobile', 'desktop']) {
    const outputPath = path.join(OUT, `${slug}-${preset}`)
    const args = [
      '--yes',
      'lighthouse@12.8.2',
      url,
      '--only-categories=performance,accessibility,best-practices,seo',
      '--output=json',
      '--output=html',
      `--output-path=${outputPath}`,
      '--chrome-flags="--headless=new"',
      '--quiet',
    ]
    if (preset === 'desktop') args.push('--preset=desktop')
    // A project-local temp folder avoids EPERM errors when chrome-launcher cleans up on Windows.
    await run('npx', args, { env: { ...process.env, TEMP: path.join(OUT, 'tmp'), TMP: path.join(OUT, 'tmp') } })
    const report = JSON.parse(fs.readFileSync(`${outputPath}.report.json`, 'utf8'))
    const audits = report.audits
    scores.push({
      preset,
      ...Object.fromEntries(Object.values(report.categories).map((c) => [c.title, Math.round(c.score * 100)])),
      LCP: audits['largest-contentful-paint']?.displayValue,
      TBT: audits['total-blocking-time']?.displayValue,
      CLS: audits['cumulative-layout-shift']?.displayValue,
    })
  }
  console.log(`\nLighthouse 12.8.2 — ${url}`)
  console.table(scores)
  console.log(`Reports: ${path.relative(ROOT, OUT)}${path.sep}${slug}-{mobile,desktop}.report.html`)
} finally {
  if (isWindows && preview.pid) spawn('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' })
  else preview.kill()
}
