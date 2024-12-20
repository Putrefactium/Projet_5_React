import { useParams, Navigate } from 'react-router-dom'
import useHousing from '@hooks/useHousing'
import HousingBody from './components/HousingBody/HousingBody'
import styles from './Housing.module.scss'

function Housing() {
  const { id } = useParams()
  const { housing, error, isLoading } = useHousing(id)
  
  if (isLoading) {
    return (
      <main className={styles.housing}>
        <div className={styles.housing__loadingState}>
          Chargement du logement...
        </div>
      </main>
    )
  }
 
  // Utilisation de Navigate pour rediriger vers la page d'erreur si l'id n'est pas valide ou si une erreur est survenue
  if (error || !housing) {
    return (
      <Navigate to="/Error" replace/>
    )
  }

  return (
    <main className={styles.housing}>
      <HousingBody housing={housing} />
    </main>
  )
}

export default Housing