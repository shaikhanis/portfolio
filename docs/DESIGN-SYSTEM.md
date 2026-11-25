# Design system

The visual and engineering rules behind this portfolio. Tokens live in `src/styles/tokens.css`;
shared components live in `src/components/common`.

## 1. Principles

1. **Editorial, not decorative.** Typography, whitespace and hairline structure do the work. Every visual must
   earn its place.
2. **One accent.** Signal orange (`--color-accent`) marks what matters: the primary action, section indices,
   active states, a single emphasised word. Never more than a few accent touches per viewport.
3. **Honest content.** Every claim comes from `src/data`. No invented metrics, testimonials, logos or links.
4. **Designed per breakpoint.** Layouts are composed for phones, tablets and desktops — not shrunk.
5. **Quietly interactive.** Motion clarifies hierarchy and responds to input; it never blocks reading and always
   respects `prefers-reduced-motion`.

## 2. Typography

| Role | Font | Token / size | Notes |
| --- | --- | --- | --- |
| Hero display | Instrument Sans (500–560) | `--text-display` | tracking `--tracking-display`, line-height `--leading-none` |
| Section title (h2) | Instrument Sans 500 | `--text-3xl` | tracking `-0.035em`, max ~20ch |
| Card / item title (h3) | Instrument Sans 500–600 | `--text-xl` / `--text-2xl` | tracking `--tracking-tight` |
| Body | Instrument Sans 400 | `--text-md` | line-height `--leading-normal`, muted colour for long prose |
| Lead paragraph | Instrument Sans 400 | `--text-lg` | `--color-text-muted` |
| Labels, indices, meta | JetBrains Mono 500 | `--text-xs` | uppercase, `--tracking-label` (`.mono-label`) |
| Emphasis word | Instrument Serif *italic* | inherits | `<em className="accent">word</em>` — 1–2 words per heading, never a full sentence |

Use the variable weight axis freely (e.g. `font-weight: 550`). Headings use `text-wrap: balance` (set globally).

## 3. Colour

All colours come from tokens and switch with `[data-theme]`. Rules:

- Text: `--color-text` (primary), `--color-text-muted` (secondary prose), `--color-text-subtle` (tertiary meta only).
- Small accent-coloured text uses `--color-accent-text` (AA in both themes). `--color-accent` is for fills, large
  text, lines and icons.
- Text on accent fills uses `--color-on-accent`.
- Surfaces step up: `--color-bg` → `--color-bg-elevated` → `--color-surface` → `--color-surface-2` → `--color-surface-3`.
  Never put small text on `--color-surface-3`.
- Borders are hairlines: `1px solid var(--color-border)`; use `--color-border-strong` for interactive outlines.
- Semantic colours (`--color-success`, `--color-warning`, `--color-danger`, `--color-info` + `-soft` variants) are
  for states only (form errors, statuses, chart series), always paired with an icon or text.
- Never hard-code hex values in components (the mockup kit and charts use the `--mock-*`/semantic tokens too).

## 4. Layout and spacing

- Page width: wrap section content in `.container-site` (max 1320px + fluid gutters).
- Sections: `<section id="…" className="section" aria-labelledby="…-title">` — vertical rhythm comes from `.section`.
- Page-level columns: Bootstrap grid (`row`, `col-12 col-lg-7`, `g-4`, `gx-5`, `offset-lg-1`, `order-lg-2`).
- Component internals (bento grids, asymmetric compositions, card layouts): CSS Grid / Flexbox in CSS Modules.
- Breakpoints (Bootstrap): sm 576 · md 768 · lg 992 · xl 1200 · xxl 1400. Write mobile-first `@media (min-width: …)`.
- Must work at 320, 360, 375, 390, 430, 768, 820, 1024, 1280, 1366, 1440, 1600, 1920px: no horizontal overflow,
  no clipped text or buttons, no overlapping.
- Spacing uses `--space-1 … --space-10`. Radii: `--radius-sm` (8) for controls, `--radius-md` (12) for cards,
  `--radius-lg` (18) max — no giant rounded cards.
- Fixed navigation height: `--nav-height`. Anchored elements already get `scroll-margin-top`.

## 5. Shared components (`src/components/common`)

