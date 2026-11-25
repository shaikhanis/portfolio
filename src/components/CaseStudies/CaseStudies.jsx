import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { SectionHeader } from '../common/SectionHeader/SectionHeader.jsx'
import { Reveal } from '../common/Reveal/Reveal.jsx'
import { Tag } from '../common/Tag/Tag.jsx'
import { Dialog } from '../common/Dialog/Dialog.jsx'
import { caseStudies, caseStudyDisclaimer } from '../../data/caseStudies.js'
import { mockupLabels, mockups } from './mockups/index.js'

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const activeStudy = caseStudies[activeIndex]

  const closeStudy = () => setActiveIndex(-1)
  const moveStudy = (step) => setActiveIndex((index) => (index + step + caseStudies.length) % caseStudies.length)

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-site">
        <SectionHeader
          index="05"
          label="Professional work"
          title={<>Interfaces built around real <em className="accent">journeys.</em></>}
          titleId="projects-title"
          intro="A selection of frontend contributions across travel, customer and financial-service experiences."
        />
        <p className="case-disclaimer">
          <strong>Professional work</strong>
          <span>{caseStudyDisclaimer}</span>
        </p>
        <div className="case-grid">
          {caseStudies.map((study, index) => {
            const Mockup = mockups[study.mockup]
            return (
              <Reveal as="article" className="case-card" key={study.id} delay={(index % 2) * 0.06}>
                <div className="case-card__visual">
                  <Mockup label={mockupLabels[study.mockup]} />
                </div>
                <div className="case-card__details">
                  <div className="case-card__meta">
                    <span>{study.index} / {study.domain}</span>
                    <span>{study.brand}</span>
                  </div>
                  <h3>{study.title}</h3>
                  <p className="case-card__summary">{study.summary}</p>
                  <ul className="case-card__tags" aria-label={`${study.title} topics`}>
                    {study.tags.slice(0, 3).map((tag) => (
                      <li key={tag}><Tag size="sm">{tag}</Tag></li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="case-card__open"
                    aria-label={`Read case study: ${study.title}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    Read case study <ArrowUpRight size={17} aria-hidden="true" />
                  </button>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
      <Dialog
        open={Boolean(activeStudy)}
        onClose={closeStudy}
        labelledBy="case-dialog-title"
        variant="sheet"
        panelClassName="case-dialog"
      >
        {activeStudy ? (
          <article className="case-dialog__content">
            <header className="case-dialog__top">
              <div>
                <p className="mono-label case-dialog__domain">{activeStudy.domain} · {activeStudy.brand}</p>
                <h2 id="case-dialog-title">{activeStudy.title}</h2>
              </div>
              <button type="button" className="case-dialog__close" aria-label="Close case study" onClick={closeStudy}>
                <X size={20} aria-hidden="true" />
              </button>
            </header>
            <div className="case-dialog__body">
              <section>
                <h3>Context</h3>
                <p>{activeStudy.context}</p>
              </section>
              <section>
                <h3>My role</h3>
                <p>{activeStudy.role}</p>
              </section>
              <section>
                <h3>Frontend contribution</h3>
                <ul>{activeStudy.contribution.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section>
                <h3>Technologies</h3>
                <ul>{activeStudy.technologies.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section>
                <h3>Challenges addressed</h3>
                <ul>{activeStudy.challenges.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section>
                <h3>Implementation highlights</h3>
                <ul>{activeStudy.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <p className="text-muted-token">{caseStudyDisclaimer}</p>
            </div>
            <footer className="case-dialog__actions">
              <button type="button" className="demo-filter" onClick={() => moveStudy(-1)}>
                <ArrowLeft size={15} aria-hidden="true" /> Previous
              </button>
              <span className="mono-label">{activeIndex + 1} / {caseStudies.length}</span>
              <button type="button" className="demo-filter" onClick={() => moveStudy(1)}>
                Next <ArrowRight size={15} aria-hidden="true" />
              </button>
            </footer>
          </article>
        ) : null}
      </Dialog>
    </section>
  )
}
