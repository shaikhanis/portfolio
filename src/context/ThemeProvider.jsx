import { useCallback, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { THEME_STORAGE_KEY } from '../config/site.js'
import { ThemeContext } from './theme-context.js'

const THEME_COLORS = { dark: '#0d0e10', light: '#f3f0ea' }

function readInitialTheme() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function applyTheme(theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
}

/**
 * Provides the colour theme. The initial value comes from <html data-theme>, which the inline
 * script in index.html sets from localStorage before first paint (dark is the default).
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Storage can be unavailable (private mode, blocked cookies) — the theme still works for this visit.
    }
  }, [theme])

  const setTheme = useCallback((next) => setThemeState(next === 'light' ? 'light' : 'dark'), [])

  /**
   * Toggles the theme. When supported (and motion is allowed) the new theme is revealed with a
   * circular View Transition that grows from `origin` — usually the toggle button's centre.
   */
  const toggleTheme = useCallback(
    (origin) => {
      const next = theme === 'dark' ? 'light' : 'dark'
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      if (typeof document.startViewTransition !== 'function' || reduceMotion) {
        setThemeState(next)
        return
      }

      const x = origin?.x ?? window.innerWidth / 2
      const y = origin?.y ?? 0
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

      const transition = document.startViewTransition(() => {
        flushSync(() => setThemeState(next))
        applyTheme(next)
      })

      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            {
              duration: 560,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          )
        })
        .catch(() => {})
    },
    [theme],
  )

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
