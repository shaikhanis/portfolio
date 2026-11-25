import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  CalendarDays,
  Search,
  SlidersHorizontal,
  UserRound,
  Users,
} from 'lucide-react'
import { cx } from '../../../utils/cx.js'
import { Box, Btn, DuoLayout, MockStage, Sk } from './MockKit.jsx'
import s from './FlightMockup.module.css'

const TRIP_TYPES = ['One way', 'Round trip', 'Multi-city']
const SORTS = ['Cheapest', 'Fastest', 'Best']

/** Illustrative options: neutral carrier monograms and generic times — not real schedules. */
const FLIGHTS = [
  { carrier: 'XY', depart: '06:10', arrive: '08:20', duration: '2h 10m', stops: 0 },
  { carrier: 'MN', depart: '09:45', arrive: '12:05', duration: '2h 20m', stops: 0 },
  { carrier: 'RT', depart: '13:30', arrive: '17:55', duration: '4h 25m', stops: 1 },
]

const DATES = [
  { day: 'Mon', date: '13' },
  { day: 'Tue', date: '14', active: true },
  { day: 'Wed', date: '15' },
  { day: 'Thu', date: '16' },
  { day: 'Fri', date: '17' },
]

/**
 * Flight booking illustration. Desktop: search form (route swap is the one accent) above results.
 * Phone: results with a date strip and sort tabs; the selected option carries the accent rule.
 */
export default function FlightMockup({ label }) {
  return (
    <MockStage label={label}>
      <DuoLayout address="/flights/search" desktop={<DesktopSearch />} mobile={<MobileResults />} />
    </MockStage>
  )
}

function DesktopSearch() {
  return (
    <div className={s.page}>
      <SiteBar />
      <div className={s.content}>
        <SearchForm />
        <div className={s.resultsHead}>
          <span className={s.resultsTitle}>
            Departing flights
            <Sk w={56} h={7} />
          </span>
          <span className={s.filterChip}>
            <SlidersHorizontal size={13} strokeWidth={2} />
            Filters
          </span>
        </div>
        <div className={s.results}>
          {FLIGHTS.map((flight) => (
            <ResultRow key={flight.carrier} flight={flight} />
          ))}
        </div>
      </div>
    </div>
  )
}

/** Generic site bar: neutral mark, skeleton navigation with the current section named. */
function SiteBar() {
  return (
    <div className={s.siteBar}>
      <span className={s.brand}>
        <span className={s.mark} />
        <Sk w={62} h={9} tone="strong" />
      </span>
      <span className={s.nav}>
        <Sk w={46} h={7} />
        <span className={s.navCurrent}>Flights</span>
        <Sk w={40} h={7} />
        <Sk w={52} h={7} />
        <Sk w={36} h={7} />
      </span>
      <span className={s.barEnd}>
        <Sk w={54} h={7} />
        <span className={s.iconChip}>
          <UserRound size={14} strokeWidth={2} />
        </span>
      </span>
    </div>
  )
}

function SearchForm() {
  return (
    <Box className={s.searchCard}>
      <div className={s.segmented}>
        {TRIP_TYPES.map((type) => (
          <span key={type} className={cx(s.segment, type === 'Round trip' && s.segmentActive)}>
            {type}
          </span>
        ))}
      </div>

      <div className={s.fields}>
        <div className={s.route}>
          <Field label="From" meta={<Sk w={72} h={7} />}>
            <span className={s.code}>BOM</span>
          </Field>
          <Field label="To" meta={<Sk w={60} h={7} />}>
            <span className={s.code}>DEL</span>
          </Field>
          <span className={s.swap}>
            <ArrowLeftRight size={15} strokeWidth={2.25} />
          </span>
        </div>
        <Field label="Depart" meta={<Sk w={38} h={6} />}>
          <CalendarDays size={15} strokeWidth={2} />
          <Sk w={58} h={9} tone="strong" />
        </Field>
        <Field label="Return" meta={<Sk w={42} h={6} />}>
          <CalendarDays size={15} strokeWidth={2} />
          <Sk w={58} h={9} tone="strong" />
        </Field>
        <Field label="Travellers & class" meta={<span className={s.metaText}>Economy</span>}>
          <Users size={15} strokeWidth={2} />
          <span className={s.valueText}>1 Adult</span>
        </Field>
      </div>

      <Btn variant="ghost" className={s.searchBtn}>
        <Search size={16} strokeWidth={2.25} />
        Search flights
      </Btn>
    </Box>
  )
}

