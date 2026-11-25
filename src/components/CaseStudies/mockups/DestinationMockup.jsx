import { CalendarDays, MapPin, Search, Users } from 'lucide-react'
import { Box, Btn, DuoLayout, Label, LogoGlyph, MockStage, Pill, Scene, Sk, SkLines } from './MockKit.jsx'
import s from './ProductMockups.module.css'

/** Original, brand-free destination discovery interface illustration. */
export default function DestinationMockup({ label }) {
  return (
    <MockStage label={label}>
      <DuoLayout
        address="/destinations"
        desktop={<DestinationDesktop />}
        mobile={<DestinationMobile />}
      />
    </MockStage>
  )
}

function DestinationDesktop() {
  return (
    <div className={s.site}>
      <header className={s.topbar}>
        <span className={s.brand}><LogoGlyph /><Sk w={64} h={8} tone="strong" /></span>
        <span className={s.siteNav}><Label>Explore</Label><Label>Inspiration</Label><Label>Offers</Label></span>
        <Pill><Users size={12} /> Account</Pill>
      </header>
      <div className={s.content}>
        <Scene variant="coast" className={s.hero}>
          <span className={s.heroCaption}>
            <Label tone="strong">Find your next escape</Label>
            <Sk w="85%" h={12} tone="strong" />
            <Sk w="58%" h={8} />
          </span>
        </Scene>
        <div className={s.search}>
          <span className={s.searchItem}><span className={s.searchLabel}>Destination</span><span className={s.searchValue}><MapPin size={13} /><Sk w={90} h={8} /></span></span>
          <span className={s.searchItem}><span className={s.searchLabel}>Travel dates</span><span className={s.searchValue}><CalendarDays size={13} /><Sk w={70} h={8} /></span></span>
          <span className={s.searchItem}><span className={s.searchLabel}>Travellers</span><span className={s.searchValue}><Users size={13} /><Sk w={52} h={8} /></span></span>
          <Btn><Search size={14} /> Explore</Btn>
        </div>
        <div className={s.title}><Label tone="muted">Ideas for your next journey</Label><Sk w={220} h={13} tone="strong" /></div>
        <div className={s.resultGrid}>
          {['mountains', 'city', 'resort'].map((scene, index) => (
            <Box className={s.resultCard} key={scene}>
              <Scene variant={scene} className={s.resultImage} />
              <div className={s.resultBody}>
                <span className={s.meta}>COLLECTION 0{index + 1}</span>
                <Sk w="82%" h={9} tone="strong" />
                <Sk w="55%" h={7} />
              </div>
            </Box>
          ))}
        </div>
      </div>
    </div>
  )
}

function DestinationMobile() {
  return (
    <div className={s.mobile}>
      <header className={s.mobileHead}><span className={s.brand}><LogoGlyph size={18} /><Sk w={45} h={7} tone="strong" /></span><Pill>Menu</Pill></header>
      <div className={s.mobileBody}>
        <Scene variant="coast" className={s.mobileScene}><Label tone="strong">Explore somewhere new</Label></Scene>
        <div className={s.mobileTitle}><Sk w="92%" h={10} tone="strong" /><Sk w="65%" h={8} /></div>
        <Box className={s.mobilePanel}>
          <Label>Where would you like to go?</Label>
          <span className={s.searchValue}><MapPin size={13} /><Sk w={115} h={8} /></span>
          <span className={s.searchValue}><CalendarDays size={13} /><Sk w={92} h={8} /></span>
          <Btn><Search size={13} /> Find a trip</Btn>
        </Box>
        <div className={s.compactRow}><Label>Curated for you</Label><Sk w={34} h={6} /></div>
        <Box className={s.mobilePanel}><Sk w="80%" h={8} tone="strong" /><SkLines lines={[92, 70]} h={6} /></Box>
      </div>
    </div>
  )
}
