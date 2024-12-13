import './About.scss'
import HeroBanner from '@components/Layout/HeroBanner/HeroBanner'
import OurValuesContainer from '@components/Layout/OurValuesContainer/OurValuesContainer'

function About() {
  return (
    <main className="about">
      <HeroBanner />
      <OurValuesContainer />
    </main>
  )
}

export default About 