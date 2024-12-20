import HeroBanner from '@components/Layout/HeroBanner/HeroBanner'
import HousingList from '@features/HousingList/HousingList'
import styles from './Home.module.scss'

function Home() {
  return (
    <main className={styles.home}>
      <HeroBanner />
      <HousingList />
    </main>
  )
}

export default Home