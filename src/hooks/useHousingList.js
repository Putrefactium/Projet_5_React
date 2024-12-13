import { useContext } from 'react'
import { HousingContext } from '@/contexts/HousingContext'

const useHousingList = () => {
  const housings = useContext(HousingContext)
  
  if (housings === null) {
    throw new Error('useHousingList doit être utilisé à l\'intérieur d\'un HousingProvider')
  }
  
  return housings
}

export default useHousingList