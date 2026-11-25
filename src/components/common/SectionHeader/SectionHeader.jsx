import { cx } from '../../../utils/cx.js'
import { Reveal } from '../Reveal/Reveal.jsx'
import styles from './SectionHeader.module.css'

/**
 * Editorial section header: a hairline rule, a mono index/label column and a large title.
 * Give the <section> `aria-labelledby={titleId}` so the heading names the landmark.
 *
 * @param {{
 *   index?: string,          // e.g. '01'
 *   label: string,           // e.g. 'About'
 *   title: import('react').ReactNode,  // may contain <em className="accent">word</em>
 *   titleId: string,
 *   intro?: import('react').ReactNode,
 *   aside?: import('react').ReactNode, // optional right-aligned slot (legend, link…)
 *   className?: string,
 * }} props
 */
export function SectionHeader({ index, label, title, titleId, intro, aside, className }) {
  return (
    <header className={cx(styles.header, className)}>
      <Reveal className={styles.meta} y={12}>
        {index ? <span className={styles.index}>({index})</span> : null}
        <span className={styles.label}>{label}</span>
      </Reveal>
      <div className={styles.main}>
        <Reveal as="h2" id={titleId} className={styles.title} delay={0.05}>
          {title}
        </Reveal>
        {intro ? (
          <Reveal as="p" className={styles.intro} delay={0.12}>
            {intro}
          </Reveal>
        ) : null}
      </div>
      {aside ? (
        <Reveal className={styles.aside} delay={0.16}>
          {aside}
        </Reveal>
      ) : null}
    </header>
  )
}
