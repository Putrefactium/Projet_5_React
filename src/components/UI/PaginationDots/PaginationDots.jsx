import PropTypes from 'prop-types'
import './PaginationDots.scss'

function PaginationDots({ totalPages, currentPage, onPageChange }) {
  return (
    <div className="pagination-dots">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`pagination-dots__dot ${currentPage === index ? 'active' : ''}`}
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