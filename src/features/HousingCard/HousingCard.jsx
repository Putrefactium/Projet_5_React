import PropTypes from 'prop-types'
import styles from './HousingCard.module.scss'

/**
 * @description Composant qui affiche un logement avec une image de couverture et un titre
 * @component
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.id - L'identifiant du logement
 * @param {string} props.title - Le titre du logement
 * @param {string} props.cover - L'URL de l'image de couverture du logement
 * 
 * @example
 * return (
 *   <HousingCard id="1" title="Logement 1" cover="image.jpg" index={0} />
 * )
 * 
 * @returns {JSX.Element} Un article contenant l'image et le titre du logement
 */

function HousingCard({ id, title, cover }) {
  return (
    <article className={styles.card}>
      <a href={`/housing/${id}`}>
        <div className={styles.imageContainer}>
          <img 
            src={cover} 
            alt={title} 
            className={styles.image} 
          />
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
