import styles from './PageLoader.module.css'

/** Fallback while a lazily loaded route (demo project) downloads. */
export function PageLoader({ label = 'Loading…' }) {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <span className={styles.bar} aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
    </div>
  )
}
