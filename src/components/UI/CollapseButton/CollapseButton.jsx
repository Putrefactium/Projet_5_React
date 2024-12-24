import PropTypes from 'prop-types'
import { useState } from 'react'
import styles from './CollapseButton.module.scss'

/**
 * @description Bouton accordéon qui affiche/masque du contenu
 * @component
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.title - Le titre à afficher dans le bouton
 * @param {string} props.content - Le contenu à afficher/masquer
 * @param {string} [props.className] - Classes CSS additionnelles (optionnel)
 * @param {string} [props.variant] - Variante de style (optionnel)
 * 
 * @returns {JSX.Element} Un bouton accordéon avec son contenu
 * 
 * @example
 * <CollapseButton 
 *   title="Mon titre"
 *   content="Mon contenu"
 *   variant="housing"
 * />
 */

function CollapseButton({ title, content, className, variant, isHtml }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div 
            className={`${styles.button} ${className || ''}`}
            id={`${title}-button`}
        >
            <button 
                className={`${styles.header} ${styles[variant]} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${title}-content`}
            >
                <div className={styles[variant]}>{title}</div>
                <span className={`${styles.arrow} ${styles[variant]}`}></span>
            </button>
            <div className={`${styles[variant]} ${styles.content} ${isOpen ? styles.open : ''}`}>
                <div className={`${styles.collapseContent} ${styles[variant]}`}>{isHtml ? JSON.parse(content) : content}</div>
            </div>
        </div>
    )
}

CollapseButton.defaultProps = {
  isHtml: false,
}

CollapseButton.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  isHtml: PropTypes.bool,
  variant: PropTypes.string
}

export default CollapseButton
