import { useState, useEffect, useRef, useContext } from 'react'
import { HousingContext } from '@/contexts/HousingContext'  

function useHousing(id) {
 const [housing, setHousing] = useState(null)
 const [isLoading, setIsLoading] = useState(true)
 const [error, setError] = useState(null)
 const cache = useRef(new Map()) // Initialisation du cache avec une map car plusieurs valeurs sont nécessaires
 
  // Récupération du contexte
  const housings = useContext(HousingContext)

  useEffect(() => {
   setIsLoading(true)
   try {
     // Vérifier si le logement est dans le cache
     if (cache.current.has(id)) {
       setHousing(cache.current.get(id))
       setIsLoading(false)
       return
     }

      // Sinon, rechercher dans la liste
     const foundHousing = housings.find(house => house.id === id)
     
     if (foundHousing) {
       // Mettre en cache pour les prochaines utilisations
       cache.current.set(id, foundHousing)
       setHousing(foundHousing)
     } else {
       setError('Logement non trouvé')
     }
   } catch {
     setError('Une erreur est survenue lors de la récupération du logement')
   } finally {
     setIsLoading(false)
   }
 }, [id, housings])

  return { housing, isLoading, error }

}

export default useHousing