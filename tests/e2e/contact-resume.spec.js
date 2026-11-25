import { expect, test } from '@playwright/test'

test.describe('Contact', () => {
  test('heading and intro match the brief', async ({ page }) => {
    await page.goto('/#contact')
    const section = page.locator('#contact')
    await expect(section.getByRole('heading', { level: 2 })).toHaveText('Have a Project or Opportunity in Mind?')
    await expect(section).toContainText(
      "I'm always interested in connecting with people building meaningful digital products and exploring exciting frontend engineering opportunities.",
    )
  })

  test('form fields are labelled', async ({ page }) => {
    await page.goto('/#contact')
    const form = page.locator('#contact form')
    for (const label of ['Full Name', 'Email', 'Subject', 'Message']) {
      await expect(form.getByLabel(new RegExp(`^${label}`))).toBeVisible()
    }
  })

  test('never pretends to send when no contact channel is configured, otherwise validates accessibly', async ({ page }) => {
    await page.goto('/#contact')
    const form = page.locator('#contact form')
    const submit = form.getByRole('button', { name: /send/i })
    const unconfigured = (await submit.getAttribute('aria-disabled')) === 'true'

    if (unconfigured) {
      await expect(form).toContainText(/isn.t connected yet/i)
      await submit.click({ force: true })
      await expect(page.getByRole('status').filter({ hasText: /on its way|email app/i })).toHaveCount(0)
      return
    }

    await submit.click()
    const summary = page.getByRole('alert').filter({ hasText: /problem/i })
    await expect(summary).toBeVisible()
    await expect(form.getByLabel(/^Email/)).toHaveAttribute('aria-invalid', 'true')

    await form.getByLabel(/^Full Name/).fill('Test Visitor')
    await form.getByLabel(/^Email/).fill('not-an-email')
    await form.getByLabel(/^Email/).blur()
    await expect(form.getByLabel(/^Email/)).toHaveAttribute('aria-invalid', 'true')
  })
})

test.describe('Resume', () => {
  test('offers a download only when the PDF exists, otherwise a request flow', async ({ page, request }) => {
    await page.goto('/#resume')
    const section = page.locator('#resume')
    const pdfLinks = section.locator('a[href$=".pdf"]')

    if ((await pdfLinks.count()) > 0) {
      const href = await pdfLinks.first().getAttribute('href')
      const response = await request.get(href)
      expect(response.ok()).toBeTruthy()
      expect(response.headers()['content-type']).toContain('application/pdf')
      return
    }

    const requestLink = section.getByRole('link', { name: /Request resume/i })
    await expect(requestLink).toBeVisible()
    await requestLink.click()
    await expect(page.locator('#contact')).toBeInViewport()
    await expect(page.locator('#contact form').getByLabel(/^Subject/)).toHaveValue(/Resume request/i)
  })

  test('the hero never links to a missing PDF', async ({ page, request }) => {
    await page.goto('/')
    const links = await page.locator('#home a[href$=".pdf"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')))
    for (const href of links) {
      const response = await request.get(href)
      expect(response.headers()['content-type']).toContain('application/pdf')
    }
  })
})
