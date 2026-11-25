import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Bootstrap 5: only the reboot and grid layers — components are custom-built.
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'

// Self-hosted variable fonts (no third-party requests).
import '@fontsource-variable/instrument-sans/wght.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import '@fontsource-variable/jetbrains-mono/wght.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/utilities.css'
import './styles/portfolio.css'

import App from './App.jsx'
import { ThemeProvider } from './context/ThemeProvider.jsx'

// After a redeploy, an open tab may request code-split chunks that no longer exist.
// Reload once to pick up the new build instead of showing a broken page.
window.addEventListener('vite:preloadError', (event) => {
  try {
    if (sessionStorage.getItem('sa-preload-reload')) return
    sessionStorage.setItem('sa-preload-reload', '1')
  } catch {
    return
  }
  event.preventDefault()
  window.location.reload()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
