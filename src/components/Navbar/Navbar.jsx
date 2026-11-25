import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navItems, navCta } from '../../data/navigation.js'
import { useActiveSection } from '../../hooks/useActiveSection.js'
import { useScrollState } from '../../hooks/useScrollState.js'
import { Button } from '../common/Button/Button.jsx'
import { Dialog } from '../common/Dialog/Dialog.jsx'
import { ThemeToggle } from '../common/ThemeToggle/ThemeToggle.jsx'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(navItems.flatMap((item) => item.sections))
  const { scrolled } = useScrollState()

  const isCurrent = (item) => item.sections.includes(activeSection)

  return (
    <header className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}`}>
      <nav className="container-site site-nav__inner" aria-label="Primary">
        <a href="#home" className="wordmark" aria-label="Anis, home">ANIS<span>.</span></a>
        <ul className="site-nav__links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={item.href} className="site-nav__link" aria-current={isCurrent(item) ? 'true' : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="site-nav__actions">
          <ThemeToggle />
          <Button href={navCta.href} size="sm" className="site-nav__desktop-cta">
            {navCta.label}
          </Button>
          <button
            type="button"
            className="site-nav__menu-button"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={19} aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        variant="fullscreen"
        className="mobile-menu-dialog"
        labelledBy="mobile-menu-title"
      >
        <div className="mobile-menu">
          <div className="mobile-menu__head">
            <p id="mobile-menu-title" className="mono-label">Navigation</p>
            <button type="button" className="mobile-menu__close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <ul className="mobile-menu__links">
            {navItems.map((item, index) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={isCurrent(item) ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>{item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-menu__foot">
            <Button href={navCta.href} icon={<ArrowUpRight size={17} />} onClick={() => setMenuOpen(false)}>
              {navCta.label}
            </Button>
            <span className="mono-label">Shaikh Anis · UI Engineer</span>
          </div>
        </div>
      </Dialog>
    </header>
  )
}
