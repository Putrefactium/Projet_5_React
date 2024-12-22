import HeroBanner from '@components/Layout/HeroBanner/HeroBanner'
import HousingList from '@features/HousingList/HousingList'
import SEO from '@components/SEO/SEO'
import styles from './Home.module.scss'

/**
 * @description Page d'accueil avec la bannière et la liste des logements
 * @page
 * 
 * @example
 * Dans le router :
 * <Route path="/" element={<Home />} />
 * 
 * @returns {JSX.Element} Un main contenant la bannière et la liste des logements
 */

function Home() {
  return (
    <>
      <SEO 
        title="Accueil" 
        description="Page d'accueil de Kasa" 
        canonical="/" 
        ogImage="/" />
      <main className={styles.home}>
        <HeroBanner />
        <HousingList />
      </main>
    </>
  )
}

export default Home