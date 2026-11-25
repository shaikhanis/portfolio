import { SectionHeader } from '../common/SectionHeader/SectionHeader.jsx'
import { Reveal } from '../common/Reveal/Reveal.jsx'
import { skillGroups, skillLevels } from '../../data/skills.js'

export default function Skills() {
  return (
    <section id="expertise" className="section" aria-labelledby="expertise-title">
      <div className="container-site">
        <SectionHeader
          index="03"
          label="Expertise"
          title={<>Tools for thoughtful <em className="accent">interfaces.</em></>}
          titleId="expertise-title"
          intro="A grounded frontend toolkit, with practical React work clearly separated from technologies used professionally."
        />
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <Reveal as="article" className="skill-group" key={group.id} delay={(index % 3) * 0.05}>
              <h3>{group.title}</h3>
              <p className="skill-group__blurb">{group.blurb}</p>
              <ul className="skill-list">
                {group.skills.map((skill) => (
                  <li
                    className="skill-chip"
                    data-level={skill.level}
                    title={`${skillLevels[skill.level].label}: ${skillLevels[skill.level].description}`}
                    key={skill.name}
                  >
                    {skill.name}
                    {skill.note ? <span className="visually-hidden"> — {skill.note}</span> : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <div className="skill-legend" aria-label="Skill experience levels">
          {Object.entries(skillLevels).map(([level, value]) => (
            <span key={level}><i aria-hidden="true" />{value.label}: {value.description}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
