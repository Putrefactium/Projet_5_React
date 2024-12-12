import HeroBanner from '@components/Layout/HeroBanner/HeroBanner'
import HousingList from '@features/HousingList/HousingList'

function Home() {
  return (
    <main className="home">
      <HeroBanner />
      <HousingList />
    </main>
  )
}

export default Home