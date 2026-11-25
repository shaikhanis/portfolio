/**
 * Technical expertise.
 *
 * Every skill carries an honest proficiency level — no percentages:
 *  - 'professional' → used in production work
 *  - 'practical'    → hands-on experience from projects, growing depth
 *  - 'learning'     → currently being studied
 *
 * Review the levels for Vue.js 3 and Angular: if you have used them in production work,
 * change them to 'professional'.
 */
export const skillLevels = {
  professional: { label: 'Professional', description: 'Used in production work' },
  practical: { label: 'Hands-on', description: 'Applied in projects, growing depth' },
  learning: { label: 'Learning', description: 'Currently studying' },
}

export const skillGroups = [
  {
    id: 'core',
    title: 'Core Frontend',
    blurb: 'The foundation under every interface I build.',
    skills: [
      { name: 'HTML5', level: 'professional' },
      { name: 'CSS3', level: 'professional' },
      { name: 'JavaScript (ES6+)', level: 'professional' },
      { name: 'Responsive Design', level: 'professional' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    blurb: 'React is my current focus, strengthened through hands-on projects like this site.',
    skills: [
      { name: 'React.js', level: 'practical', note: 'Actively strengthening' },
      { name: 'Vue.js 3', level: 'practical' },
      { name: 'Angular', level: 'practical' },
    ],
  },
  {
    id: 'ui',
    title: 'UI Development',
    blurb: 'Turning design references into consistent, maintainable UI.',
    skills: [
      { name: 'Bootstrap 5', level: 'professional' },
      { name: 'jQuery', level: 'professional' },
      { name: 'CSS Architecture', level: 'professional' },
    ],
  },
  {
    id: 'react',
    title: 'React Ecosystem',
    blurb: 'Patterns applied while building this portfolio and its demo projects.',
    skills: [
      { name: 'React Hooks', level: 'practical' },
      { name: 'Component Architecture', level: 'practical' },
      { name: 'React Router', level: 'practical' },
      { name: 'Context API', level: 'practical' },
      { name: 'Redux Toolkit', level: 'learning' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    blurb: 'Everyday tooling for version control, editing and debugging.',
    skills: [
      { name: 'Git', level: 'professional' },
      { name: 'GitLab', level: 'professional' },
      { name: 'VS Code', level: 'professional' },
      { name: 'Chrome DevTools', level: 'professional' },
    ],
  },
  {
    id: 'integration',
    title: 'Integration',
    blurb: 'Connecting interfaces to real data and content.',
    skills: [
      { name: 'REST APIs', level: 'professional' },
      { name: 'Dynamic Content', level: 'professional' },
      { name: 'CMS Integration', level: 'professional' },
    ],
  },
]
