import { useState, useEffect } from 'react'
import HeroBanner from '@assets/home_hero_banner.jpg'

// Hook pour récupérer la taille de la fenêtre

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

// On utilise le hook pour ajouter un <br /> sur mobile pour être en adéquation avec le design Figma

function Hero() {
  const { width } = useWindowSize()
  const isMobile = width <= 768 

  return (
    <figure className="herobanner">
      <img src={HeroBanner} alt="Bannière de la page d'accueil" />
      <figcaption>
        Chez vous, {isMobile ? <br /> : ''}partout et ailleurs
      </figcaption>
    </figure>
  )
}

export default Hero