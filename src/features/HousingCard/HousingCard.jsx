import PropTypes from 'prop-types'

function HousingCard({ id, title, cover }) {
  return (
    <article className="housing-card">
      <a href={`/housing/${id}`}>
        <div className="housing-card__image-container">
          <img src={cover} alt={title} className="housing-card__image" />
        </div>
        <h2 className="housing-card__title">{title}</h2>
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
