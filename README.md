# Shaikh Anis — Portfolio

Personal portfolio of **Shaikh Anis**, Frontend Developer / UI Engineer with 3.5+ years of experience building
responsive, customer-facing interfaces for enterprise travel platforms — now focused on modern React.js engineering.

> **Preferred live URL:** [https://anis-portfolio.vercel.app](https://anis-portfolio.vercel.app)  
> This URL currently responds, but the latest workspace changes have not been deployed or verified there.

The site is a hand-built React application with its own design system, two working demo projects, light and dark
themes, and automated accessibility, responsive and end-to-end tests.

---

## Highlights

- **Editorial design system** — design tokens for colour, type, spacing and motion; Instrument Sans, Instrument Serif
  and JetBrains Mono (self-hosted); one accent colour; light and dark themes from the same tokens.
- **Data-driven content** — every piece of copy lives in `src/data`, separate from components and styles.
- **Professional case studies** — seven case studies with original, brand-free illustrations drawn in CSS.
- **Two functional React demos** (code-split routes):
  - **Bookings Analytics Dashboard** — mock REST API, hand-built SVG charts, filters, sorting, loading/error states.
  - **Destination Explorer** — live Open-Meteo API, debounced search, request cancellation, resilient UI states.
- **Accessibility** — semantic landmarks, skip link, keyboard-operable menus and dialogs, visible focus, reduced-motion
  support, WCAG 2.2 AA checks with axe.
- **Performance** — lazy-loaded routes, animation code loaded asynchronously, preloaded critical fonts, immutable
  asset caching.
- **Security** — strict Content-Security-Policy and security headers on Vercel, CSP hash verification and a secret scan
  on every build.

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19, JavaScript (ES2022+), JSX |
| Build | Vite 8 |
| Styling | CSS Modules + design tokens, Bootstrap 5 (reboot + grid only) |
| Motion | Framer Motion (`LazyMotion`, reduced-motion aware) |
| Routing | React Router 7 |
| Icons | lucide-react |
| Testing | Vitest (unit), Playwright (end-to-end), axe-core (accessibility) |
| Linting | oxlint (React, jsx-a11y and import rules) |
| Hosting | Vercel |

## Getting started

Requirements: **Node.js 20.19+** (Node 24 LTS recommended — see `.nvmrc`) and npm.

```bash
npm ci          # install exact dependency versions
npm run dev     # start the dev server at http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build to `dist/`, then verifies CSP hashes, required assets and scans for secrets |
| `npm run preview` | Serves the production build locally (with the production security headers) |
| `npm run lint` | Lints the project with oxlint |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end, accessibility and responsive tests (Playwright + axe) |
| `npm run check` | Lint, unit tests, build and end-to-end tests in one go |
| `npm run assets` | Regenerates the social image, favicon and app icons from their sources |

Playwright uses the locally installed **Google Chrome** (no browser download). To use Playwright's bundled Chromium
instead: `npx playwright install chromium`, then run the tests with `PW_CHANNEL=chromium`.

## Updating the content

All content lives in `src/data`. Change the data — not the components.

| What | Where |
| --- | --- |
| Name, roles, hero copy, about text, availability | `src/data/profile.js` |
| Work history (add start/end dates when you want them shown) | `src/data/experience.js` |
| Skills and their levels (Professional · Hands-on · Learning) | `src/data/skills.js` |
| Professional case studies | `src/data/caseStudies.js` |
| Personal projects | `src/data/projects.js` |
| Engineering approach | `src/data/approach.js` |
| Email, contact-form delivery, LinkedIn, GitHub | `src/data/socialLinks.js` |
| Navigation and section order | `src/data/navigation.js` |

### Photo

Add a portrait as **`public/images/profile.jpg`** (or `.webp`, `.avif`, `.png`). It is detected automatically at build
time; until then the hero shows a designed monogram. Recommended: 4:5 ratio, about 960 × 1200 px, under 200 KB.
Restart `npm run dev` after adding or removing the file.

### Resume

Add the PDF as **`public/resume/shaikh-anis-resume.pdf`**. When present, the “Download Resume” buttons appear
automatically; when absent, the site offers a “Request resume” flow instead — it never links to a missing file.

### Contact details and the contact form

Edit `src/data/socialLinks.js`:

1. Set `contact.email` to your professional email address.
2. Choose `contact.formProvider`:
   - `'mailto'` — the form validates the message, then opens the visitor's email app with it pre-filled.
   - `'formsubmit'` — the form sends messages in-page through [FormSubmit](https://formsubmit.co) (free, no backend).
     The first submission sends an activation email to your address — confirm it once. Optionally set
     `contact.formsubmitAlias` to the alias FormSubmit gives you so your email isn't in the request URL.
3. Set the `href` of the LinkedIn and GitHub entries to your full `https://` profile URLs.

Anything left empty stays hidden on the site, so there are never placeholder or broken links. Until an email is set,
the form clearly states that messaging isn't connected yet.

### “View source” links

Set `profile.repositoryUrl` in `src/data/profile.js` to this repository's GitHub URL. Source links for the demo
projects appear automatically.

### Adding a personal project

1. Add an entry to `src/data/projects.js` (`status: 'in-progress'` until it is built and tested, then `'live'`).
2. For an in-app demo, add a lazily loaded route in `src/App.jsx`, a page in `src/pages`, and reusable feature
   components or data modules as needed; use `src/layouts/DemoLayout.jsx` for the page shell.
3. Add the route to `SITEMAP_ROUTES` in `vite.config.js`, and extend the Playwright tests in `tests/e2e`.

### Adding a case study

Add an entry to `src/data/caseStudies.js` and, if it needs a new illustration, a component in
`src/components/CaseStudies/mockups` (register it in `mockups/index.js`). Keep illustrations original and brand-free.

## Deployment (Vercel)

The repository is ready for Vercel — `vercel.json` sets the framework, build command (`npm run build`), output
directory (`dist`), SPA rewrites, security headers and long-term caching for hashed assets.

1. Push the repository to GitHub.
2. In Vercel: **Add New… → Project → Import** the repository. Settings are read from `vercel.json`.
3. Deploy. The canonical URL, `robots.txt` and `sitemap.xml` use the production domain automatically
   (override with the `VITE_SITE_URL` environment variable if needed).

Notes:

- Vercel no longer builds with Node 20. `package.json` allows Node ≥ 20.19, so Vercel uses its current default.
- The Content-Security-Policy allow-lists the inline theme script by hash. If you edit that script in `index.html`,
  `npm run build` fails and prints the new hash to put in `vercel.json`.
- The CSP blocks the Vercel preview toolbar. Turn the toolbar off for previews in
  **Project Settings → General → Vercel Toolbar** if you want to use it.

## Project structure

```text
src/
  components/       # Portfolio sections, reusable UI and original case-study illustrations
  config/           # Build-time site and optional asset settings
  context/          # Theme context and provider
  data/             # Editable profile, experience, skills, projects and case-study content
  hooks/            # Navigation, scroll, theme and metadata hooks
  layouts/          # Portfolio and demo page shells
  pages/            # Home, demos, 404 and route error pages
  styles/           # Design tokens, base styles, utilities and portfolio layout
  utils/            # Small shared helpers
public/
  images/           # Optional profile portrait
  resume/           # Optional shaikh-anis-resume.pdf
tests/
  e2e/              # Playwright, axe accessibility and responsive tests
scripts/            # Asset generation, build verification and Lighthouse helpers
docs/               # Design system documentation
```

## Confidentiality

Professional work is described at a general level and presented as contributions within a team. No proprietary
code, data, screenshots, logos or metrics are included — case-study visuals are original illustrations made for this
site.

## License

© Shaikh Anis. All rights reserved.
