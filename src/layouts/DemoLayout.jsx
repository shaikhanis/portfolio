import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { Tag } from '../components/common/Tag/Tag.jsx'
import { ThemeToggle } from '../components/common/ThemeToggle/ThemeToggle.jsx'
import { profile } from '../data/profile.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import styles from './DemoLayout.module.css'

/**
 * Shared shell for the personal-project demos (/projects/*).
 *
 * @param {{
 *   title: string,          // e.g. 'Bookings Analytics Dashboard'
 *   kind: string,           // e.g. 'React Admin Dashboard'
 *   description: string,    // one or two sentences about what the demo shows
 *   notes?: string[],       // short "what this demonstrates" bullets
 *   sourcePath?: string,    // e.g. 'src/features/dashboard' — linked when profile.repositoryUrl is set
 *   children: import('react').ReactNode,
 * }} props
 */
export default function DemoLayout({ title, kind, description, notes = [], sourcePath, children }) {
  const { pathname } = useLocation()
  usePageMeta({ title: `${title} — ${profile.name}`, description, path: pathname })

  const sourceUrl = profile.repositoryUrl && sourcePath ? `${profile.repositoryUrl.replace(/\/+$/, '')}/tree/main/${sourcePath}` : null

  return (
    <>
      <a className="skip-link" href="#demo-content">
        Skip to demo
      </a>
      <header className={styles.header}>
        <div className={`container-site ${styles.headerInner}`}>
          <Link to="/#personal-projects" className={styles.back}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>
              Back to portfolio<span className={styles.backName}> · {profile.logo}.</span>
            </span>
          </Link>
          <div className={styles.headerActions}>
            {sourceUrl ? (
              <a className={styles.source} href={sourceUrl} target="_blank" rel="noopener noreferrer">
                View source
                <ArrowUpRight size={14} aria-hidden="true" />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            ) : null}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="demo-content" tabIndex={-1} className={styles.main}>
        <div className="container-site">
          <div className={styles.intro}>
            <div>
              <p className="mono-label">
                Personal project <span aria-hidden="true">·</span> {kind}
              </p>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.description}>{description}</p>
            </div>
            {notes.length > 0 ? (
              <ul className={styles.notes} aria-label="What this demo demonstrates">
                {notes.map((note) => (
                  <li key={note}>
                    <Tag size="sm">{note}</Tag>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {children}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={`container-site ${styles.footerInner}`}>
          <p>
            Built by {profile.name} with React. Demo data and behaviour are for illustration only.
          </p>
          <Link to="/#personal-projects" className={styles.footerLink}>
            More projects
          </Link>
        </div>
      </footer>
    </>
  )
}
