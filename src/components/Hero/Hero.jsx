import { ArrowDownRight, ArrowUpRight, Download, MapPin } from 'lucide-react'
import { Button } from '../common/Button/Button.jsx'
import { Tag } from '../common/Tag/Tag.jsx'
import { PROFILE_PHOTO_URL, RESUME_URL } from '../../config/site.js'
import { hero, profile } from '../../data/profile.js'

export default function Hero() {
  const resumeHref = RESUME_URL ?? '#contact'

  return (
    <section id="home" className="hero section" aria-labelledby="hero-title">
      <div className="container-site hero__grid">
        <div className="hero__copy">
          <p className="mono-label hero__eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__title">
            {hero.headline.lead} <em className="accent">{hero.headline.emphasis}</em>
          </h1>
          <p className="hero__summary">{hero.summary}</p>
          <p className="hero__designation">{hero.designation}</p>
          <div className="hero__actions">
            <Button href={hero.cta.primary.href} size="lg" icon={<ArrowDownRight size={18} />}>
              {hero.cta.primary.label}
            </Button>
            <Button
              href={resumeHref}
              variant="secondary"
              size="lg"
              icon={RESUME_URL ? <Download size={18} /> : <ArrowUpRight size={18} />}
              {...(RESUME_URL ? { download: 'shaikh-anis-resume.pdf' } : { 'data-resume-request': '' })}
              {...(!RESUME_URL ? { onClick: () => window.dispatchEvent(new Event('portfolio:resume-request')) } : {})}
            >
              {RESUME_URL ? hero.cta.resume.label : hero.cta.resume.fallbackLabel}
            </Button>
            <Button href={hero.cta.connect.href} variant="ghost" size="lg">{hero.cta.connect.label}</Button>
          </div>
        </div>
        <div className="hero__portrait-wrap" aria-label="Professional profile visual for Shaikh Anis">
          <div className="hero__portrait">
            {PROFILE_PHOTO_URL ? (
              <img src={PROFILE_PHOTO_URL} alt={`Portrait of ${profile.name}`} fetchPriority="high" />
            ) : (
              <span className="hero__monogram" aria-hidden="true">SA</span>
            )}
          </div>
          <div className="hero__portrait-note">
            <span className="hero__note-dot" aria-hidden="true" />
            {profile.availability}
          </div>
          {profile.location ? (
            <div className="hero__location"><MapPin size={14} aria-hidden="true" />{profile.location}</div>
          ) : null}
        </div>
      </div>
      <div className="container-site hero__lower">
        <ul className="hero__stats" aria-label="Career summary">
          {hero.stats.map((stat) => (
            <li key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></li>
          ))}
        </ul>
        <div className="hero__tech" aria-label="Technology focus">
          {hero.technologies.map((technology) => <Tag key={technology} size="sm" mono>{technology}</Tag>)}
        </div>
      </div>
    </section>
  )
}
