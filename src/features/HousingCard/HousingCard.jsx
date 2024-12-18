import PropTypes from 'prop-types'
import styles from './HousingCard.module.scss'

function HousingCard({ id, title, cover }) {
  return (
    <article className={styles.card}>
      <a href={`/housing/${id}`}>
        <div className={styles.imageContainer}>
          <img src={cover} alt={title} className={styles.image} />
        </div>
        <h2 className={styles.title}>{title}</h2>
      </a>
    </article>
  )
}   

HousingCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
}

export default HousingCard
