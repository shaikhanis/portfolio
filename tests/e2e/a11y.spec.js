import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { AxeBuilder } from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { scrollThroughPage } from './helpers.js'

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
const fixtures = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures')

function summarise(violations) {
  return violations.map(
    (v) => `${v.id} (${v.impact}): ${v.help}\n    ${v.nodes.map((n) => n.target.join(' ')).slice(0, 5).join('\n    ')}`,
  )
}

async function prepare(page, theme) {
  await page.addInitScript((value) => {
    try {
      localStorage.setItem('sa-theme', value)
    } catch {
      // ignore
    }
  }, theme)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.route('https://geocoding-api.open-meteo.com/**', (route) =>
    route.fulfill({ contentType: 'application/json', body: fs.readFileSync(path.join(fixtures, 'geocoding-kyoto.json'), 'utf8') }),
  )
  await page.route('https://api.open-meteo.com/**', (route) =>
    route.fulfill({ contentType: 'application/json', body: fs.readFileSync(path.join(fixtures, 'forecast-kyoto.json'), 'utf8') }),
  )
}

test.describe('Accessibility (axe, WCAG 2.2 AA)', () => {
  for (const theme of ['dark', 'light']) {
    for (const route of ['/', '/projects/admin-dashboard', '/projects/api-explorer', '/missing-page']) {
      test(`${route} has no violations in the ${theme} theme`, async ({ page }) => {
        await prepare(page, theme)
        await page.goto(route)
        await page.waitForLoadState('networkidle')
        await scrollThroughPage(page)
        const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
        expect(summarise(results.violations)).toEqual([])
      })
    }

    test(`open case study dialog has no violations (${theme})`, async ({ page }) => {
      await prepare(page, theme)
      await page.goto('/#projects')
      const trigger = page.getByRole('button', { name: /^Read case study:/ }).first()
      await trigger.scrollIntoViewIfNeeded()
      await trigger.click()
      await expect(page.locator('dialog[open]')).toBeVisible()
      const results = await new AxeBuilder({ page }).include('dialog[open]').withTags(WCAG_TAGS).analyze()
      expect(summarise(results.violations)).toEqual([])
    })

    test(`explorer with a selected place has no violations (${theme})`, async ({ page }) => {
      await prepare(page, theme)
      await page.goto('/projects/api-explorer')
      await page.getByLabel(/Search for a city/i).fill('Kyoto')
      await page.getByRole('button', { name: /Kyoto.*Japan/ }).first().click()
      await page.waitForLoadState('networkidle')
      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
      expect(summarise(results.violations)).toEqual([])
    })
  }

  test('mobile menu has no violations', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile menu only')
    await prepare(page, 'dark')
    await page.goto('/')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.locator('dialog[open]')).toBeVisible()
    const results = await new AxeBuilder({ page }).include('dialog[open]').withTags(WCAG_TAGS).analyze()
    expect(summarise(results.violations)).toEqual([])
  })
})
