import { SectionHeader } from '../common/SectionHeader/SectionHeader.jsx'
import { Reveal } from '../common/Reveal/Reveal.jsx'
import { experience } from '../../data/experience.js'

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container-site">
        <SectionHeader
          index="02"
          label="Experience"
          title={<>The work behind the <em className="accent">experience.</em></>}
          titleId="experience-title"
          intro="A progression from strong frontend foundations to customer-facing interfaces across enterprise travel."
        />
        <div className="experience-list">
          {experience.map((item, index) => (
            <Reveal as="article" className="experience-card" key={item.id} delay={index * 0.08}>
              <div className="experience-card__meta">
                <p className="mono-label experience-card__duration">
                  {item.startDate ? `${item.startDate} – ${item.endDate || 'Present'}` : item.duration}
                </p>
                <h3 className="experience-card__role">{item.role}</h3>
                <p className="experience-card__company">{item.company}</p>
                {item.brands.length > 0 ? (
                  <p className="experience-card__brands">{item.brands.join(' · ')}</p>
                ) : null}
                {item.current ? <span className="text-accent">Current role</span> : null}
              </div>
              <div>
                <p className="experience-card__summary">{item.summary}</p>
                <div className="experience-card__groups">
                  {item.responsibilityGroups.map((group) => (
                    <section className="experience-card__group" key={group.title} aria-label={group.title}>
                      <h4>{group.title}</h4>
                      <ul>
                        {group.items.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
                      </ul>
                    </section>
                  ))}
                </div>
                {item.releaseFlow.length > 0 ? (
                  <p className="release-flow" aria-label={`Release workflow: ${item.releaseFlow.join(' to ')}`}>
                    {item.releaseFlow.map((stage) => <span key={stage}>{stage}</span>)}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
