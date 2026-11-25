import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const vercelConfig = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'))
const previewSecurityHeaders = vercelConfig.headers
  .find((entry) => entry.source === '/(.*)')
  .headers.reduce((headers, { key, value }) => {
    headers[key] = value
    return headers
  }, {})

/** Fallback production URL. On Vercel the real production domain is detected automatically. */
const DEFAULT_SITE_URL = 'https://anis-portfolio.vercel.app'

/** Client-side routes published in sitemap.xml. */
const SITEMAP_ROUTES = ['/', '/projects/admin-dashboard', '/projects/api-explorer']

/**
 * Optional, user-replaceable files in /public.
 * Their presence is detected when the dev server or build starts, so the UI never
 * links to a file that does not exist (for example a resume PDF that was not added yet).
 */
const OPTIONAL_PUBLIC_FILES = {
  resume: ['resume/shaikh-anis-resume.pdf'],
  photo: [
    'images/profile.webp',
    'images/profile.avif',
    'images/profile.jpg',
    'images/profile.jpeg',
    'images/profile.png',
  ],
}

function findPublicFile(candidates) {
  const hit = candidates.find((rel) => fs.existsSync(path.join(ROOT, 'public', rel)))
  return hit ? `/${hit}` : null
}

function resolveSiteUrl(env) {
  const explicit = env.VITE_SITE_URL || process.env.VITE_SITE_URL
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const url = explicit || (vercelProduction ? `https://${vercelProduction}` : DEFAULT_SITE_URL)
  return url.replace(/\/+$/, '')
}

/**
 * Site plugin:
 *  - injects the canonical site URL into index.html (__SITE_URL__ tokens)
 *  - exposes build-time constants to the app (site URL, optional asset URLs)
 *  - emits robots.txt and sitemap.xml for the resolved site URL
 *  - restarts the dev server when an optional asset is added or removed
 */
function portfolioSite(siteUrl) {
  const assets = {
    resume: findPublicFile(OPTIONAL_PUBLIC_FILES.resume),
    photo: findPublicFile(OPTIONAL_PUBLIC_FILES.photo),
  }
  const buildDate = new Date().toISOString().slice(0, 10)

  return {
    name: 'portfolio-site',
    config() {
      return {
        define: {
          __SITE_URL__: JSON.stringify(siteUrl),
          __RESUME_URL__: JSON.stringify(assets.resume),
          __PROFILE_PHOTO_URL__: JSON.stringify(assets.photo),
          __BUILD_DATE__: JSON.stringify(buildDate),
        },
      }
    },
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', siteUrl)
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n')
      const urls = SITEMAP_ROUTES.map(
        (route) =>
          `  <url>\n    <loc>${siteUrl}${route}</loc>\n    <lastmod>${buildDate}</lastmod>\n  </url>`,
      ).join('\n')
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
    },
    configureServer(server) {
      const watched = Object.values(OPTIONAL_PUBLIC_FILES)
        .flat()
        .map((rel) => path.join(ROOT, 'public', rel))
      server.watcher.add(watched)
      const onChange = (file) => {
        if (watched.includes(path.normalize(file))) server.restart()
      }
      server.watcher.on('add', onChange)
      server.watcher.on('unlink', onChange)
    },
  }
}

/** Preloads the two fonts used above the fold, using their hashed build file names. */
function preloadCriticalFonts() {
  const CRITICAL = [/instrument-sans-latin-wght-normal.*\.woff2$/, /instrument-serif-latin-400-italic.*\.woff2$/]
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const files = Object.keys(ctx.bundle ?? {}).filter((file) => CRITICAL.some((re) => re.test(file)))
        return files.map((file) => ({
          tag: 'link',
          attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
          injectTo: 'head',
        }))
      },
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ROOT, '')
  const siteUrl = resolveSiteUrl(env)

  return {
    plugins: [react(), portfolioSite(siteUrl), preloadCriticalFonts()],
    server: { port: 5173 },
    preview: { port: 4173, headers: previewSecurityHeaders },
    build: {
      sourcemap: false,
      assetsInlineLimit: 0,
    },
    test: {
      environment: 'node',
      include: ['src/**/*.test.{js,jsx}'],
    },
  }
})
