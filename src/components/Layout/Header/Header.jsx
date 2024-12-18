import { Link, NavLink } from 'react-router-dom'
import logoDesktop from '@assets/LOGO.png'
import logoMobile from '@assets/LOGO_mobile.png'
import { useState, useEffect } from 'react'
import styles from './Header.module.scss'

function Header() {
  const [logo, setLogo] = useState(window.innerWidth > 1024 ? logoDesktop : logoMobile)

  useEffect(() => {
    const handleResize = () => {
      setLogo(window.innerWidth > 768 ? logoDesktop : logoMobile)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo Kasa" />
      </Link>
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