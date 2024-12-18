import PropTypes from 'prop-types'
import { useState } from 'react'
import styles from './CollapseButton.module.scss'

function CollapseButton({ title, content }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={styles.button}>
            <button 
                className={`${styles.header} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2>{title}</h2>
                <span className={styles.arrow}></span>
            </button>
            <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
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
