import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Scrolls to the element referenced by the URL hash after a route change
 * (e.g. navigating from a demo page back to "/#personal-projects").
 * Same-page anchor clicks are handled natively by the browser.
 */
export function useHashScroll() {
  const { hash, key } = useLocation()

  useEffect(() => {
    if (!hash) return undefined
    const id = decodeURIComponent(hash.slice(1))
    // Wait a frame so the target section has rendered.
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
    // `key` is intentional: re-run when navigating to the same hash again.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [hash, key])
}
