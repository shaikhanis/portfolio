import About from '../components/About/About.jsx'
import Approach from '../components/Approach/Approach.jsx'
import CaseStudies from '../components/CaseStudies/CaseStudies.jsx'
import Contact from '../components/Contact/Contact.jsx'
import Experience from '../components/Experience/Experience.jsx'
import Hero from '../components/Hero/Hero.jsx'
import PersonalProjects from '../components/Projects/PersonalProjects.jsx'
import Resume from '../components/Resume/Resume.jsx'
import Skills from '../components/Skills/Skills.jsx'
import { useHashScroll } from '../hooks/useHashScroll.js'

/** The single-page portfolio. Section order matches the navigation. */
export default function HomePage() {
  useHashScroll()

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Approach />
      <CaseStudies />
      <PersonalProjects />
      <Resume />
      <Contact />
    </>
  )
}
