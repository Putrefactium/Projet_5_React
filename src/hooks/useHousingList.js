import { useContext, useState, useEffect } from 'react'
import { HousingContext } from '@/contexts/HousingContext'

const useHousingList = () => {
  // États pour gérer le chargement et les erreurs
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  
  // Récupération du contexte
  const housings = useContext(HousingContext)
  
  useEffect(() => {
    const loadHousings = async () => {
      try {
        // Vérifie si le contexte est disponible
        if (housings === null) {
          throw new Error('useHousingList doit être utilisé à l\'intérieur d\'un HousingProvider')
        }
        
        setData(housings)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadHousings()
  }, [housings])

  return {
    housingsList: data,
    isLoading,
    error
  }
}

export default useHousingList