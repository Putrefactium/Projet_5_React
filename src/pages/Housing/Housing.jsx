import { useParams } from 'react-router-dom'
import useHousing from '@hooks/useHousing'
import HousingBody from './components/HousingBody/HousingBody'

function Housing() {
  const { id } = useParams()
  const { housing, error, isLoading } = useHousing(id)
  
  if (isLoading) {
    return (
      <main className="housing">
        <div className="housing__loading-state">
          Chargement du logement...
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="housing">
        <div className="housing__error-state">
          Une erreur est survenue : {error}
        </div>
      </main>
    )
  }

  if (!housing) {
    return (
      <main className="housing">
        <div className="housing__not-found-state">
          Ce logement n&apos;existe pas
        </div>
      </main>
    )
  }

  return (
    <main className="housing">
      <HousingBody housing={housing} />
    </main>
  )
}

export default Housing