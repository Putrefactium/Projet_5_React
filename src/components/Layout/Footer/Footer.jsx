import logo from '@assets/footer_logo_mobile.png'
import styles from './Footer.module.scss'

/**
 * @description Composant qui affiche le pied de page avec le logo de Kasa et un copyright
 * @component
 * 
 * @example
 * return (
 *   <Footer />
 * )
 * 
 * @returns {JSX.Element} Un pied de page avec le logo de Kasa et un copyright
 */

function Footer() {
  return (
    <footer className={styles.footer}>
      <img src={logo} alt="Logo Kasa" />
      <h2 className={styles.text}>© 2024 Kasa. All rights reserved</h2>
    </footer>
  )
}

export default Footer 