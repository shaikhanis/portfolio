import { useLayoutEffect, useRef, useState } from 'react'
import { Lock } from 'lucide-react'
import { cx } from '../../../utils/cx.js'
import s from './MockKit.module.css'

/**
 * Mockup kit — primitives for ORIGINAL, brand-free illustrations of interfaces.
 *
 * Every mockup is drawn on a fixed 1200 × 800 canvas (3:2) and scaled to its container like an
 * image, so it looks identical at any size. Standard composition (see DuoLayout):
 *   - desktop browser frame: x 0,   y 0,   w 1000, h 680
 *   - phone frame:           x 890, y 210, w 290,  h 580  (overlaps the browser's right edge)
 * Use design-size pixel values inside mockups; never rely on viewport units.
 */
const CANVAS = { width: 1200, height: 800 }

/** Scales a fixed-size canvas to the container width. Exposes one accessible image name. */
export function MockStage({ label, children, className }) {
  const stageRef = useRef(null)
  const [scale, setScale] = useState(0.5)

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    const update = (width) => setScale(width / CANVAS.width)
    update(stage.getBoundingClientRect().width)
    if (typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(([entry]) => update(entry.contentRect.width))
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={stageRef} className={cx(s.stage, className)} role="img" aria-label={label}>
      <div
        className={s.canvas}
        style={{ width: CANVAS.width, height: CANVAS.height, transform: `scale(${scale})` }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}

/** Standard desktop + phone composition. */
export function DuoLayout({ address, desktop, mobile }) {
  return (
    <>
      <BrowserFrame address={address} className={s.duoDesktop}>
        {desktop}
      </BrowserFrame>
      <PhoneFrame className={s.duoPhone}>{mobile}</PhoneFrame>
    </>
  )
}

/** Browser window chrome. `address` is a generic path such as "/hotels/search" — never a real domain. */
export function BrowserFrame({ address = '/', className, children }) {
  return (
    <div className={cx(s.browser, className)}>
      <div className={s.chrome}>
        <span className={s.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={s.address}>
          <Lock size={12} strokeWidth={2.25} />
          {address}
        </span>
        <span className={s.chromeSpacer} />
      </div>
      <div className={s.browserViewport}>{children}</div>
    </div>
  )
}

/** Phone frame with a minimal status bar. */
export function PhoneFrame({ className, children }) {
  return (
    <div className={cx(s.phone, className)}>
      <div className={s.statusBar}>
        <span>9:41</span>
        <span className={s.statusIcons}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={s.phoneViewport}>{children}</div>
      <span className={s.homeIndicator} />
    </div>
  )
}

/** Skeleton text line. `w` accepts px numbers or CSS lengths; `tone`: 'soft' | 'strong' | 'accent'. */
export function Sk({ w = 120, h = 10, tone = 'soft', className, style }) {
  return (
    <i
      className={cx(s.sk, s[`sk_${tone}`], className)}
      style={{ width: typeof w === 'number' ? `${w}px` : w, height: h, ...style }}
    />
  )
}

/** Stack of skeleton lines, e.g. a paragraph. */
export function SkLines({ lines = [100, 92, 64], h = 8, gap = 8, tone = 'soft' }) {
  return (
    <span className={s.skLines} style={{ gap }}>
      {lines.map((w, i) => (
        <Sk key={i} w={typeof w === 'number' ? `${w}%` : w} h={h} tone={tone} />
      ))}
    </span>
  )
}

/** Surface box. `tone`: 'surface' | 'surface2' | 'outline' | 'accent'. */
export function Box({ tone = 'surface', className, style, children }) {
  return (
    <div className={cx(s.box, s[`box_${tone}`], className)} style={style}>
      {children}
    </div>
  )
}

/** Small pill / chip. */
export function Pill({ active = false, className, children }) {
  return <span className={cx(s.pill, active && s.pillActive, className)}>{children}</span>
}

/** Mock button. `variant`: 'accent' | 'outline' | 'ghost'. */
export function Btn({ variant = 'accent', className, style, children }) {
  return (
    <span className={cx(s.btn, s[`btn_${variant}`], className)} style={style}>
      {children}
    </span>
  )
}

/** Small text label (real words are fine for generic UI labels like "Check-in"). */
export function Label({ tone = 'muted', size = 12, className, style, children }) {
  return (
    <span className={cx(s.label, s[`label_${tone}`], className)} style={{ fontSize: size, ...style }}>
      {children}
    </span>
  )
}

/** Abstract brand glyph — deliberately NOT a real logo. */
export function LogoGlyph({ size = 22 }) {
  return (
    <span className={s.logoGlyph} style={{ width: size, height: size }}>
      <i />
    </span>
  )
}

/**
 * Photo placeholder drawn in CSS (no images, no real places).
 * variant: 'mountains' | 'coast' | 'city' | 'resort' | 'dunes'
 */
export function Scene({ variant = 'mountains', className, style, children }) {
  return (
    <div className={cx(s.scene, s[`scene_${variant}`], className)} style={style}>
      <span className={s.sun} />
      <span className={s.layer1} />
      <span className={s.layer2} />
      {children}
    </div>
  )
}

/** Rating stars (decorative). */
export function Stars({ count = 4, of = 5, size = 10 }) {
  return (
    <span className={s.stars}>
      {Array.from({ length: of }, (_, i) => (
        <i key={i} className={i < count ? s.starOn : s.starOff} style={{ width: size, height: size }} />
      ))}
    </span>
  )
}

/** Horizontal rule. */
export function Rule({ className }) {
  return <hr className={cx(s.rule, className)} />
}

