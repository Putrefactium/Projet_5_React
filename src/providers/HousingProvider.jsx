import { HousingContext } from '@/contexts/HousingContext'
import PropTypes from 'prop-types'
import housings from '@data/logements.json'

export function HousingProvider({ children }) {
    return (
      <HousingContext.Provider value={housings}>
        {children}
      </HousingContext.Provider>
    )
}  
  
HousingProvider.propTypes = {
  children: PropTypes.node.isRequired
}