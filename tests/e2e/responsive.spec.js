import { expect, test } from '@playwright/test'
import { WIDTHS, findHorizontalOverflow, scrollThroughPage } from './helpers.js'

// Layout checks run once (desktop project) at every target width.
test.describe('Responsive layout', () => {
  test.skip(({ isMobile }) => isMobile, 'Viewport sweep runs in the desktop project')

  for (const width of WIDTHS) {
    test(`home page has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await scrollThroughPage(page)
      expect(await findHorizontalOverflow(page)).toEqual([])
    })
  }

  for (const width of [320, 390, 768, 1440]) {
    for (const route of ['/projects/admin-dashboard', '/projects/api-explorer']) {
      test(`${route} has no horizontal overflow at ${width}px`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.setViewportSize({ width, height: 900 })
        await page.goto(route)
        await page.waitForLoadState('networkidle')
        expect(await findHorizontalOverflow(page)).toEqual([])
      })
    }
  }

  test('navigation adapts: links inline on desktop, menu button below 992px', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')
    await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'About', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeHidden()

    await page.setViewportSize({ width: 820, height: 900 })
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()
  })
})
