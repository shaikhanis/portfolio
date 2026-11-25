import { SectionHeader } from '../common/SectionHeader/SectionHeader.jsx'
import { Reveal } from '../common/Reveal/Reveal.jsx'
import { about } from '../../data/profile.js'

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container-site">
        <SectionHeader
          index="01"
          label="About"
          title={<>A little about <em className="accent">me.</em></>}
          titleId="about-title"
          intro={about.title}
        />
        <div className="about-grid">
          <Reveal className="about-copy" delay={0.08}>
            {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <blockquote className="about-quote">{about.quote}</blockquote>
          </Reveal>
          <Reveal as="dl" className="about-facts" delay={0.16}>
            {about.facts.map(({ label, value }) => (
              <div className="about-fact" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
