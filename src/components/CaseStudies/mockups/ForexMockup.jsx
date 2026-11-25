import { ArrowDownUp, CreditCard, ShieldCheck } from 'lucide-react'
import { Box, Btn, DuoLayout, Label, LogoGlyph, MockStage, Pill, Sk, SkLines } from './MockKit.jsx'
import s from './ProductMockups.module.css'

/** Original, brand-free currency and gift-card interface illustration. */
export default function ForexMockup({ label }) {
  return (
    <MockStage label={label}>
      <DuoLayout
        address="/forex"
        desktop={<ForexDesktop />}
        mobile={<ForexMobile />}
      />
    </MockStage>
  )
}

function ForexDesktop() {
  return (
    <div className={s.site}>
      <header className={s.topbar}>
        <span className={s.brand}><LogoGlyph /><Sk w={62} h={8} tone="strong" /></span>
        <span className={s.siteNav}><Label>Currency</Label><Label>Cards</Label><Label>Support</Label></span>
        <Pill>My account</Pill>
      </header>
      <div className={s.content}>
        <div className={s.title}><Label tone="muted">Travel money, made clearer</Label><Sk w={260} h={15} tone="strong" /></div>
        <div className={s.twoCol}>
          <Box className={s.currencyPanel}>
            <Label>Currency conversion</Label>
            <div className={s.currencyRow}>
              <span className={s.currencyLabel}>You exchange <strong className={s.currencyAmount}>1,000</strong></span>
              <Pill>INR</Pill>
            </div>
            <span className={s.exchange}><ArrowDownUp size={14} /></span>
            <div className={s.currencyRow}>
              <span className={s.currencyLabel}>You receive <strong className={s.currencyAmount}>— —</strong></span>
              <Pill>EUR</Pill>
            </div>
            <Btn>Explore exchange options</Btn>
            <span className={s.meta}><ShieldCheck size={12} /> Secure customer journey</span>
          </Box>
          <div className={s.giftCards}>
            {['Everyday', 'A little thanks', 'For the journey'].map((name, index) => (
              <div className={s.giftCard} key={name}>
                <span className={s.meta}>GIFT CARD 0{index + 1}</span>
                <CreditCard size={17} />
                <Sk w="80%" h={7} tone="strong" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ForexMobile() {
  return (
    <div className={s.mobile}>
      <header className={s.mobileHead}><span className={s.brand}><LogoGlyph size={18} /><Sk w={44} h={7} tone="strong" /></span><Pill>Help</Pill></header>
      <div className={s.mobileBody}>
        <div className={s.mobileTitle}><Label>Travel money</Label><Sk w="90%" h={9} tone="strong" /></div>
        <Box className={s.mobilePanel}>
          <Label>Convert currency</Label>
          <span className={s.currencyRow}><span className={s.currencyLabel}>You exchange<strong className={s.currencyAmount}>1,000</strong></span><Pill>INR</Pill></span>
          <span className={s.exchange}><ArrowDownUp size={13} /></span>
          <span className={s.currencyRow}><span className={s.currencyLabel}>You receive<strong className={s.currencyAmount}>— —</strong></span><Pill>EUR</Pill></span>
          <Btn>Continue</Btn>
        </Box>
        <div className={s.compactRow}><Label>Gift cards</Label><Sk w={36} h={6} /></div>
        <Box className={s.mobilePanel}><CreditCard size={18} /><Sk w="78%" h={7} tone="strong" /><SkLines lines={[90, 66]} h={6} /></Box>
      </div>
    </div>
  )
}
