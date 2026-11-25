import { Link } from 'react-router'
import { cx } from '../../../utils/cx.js'
import styles from './Button.module.css'

/**
 * Polymorphic button.
 *  - `to`   → router <Link> (in-app routes)
 *  - `href` → <a> (anchors, downloads, external URLs; pass `external` for new-tab links)
 *  - else   → <button type="button"> (override with `type`)
 *
 * @param {{
 *   variant?: 'primary' | 'secondary' | 'ghost',
 *   size?: 'sm' | 'md' | 'lg',
 *   icon?: import('react').ReactNode,
 *   iconPosition?: 'start' | 'end',
 *   external?: boolean,
 *   fullWidth?: boolean,
 *   to?: string, href?: string,
 *   className?: string,
 *   children: import('react').ReactNode,
 * } & Record<string, unknown>} props
 */
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'end',
  external = false,
  fullWidth = false,
  to,
  href,
  className,
  children,
  ...rest
}) {
  const classes = cx(
    styles.button,
    styles[variant],
    styles[size],
    icon && styles.withIcon,
    fullWidth && styles.fullWidth,
    className,
  )

  const content = (
    <>
      {icon && iconPosition === 'start' ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === 'end' ? (
        <span className={cx(styles.icon, styles.iconEnd)} aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {content}
        {external ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
