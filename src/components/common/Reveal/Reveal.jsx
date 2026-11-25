import { m, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Fades and lifts its content into view once, when scrolled into the viewport.
 * Renders a plain element (no animation, content always visible) for reduced-motion users.
 *
 * @param {{ as?: string, delay?: number, y?: number, amount?: number, duration?: number,
 *   className?: string, children?: import('react').ReactNode } & Record<string, unknown>} props
 */
export function Reveal({ as = 'div', delay = 0, y = 24, amount = 0.2, duration = 0.8, children, ...rest }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    const Tag = as
    return <Tag {...rest}>{children}</Tag>
  }

  const MotionTag = m[as] ?? m.div
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Staggers the entrance of its <StaggerItem> children when the group scrolls into view.
 */
export function Stagger({ as = 'div', stagger = 0.08, delay = 0, amount = 0.15, children, ...rest }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    const Tag = as
    return <Tag {...rest}>{children}</Tag>
  }

  const MotionTag = m[as] ?? m.div
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerItem({ as = 'div', y = 20, duration = 0.7, children, ...rest }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    const Tag = as
    return <Tag {...rest}>{children}</Tag>
  }

  const MotionTag = m[as] ?? m.div
  return (
    <MotionTag
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
