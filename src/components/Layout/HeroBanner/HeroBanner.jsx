import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HomeHeroBanner from '@assets/home_hero_banner.jpg'
import AboutHeroBanner from '@assets/about_hero_banner.jpg'

// l'image de la bannière dépend du path de la page
const heroBannerImg = {
  '/': HomeHeroBanner,
  '/about': AboutHeroBanner
}

// Hook pour récupérer la taille de la fenêtre pour gérer le retour à la ligne sur mobile du texte
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      })
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

// On utilise le hook pour ajouter un <br /> sur mobile pour être 
// en adéquation avec le design Figma
function Hero() {
  const { width } = useWindowSize()
  const isMobile = width <= 768 
  const location = useLocation()

  return (
    <figure className={`herobanner ${location.pathname === '/' ? 'herobanner--home' : 'herobanner--about'}`}>
      <img 
        src={heroBannerImg[location.pathname]}
        alt={`Bannière de la page ${location.pathname === '/' ? "d'accueil" : 'à propos'}`} 
      />
      {location.pathname === '/' && ( 
        <figcaption>
          Chez vous, {isMobile ? <br /> : ''}partout et ailleurs
        </figcaption>
      )}
    </figure>
  )
}

export default Hero