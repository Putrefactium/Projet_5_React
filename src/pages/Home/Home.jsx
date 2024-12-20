import HeroBanner from '@components/Layout/HeroBanner/HeroBanner'
import HousingList from '@features/HousingList/HousingList'
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
    <main className={styles.home}>
      <HeroBanner />
      <HousingList />
    </main>
  )
}

export default Home