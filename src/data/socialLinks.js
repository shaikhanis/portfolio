/**
 * Contact details and social profiles.
 *
 * Fill these in with your real details. Anything left empty is hidden automatically,
 * so the live site never shows a placeholder or a broken link.
 */

export const contact = {
  /** Your professional email address, e.g. 'name@example.com'. */
  email: '',

  /**
   * How the contact form delivers messages:
   *  - 'mailto'     → validates the form, then opens the visitor's email app with the message pre-filled.
   *  - 'formsubmit' → sends the message in-page through https://formsubmit.co (free, no backend).
   *                   The first submission sends an activation email to `email`; confirm it once.
   * Both options need `email` above. Until it is set, the form explains that messaging is not yet enabled.
   */
  formProvider: 'mailto',

  /**
   * Optional FormSubmit alias (the random string FormSubmit gives you after activation).
   * When set, it is used instead of your email address in the request URL.
   */
  formsubmitAlias: '',
}

/** Social profiles. `href` must be a full https:// URL; empty entries are not rendered. */
export const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', href: '' },
  { id: 'github', label: 'GitHub', href: '' },
]

/** Only the links that are actually configured. */
export const activeSocialLinks = socialLinks.filter((link) => /^https:\/\//.test(link.href))

/** mailto: URL for the configured email, or null. */
export const emailHref = contact.email ? `mailto:${contact.email}` : null
