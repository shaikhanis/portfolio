import { expect, test } from '@playwright/test'

test.describe('SEO and static assets', () => {
  test('robots.txt and sitemap.xml are generated for the site URL', async ({ request }) => {
    const robots = await request.get('/robots.txt')
    expect(robots.ok()).toBeTruthy()
    expect(await robots.text()).toMatch(/Sitemap: https:\/\/.+\/sitemap\.xml/)

    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.ok()).toBeTruthy()
    const xml = await sitemap.text()
    for (const route of ['/projects/admin-dashboard', '/projects/api-explorer']) expect(xml).toContain(route)
  })

  test('icons, manifest and social image are served as real files', async ({ request }) => {
    for (const asset of ['/favicon.ico', '/favicon.svg', '/apple-touch-icon.png', '/icon-192.png', '/icon-512.png', '/og-image.png', '/site.webmanifest']) {
      const response = await request.get(asset)
      expect(response.ok(), asset).toBeTruthy()
      expect(response.headers()['content-type'], asset).not.toContain('text/html')
    }
  })

  test('document metadata is complete', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Frontend Developer/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/.+\/$/)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Shaikh Anis/)
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\/.+\/og-image\.png$/)
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent()
    expect(JSON.parse(jsonLd)).toMatchObject({ '@type': 'Person', name: 'Shaikh Anis' })
  })

  test('demo pages set their own title, description and canonical URL', async ({ page }) => {
    await page.goto('/projects/api-explorer')
    await expect(page).toHaveTitle(/Destination Explorer/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/projects\/api-explorer$/)
    await page.getByRole('link', { name: /Back to portfolio/ }).click()
    await expect(page).toHaveTitle(/Shaikh Anis — Frontend Developer/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/$/)
  })
})

test.describe('Security headers (preview mirrors vercel.json)', () => {
  test('responses carry the production security headers', async ({ request }) => {
    const response = await request.get('/')
    const headers = response.headers()
    expect(headers['content-security-policy']).toContain("default-src 'self'")
    expect(headers['content-security-policy']).toContain("frame-ancestors 'none'")
    expect(headers['x-content-type-options']).toBe('nosniff')
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
  })

  test('the page runs under the CSP without violations', async ({ page }) => {
    const violations = []
    page.on('console', (message) => {
      if (/Content Security Policy/i.test(message.text())) violations.push(message.text())
    })
    await page.goto('/')
    await page.getByRole('button', { name: /Switch to (light|dark) theme/ }).first().click()
    await page.goto('/projects/admin-dashboard')
    await page.waitForLoadState('networkidle')
    expect(violations).toEqual([])
  })
})
