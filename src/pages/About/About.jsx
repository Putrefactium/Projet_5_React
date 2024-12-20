import HeroBanner from '@components/Layout/HeroBanner/HeroBanner'
import OurValuesContainer from '@components/Layout/OurValuesContainer/OurValuesContainer'
import styles from './About.module.scss'

function About() {
  return (
    <main className={styles.about}>
      <HeroBanner />
      <OurValuesContainer />
    </main>
  )
}

export default About 