import PropTypes from 'prop-types'
import styles from './PaginationDots.module.scss'

/**
 * @description Composant qui affiche des points de pagination
 * @component
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.totalPages - Le nombre total de pages
 * @param {number} props.currentPage - La page actuelle
 * @param {function} props.onPageChange - La fonction à appeler lorsqu'un point de pagination est cliqué
 * 
 * @example
 * return (
 *   <PaginationDots totalPages={10} currentPage={1} onPageChange={() => {}} />
 * )
 * 
 * @returns {JSX.Element} Un div contenant les points de pagination
 */

function PaginationDots({ totalPages, currentPage, onPageChange }) {
  return (
    <div className={styles.container}>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`${styles.dot} ${currentPage === index ? styles.active : ''}`}
          onClick={() => onPageChange(index)}
          aria-label={`Page ${index + 1}`}
        />
      ))}
    </div>
  )
}

PaginationDots.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default PaginationDots