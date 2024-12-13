import PropTypes from 'prop-types'
import { useState } from 'react'
import './CollapseButton.scss'

function CollapseButton({ title, content }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="collapse-button">
            <button 
                className={`collapse-header ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2>{title}</h2>
                <span className="arrow"></span>
            </button>
            <div className={`collapse-content ${isOpen ? 'open' : ''}`}>
                <p>{content}</p>
            </div>
        </div>
    )
}

CollapseButton.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default CollapseButton
