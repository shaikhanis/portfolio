import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from '@playwright/test'
import { expectNoErrors, trackErrors } from './helpers.js'

const fixtures = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures')
const fixture = (name) => fs.readFileSync(path.join(fixtures, name), 'utf8')

/** Serves recorded Open-Meteo responses so tests do not depend on the live API. */
async function mockOpenMeteo(page, { forecastStatus = 200 } = {}) {
  await page.route('https://geocoding-api.open-meteo.com/**', (route) => {
    const name = new URL(route.request().url()).searchParams.get('name') ?? ''
    const body = /kyo/i.test(name) ? fixture('geocoding-kyoto.json') : fixture('geocoding-empty.json')
    return route.fulfill({ status: 200, contentType: 'application/json', body })
  })
  await page.route('https://api.open-meteo.com/**', (route) =>
    forecastStatus === 200
      ? route.fulfill({ status: 200, contentType: 'application/json', body: fixture('forecast-kyoto.json') })
      : route.fulfill({ status: forecastStatus, contentType: 'application/json', body: '{"error":true,"reason":"Test failure"}' }),
  )
}

test.describe('Demo: Bookings Analytics Dashboard', () => {
  test('loads data, filters, sorts and recovers from a simulated API error', async ({ page }) => {
    const errors = trackErrors(page)
    await page.goto('/projects/admin-dashboard')
    await expect(page).toHaveTitle(/Bookings Analytics Dashboard/)
    await expect(page.getByRole('heading', { level: 1, name: 'Bookings Analytics Dashboard' })).toBeVisible()

    const main = page.locator('main')
    await expect(main.getByText(/Total bookings/i).first()).toBeVisible()
    await expect(main.locator('table').first()).toBeVisible()

    // Range filter
    await main.getByRole('button', { name: /^30D$/ }).or(main.getByRole('radio', { name: /^30D$/ })).first().click()
    await expect(main.getByText(/Total bookings/i).first()).toBeVisible()

    // Sorting
    const header = main.getByRole('columnheader', { name: /Amount/i })
    await header.getByRole('button').click()
    await expect(header).toHaveAttribute('aria-sort', /ascending|descending/)

    // Simulated failure + recovery
    const errorSwitch = main.getByRole('switch', { name: /Simulate API error/i })
    await errorSwitch.click()
    await expect(main.getByRole('alert')).toBeVisible()
    await errorSwitch.click()
    await main.getByRole('button', { name: /Retry|Try again/i }).first().click()
    await expect(main.getByRole('alert')).toHaveCount(0)
    await expect(main.getByText(/Total bookings/i).first()).toBeVisible()

    expectNoErrors(errors)
  })

  test('back link returns to the personal projects section', async ({ page }) => {
    await page.goto('/projects/admin-dashboard')
    await page.getByRole('link', { name: /Back to portfolio/ }).click()
    await expect(page).toHaveURL(/\/#personal-projects$/)
    await expect(page.locator('#personal-projects')).toBeInViewport()
  })
})

test.describe('Demo: Destination Explorer', () => {
  test('searches, selects a place and shows the forecast', async ({ page }) => {
    const errors = trackErrors(page)
    await mockOpenMeteo(page)
    await page.goto('/projects/api-explorer')
    await expect(page).toHaveTitle(/Destination Explorer/)

    await page.getByLabel(/Search for a city/i).fill('Kyoto')
    const result = page.getByRole('button', { name: /Kyoto.*Japan/ }).first()
    await expect(result).toBeVisible()
    await result.click()

    const main = page.locator('main')
    await expect(main.getByText(/7-day|7 day|this week/i).first()).toBeVisible()
    await expect(main.getByText(/Open-Meteo/)).toBeVisible()

    // Unit toggle refetches and re-renders.
    await main.getByRole('radio', { name: /°F|Fahrenheit/ }).or(main.getByRole('button', { name: /°F|Fahrenheit/ })).first().click()
    await expect(main.getByText(/°F/).first()).toBeVisible()

    expectNoErrors(errors)
  })

  test('shows an empty state when nothing matches', async ({ page }) => {
    await mockOpenMeteo(page)
    await page.goto('/projects/api-explorer')
    await page.getByLabel(/Search for a city/i).fill('Zzzzqx')
    await expect(page.getByRole('status').filter({ hasText: /No places/i }).first()).toBeVisible()
  })

  test('shows a recoverable error when the forecast API fails', async ({ page }) => {
    await mockOpenMeteo(page, { forecastStatus: 500 })
    await page.goto('/projects/api-explorer')
    await page.getByLabel(/Search for a city/i).fill('Kyoto')
    await page.getByRole('button', { name: /Kyoto.*Japan/ }).first().click()
    const alert = page.getByRole('alert').first()
    await expect(alert).toBeVisible()
    await expect(page.getByRole('button', { name: /Retry|Try again/i }).first()).toBeVisible()
  })
})

test.describe('Routing', () => {
  test('unknown routes render the 404 page with a way home', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/detour/i)
    await page.getByRole('link', { name: /Back to the portfolio/ }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('I Build Digital Experiences That Make an Impact.')
  })
})
