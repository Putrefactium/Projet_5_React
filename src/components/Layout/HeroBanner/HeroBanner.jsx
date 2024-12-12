import { useState, useEffect } from 'react'
import HeroBanner from '@assets/home_hero_banner.jpg'

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

function Hero() {
  const { width } = useWindowSize()
  const isMobile = width <= 1024 

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