import { expect, test } from '@playwright/test'

test.describe('Theme', () => {
  test('defaults to dark, switches to light, and persists across reloads', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'dark')

    await page.getByRole('button', { name: 'Switch to light theme' }).first().click()
    await expect(html).toHaveAttribute('data-theme', 'light')
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#f3f0ea')

    await page.reload()
    await expect(html).toHaveAttribute('data-theme', 'light')

    await page.getByRole('button', { name: 'Switch to dark theme' }).first().click()
    await expect(html).toHaveAttribute('data-theme', 'dark')
  })

  test('still works when storage is unavailable', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new Error('Storage disabled')
        },
      })
    })
    await page.goto('/')
    await page.getByRole('button', { name: 'Switch to light theme' }).first().click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })
})
