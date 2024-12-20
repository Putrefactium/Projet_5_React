import PropTypes from 'prop-types'
import { useState } from 'react'
import styles from './CollapseButton.module.scss'

function CollapseButton({ title, content, className, variant }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`${styles.button} ${className || ''}`}>
            <button 
                className={`${styles.header} ${styles[variant]} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className={styles[variant]}>{title}</h2>
                <span className={`${styles.arrow} ${styles[variant]}`}></span>
            </button>
            <div className={`${styles[variant]} ${styles.content} ${isOpen ? styles.open : ''}`}>
                <p className={styles[variant]}>{content}</p>
            </div>
        </div>
    )
}

CollapseButton.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string
}

export default CollapseButton
