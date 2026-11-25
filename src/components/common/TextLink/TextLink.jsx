import { Link } from 'react-router'
import { cx } from '../../../utils/cx.js'
import styles from './TextLink.module.css'

/**
 * Inline text link with an animated underline.
 * `to` → router Link · `href` → anchor (`external` opens a new tab with safe rel attributes).
 */
export function TextLink({ to, href, external = false, className, children, ...rest }) {
  const classes = cx(styles.link, className)

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a href={href} className={classes} {...externalProps} {...rest}>
      {children}
      {external ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
    </a>
  )
}
