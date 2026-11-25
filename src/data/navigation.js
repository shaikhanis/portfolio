/**
 * Primary navigation. `sections` lists the page section ids that make an item "active"
 * while scrolling, so sub-sections (e.g. Approach, Resume) highlight their parent item.
 */
export const navItems = [
  { id: 'home', label: 'Home', href: '#home', sections: ['home'] },
  { id: 'about', label: 'About', href: '#about', sections: ['about'] },
  { id: 'experience', label: 'Experience', href: '#experience', sections: ['experience'] },
  { id: 'expertise', label: 'Expertise', href: '#expertise', sections: ['expertise', 'approach'] },
  { id: 'projects', label: 'Projects', href: '#projects', sections: ['projects', 'personal-projects'] },
  { id: 'contact', label: 'Contact', href: '#contact', sections: ['resume', 'contact'] },
]

export const navCta = { label: "Let's Talk", href: '#contact' }

/** Page sections in document order, with their visible index numbers. */
export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About', index: '01' },
  { id: 'experience', label: 'Experience', index: '02' },
  { id: 'expertise', label: 'Expertise', index: '03' },
  { id: 'approach', label: 'Approach', index: '04' },
  { id: 'projects', label: 'Selected Work', index: '05' },
  { id: 'personal-projects', label: 'Personal Projects', index: '06' },
  { id: 'resume', label: 'Resume', index: '07' },
  { id: 'contact', label: 'Contact', index: '08' },
]

export const sectionIds = sections.map((section) => section.id)

/** Looks up a section's index/label, e.g. sectionMeta('about') → { index: '01', label: 'About' } */
export function sectionMeta(id) {
  return sections.find((section) => section.id === id) ?? { id, label: id }
}
