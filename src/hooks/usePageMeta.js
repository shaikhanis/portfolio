import { useEffect } from 'react'
import { SITE_URL } from '../config/site.js'

function setMeta(selector, attribute, value) {
  const element = document.querySelector(selector)
  if (!element || value == null) return () => {}
  const previous = element.getAttribute(attribute)
  element.setAttribute(attribute, value)
  return () => {
    if (previous == null) element.removeAttribute(attribute)
    else element.setAttribute(attribute, previous)
  }
}

/**
 * Updates the document title, meta description and canonical URL for the current page,
 * restoring the previous values on unmount. Static defaults live in index.html.
 *
 * @param {{ title?: string, description?: string, path?: string }} meta
 */
export function usePageMeta({ title, description, path } = {}) {
  useEffect(() => {
    const previousTitle = document.title
    if (title) document.title = title
    const restoreDescription = setMeta('meta[name="description"]', 'content', description)
    const restoreCanonical = path ? setMeta('link[rel="canonical"]', 'href', `${SITE_URL}${path}`) : () => {}

    return () => {
      document.title = previousTitle
      restoreDescription()
      restoreCanonical()
    }
  }, [title, description, path])
}
