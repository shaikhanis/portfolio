import {
  ArrowLeft,
  ArrowUpDown,
  BedDouble,
  Calendar,
  Camera,
  ChevronDown,
  Heart,
  MapPin,
  Plane,
  Search,
  Share2,
  SlidersHorizontal,
  Users,
  Utensils,
} from 'lucide-react'
import { cx } from '../../../utils/cx.js'
import { Btn, DuoLayout, LogoGlyph, MockStage, Pill, Rule, Scene, Sk, Stars } from './MockKit.jsx'
import s from './HolidayMockup.module.css'

/*
 * Illustrative holiday journey. Desktop: package search results — the accent is the Search action.
 * Phone: a package detail page with a day-wise itinerary — the accent is "Book now".
 * Content is skeletons plus generic UI labels only (no brands, places or prices).
 */

const SEARCH_FIELDS = [
  { id: 'destination', icon: MapPin, label: 'Destination', value: 148, wide: true },
  { id: 'month', icon: Calendar, label: 'Month', value: 64 },
  { id: 'travellers', icon: Users, label: 'Travellers', value: 72 },
]

const FILTERS = ['Duration', 'Budget', 'Theme']

const INCLUSIONS = [
  { id: 'flights', icon: Plane },
  { id: 'stay', icon: BedDouble },
  { id: 'meals', icon: Utensils },
  { id: 'sightseeing', icon: Camera },
]

/** Six cards: the second row sits below the fold, so the results read as a scrolling list. */
const PACKAGES = [
  { id: 'p1', scene: 'coast', title: ['86%', '52%'], where: 92 },
  { id: 'p2', scene: 'mountains', title: ['90%', '60%'], where: 76 },
  { id: 'p3', scene: 'resort', title: ['80%', '46%'], where: 100 },
  { id: 'p4', scene: 'dunes', title: ['84%', '58%'], where: 84 },
  { id: 'p5', scene: 'city', title: ['88%', '50%'], where: 70 },
  { id: 'p6', scene: 'coast', title: ['82%', '56%'], where: 96 },
]

const ITINERARY = [
  { day: 1, title: 128, note: 92 },
  { day: 2, title: 112, note: 104 },
  { day: 3, title: 136, note: 80 },
  { day: 4, title: 104, note: 96 },
]

/** "6N / 7D" — nights / days, the one piece of real-looking package data. */
function DurationBadge({ className }) {
  return <span className={cx(s.duration, className)}>6N / 7D</span>
}

function TopBar() {
  return (
    <div className={s.topBar}>
      <span className={s.brand}>
        <LogoGlyph size={22} />
        <Sk w={58} h={8} tone="strong" />
      </span>
      <span className={s.nav}>
        <Sk w={46} h={7} tone="strong" />
        <Sk w={40} h={7} />
        <Sk w={52} h={7} />
        <Sk w={36} h={7} />
      </span>
      <span className={s.topActions}>
        <Heart size={16} strokeWidth={1.75} />
        <span className={s.avatar} />
      </span>
    </div>
  )
}

function SearchStrip() {
  return (
    <div className={s.search}>
      {SEARCH_FIELDS.map(({ id, icon: Icon, label, value, wide }) => (
        <span key={id} className={cx(s.field, wide && s.fieldWide)}>
          <Icon size={16} strokeWidth={1.75} />
          <span className={s.fieldText}>
            <span className={s.fieldLabel}>{label}</span>
            <Sk w={value} h={9} tone="strong" />
          </span>
        </span>
      ))}
      <Btn className={s.searchBtn}>
        <Search size={16} strokeWidth={2.25} />
        Search
      </Btn>
    </div>
  )
}

function Toolbar() {
  return (
    <div className={s.toolbar}>
      <span className={s.filters}>
        <Pill>
          <SlidersHorizontal size={13} strokeWidth={1.75} />
          Filters
        </Pill>
        {FILTERS.map((filter) => (
          <Pill key={filter}>
            {filter}
            <ChevronDown size={13} strokeWidth={1.75} />
          </Pill>
        ))}
      </span>
      <span className={s.sort}>
        <ArrowUpDown size={13} strokeWidth={1.75} />
        Sort
        <strong>Popular</strong>
        <ChevronDown size={13} strokeWidth={1.75} />
      </span>
    </div>
  )
}

