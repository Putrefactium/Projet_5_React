import PropTypes from 'prop-types'
import HousingGallery from '../HousingGallery/HousingGallery'
import Rating from './Rating/Rating'
import Collapse from '@components/UI/CollapseButton/CollapseButton'

function HousingBody({ housing }) {
 return (
   <>
     <HousingGallery pictures={housing.pictures} />
     <div className="housing-content">
      <h1>{housing.title}</h1>
      <h2>{housing.location}</h2>
      <div className="housing-tags">
        {housing.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
     </div>
     <div className="housing-host">
       <p>{housing.host.name}</p>
       <img src={housing.host.picture} alt={housing.host.name} />
       <div className="housing-rating">
        <Rating rating={housing.rating} />
       </div>
     </div>
     <Collapse title="Description" content={housing.description} />
     <Collapse 
        title="Équipements" 
        content={
          <ul>
            {housing.equipments.map((equipment) => (
              <li key={equipment}>{equipment}</li>
            ))}
          </ul>
        }
        icon="fa-solid fa-arrow-down"
     />
   </>

 )
}

HousingBody.propTypes = {
    housing: PropTypes.shape({
        title: PropTypes.string.isRequired,
        pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
        location: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        host: PropTypes.shape({
            name: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
    }).isRequired,
        rating: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        equipments: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
}

export default HousingBody