import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router'
import { SectionHeader } from '../common/SectionHeader/SectionHeader.jsx'
import { Reveal } from '../common/Reveal/Reveal.jsx'
import { Tag } from '../common/Tag/Tag.jsx'
import { profile } from '../../data/profile.js'
import { personalProjects } from '../../data/projects.js'

export default function PersonalProjects() {
  return (
    <section id="personal-projects" className="section" aria-labelledby="personal-projects-title">
      <div className="container-site">
        <SectionHeader
          index="06"
          label="Personal projects"
          title={<>Built to keep <em className="accent">learning.</em></>}
          titleId="personal-projects-title"
          intro="Small, working projects that let me practise modern React patterns and explore complete user journeys."
        />
        <div className="projects-grid">
          {personalProjects.map((project, index) => (
            <Reveal as="article" className="project-card" key={project.id} delay={index * 0.06}>
              <div className="project-card__top">
                <span>{project.index} / PERSONAL</span>
                <Tag size="sm" variant={project.status === 'live' ? 'success' : 'default'}>
                  {project.status === 'live' ? 'Live demo' : 'In progress'}
                </Tag>
              </div>
              <h3>{project.title}</h3>
              <p className="project-card__kind">{project.kind}</p>
              <p className="project-card__summary">{project.summary}</p>
              <ul className="project-card__features">
                {project.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <ul className="project-card__stack" aria-label={`${project.title} technologies`}>
                {project.stack.map((item) => <li key={item}><Tag size="sm">{item}</Tag></li>)}
              </ul>
              <div className="project-card__actions">
                {project.status === 'live' ? (
                  project.demoPath === '/' ? (
                    <a className="demo-filter" href="#home">View portfolio <ArrowUpRight size={14} aria-hidden="true" /></a>
                  ) : (
                    <Link className="demo-filter" to={project.demoPath}>
                      Open demo <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  )
                ) : (
                  <span className="text-muted-token">Demo details are being verified</span>
                )}
                {profile.repositoryUrl && project.sourcePath ? (
                  <a
                    className="demo-filter"
                    href={`${profile.repositoryUrl.replace(/\/+$/, '')}/tree/main/${project.sourcePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source <ExternalLink size={13} aria-hidden="true" />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
