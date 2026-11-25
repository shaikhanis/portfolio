/* global __SITE_URL__, __RESUME_URL__, __PROFILE_PHOTO_URL__, __BUILD_DATE__ */

/**
 * Build-time constants injected by vite.config.js (see the `portfolio-site` plugin).
 * The `typeof` guards keep this module safe to import from plain Node (tests, scripts).
 */

/** Canonical site origin without a trailing slash, e.g. https://anis-portfolio.vercel.app */
export const SITE_URL = typeof __SITE_URL__ !== 'undefined' ? __SITE_URL__ : 'https://anis-portfolio.vercel.app'

/**
 * Public URL of the resume PDF, or null when public/resume/shaikh-anis-resume.pdf does not exist.
 * The UI only offers a download when this is set.
 */
export const RESUME_URL = typeof __RESUME_URL__ !== 'undefined' ? __RESUME_URL__ : null

/**
 * Public URL of the profile photo, or null when none of
 * public/images/profile.{webp,avif,jpg,jpeg,png} exists. A designed monogram is shown instead.
 */
export const PROFILE_PHOTO_URL = typeof __PROFILE_PHOTO_URL__ !== 'undefined' ? __PROFILE_PHOTO_URL__ : null

/** ISO date (YYYY-MM-DD) of the build. */
export const BUILD_DATE = typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : ''

/** localStorage key for the colour theme. Must match the inline script in index.html. */
export const THEME_STORAGE_KEY = 'sa-theme'
