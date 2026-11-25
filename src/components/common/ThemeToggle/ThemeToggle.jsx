import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../../hooks/useTheme.js'
import { cx } from '../../../utils/cx.js'
import styles from './ThemeToggle.module.css'

/** Icon button that switches between the dark and light themes. */
export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
  }

  return (
    <button
      type="button"
      className={cx(styles.toggle, className)}
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className={cx(styles.icon, isDark ? styles.visible : styles.hidden)} aria-hidden="true">
        <Moon size={18} strokeWidth={1.75} />
      </span>
      <span className={cx(styles.icon, isDark ? styles.hidden : styles.visible)} aria-hidden="true">
        <Sun size={18} strokeWidth={1.75} />
      </span>
    </button>
  )
}
