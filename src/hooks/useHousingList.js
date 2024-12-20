import { useContext, useState, useEffect, useRef } from 'react'
import { HousingContext } from '@/contexts/HousingContext'

const useHousingList = () => {
  // États pour gérer le chargement et les erreurs
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  const cache = useRef(null) // Initialisation du cache avec null car une seule valeur est nécessaire
  
  // Récupération du contexte
  const housings = useContext(HousingContext)
  
  useEffect(() => {
    const loadHousings = async () => {
      try {
        // Vérifie si le cache est disponible
        if (cache.current) {
          setData(cache.current)
          setIsLoading(false)
          return
        }

        // Vérifie si le contexte est disponible
        if (housings === null) {
          throw new Error('useHousingList doit être utilisé à l\'intérieur d\'un HousingProvider')
        }
        
        cache.current = housings
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