| Component | Import | Use |
| --- | --- | --- |
| `Button` | `common/Button/Button.jsx` | `variant` primary/secondary/ghost, `size` sm/md/lg, `icon` + `iconPosition`, `to` (router), `href` (+`external`), or a native button. |
| `TextLink` | `common/TextLink/TextLink.jsx` | Inline links with animated underline (`to`, `href`, `external`). |
| `SectionHeader` | `common/SectionHeader/SectionHeader.jsx` | `index`, `label`, `title` (node), `titleId`, `intro`, `aside`. Renders the section's h2. |
| `Reveal`, `Stagger`, `StaggerItem` | `common/Reveal/Reveal.jsx` | Scroll-reveal wrappers (`as`, `delay`, `y`). Plain elements under reduced motion. |
| `Tag` | `common/Tag/Tag.jsx` | Chips: `variant` default/accent/solid/success, `size` sm/md, `mono`. |
| `Dialog` | `common/Dialog/Dialog.jsx` | Native `<dialog>` modal: `open`, `onClose`, `labelledBy`, `variant` center/sheet/fullscreen. |
| `ThemeToggle` | `common/ThemeToggle/ThemeToggle.jsx` | Theme switch icon button (circular View Transition reveal). |
| `GitHubIcon`, `LinkedInIcon` / `socialIcons` | `common/BrandIcons/BrandIcons.jsx` / `common/BrandIcons/socialIcons.js` | Brand marks (lucide v1 has none); `socialIcons` maps socialLinks ids to icons. |
| `PageLoader` | `common/PageLoader/PageLoader.jsx` | Route-level loading bar. |

Hooks (`src/hooks`): `useTheme`, `useActiveSection`, `useScrollState`, `useMediaQuery`, `useDebouncedValue`,
`useHashScroll`, `usePageMeta`. Utilities: `cx` (`src/utils/cx.js`).

## 6. Motion

- Framer Motion runs inside `<LazyMotion strict>` with async `domAnimation` features: **use `m.div`, `m.li`… never
  `motion.*`** (strict mode throws). Layout animations / `layoutId` are not available — use CSS for those effects.
- Scroll reveals: `Reveal` / `Stagger` + `StaggerItem`. Don't wrap every paragraph; reveal meaningful groups.
- Above the fold (hero): use CSS keyframe entrances (they start at first paint). Never hide the hero `h1` behind a
  JavaScript-driven animation.
- Hover/focus micro-interactions: CSS transitions on `transform`, `opacity`, colours. Durations `--dur-fast/base/slow`,
  easing `--ease-out`.
- Reduced motion: `MotionConfig reducedMotion="user"` + the global CSS override. Custom JS animations must check
  `useReducedMotion()`; infinite CSS animations (marquees) must stop under `prefers-reduced-motion: reduce`.

## 7. Accessibility

- One `h1` per page (hero). Each section's title is its `h2` (via `SectionHeader`); items inside use `h3`.
- Landmarks: `header`/`nav` (navbar), `main#main-content`, `footer`. Sections are labelled with `aria-labelledby`.
- Everything interactive is a real `<a>` or `<button>`, reachable and operable by keyboard, with a visible
  `:focus-visible` style (global outline). Icon-only buttons need `aria-label`.
- Async status (form submission, API loading/errors) is announced with `role="status"` / `aria-live="polite"`
  (errors: `role="alert"`).
- Form fields: visible `<label>`, `aria-invalid`, errors linked with `aria-describedby`, an error summary on submit.
- Decorative visuals: `aria-hidden="true"`. Illustrations: one `role="img"` with a meaningful `aria-label`.
- Touch targets: primary controls ≥ 44×44px on touch devices; never below 24×24px.
- Information is never conveyed by colour alone, and nothing is hover-only.

## 8. Content and confidentiality

- Render content from `src/data/*` — never hard-code copy that belongs in data.
- No lorem ipsum, invented numbers, fake testimonials, fake repositories or demo URLs.
- Links that aren't configured (empty `href`) are not rendered.
- No company logos, screenshots, brand colours, internal URLs, API names or customer data. Case-study visuals are
  original, brand-free illustrations built with the mockup kit, and are labelled as illustrative.
- Professional work is described as contributions within a team — never as building entire platforms alone.

## 9. Code conventions

- React 19 function components in `.jsx`; sections and pages use default exports; shared pieces use named exports.
- Styles: CSS Modules co-located (`Component.module.css`) using tokens. Global classes only from `base.css`,
  `utilities.css` and Bootstrap's grid. Inline `style` only for dynamic CSS custom properties.
- No new npm dependencies. Icons from `lucide-react` (tree-shaken named imports).
- No `window`/`document` access during render — only in effects and event handlers.
- Keep components small and data-driven; comment intent, not mechanics. No `console.log`.
- External links: `target="_blank"` with `rel="noopener noreferrer"` and a visually hidden "(opens in a new tab)".

## 10. Case-study mockup kit (`src/components/CaseStudies/mockups/MockKit.jsx`)

- Canvas is a fixed 1200 × 800 design space scaled like an image (`MockStage`). Use design pixels.
- Standard composition: `DuoLayout` — desktop `BrowserFrame` + overlapping `PhoneFrame` (tells the responsive story).
- Primitives: `Sk` (skeleton line), `SkLines`, `Box`, `Pill`, `Btn`, `Label`, `Scene` (CSS-drawn photo placeholder),
  `Stars`, `Rule`, `LogoGlyph` (abstract, not a logo).
- Colours: `--mock-*`, accent and semantic tokens only — mockups follow the active theme.
- Generic UI labels are fine ("Check-in", "Guests", "Select room"). No real brand names, prices, offers, campaign copy
  or personal data; prefer skeleton bars for content.
