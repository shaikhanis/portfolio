#!/usr/bin/env node
/**
 * Post-build checks (runs automatically after `npm run build`). Fails the build when:
 *  1. an inline <script> in dist/index.html is not allow-listed by hash in the vercel.json CSP
 *     (otherwise the theme script would be blocked in production);
 *  2. a required static asset is missing from dist/;
 *  3. the build output contains something that looks like a credential or private key.
 */
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const errors = []

// ---- 1. CSP hashes for inline scripts ---------------------------------------------------------
const html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'))
const csp = vercel.headers
  .flatMap((rule) => rule.headers)
  .find((header) => header.key.toLowerCase() === 'content-security-policy')?.value

if (!csp) {
  errors.push('vercel.json has no Content-Security-Policy header.')
} else {
  const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(([, attributes]) => !/type=["']application\/ld\+json["']/.test(attributes))
    .map(([, , body]) => body)

  for (const body of inlineScripts) {
    const hash = `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`
    if (!csp.includes(hash)) {
      errors.push(
        `Inline script is not allow-listed by the CSP in vercel.json.\n    Add ${hash} to script-src (and remove the outdated hash).`,
      )
    }
  }
}

// ---- 2. Required static assets ----------------------------------------------------------------
const REQUIRED = [
  'index.html',
  'robots.txt',
  'sitemap.xml',
  'favicon.ico',
  'favicon.svg',
  'apple-touch-icon.png',
  'og-image.png',
  'site.webmanifest',
]
for (const file of REQUIRED) {
  if (!fs.existsSync(path.join(DIST, file))) errors.push(`Missing required file in dist/: ${file}`)
}

// ---- 3. Secret scan ---------------------------------------------------------------------------
const SECRET_PATTERNS = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'private key'],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}\b/, 'GitHub token'],
  [/\bgithub_pat_[A-Za-z0-9_]{40,}\b/, 'GitHub fine-grained token'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'AWS access key id'],
  [/\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{32,}\b/, 'API secret key'],
  [/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/, 'Slack token'],
  [/\bAIza[0-9A-Za-z_-]{35}\b/, 'Google API key'],
]

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

for (const file of walk(DIST)) {
  if (!/\.(html|js|css|json|txt|xml|webmanifest|svg)$/.test(file)) continue
  const text = fs.readFileSync(file, 'utf8')
  for (const [pattern, label] of SECRET_PATTERNS) {
    if (pattern.test(text)) errors.push(`Possible ${label} found in ${path.relative(ROOT, file)}`)
  }
}

// ---- Report -----------------------------------------------------------------------------------
if (errors.length > 0) {
  console.error(`\n✖ Build verification failed (${errors.length}):\n`)
  for (const error of errors) console.error(`  - ${error}`)
  console.error('')
  process.exit(1)
}

console.log('✓ Build verification passed: CSP hashes, required assets, secret scan.')
