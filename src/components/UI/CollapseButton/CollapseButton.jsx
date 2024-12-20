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