function PackageCard({ scene, title, where }) {
  return (
    <div className={s.card}>
      <Scene variant={scene} className={s.media}>
        <DurationBadge className={s.mediaBadge} />
        <span className={s.save}>
          <Heart size={13} strokeWidth={2} />
        </span>
      </Scene>
      <div className={s.cardBody}>
        <span className={s.cardTitle}>
          <Sk w={title[0]} h={10} tone="strong" />
          <Sk w={title[1]} h={10} tone="strong" />
        </span>
        <span className={s.where}>
          <MapPin size={12} strokeWidth={1.75} />
          <Sk w={where} h={7} />
        </span>
        <span className={s.inclusions}>
          {INCLUSIONS.map(({ id, icon: Icon }) => (
            <span key={id} className={s.inclusion}>
              <Icon size={14} strokeWidth={1.75} />
            </span>
          ))}
        </span>
        <span className={s.priceRow}>
          <span className={s.price}>
            <span className={s.amount}>
              ₹<Sk w={58} h={11} tone="strong" />
            </span>
            <span className={s.per}>per person</span>
          </span>
          <Btn variant="outline" className={s.viewBtn}>
            View details
          </Btn>
        </span>
      </div>
    </div>
  )
}

function SearchResults() {
  return (
    <div className={s.results}>
      <TopBar />
      <div className={s.main}>
        <SearchStrip />
        <Toolbar />
        <div className={s.cards}>
          {PACKAGES.map(({ id, ...pkg }) => (
            <PackageCard key={id} {...pkg} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PackageDetail() {
  return (
    <div className={s.detail}>
      <Scene variant="mountains" className={s.hero}>
        <span className={s.heroBar}>
          <span className={s.round}>
            <ArrowLeft size={15} strokeWidth={2} />
          </span>
          <span className={s.heroActions}>
            <span className={s.round}>
              <Share2 size={13} strokeWidth={2} />
            </span>
            <span className={s.round}>
              <Heart size={13} strokeWidth={2} />
            </span>
          </span>
        </span>
        <DurationBadge className={s.heroBadge} />
        <span className={s.carousel}>
          <i />
          <i />
          <i />
          <i />
        </span>
      </Scene>

      <div className={s.detailBody}>
        <span className={s.detailTitle}>
          <Sk w="94%" h={12} tone="strong" />
          <Sk w="58%" h={12} tone="strong" />
        </span>
        <span className={s.detailMeta}>
          <Stars count={4} size={11} />
          <Sk w={30} h={7} />
          <span className={s.metaDot} />
          <MapPin size={12} strokeWidth={1.75} />
          <Sk w={60} h={7} />
        </span>
        <Rule />
        <span className={s.itineraryHead}>
          Itinerary
          <span className={s.itineraryHint}>Day-wise</span>
        </span>
        <ol className={s.timeline}>
          {ITINERARY.map(({ day, title, note }) => (
            <li key={day} className={s.day}>
              <span className={cx(s.dayDot, day === 1 && s.dayDotStart)} />
              <span className={s.dayLabel}>Day {day}</span>
              <span className={s.dayText}>
                <Sk w={title} h={8} tone="strong" />
                <Sk w={note} h={6} />
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className={s.bookBar}>
        <span className={s.price}>
          <span className={s.amount}>
            ₹<Sk w={64} h={12} tone="strong" />
          </span>
          <span className={s.per}>per person</span>
        </span>
        <Btn className={s.bookBtn}>Book now</Btn>
      </div>
    </div>
  )
}

export default function HolidayMockup({ label }) {
  return (
    <MockStage label={label}>
      <DuoLayout address="/holidays/search" desktop={<SearchResults />} mobile={<PackageDetail />} />
    </MockStage>
  )
}
