import { useEffect, useState } from 'react'

/**
 * Lightweight, rAF-throttled scroll state.
 * @param {{ threshold?: number }} [options] distance in px after which `scrolled` becomes true
 * @returns {{ y: number, scrolled: boolean, direction: 'up' | 'down' }}
 */
export function useScrollState({ threshold = 8 } = {}) {
  const [state, setState] = useState(() => ({
    y: typeof window === 'undefined' ? 0 : window.scrollY,
    scrolled: typeof window === 'undefined' ? false : window.scrollY > threshold,
    direction: 'up',
  }))

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const delta = y - lastY
      // Ignore tiny movements (trackpad jitter) when deciding direction.
      setState((previous) => {
        const direction = Math.abs(delta) < 4 ? previous.direction : delta > 0 ? 'down' : 'up'
        const scrolled = y > threshold
        if (previous.y === y && previous.direction === direction && previous.scrolled === scrolled) return previous
        return { y, scrolled, direction }
      })
      lastY = y
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [threshold])

  return state
}
