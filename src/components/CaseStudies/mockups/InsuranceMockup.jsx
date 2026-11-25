import { Check, ShieldCheck } from 'lucide-react'
import { Box, Btn, DuoLayout, Label, LogoGlyph, MockStage, Pill, Sk, SkLines } from './MockKit.jsx'
import s from './ProductMockups.module.css'

/** Original, brand-free travel cover comparison and selection illustration. */
export default function InsuranceMockup({ label }) {
  return (
    <MockStage label={label}>
      <DuoLayout
        address="/travel-insurance"
        desktop={<InsuranceDesktop />}
        mobile={<InsuranceMobile />}
      />
    </MockStage>
  )
}

function InsuranceDesktop() {
  return (
    <div className={s.site}>
      <header className={s.topbar}>
        <span className={s.brand}><LogoGlyph /><Sk w={62} h={8} tone="strong" /></span>
        <span className={s.siteNav}><Label>Cover options</Label><Label>How it works</Label><Label>Help</Label></span>
        <Pill>My cover</Pill>
      </header>
      <div className={s.content}>
        <div className={s.title}><Label tone="muted">Travel with more confidence</Label><Sk w={260} h={14} tone="strong" /><Sk w={400} h={7} /></div>
        <div className={s.planGrid}>
          {['Essential', 'Plus', 'Complete'].map((plan, index) => (
            <Box className={s.planCard} key={plan}>
              <span className={s.compactRow}><Label>{plan} plan</Label>{index === 1 ? <Pill active>Recommended</Pill> : null}</span>
              <Sk w={74} h={13} tone="strong" />
              <span className={s.planPrice}>₹ — — <span className={s.meta}>/ trip</span></span>
              <ul className={s.featureList}>
                <li>Emergency assistance</li><li>Trip protection</li><li>Simple claim steps</li>
              </ul>
              <Btn variant={index === 1 ? 'accent' : 'outline'}>Review cover</Btn>
            </Box>
          ))}
        </div>
      </div>
    </div>
  )
}

function InsuranceMobile() {
  return (
    <div className={s.mobile}>
      <header className={s.mobileHead}><span className={s.brand}><LogoGlyph size={18} /><Sk w={46} h={7} tone="strong" /></span><ShieldCheck size={16} /></header>
      <div className={s.mobileBody}>
        <div className={s.mobileTitle}><Label>Choose your cover</Label><Sk w="90%" h={9} tone="strong" /></div>
        <Box className={s.mobilePanel}>
          <span className={s.compactRow}><Label>Trip details</Label><Check size={14} /></span>
          <SkLines lines={[92, 74]} h={7} />
          <span className={s.meta}>Step 1 of 3</span>
          <div className={s.giftCard}><Label>PLAN OPTIONS</Label><Sk w="76%" h={8} tone="strong" /><span className={s.meta}><Check size={12} /> Emergency support</span></div>
          <Btn>Continue</Btn>
        </Box>
        <span className={s.securityNote}><ShieldCheck size={12} /> Your selections stay private</span>
      </div>
    </div>
  )
}
