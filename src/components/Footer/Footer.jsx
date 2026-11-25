import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { navItems } from '../../data/navigation.js'
import { activeSocialLinks, emailHref } from '../../data/socialLinks.js'
import { socialIcons } from '../common/BrandIcons/socialIcons.js'
import { profile } from '../../data/profile.js'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-site">
        <div className="site-footer__main">
          <div className="site-footer__identity">
            <a href="#home" className="wordmark" aria-label="Anis, back to home">ANIS<span>.</span></a>
            <p>{profile.designation}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="site-footer__nav">
              {navItems.map((item) => <li key={item.id}><a href={item.href}>{item.label}</a></li>)}
            </ul>
          </nav>
          <ul className="site-footer__social" aria-label="Social links">
            {activeSocialLinks.map((link) => {
              const Icon = socialIcons[link.id]
              return (
                <li key={link.id}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {Icon ? <Icon size={16} aria-hidden="true" /> : null}
                    {link.label}<ArrowUpRight size={13} aria-hidden="true" />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              )
            })}
            {emailHref ? <li><a href={emailHref}>Email<ArrowUpRight size={13} aria-hidden="true" /></a></li> : null}
          </ul>
        </div>
        <div className="site-footer__bottom">
          <p>© {YEAR} {profile.name}. All rights reserved.</p>
          <button type="button" className="site-footer__top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <ArrowUp size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
