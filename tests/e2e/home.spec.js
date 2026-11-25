import { expect, test } from '@playwright/test'
import { SECTION_IDS, expectNoErrors, scrollThroughPage, trackErrors } from './helpers.js'

test.describe('Home page', () => {
  test('renders every section in order without console or network errors', async ({ page }) => {
    const errors = trackErrors(page)
    await page.goto('/')

    await expect(page).toHaveTitle(/Shaikh Anis/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('I Build Digital Experiences That Make an Impact.')
    await expect(page.locator('h1')).toHaveCount(1)

    const ids = await page.locator('main > section[id]').evaluateAll((sections) => sections.map((s) => s.id))
    expect(ids).toEqual(SECTION_IDS)

    await scrollThroughPage(page)
    expectNoErrors(errors)
  })

  test('every content section is a landmark named by its h2', async ({ page }) => {
    await page.goto('/')
    for (const id of SECTION_IDS.slice(1)) {
      const labelledBy = await page.locator(`section#${id}`).getAttribute('aria-labelledby')
      expect(labelledBy, `section#${id} needs aria-labelledby`).toBeTruthy()
      const heading = page.locator(`#${labelledBy}`)
      await expect(heading).toHaveCount(1)
      expect(await heading.evaluate((el) => el.tagName)).toBe('H2')
    }
  })

  test('has no empty, placeholder or broken in-page links', async ({ page }) => {
    await page.goto('/')
    const invalid = await page.locator('a').evaluateAll((links) =>
      links
        .filter((a) => {
          const href = a.getAttribute('href')
          return !href || href === '#' || href.startsWith('javascript:')
        })
        .map((a) => a.outerHTML.slice(0, 140)),
    )
    expect(invalid).toEqual([])

    const missingTargets = await page.locator('a[href^="#"]').evaluateAll((links) =>
      links.map((a) => a.getAttribute('href').slice(1)).filter((id) => id && !document.getElementById(id)),
    )
    expect(missingTargets).toEqual([])
  })

  test('external links open safely in a new tab', async ({ page }) => {
    await page.goto('/')
    const unsafe = await page.locator('a[target="_blank"]').evaluateAll((links) =>
      links.filter((a) => !/noopener/.test(a.rel) || !/noreferrer/.test(a.rel)).map((a) => a.href),
    )
    expect(unsafe).toEqual([])
  })

  test('hero shows the professional identity and primary actions', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('#home')
    await expect(hero).toContainText("Hello, I'm Shaikh Anis", { ignoreCase: true })
    await expect(hero).toContainText('Frontend Developer / UI Engineer')
    await expect(hero).toContainText('3.5+')
    await expect(hero.getByRole('link', { name: /Explore My Work/ })).toHaveAttribute('href', '#projects')
    await expect(hero.getByRole('link', { name: /Let's Connect/ })).toHaveAttribute('href', '#contact')
  })
})
