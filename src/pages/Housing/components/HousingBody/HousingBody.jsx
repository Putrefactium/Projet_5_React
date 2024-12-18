import PropTypes from 'prop-types'
import HousingGallery from '../HousingGallery/HousingGallery'

function HousingBody({ housing }) {
 return (
   <>
     <h1>{housing.title}</h1>
     <HousingGallery pictures={housing.pictures} />
     {/* Autres éléments d'affichage à venir */}
   </>
 )
}

HousingBody.propTypes = {
    housing: PropTypes.shape({
        title: PropTypes.string.isRequired,
        pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
}

export default HousingBody