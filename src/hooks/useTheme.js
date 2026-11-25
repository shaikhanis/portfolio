import { useContext } from 'react'
import { ThemeContext } from '../context/theme-context.js'

/** Returns `{ theme, setTheme, toggleTheme }`. Must be used inside <ThemeProvider>. */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within <ThemeProvider>')
  return context
}
