import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('skip link moves focus to the main content', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Keyboard navigation is tested on desktop')
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await expect(skip).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.locator('#main-content')).toBeFocused()
  })

  test('desktop links scroll to sections and mark the active item', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop navigation only')
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Primary' })

    await nav.getByRole('link', { name: 'Experience', exact: true }).click()
    await expect(page).toHaveURL(/#experience$/)
    await expect(page.locator('#experience')).toBeInViewport()
    await expect(nav.getByRole('link', { name: 'Experience', exact: true })).toHaveAttribute('aria-current', 'true')

    await nav.getByRole('link', { name: 'Contact', exact: true }).click()
    await expect(page.locator('#contact')).toBeInViewport()
    await expect(nav.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute('aria-current', 'true')
  })

  test('"Let\'s Talk" call to action jumps to the contact section', async ({ page, isMobile }) => {
    test.skip(isMobile, 'The header CTA is part of the desktop navigation')
    await page.goto('/')
    await page.getByRole('banner').getByRole('link', { name: /Let's Talk/ }).click()
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('mobile menu opens, closes with Escape and navigates', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile navigation only')
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Open menu' })
    await toggle.click()

    const menu = page.getByRole('dialog')
    await expect(menu).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(toggle).toBeFocused()

    await toggle.click()
    await expect(menu).toBeVisible()
    await menu.getByRole('link', { name: /Experience/ }).click()
    await expect(menu).toBeHidden()
    await expect(page.locator('#experience')).toBeInViewport()
    await expect(page).toHaveURL(/#experience$/)
  })

  test('back-to-top returns to the hero', async ({ page }) => {
    await page.goto('/#contact')
    const button = page.getByRole('button', { name: /Back to top/i })
    await button.scrollIntoViewIfNeeded()
    await button.click()
    await expect(page.locator('#home')).toBeInViewport()
  })
})
