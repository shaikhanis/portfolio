import { ArrowDownToLine, ArrowUpRight, Check } from 'lucide-react'
import { SectionHeader } from '../common/SectionHeader/SectionHeader.jsx'
import { Button } from '../common/Button/Button.jsx'
import { RESUME_URL } from '../../config/site.js'
import { profile } from '../../data/profile.js'

export default function Resume() {
  return (
    <section id="resume" className="section" aria-labelledby="resume-title">
      <div className="container-site">
        <SectionHeader
          index="07"
          label="Resume"
          title={<>A concise view of my <em className="accent">experience.</em></>}
          titleId="resume-title"
          intro="A snapshot of the frontend work I do and the engineering direction I am growing into."
        />
        <div className="resume-panel">
          <div>
            <p className="mono-label">{profile.designation}</p>
            <h3>{profile.name} · Frontend Developer</h3>
            <p>
              {profile.experienceYears} years building responsive customer-facing interfaces, with experience across
              enterprise travel platforms and an active focus on modern React development.
            </p>
            <div className="resume-panel__actions">
              {RESUME_URL ? (
                <Button
                  href={RESUME_URL}
                  download="shaikh-anis-resume.pdf"
                  icon={<ArrowDownToLine size={17} />}
                >
                  Download Resume PDF
                </Button>
              ) : (
                <Button
                  href="#contact"
                  data-resume-request
                  onClick={() => window.dispatchEvent(new Event('portfolio:resume-request'))}
                  icon={<ArrowUpRight size={17} />}
                >
                  Request resume
                </Button>
              )}
            </div>
            {!RESUME_URL ? (
              <p className="resume-notice" role="note">
                The PDF is not published yet. Add <code>public/resume/shaikh-anis-resume.pdf</code> to enable a direct download.
              </p>
            ) : null}
          </div>
          <ul className="resume-panel__highlights">
            {[
              'Assistant Manager – UI Development at Thomas Cook (India) Limited',
              'Frontend Developer Trainee at Netcom Business Solutions',
              'Responsive UI, dynamic content and API-driven experiences',
              'React.js skills developed through hands-on personal projects',
            ].map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
