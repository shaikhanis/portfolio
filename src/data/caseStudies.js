/**
 * Professional case studies.
 *
 * These describe work contributed as part of the UI development team at Thomas Cook (India) Limited.
 * Wording is deliberately general: no internal systems, APIs, URLs, data, metrics or confidential
 * details. Previews are original illustrations (src/components/CaseStudies/mockups), not screenshots.
 *
 * When editing:
 *  - keep claims to work you personally contributed;
 *  - list only technologies you actually used on that project;
 *  - never add figures (traffic, revenue, conversion) unless they are public and yours to share.
 */

export const caseStudyDisclaimer =
  'Professional work contributed as part of the UI development team at Thomas Cook (India) Limited. Previews are original, illustrative recreations — not production screenshots — and contain no company assets or data.'

export const caseStudies = [
  {
    id: 'thomas-cook-holidays',
    index: '01',
    title: 'Thomas Cook – Holiday Experience',
    brand: 'Thomas Cook',
    domain: 'Travel Technology',
    mockup: 'holiday',
    featured: true,
    tags: ['Landing pages', 'Search results', 'Package details', 'Booking'],
    summary:
      'Holiday landing pages, package search results and package detail pages — content-rich, responsive and driven by dynamic data.',
    context:
      'Holiday journeys on the Thomas Cook India website move customers from inspiration on landing pages, to comparing packages in search results, to the full detail of a single package — and on into booking.',
    role: 'UI Developer, as part of the UI development team',
    contribution: [
      'Holiday landing pages.',
      'Holiday search results.',
      'Package detail pages.',
      'Dynamic content interfaces.',
      'Responsive booking experiences.',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive design', 'REST APIs'],
    challenges: [
      'Presenting content-rich package information clearly — on a phone as well as a wide desktop.',
      'Rendering dynamic content that varies in length and completeness without breaking layouts.',
      'Keeping landing, listing and detail pages visually consistent.',
    ],
    highlights: [
      'Translated holiday designs into responsive layouts for mobile, tablet and desktop.',
      'Implemented UI for API-driven package content, including variable-length data.',
      'Built package cards and detail sections that hold up across screen sizes.',
    ],
  },
  {
    id: 'sotc-holidays',
    index: '02',
    title: 'SOTC – Holiday Experience',
    brand: 'SOTC Travel',
    domain: 'Travel Technology',
    mockup: 'destination',
    featured: true,
    tags: ['Destination pages', 'Campaign pages', 'CMS content', 'Packages'],
    summary:
      'Destination pages, campaign landing pages and holiday package interfaces for SOTC, powered by CMS-driven content.',
    context:
      "SOTC Travel's website presents destinations, campaigns and holiday packages. Much of this content is managed through a CMS, so the frontend has to present whatever editors publish — reliably and responsively.",
    role: 'UI Developer, as part of the UI development team',
    contribution: [
      'Destination pages.',
      'Campaign landing pages.',
      'Holiday package interfaces.',
      'CMS-driven dynamic content.',
      'Responsive UI implementation.',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive design', 'CMS integration'],
    challenges: [
      'Layouts that stay robust when CMS content changes in length, imagery or order.',
      'Campaign pages that look polished on every device.',
      'Destination and package pages that stay consistent with the wider site.',
    ],
    highlights: [
      'Implemented CMS-driven sections for destination and campaign pages.',
      'Responsive layouts for holiday package listings and details.',
      'Campaign landing pages implemented from design references.',
    ],
  },
  {
    id: 'hotel-booking',
    index: '03',
    title: 'Hotel Booking Experience',
    brand: 'Thomas Cook (India) Limited',
    domain: 'Travel Technology',
    mockup: 'hotel',
    featured: true,
    tags: ['Landing', 'SRP', 'PDP', 'Rooms & guests', 'Gallery', 'Payment'],
    summary:
      'The hotel journey end to end: landing page, search results, hotel details, room and guest selection, gallery, and booking and payment screens.',
    context:
      'Hotel booking is a multi-step journey: customers search, compare results, explore a property in depth, choose rooms for their party, and complete booking and payment.',
    role: 'UI Developer, as part of the UI development team',
    contribution: [
      'Hotel landing page.',
      'Search Results Page (SRP).',
      'Product Detail Page (PDP).',
      'Room selection.',
      'Guest management.',
      'Hotel gallery.',
      'Booking and payment interfaces.',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive design', 'REST APIs'],
    challenges: [
      'Dense search results that must stay readable and easy to tap on small screens.',
      'Selecting rooms, adults and children for a whole party in one compact control.',
      'Booking and payment screens, where clarity matters most.',
    ],
    highlights: [
      'Implemented SRP and PDP interfaces across breakpoints.',
      'Built room-selection and guest-management UI.',
      'Implemented a responsive hotel gallery.',
      'Implemented booking and payment interface screens.',
    ],
  },
  {
    id: 'flight-booking',
    index: '04',
    title: 'Flight Booking Experience',
    brand: 'Thomas Cook (India) Limited',
    domain: 'Travel Technology',
    mockup: 'flight',
    featured: false,
    tags: ['Flight search', 'Selection UI', 'Components'],
    summary: 'Flight search and selection interfaces, built as responsive frontend components.',
    context:
      'Flight booking starts with a search form and quickly moves to comparing options. Route, dates and travellers need to be fast to enter, and results easy to scan.',
    role: 'UI Developer, as part of the UI development team',
    contribution: ['Flight search interface.', 'Search and selection UI.', 'Responsive frontend components.'],
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive design', 'REST APIs'],
    challenges: [
      'Fitting a multi-field search form — route, dates, travellers — onto small screens without losing usability.',
      'Making search and selection states clear at a glance.',
    ],
    highlights: [
      'Implemented the flight search interface for mobile and desktop.',
      'Built search and selection UI.',
      'Built responsive frontend components for the flight journey.',
    ],
  },
  {
    id: 'forex-gift-cards',
    index: '05',
    title: 'Forex and Gift Cards',
    brand: 'Thomas Cook (India) Limited',
    domain: 'Financial and Travel Services',
    mockup: 'forex',
    featured: false,
    tags: ['Landing interfaces', 'Forms', 'Components'],
    summary:
      'Product landing interfaces, customer interaction forms and responsive UI components for forex and gift card products.',
    context:
      'Forex and gift cards sit alongside travel products. Customers learn about each product on its landing page and get in touch through forms.',
    role: 'UI Developer, as part of the UI development team',
    contribution: ['Product landing interfaces.', 'Customer interaction forms.', 'Responsive UI components.'],
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive design'],
    challenges: [
      'Explaining financial products clearly on landing pages.',
      'Forms that are easy to complete on mobile, with clear inputs and feedback.',
    ],
    highlights: [
      'Implemented product landing interfaces for forex and gift cards.',
      'Built customer interaction forms.',
      'Built responsive UI components for both products.',
    ],
  },
  {
    id: 'travel-insurance',
    index: '06',
    title: 'Travel Insurance',
    brand: 'Thomas Cook (India) Limited',
    domain: 'Insurance Technology',
    mockup: 'insurance',
    featured: false,
    tags: ['Product interfaces', 'Customer journeys', 'Components'],
    summary: 'Insurance product interfaces and customer-facing journeys, built with responsive components.',
    context:
      'Travel insurance is offered alongside trips. Its interfaces need to explain the product and guide customers through the journey with confidence.',
    role: 'UI Developer, as part of the UI development team',
    contribution: ['Insurance product interfaces.', 'Customer-facing journeys.', 'Responsive components.'],
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive design'],
    challenges: [
      'Presenting product details so they are easy to compare and understand.',
      'Keeping multi-step journeys consistent on every screen size.',
    ],
    highlights: [
      'Implemented insurance product interfaces.',
      'Built responsive components for customer-facing insurance journeys.',
    ],
  },
  {
    id: 'my-account',
    index: '07',
    title: 'My Account',
    brand: 'Thomas Cook (India) Limited',
    domain: 'Customer Experience',
    mockup: 'account',
    featured: false,
    tags: ['Authentication', 'OTP', 'Account'],
    summary: 'Authentication interfaces, OTP interaction UI and account-related frontend functionality.',
    context:
      'My Account is where customers sign in and manage their account. Sign-in screens are often a customer’s first interaction with a product, so they need to be quick, clear and trustworthy.',
    role: 'UI Developer, as part of the UI development team',
    contribution: ['Authentication interfaces.', 'OTP interaction UI.', 'Account-related frontend functionality.'],
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive design', 'REST APIs'],
    challenges: [
      'Making OTP entry quick and forgiving on mobile keyboards.',
      'Clear feedback for errors and expired codes during sign-in.',
    ],
    highlights: [
      'Implemented authentication and OTP interaction screens.',
      'Built account-related frontend functionality.',
      'Responsive layouts for account pages.',
    ],
  },
]
