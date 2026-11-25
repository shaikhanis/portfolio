import AccountMockup from './AccountMockup.jsx'
import DestinationMockup from './DestinationMockup.jsx'
import FlightMockup from './FlightMockup.jsx'
import ForexMockup from './ForexMockup.jsx'
import HolidayMockup from './HolidayMockup.jsx'
import HotelMockup from './HotelMockup.jsx'
import InsuranceMockup from './InsuranceMockup.jsx'

/**
 * Registry: caseStudies[].mockup → illustration component.
 * Every component accepts `{ label }` — the accessible description of the illustration.
 */
export const mockups = {
  holiday: HolidayMockup,
  destination: DestinationMockup,
  hotel: HotelMockup,
  flight: FlightMockup,
  forex: ForexMockup,
  insurance: InsuranceMockup,
  account: AccountMockup,
}

/** Accessible descriptions for each illustration. */
export const mockupLabels = {
  holiday: 'Illustration of a holiday package search: a desktop results page with package cards and filters, and the same journey on a phone.',
  destination: 'Illustration of a destination page with a hero banner, CMS-driven content blocks and package cards, shown on desktop and phone.',
  hotel: 'Illustration of a hotel booking journey: search results with filters on desktop, and a room and guest selector on a phone.',
  flight: 'Illustration of a flight search form with route, dates and travellers, and a list of flight options, on desktop and phone.',
  forex: 'Illustration of a forex currency converter and gift card designs, with a customer enquiry form on a phone.',
  insurance: 'Illustration of travel insurance plan cards compared side by side, and a step-by-step journey on a phone.',
  account: 'Illustration of a sign-in screen with a six-digit one-time password input and resend timer, on desktop and phone.',
}
