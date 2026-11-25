#!/usr/bin/env node
/**
 * Generates the static brand assets in /public from source files:
 *   - og-image.png (1200×630)  ← scripts/og/og-image.html (uses the site's own fonts)
 *   - favicon.ico (16/32/48), apple-touch-icon.png (180), icon-192.png, icon-512.png ← public/favicon.svg
 *
 * Usage: npm run assets
 * Uses an installed Google Chrome via Playwright. To use Playwright's bundled Chromium instead:
 *   npx playwright install chromium && PW_CHANNEL=chromium npm run assets
 */
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = path.join(ROOT, 'public')
const fromRoot = (...parts) => path.join(ROOT, ...parts)

const ROUTES = {
  '/og.html': fromRoot('scripts', 'og', 'og-image.html'),
  '/favicon.svg': fromRoot('public', 'favicon.svg'),
  '/fonts/instrument-sans.woff2': fromRoot(
    'node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2',
  ),
  '/fonts/instrument-serif-italic.woff2': fromRoot(
    'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2',
  ),
  '/fonts/jetbrains-mono.woff2': fromRoot(
    'node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
  ),
}
const TYPES = { '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }

const server = http.createServer((request, response) => {
  const file = ROUTES[new URL(request.url, 'http://localhost').pathname]
  if (!file || !fs.existsSync(file)) {
    response.writeHead(404).end()
    return
  }
  response.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' })
  fs.createReadStream(file).pipe(response)
})

/** Packs PNG images into a .ico container (PNG-compressed entries, supported since Windows Vista). */
function createIco(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)

  let offset = 6 + images.length * 16
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0)
    entry.writeUInt8(size >= 256 ? 0 : size, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(png.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += png.length
    return entry
  })

  return Buffer.concat([header, ...entries, ...images.map(({ png }) => png)])
}

async function launchBrowser() {
  const channel = process.env.PW_CHANNEL ?? 'chrome'
  try {
    return await chromium.launch(channel === 'chromium' ? {} : { channel })
  } catch (error) {
    console.error(`Could not launch "${channel}". Install Google Chrome, or run: npx playwright install chromium`)
    throw error
  }
}

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const base = `http://127.0.0.1:${server.address().port}`
const browser = await launchBrowser()

try {
  // ---- Open Graph image ----
  const og = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await og.goto(`${base}/og.html`, { waitUntil: 'networkidle' })
  await og.evaluate(() => document.fonts.ready)
  await og.screenshot({ path: path.join(PUBLIC, 'og-image.png'), type: 'png' })
  await og.close()
  console.log('✓ public/og-image.png')

  // ---- Icons ----
  const renderIcon = async (size, { square = false } = {}) => {
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 })
    let svg = fs.readFileSync(ROUTES['/favicon.svg'], 'utf8')
    // Apple touch icons must be full-bleed squares; iOS applies its own rounded mask.
    if (square) svg = svg.replace(/rx="[^"]*"/, 'rx="0"')
    await page.setContent(
      `<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`,
    )
    const png = await page.screenshot({ type: 'png', omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } })
    await page.close()
    return png
  }

  const icoImages = []
  for (const size of [16, 32, 48]) icoImages.push({ size, png: await renderIcon(size) })
  fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), createIco(icoImages))
  console.log('✓ public/favicon.ico (16, 32, 48)')

  fs.writeFileSync(path.join(PUBLIC, 'apple-touch-icon.png'), await renderIcon(180, { square: true }))
  console.log('✓ public/apple-touch-icon.png')
  for (const size of [192, 512]) {
    fs.writeFileSync(path.join(PUBLIC, `icon-${size}.png`), await renderIcon(size))
    console.log(`✓ public/icon-${size}.png`)
  }
} finally {
  await browser.close()
  server.close()
}
