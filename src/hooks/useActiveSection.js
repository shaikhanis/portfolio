import { useEffect, useState } from 'react'

/**
 * Tracks which page section is currently "active" — the one crossing a horizontal band
 * around the middle of the viewport. Returns the active section id.
 *
 * @param {string[]} ids section element ids, in document order
 * @param {{ rootMargin?: string }} [options]
 */
export function useActiveSection(ids, { rootMargin = '-42% 0px -52% 0px' } = {}) {
  const key = ids.join('|')
  const [active, setActive] = useState(ids[0] ?? null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin, threshold: 0 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [key, rootMargin])

  return active
}
