import { NavLink } from 'react-router-dom'
import logoDesktop from '@assets/LOGO.png'
import logoMobile from '@assets/LOGO_mobile.png'
import { useState, useEffect } from 'react'
import { config } from '@config/config'
import styles from './Header.module.scss'

/**
 * @description Composant qui affiche le header avec le logo de Kasa et les liens de navigation
 * @component
 * 
 * @example
 * return (
 *   <Header />
 * )
 * 
 * @returns {JSX.Element} Un header avec le logo de Kasa et les liens de navigation
 */

function Header() {
  const [logo, setLogo] = useState(window.innerWidth > config.layout.breakpoints.tablet ? logoDesktop : logoMobile)

  useEffect(() => {
    const handleResize = () => {
      setLogo(window.innerWidth > config.layout.breakpoints.tablet ? logoDesktop : logoMobile)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className={styles.header}>
        <img 
            src={logo} 
            alt="Logo Kasa" 
            className={styles.logo}
        />
      <nav className={styles.nav}>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? styles.navLinkActive : styles.navLink  
          }
        >
          Accueil
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          À Propos
        </NavLink>
      </nav>
    </header>
  )
}

export default Header 