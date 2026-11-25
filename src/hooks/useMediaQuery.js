import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribes to a CSS media query.
 * @param {string} query e.g. '(min-width: 992px)'
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {}
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )

  const getSnapshot = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false)

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
