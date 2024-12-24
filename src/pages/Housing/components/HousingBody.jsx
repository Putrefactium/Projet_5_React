import PropTypes from 'prop-types'
import HousingGallery from './HousingGallery/HousingGallery'
import Rating from './Rating/Rating'
import Collapse from '@components/UI/CollapseButton/CollapseButton'
import styles from './HousingBody.module.scss'

function HousingBody({ housing }) {

  const equipmentsList = 
  <ul>
    {housing.equipments.map((equipment) => (
      <li key={equipment}>{equipment}</li>
    ))}
  </ul>

 return (
    <div className={styles.housingBody}>
      <HousingGallery pictures={housing.pictures} />
      <div className={styles.housingInformations}>
        <div className={styles.housingContent}>
            <h1 className={styles.housingTitle}>{housing.title}</h1>
            <p className={styles.housingLocation}>{housing.location}</p>
            <div className={styles.housingTags}>
            {housing.tags.map((tag) => (
              <span key={tag} className={styles.housingTag}>{tag}</span>
            ))}
        </div>
      </div>
      <div className={styles.housingHostContainer}>
        <div className={styles.housingHost}>
          <p className={styles.housingHostName}>{housing.host.name}</p>
          <img src={housing.host.picture} alt={housing.host.name} className={styles.housingHostPicture} />
        </div>
        <div className={styles.housingRating}>
          <Rating rating={housing.rating} />
        </div>
      </div>
    </div>
    <div className={styles.housingCollapseContainer}>
     <Collapse 
        title="Description" 
        className={styles.housingCollapse}
        variant="housing"
        content={housing.description} 
        icon="fa-solid fa-arrow-down"
     />
     <Collapse 
        title="Équipements" 
        className={styles.housingCollapse}
        variant="housing"
        content={equipmentsList}
        icon="fa-solid fa-arrow-down"
     />
    </div>
    </div>
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
        rating: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        equipments: PropTypes.array.isRequired,
    }).isRequired,
}

export default HousingBody