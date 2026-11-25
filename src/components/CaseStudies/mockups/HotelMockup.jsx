import { BedDouble, CalendarDays, MapPin, Users } from 'lucide-react'
import { Box, Btn, DuoLayout, Label, LogoGlyph, MockStage, Pill, Scene, Sk, SkLines, Stars } from './MockKit.jsx'
import s from './ProductMockups.module.css'

/** Original, brand-free hotel search and stay selection illustration. */
export default function HotelMockup({ label }) {
  return (
    <MockStage label={label}>
      <DuoLayout
        address="/hotels/search"
        desktop={<HotelDesktop />}
        mobile={<HotelMobile />}
      />
    </MockStage>
  )
}

function HotelDesktop() {
  return (
    <div className={s.site}>
      <header className={s.topbar}>
        <span className={s.brand}><LogoGlyph /><Sk w={60} h={8} tone="strong" /></span>
        <span className={s.siteNav}><Label>Stays</Label><Label>Experiences</Label><Label>Help</Label></span>
        <Pill><Users size={12} /> Sign in</Pill>
      </header>
      <div className={s.content}>
        <div className={s.title}><Label tone="muted">A better stay starts here</Label><Sk w={245} h={15} tone="strong" /></div>
        <div className={s.search}>
          <span className={s.searchItem}><span className={s.searchLabel}>Destination</span><span className={s.searchValue}><MapPin size={13} /><Sk w={78} h={8} /></span></span>
          <span className={s.searchItem}><span className={s.searchLabel}>Check-in / out</span><span className={s.searchValue}><CalendarDays size={13} /><Sk w={68} h={8} /></span></span>
          <span className={s.searchItem}><span className={s.searchLabel}>Guests</span><span className={s.searchValue}><Users size={13} /><Sk w={45} h={8} /></span></span>
          <Btn>Search stays</Btn>
        </div>
        <div className={s.compactRow}><Label>Places that fit your trip</Label><Pill>Filters</Pill></div>
        <div className={s.resultGrid}>
          {['resort', 'city', 'coast'].map((scene, index) => (
            <article className={s.resultCard} key={scene}>
              <Scene variant={scene} className={s.resultImage} />
              <div className={s.resultBody}>
                <span className={s.meta}><Stars count={4} size={8} /> STAY OPTION 0{index + 1}</span>
                <span className={s.cardTitle}><Sk w="86%" h={8} tone="strong" /><Sk w="55%" h={6} /></span>
                <span className={s.cardPrice}><span className={s.meta}><BedDouble size={12} /> Room choices</span><Sk w={44} h={8} tone="strong" /></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

function HotelMobile() {
  return (
    <div className={s.mobile}>
      <header className={s.mobileHead}><span className={s.brand}><LogoGlyph size={18} /><Sk w={42} h={7} tone="strong" /></span><Pill>Filters</Pill></header>
      <div className={s.mobileBody}>
        <div className={s.mobileTitle}><Label>Choose your stay</Label><Sk w="90%" h={10} tone="strong" /></div>
        <Scene variant="resort" className={s.mobileScene} />
        <Box className={s.mobilePanel}>
          <span className={s.searchValue}><MapPin size={13} /><Sk w={90} h={7} /></span>
          <span className={s.searchValue}><CalendarDays size={13} /><Sk w={108} h={7} /></span>
          <span className={s.searchValue}><Users size={13} /><Sk w={72} h={7} /></span>
          <Btn>Select rooms</Btn>
        </Box>
        <div className={s.compactRow}><Label>Room selection</Label><Sk w={42} h={6} /></div>
        <Box className={s.mobilePanel}><Sk w="72%" h={8} tone="strong" /><SkLines lines={[90, 72]} h={6} /></Box>
      </div>
    </div>
  )
}
