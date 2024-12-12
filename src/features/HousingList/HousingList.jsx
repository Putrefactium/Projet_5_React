import { useState, useEffect, useRef, useCallback } from 'react'
import HousingCard from '@features/HousingCard/HousingCard'
import housingsList from '@data/logements.json'

function HousingList() {
  const [housings, setHousings] = useState([])
  const [displayCount, setDisplayCount] = useState(3)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const containerRef = useRef(null)

  // Gestion du responsive
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Si on n'est pas sur mobile, on affiche tous les logements
      setDisplayCount(mobile ? 3 : housingsList.length)
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Check initial

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Chargement des logements
  useEffect(() => {
    setHousings(housingsList.slice(0, displayCount))
  }, [displayCount])

  // Fonction de détection du scroll (uniquement sur mobile)
  const handleScroll = useCallback(() => {
    if (isMobile && containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current
      
      if (scrollHeight - scrollTop - clientHeight < 100) {
        setDisplayCount(prev => Math.min(prev + 3, housingsList.length))
      }
    }
  }, [isMobile])

  // Gestion du scroll uniquement sur mobile
  useEffect(() => {
    const currentContainer = containerRef.current
    if (currentContainer && isMobile) {
      currentContainer.addEventListener('scroll', handleScroll)
    }
    
    return () => {
      if (currentContainer && isMobile) {
        currentContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll, isMobile])

  return (
    <section className="housing-list">
      <div className="housing-list__container" ref={containerRef}>
        {housings.map(housing => (
          <HousingCard 
            key={housing.id}
            id={housing.id}
            title={housing.title}
            cover={housing.cover}
          />
        ))}
      </div>
    </section>
  )
}

export default HousingList