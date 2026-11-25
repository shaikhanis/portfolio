/**
 * Core profile content.
 * Everything in this file is rendered on the page — keep it factual.
 * Contact details and social profiles live in ./socialLinks.js.
 */

export const profile = {
  name: 'Shaikh Anis',
  firstName: 'Anis',
  /** Wordmark text. Rendered as "ANIS." with an accent-coloured full stop. */
  logo: 'ANIS',
  designation: 'Frontend Developer / UI Engineer',
  roles: ['Frontend Developer', 'UI Engineer', 'React.js Developer'],
  experienceYears: '3.5+',
  /** Optional, e.g. 'Mumbai, India'. Hidden everywhere while empty. */
  location: '',
  /** Short availability line shown in the hero and contact section. */
  availability: 'Open to frontend engineering opportunities',
  current: {
    title: 'Assistant Manager – UI Development',
    company: 'Thomas Cook (India) Limited',
    brands: ['Thomas Cook', 'SOTC Travel'],
  },
  /**
   * URL of this portfolio's GitHub repository, e.g. 'https://github.com/<username>/shaikh-anis-portfolio'.
   * "View source" links stay hidden until this is set.
   */
  repositoryUrl: '',
}

export const hero = {
  eyebrow: "Hello, I'm Shaikh Anis",
  headline: {
    lead: 'I Build Digital Experiences That Make an',
    emphasis: 'Impact.',
  },
  summary:
    'Frontend Developer with 3.5+ years of experience building responsive, user-focused digital experiences across enterprise travel platforms. Currently expanding my expertise in modern React.js development.',
  designation: 'Frontend Developer / UI Engineer',
  /** Small technology indicators shown in the hero. */
  technologies: ['JavaScript ES6+', 'React.js', 'HTML5 & CSS3', 'Bootstrap 5', 'REST APIs'],
  /** Facts derived directly from the profile — no invented metrics. */
  stats: [
    { value: '3.5+', label: 'Years of frontend experience' },
    { value: '7', label: 'Product areas worked across' },
    { value: '2', label: 'Brands: Thomas Cook & SOTC' },
  ],
  cta: {
    primary: { label: 'Explore My Work', href: '#projects' },
    resume: { label: 'Download Resume', fallbackLabel: 'Request Resume' },
    connect: { label: "Let's Connect", href: '#contact' },
  },
}

export const about = {
  title: 'From complex designs to intuitive, responsive interfaces.',
  paragraphs: [
    "I'm a frontend developer with 3.5+ years of experience building responsive, customer-facing web applications.",
    'My journey started at Netcom Business Solutions, where I developed my frontend development fundamentals. I then joined Thomas Cook (India) Limited, contributing to the digital experiences of Thomas Cook and SOTC.',
    "Over the years, I've worked across multiple business verticals, including holidays, hotels, flights, forex, gift cards, travel insurance, and customer account experiences.",
    "Currently, I'm strengthening my React.js expertise and focusing on modern frontend engineering practices.",
  ],
  /** Pull quote — taken verbatim from the About copy. */
  quote: 'I enjoy transforming complex UI designs into intuitive, accessible, and responsive digital experiences.',
  facts: [
    { label: 'Current role', value: 'Assistant Manager – UI Development' },
    { label: 'Company', value: 'Thomas Cook (India) Limited' },
    { label: 'Brands', value: 'Thomas Cook · SOTC Travel' },
    { label: 'Experience', value: '3.5+ years in frontend development' },
    { label: 'Now learning', value: 'Modern React.js engineering' },
  ],
  verticals: ['Holidays', 'Hotels', 'Flights', 'Forex', 'Gift Cards', 'Travel Insurance', 'My Account'],
}