/** One cell of the search form: mono label, primary value, muted secondary line. */
function Field({ label, meta, children }) {
  return (
    <div className={s.cell}>
      <span className={s.cellLabel}>{label}</span>
      <span className={s.cellValue}>{children}</span>
      <span className={s.cellMeta}>{meta}</span>
    </div>
  )
}

function ResultRow({ flight }) {
  return (
    <Box className={s.result}>
      <span className={s.carrier}>
        <span className={s.monogram}>{flight.carrier}</span>
        <span className={s.stack}>
          <Sk w={76} h={8} tone="strong" />
          <Sk w={46} h={6} />
        </span>
      </span>
      <TimePoint time={flight.depart} code="BOM" />
      <Track duration={flight.duration} stops={flight.stops} />
      <TimePoint time={flight.arrive} code="DEL" end />
      <span className={s.price}>
        <span className={s.priceValue}>
          ₹<Sk w={54} h={10} tone="strong" />
        </span>
        <Sk w={40} h={6} />
      </span>
      <Btn variant="outline" className={s.selectBtn}>
        Select
      </Btn>
    </Box>
  )
}

function TimePoint({ time, code, end = false }) {
  return (
    <span className={cx(s.time, end && s.timeEnd)}>
      <span className={s.clock}>{time}</span>
      <span className={s.airport}>{code}</span>
    </span>
  )
}

/** Duration line between departure and arrival — filled dots at the ends, a hollow dot per stop. */
function Track({ duration, stops }) {
  return (
    <span className={s.track}>
      <span className={s.trackMeta}>{duration}</span>
      <span className={s.trackLine}>{stops > 0 && <i className={s.stopDot} />}</span>
      <span className={s.trackMeta}>{stops > 0 ? `${stops} stop` : 'Non-stop'}</span>
    </span>
  )
}

function MobileResults() {
  return (
    <div className={s.app}>
      <div className={s.appBar}>
        <span className={s.iconBtn}>
          <ArrowLeft size={17} strokeWidth={2} />
        </span>
        <span className={s.appTitle}>
          <span className={s.appRoute}>
            BOM
            <ArrowRight size={12} strokeWidth={2.25} />
            DEL
          </span>
          <Sk w={88} h={6} />
        </span>
        <span className={s.iconBtn}>
          <SlidersHorizontal size={15} strokeWidth={2} />
        </span>
      </div>

      <div className={s.dateStrip}>
        {DATES.map((d) => (
          <span key={d.date} className={cx(s.date, d.active && s.dateActive)}>
            <span className={s.dateDay}>{d.day}</span>
            <span className={s.dateNum}>{d.date}</span>
          </span>
        ))}
      </div>

      <div className={s.tabs}>
        {SORTS.map((sort, i) => (
          <span key={sort} className={cx(s.tab, i === 0 && s.tabActive)}>
            {sort}
          </span>
        ))}
      </div>

      <div className={s.list}>
        {FLIGHTS.map((flight, i) => (
          <MobileCard key={flight.carrier} flight={flight} selected={i === 0} />
        ))}
      </div>
    </div>
  )
}

function MobileCard({ flight, selected }) {
  return (
    <Box className={cx(s.mCard, selected && s.mCardSelected)}>
      <span className={s.mTop}>
        <span className={s.mMonogram}>{flight.carrier}</span>
        <Sk w={64} h={7} tone="strong" />
        <span className={s.mPrice}>
          ₹<Sk w={40} h={9} tone="strong" />
        </span>
      </span>
      <span className={s.mTimes}>
        <TimePoint time={flight.depart} code="BOM" />
        <Track duration={flight.duration} stops={flight.stops} />
        <TimePoint time={flight.arrive} code="DEL" end />
      </span>
    </Box>
  )
}
