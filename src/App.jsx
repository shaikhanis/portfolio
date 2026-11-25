import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { PageLoader } from './components/common/PageLoader/PageLoader.jsx'
import RootLayout from './layouts/RootLayout.jsx'
import SiteLayout from './layouts/SiteLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

// Demo projects are code-split: their code downloads only when a visitor opens them.
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage.jsx'))
const ApiExplorerPage = lazy(() => import('./pages/ApiExplorerPage.jsx'))

/**
 * Declarative routing (React Router v7). The site needs no loaders/actions, and this mode keeps
 * the initial bundle ~17 KB (gzip) smaller than the data router.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route
            path="projects/admin-dashboard"
            element={
              <Suspense fallback={<PageLoader label="Loading the dashboard demo…" />}>
                <AdminDashboardPage />
              </Suspense>
            }
          />
          <Route
            path="projects/api-explorer"
            element={
              <Suspense fallback={<PageLoader label="Loading the API explorer demo…" />}>
                <ApiExplorerPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
