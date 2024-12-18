import { useParams } from 'react-router-dom'
import useHousingList from '@hooks/useHousingList'

function Housing() {
  const { id } = useParams()
  const { housingsList, error, isLoading } = useHousingList()
  
  // Gestion du chargement
  if (isLoading) {
    return (
      <main className="housing">
        <div className="housing__loading-state">
          Chargement du logement...
        </div>
      </main>
    )
  }

  // Gestion des erreurs
  if (error) {
    return (
      <main className="housing">
        <div className="housing__error-state">
          Une erreur est survenue : {error}
        </div>
      </main>
    )
  }

  // Carhement du logement correspondant à l'ID depuis le context
  const currentHouse = housingsList.find((housing) => housing.id === id)

  // Si le logement n'est pas trouvé
  if (!currentHouse) {
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
      <h1>
        {currentHouse.title}
        {console.log(currentHouse)}
      </h1>
    </main>
  )
}

export default Housing