import { useEffect } from 'react'
import { LazyMotion, MotionConfig } from 'framer-motion'
import { Outlet, useLocation } from 'react-router'
import { ErrorBoundary } from '../components/common/ErrorBoundary/ErrorBoundary.jsx'
import RouteError from '../pages/RouteError.jsx'

// Animation features load in a separate chunk right after the first render.
const loadMotionFeatures = () => import('./motion-features.js').then((module) => module.default)

/**
 * Resets scroll on route changes. In-page hash links (e.g. #about) are handled natively,
 * and HomePage scrolls to a hash after cross-route navigation (see useHashScroll).
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // `pathname` is intentional: every route change without a hash starts at the top.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [pathname, hash])

  return null
}

/**
 * App root:
 *  - LazyMotion (strict) — use `m.*` components, never `motion.*`.
 *  - MotionConfig respects the OS "reduce motion" setting for every animation.
 *  - ErrorBoundary keyed by pathname, so navigating away recovers from a failed page.
 */
export default function RootLayout() {
  const { pathname } = useLocation()

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <ScrollManager />
        <ErrorBoundary key={pathname} fallback={<RouteError />}>
          <Outlet />
        </ErrorBoundary>
      </MotionConfig>
    </LazyMotion>
  )
}
