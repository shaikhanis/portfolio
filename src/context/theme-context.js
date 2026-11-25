import { createContext } from 'react'

/** @type {import('react').Context<{ theme: 'dark' | 'light', setTheme: (t: string) => void, toggleTheme: (origin?: { x: number, y: number }) => void } | null>} */
export const ThemeContext = createContext(null)
