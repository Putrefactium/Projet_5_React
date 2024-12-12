import { Link, NavLink } from 'react-router-dom'
import logoDesktop from '@assets/LOGO.png'
import logoMobile from '@assets/LOGO_mobile.png'
import { useState, useEffect } from 'react'

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
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="Logo Kasa" />
      </Link>
      <nav className="header__nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? "header__nav-link active" : "header__nav-link"
          }
        >
          Accueil
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            isActive ? "header__nav-link active" : "header__nav-link"
          }
        >
          À Propos
        </NavLink>
      </nav>
    </header>
  )
}

export default Header 