import { expect } from '@playwright/test'

/** Page sections in document order (see src/data/navigation.js). */
export const SECTION_IDS = [
  'home',
  'about',
  'experience',
  'expertise',
  'approach',
  'projects',
  'personal-projects',
  'resume',
  'contact',
]

/** Breakpoints the layout must support without horizontal overflow. */
export const WIDTHS = [320, 360, 375, 390, 430, 768, 820, 1024, 1280, 1366, 1440, 1600, 1920]

/**
 * Collects console errors, uncaught page errors and failed same-origin requests.
 * Call before navigation; assert with `expectNoErrors(errors)` at the end of the test.
 */
export function trackErrors(page) {
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`)
  })
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))
  page.on('requestfailed', (request) => {
    const url = new URL(request.url())
    if (url.hostname === 'localhost') errors.push(`requestfailed: ${request.url()} ${request.failure()?.errorText ?? ''}`)
  })
  page.on('response', (response) => {
    const url = new URL(response.url())
    if (url.hostname === 'localhost' && response.status() >= 400) errors.push(`HTTP ${response.status()}: ${response.url()}`)
  })
  return errors
}

export function expectNoErrors(errors) {
  expect(errors, errors.join('\n')).toEqual([])
}

/**
 * Returns elements that stick out of the viewport horizontally and are not inside a clipping container.
 * An empty array means no horizontal overflow.
 */
export async function findHorizontalOverflow(page) {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth
    const offenders = []
    if (document.documentElement.scrollWidth > viewportWidth + 1) {
      offenders.push(`document scrollWidth ${document.documentElement.scrollWidth} > ${viewportWidth}`)
    }
    for (const element of document.querySelectorAll('body *')) {
      const rect = element.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) continue
      if (rect.right <= viewportWidth + 1 && rect.left >= -1) continue
      let parent = element.parentElement
      let clipped = false
      while (parent && parent !== document.body) {
        const style = getComputedStyle(parent)
        if (/(hidden|clip|auto|scroll)/.test(style.overflowX)) {
          const parentRect = parent.getBoundingClientRect()
          if (parentRect.right <= viewportWidth + 1 && parentRect.left >= -1) {
            clipped = true
            break
          }
        }
        parent = parent.parentElement
      }
      if (!clipped) {
        const name = element.id ? `#${element.id}` : typeof element.className === 'string' ? `.${element.className.split(' ')[0]}` : ''
        offenders.push(`${element.tagName.toLowerCase()}${name} (${Math.round(rect.left)} → ${Math.round(rect.right)})`)
      }
    }
    return offenders.slice(0, 10)
  })
}

/** Scrolls through the whole page so scroll-triggered content renders. */
export async function scrollThroughPage(page) {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8))
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 40))
    }
    window.scrollTo(0, 0)
  })
}
