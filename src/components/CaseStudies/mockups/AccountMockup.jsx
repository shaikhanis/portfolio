import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Box, Btn, DuoLayout, Label, LogoGlyph, MockStage, Pill, Sk, SkLines } from './MockKit.jsx'
import s from './ProductMockups.module.css'

/** Original, brand-free account sign-in and one-time-code interface illustration. */
export default function AccountMockup({ label }) {
  return (
    <MockStage label={label}>
      <DuoLayout
        address="/my-account/login"
        desktop={<AccountDesktop />}
        mobile={<AccountMobile />}
      />
    </MockStage>
  )
}

function AccountDesktop() {
  return (
    <div className={s.site}>
      <header className={s.topbar}>
        <span className={s.brand}><LogoGlyph /><Sk w={58} h={8} tone="strong" /></span>
        <span className={s.siteNav}><Label>Trips</Label><Label>Profile</Label><Label>Support</Label></span>
        <Pill><LockKeyhole size={11} /> Secure sign in</Pill>
      </header>
      <div className={s.accountWrap}>
        <ShieldCheck size={24} color="var(--color-accent-text)" />
        <Label tone="muted">Welcome back</Label>
        <Sk w={190} h={13} tone="strong" />
        <Sk w={260} h={7} />
        <Box className={s.mobilePanel}>
          <Label>Your registered mobile number</Label>
          <span className={s.searchValue}><LockKeyhole size={13} /><Sk w={165} h={8} /></span>
        </Box>
        <Btn>Send one-time code <ArrowRight size={13} /></Btn>
        <span className={s.securityNote}>A verification code keeps your account protected.</span>
      </div>
    </div>
  )
}

function AccountMobile() {
  return (
    <div className={s.mobile}>
      <header className={s.mobileHead}><span className={s.brand}><LogoGlyph size={18} /><Sk w={42} h={7} tone="strong" /></span><LockKeyhole size={15} /></header>
      <div className={s.mobileBody}>
        <div className={s.mobileTitle}><Label>Verify your account</Label><Sk w="90%" h={9} tone="strong" /></div>
        <Box className={s.mobilePanel}>
          <span className={s.compactRow}><Label>Enter one-time code</Label><ShieldCheck size={14} /></span>
          <Sk w="85%" h={7} />
          <div className={s.otp} aria-hidden="true">
            {[1, 2, 3, 4, 5, 6].map((cell) => <span className={s.otpItem} key={cell}>{cell === 1 ? '•' : ''}</span>)}
          </div>
          <Btn>Verify code <ArrowRight size={13} /></Btn>
          <span className={s.securityNote}>Resend code in 00:30</span>
        </Box>
        <span className={s.securityNote}><SkLines lines={[94, 68]} h={6} /></span>
      </div>
    </div>
  )
}
