import { expect, test } from '@playwright/test'

test.describe('Selected work (case studies)', () => {
  test('lists seven case studies with an illustrative-recreation disclaimer', async ({ page }) => {
    await page.goto('/#projects')
    const section = page.locator('#projects')
    await expect(section.getByRole('button', { name: /^Read case study:/ })).toHaveCount(7)
    await expect(section).toContainText(/illustrative/i)
    await expect(section).toContainText(/Thomas Cook \(India\) Limited/)
  })

  test('preview illustrations expose an accessible description', async ({ page }) => {
    await page.goto('/#projects')
    const images = page.locator('#projects [role="img"]')
    await expect(images.first()).toBeVisible()
    const labels = await images.evaluateAll((elements) => elements.map((el) => el.getAttribute('aria-label') ?? ''))
    expect(labels.length).toBeGreaterThan(0)
    for (const label of labels) expect(label.length).toBeGreaterThan(20)
  })

  test('opens a case study, pages through, and closes with focus restored', async ({ page }) => {
    await page.goto('/#projects')
    const trigger = page.getByRole('button', { name: 'Read case study: Hotel Booking Experience' })
    await trigger.scrollIntoViewIfNeeded()
    await trigger.click()

    const dialog = page.getByRole('dialog', { name: 'Hotel Booking Experience' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { level: 2, name: 'Hotel Booking Experience' })).toBeVisible()
    for (const heading of ['Context', 'My role', 'Frontend contribution', 'Challenges addressed', 'Implementation highlights']) {
      await expect(dialog.getByRole('heading', { level: 3, name: heading })).toBeVisible()
    }

    await dialog.getByRole('button', { name: /Next/ }).click()
    await expect(page.getByRole('dialog', { name: 'Flight Booking Experience' })).toBeVisible()
    await page.getByRole('dialog').getByRole('button', { name: /Previous/ }).click()
    await expect(page.getByRole('dialog', { name: 'Hotel Booking Experience' })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.locator('dialog[open]')).toHaveCount(0)
    await expect(trigger).toBeFocused()
  })

  test('close button dismisses the case study', async ({ page }) => {
    await page.goto('/#projects')
    const trigger = page.getByRole('button', { name: 'Read case study: My Account' })
    await trigger.scrollIntoViewIfNeeded()
    await trigger.click()
    await page.getByRole('button', { name: 'Close case study' }).click()
    await expect(page.locator('dialog[open]')).toHaveCount(0)
  })
})
