import { useEffect, useRef } from 'react'
import { cx } from '../../../utils/cx.js'
import styles from './Dialog.module.css'

/**
 * Accessible modal built on the native <dialog> element:
 *  - showModal() traps focus and makes the rest of the page inert
 *  - Escape and backdrop clicks call `onClose`
 *  - focus returns to the element that opened it
 *  - page scroll is locked by `html:has(dialog[open])` in base.css
 *
 * @param {{
 *   open: boolean,
 *   onClose: () => void,
 *   labelledBy?: string,
 *   describedBy?: string,
 *   variant?: 'sheet' | 'fullscreen' | 'center',
 *   className?: string,
 *   panelClassName?: string,
 *   children: import('react').ReactNode,
 * }} props
 */
export function Dialog({ open, onClose, labelledBy, describedBy, variant = 'center', className, panelClassName, children }) {
  const dialogRef = useRef(null)
  const returnFocusRef = useRef(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // Open / close the native dialog in sync with the `open` prop.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // Native events: Escape fires `cancel`; any close (incl. form method="dialog") fires `close`.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    const handleCancel = (event) => {
      event.preventDefault()
      onCloseRef.current?.()
    }
    const handleClose = () => {
      const target = returnFocusRef.current
      returnFocusRef.current = null
      if (target && typeof target.focus === 'function' && document.contains(target)) {
        target.focus({ preventScroll: true })
      }
      onCloseRef.current?.()
    }

    dialog.addEventListener('cancel', handleCancel)
    dialog.addEventListener('close', handleClose)
    return () => {
      dialog.removeEventListener('cancel', handleCancel)
      dialog.removeEventListener('close', handleClose)
    }
  }, [])

  // Close if the component unmounts while open.
  useEffect(() => {
    const dialog = dialogRef.current
    return () => {
      if (dialog?.open) dialog.close()
    }
  }, [])

  // A click whose target is the <dialog> itself landed on the backdrop (the panel fills the box).
  const handleClick = (event) => {
    if (event.target === dialogRef.current) onCloseRef.current?.()
  }

  return (
    // The backdrop click is a convenience; Escape and the close button are the accessible routes.
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      className={cx(styles.dialog, styles[variant], className)}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClick={handleClick}
    >
      <div className={cx(styles.panel, panelClassName)}>{open ? children : null}</div>
    </dialog>
  )
}
