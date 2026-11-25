/**
 * Engineering approach — how I work, in short statements.
 * `proof` points to something verifiable on this site.
 */
export const approachPrinciples = [
  {
    id: 'pixel',
    title: 'Pixel-conscious UI',
    description: 'Spacing, type and interaction states matched to the design — then checked at every breakpoint.',
    proof: 'Every section here is tested from 320px to 1920px.',
  },
  {
    id: 'responsive',
    title: 'Responsive-first',
    description: 'Layouts start small and scale up, so mobile is never an afterthought.',
    proof: 'Layouts are designed per breakpoint, not shrunk from desktop.',
  },
  {
    id: 'components',
    title: 'Reusable components',
    description: 'Small, composable pieces with clear props — features get assembled, not rewritten.',
    proof: 'Buttons, section headers and dialogs are shared across the site.',
  },
  {
    id: 'css',
    title: 'Maintainable CSS',
    description: 'Design tokens, scoped styles and predictable naming that keep a growing codebase calm.',
    proof: 'Both themes are driven by the same set of tokens.',
  },
  {
    id: 'api',
    title: 'API integration',
    description: 'Every request designed with its loading, empty and error states — not just the happy path.',
    proof: 'See the Destination Explorer demo.',
  },
  {
    id: 'debugging',
    title: 'Debugging & problem solving',
    description: 'Reproduce, isolate, fix, verify. DevTools first, guesses last.',
    proof: 'Automated tests guard the fixes.',
  },
  {
    id: 'a11y',
    title: 'Accessibility',
    description: 'Semantic HTML, visible focus, keyboard support and sufficient contrast as defaults.',
    proof: 'Try navigating this page with only a keyboard.',
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Lean dependencies, lazy-loaded routes and motion that respects user preferences.',
    proof: 'Demo projects load only when opened.',
  },
]
