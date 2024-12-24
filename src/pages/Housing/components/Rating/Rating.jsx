import PropTypes from 'prop-types'
import styles from './Rating.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * @description Composant qui affiche une note sous forme de barres d'étoiles
 * @component
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.rating - La note à afficher
 * 
 * @example
 * return (
 *   <Rating rating={4.5} />
 * )
 * 
 * @returns {JSX.Element} Un div contenant les étoiles
 */

function Rating({ rating }) {
    const stars = [1, 2, 3, 4, 5]
    
    return (
        <div className={styles.rating}>
            {stars.map((star) => (
                <FontAwesomeIcon
                    key={star}
                    icon="star"
                    className={star <= parseInt(rating) ? styles.active : styles.inactive}
                />
            ))}
        </div>
    )
}

export default Rating

Rating.propTypes = {
    rating: PropTypes.string.isRequired,
}