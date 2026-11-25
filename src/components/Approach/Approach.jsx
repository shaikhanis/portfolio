import { SectionHeader } from '../common/SectionHeader/SectionHeader.jsx'
import { Reveal } from '../common/Reveal/Reveal.jsx'
import { approachPrinciples } from '../../data/approach.js'

export default function Approach() {
  return (
    <section id="approach" className="section" aria-labelledby="approach-title">
      <div className="container-site">
        <SectionHeader
          index="04"
          label="Approach"
          title={<>How I think about <em className="accent">the details.</em></>}
          titleId="approach-title"
          intro="A practical engineering mindset: make the interface work well, feel considered, and remain easy to maintain."
        />
        <div className="approach-grid">
          {approachPrinciples.map((principle, index) => (
            <Reveal as="article" className="approach-card" key={principle.id} delay={(index % 4) * 0.04}>
              <span className="approach-card__number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
              <span className="approach-card__proof">{principle.proof}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
