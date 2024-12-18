import PropTypes from 'prop-types'
import styles from './PaginationDots.module.scss'

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