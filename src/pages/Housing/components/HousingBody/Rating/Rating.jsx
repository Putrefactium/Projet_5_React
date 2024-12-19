import PropTypes from 'prop-types'
import styles from './Rating.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Rating({ rating }) {
    const stars = [1, 2, 3, 4, 5]
    
    return (
        <div className={styles.rating}>
            {stars.map((star) => (
                <FontAwesomeIcon
                    key={star}
                    icon="star"
                    className={star <= rating ? styles.active : styles.inactive}
                />
            ))}
        </div>
    )
}

export default Rating

Rating.propTypes = {
    rating: PropTypes.number.isRequired,
}