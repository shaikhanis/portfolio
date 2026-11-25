/**
 * Personal engineering projects.
 *
 * `status`: 'live' (implemented and tested — shows a live demo link) or 'in-progress'.
 * Only set 'live' once the project is implemented and tested.
 * `demoPath` is an in-app route; `sourcePath` is appended to profile.repositoryUrl
 * (as /tree/main/<sourcePath>) — source links stay hidden until repositoryUrl is set.
 */
export const personalProjects = [
  {
    id: 'admin-dashboard',
    index: '01',
    title: 'Bookings Analytics Dashboard',
    kind: 'React Admin Dashboard',
    status: 'live',
    summary:
      'A responsive admin dashboard for a fictional travel business: KPI tiles, hand-built SVG charts, filters and a sortable bookings table — all fed by a mock API with realistic latency.',
    features: [
      'Reusable, composable UI components',
      'Hand-built SVG charts — no chart library',
      'Filtering by date range, region and product',
      'Mock API layer with loading and error states',
      'Responsive from 320px to wide desktop',
    ],
    stack: ['React 19', 'Hooks', 'React Router', 'SVG', 'CSS Modules'],
    demoPath: '/projects/admin-dashboard',
    sourcePath: 'src/pages/AdminDashboardPage.jsx',
  },
  {
    id: 'api-explorer',
    index: '02',
    title: 'Destination Explorer',
    kind: 'React API Explorer',
    status: 'live',
    summary:
      'Search any city in the world and explore live conditions and a 7-day outlook, using the public Open-Meteo geocoding and forecast APIs.',
    features: [
      'Debounced search with request cancellation',
      'Loading skeletons, empty and error states with retry',
      'Live public API data — no API key required',
      'Unit toggle and recently viewed places',
      'Responsive, keyboard-friendly interface',
    ],
    stack: ['React 19', 'Custom hooks', 'Fetch + AbortController', 'Open-Meteo API', 'CSS Modules'],
    demoPath: '/projects/api-explorer',
    sourcePath: 'src/pages/ApiExplorerPage.jsx',
  },
  {
    id: 'portfolio',
    index: '03',
    title: 'This Portfolio',
    kind: 'React + Vite',
    status: 'in-progress',
    summary:
      'Designed and built from scratch: a data-driven React application with a token-based design system, light and dark themes, accessible interactions and automated tests.',
    features: [
      'Content separated from components in data files',
      'Design tokens for colour, type, spacing and motion',
      'Accessible navigation, dialogs and forms',
      'Code-split demo routes and self-hosted fonts',
      'Unit, end-to-end and accessibility tests',
    ],
    stack: ['React 19', 'Vite', 'Bootstrap 5 grid', 'Framer Motion', 'Playwright'],
    demoPath: '/',
    sourcePath: '',
  },
]
