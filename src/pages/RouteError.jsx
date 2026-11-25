import { RotateCcw } from 'lucide-react'
import { Button } from '../components/common/Button/Button.jsx'
import styles from './StatusPage.module.css'

/** Fallback for render errors — e.g. a demo chunk that fails to download after a redeploy. */
export default function RouteError() {
  return (
    <main id="main-content" className={styles.page}>
      <div className={`container-site ${styles.inner}`}>
        <p className="mono-label">Something went wrong</p>
        <h1 className={styles.title}>
          This page could not be <em className="accent">loaded.</em>
        </h1>
        <p className={styles.text}>
          A part of the site failed to load. Reloading usually fixes it — if not, head back to the homepage.
        </p>
        <div className={styles.actions}>
          <Button type="button" onClick={() => window.location.reload()} icon={<RotateCcw />} iconPosition="start">
            Reload page
          </Button>
          <Button href="/" variant="secondary">
            Go to homepage
          </Button>
        </div>
      </div>
    </main>
  )
}
