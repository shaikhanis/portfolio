import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/common/Button/Button.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { profile } from '../data/profile.js'
import styles from './StatusPage.module.css'

export default function NotFoundPage() {
  usePageMeta({ title: `Page not found — ${profile.name}` })

  return (
    <main id="main-content" className={styles.page}>
      <div className={`container-site ${styles.inner}`}>
        <p className="mono-label">Error 404</p>
        <h1 className={styles.title}>
          This page took a <em className="accent">detour.</em>
        </h1>
        <p className={styles.text}>The page you are looking for does not exist or has moved.</p>
        <Button to="/" icon={<ArrowLeft />} iconPosition="start">
          Back to the portfolio
        </Button>
      </div>
    </main>
  )
}
