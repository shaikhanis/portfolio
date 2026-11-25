/**
 * Professional experience, most recent first.
 *
 * Dates: `startDate` / `endDate` are optional, free-text (e.g. 'Jun 2023'). When `startDate`
 * is empty the timeline shows the `duration` label instead, so nothing invented is displayed.
 * Leave `endDate` empty for a current role — it renders as "Present".
 */
export const experience = [
  {
    id: 'thomas-cook',
    company: 'Thomas Cook (India) Limited',
    brands: ['Thomas Cook', 'SOTC Travel'],
    role: 'Assistant Manager – UI Development',
    duration: '2.5+ years',
    current: true,
    startDate: '',
    endDate: '',
    summary:
      'Frontend UI development for customer-facing journeys across the Thomas Cook and SOTC Travel digital platforms — from landing pages to search, detail, booking and payment interfaces.',
    domains: ['Holidays', 'Hotels', 'Flights', 'Forex', 'Gift Cards', 'Travel Insurance', 'My Account'],
    responsibilityGroups: [
      {
        title: 'Build',
        items: [
          'Frontend UI development across multiple travel business domains.',
          'Responsive landing pages and customer-facing interfaces.',
          'Holiday, hotel, flight, forex, gift card and insurance experiences.',
          'Hotel Search Results (SRP) and Product Detail Pages (PDP).',
          'Payment and booking interface implementation.',
        ],
      },
      {
        title: 'Integrate',
        items: ['API-driven dynamic content integration.', 'CMS-based frontend development.'],
      },
      {
        title: 'Refine',
        items: [
          'UI debugging and optimization.',
          'Responsive implementation across mobile, tablet and desktop.',
        ],
      },
      {
        title: 'Collaborate & release',
        items: [
          'Collaboration with design, backend, QA and business teams.',
          'Working across DEV, SIT, UAT and PROD release workflows.',
        ],
      },
    ],
    releaseFlow: ['DEV', 'SIT', 'UAT', 'PROD'],
  },
  {
    id: 'netcom',
    company: 'Netcom Business Solutions',
    brands: [],
    role: 'Frontend Developer Trainee',
    duration: '1 year',
    current: false,
    startDate: '',
    endDate: '',
    summary:
      'Where my frontend foundations were built — implementing responsive websites from design references with HTML, CSS, JavaScript and Bootstrap.',
    domains: [],
    responsibilityGroups: [
      {
        title: 'Foundations',
        items: [
          'Frontend development fundamentals.',
          'HTML, CSS, JavaScript and Bootstrap.',
          'Responsive website development.',
          'UI implementation from design references.',
          'Frontend debugging and browser compatibility.',
        ],
      },
    ],
    releaseFlow: [],
  },
]
