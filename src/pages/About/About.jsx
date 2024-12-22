import HeroBanner from '@components/Layout/HeroBanner/HeroBanner'
import OurValuesContainer from '@components/Layout/OurValuesContainer/OurValuesContainer'
import SEO from '@components/SEO/SEO'
import styles from './About.module.scss'

/**
 * @description Page à propos avec la bannière et les valeurs de Kasa
 * @page
 * 
 * @example
 * Dans le router :
 * <Route path="/about" element={<About />} />
 * 
 * @returns {JSX.Element} Un main contenant la bannière et les valeurs de Kasa
 */

function About() {
  return (
    <>
      <SEO 
        title="A propos" 
        description="Page à propos de Kasa" 
        canonical="/about" 
        ogImage="/" />
      <main className={styles.about}>
        <HeroBanner />
        <OurValuesContainer />
      </main>
    </>
  )
}

export default About 