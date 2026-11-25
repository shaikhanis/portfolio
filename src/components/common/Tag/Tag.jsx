import { cx } from '../../../utils/cx.js'
import styles from './Tag.module.css'

/**
 * Small label chip.
 * @param {{ variant?: 'default' | 'accent' | 'solid' | 'success', size?: 'sm' | 'md', mono?: boolean,
 *   as?: string, className?: string, children: import('react').ReactNode } & Record<string, unknown>} props
 */
export function Tag({ variant = 'default', size = 'md', mono = false, as: Component = 'span', className, children, ...rest }) {
  return (
    <Component className={cx(styles.tag, styles[variant], styles[size], mono && styles.mono, className)} {...rest}>
      {children}
    </Component>
  )
}
