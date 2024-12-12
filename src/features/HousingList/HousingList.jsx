import { useState, useEffect, useRef, useCallback } from 'react'
import HousingCard from '@features/HousingCard/HousingCard'
import PaginationDots from '@components/UI/PaginationDots/PaginationDots'
import housingsList from '@data/logements.json'

function HousingList() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 1440)
  const [currentPage, setCurrentPage] = useState(0)
  const [loadedCount, setLoadedCount] = useState(4)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentCards, setCurrentCards] = useState([])
  const [nextCards, setNextCards] = useState([])
  
  const observerRef = useRef()
  const loadingRef = useRef(null)
  const containerRef = useRef(null)

  const cardsPerPage = isLarge ? 6 : 4
  const totalPages = Math.ceil(housingsList.length / cardsPerPage)

  // Obtenir les logements à afficher
  const getDisplayedHousings = useCallback((page = currentPage) => {
    if (isMobile) {
      return housingsList.slice(0, loadedCount)
    }
    const startIndex = page * cardsPerPage
    return housingsList.slice(startIndex, startIndex + cardsPerPage)
  }, [isMobile, loadedCount, cardsPerPage, currentPage])

  // Configuration de l'Intersection Observer pour la pagination mobile
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && isMobile) {
          setLoadedCount(prev => Math.min(prev + 4, housingsList.length))
        }
      },
      { threshold: 0.1 }
    )

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isMobile])

  // Initialisation des cartes à afficher 
  useEffect(() => {
    setCurrentCards(getDisplayedHousings())
  }, [isMobile, loadedCount, getDisplayedHousings])

  // Gestion de la transition entre les pages 
  const handlePageTransition = useCallback((nextPage) => {
    if (isTransitioning) return
    
    const nextHousings = getDisplayedHousings(nextPage)
    setNextCards(nextHousings)
    setIsTransitioning(true)

    setTimeout(() => {
      setCurrentPage(nextPage)
      setCurrentCards(nextHousings)
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning, getDisplayedHousings])

  // Gestion du responsive 
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsLarge(width >= 1440)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Défilement automatique (tout sauf mobile)
  useEffect(() => {
    if (!isMobile && !isTransitioning) {
      const interval = setInterval(() => {
        handlePageTransition((currentPage + 1) % totalPages)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isMobile, currentPage, isTransitioning, totalPages, handlePageTransition])

  const handlePageChange = useCallback((pageNumber) => {
    handlePageTransition(pageNumber)
  }, [handlePageTransition])

  // Ajout d'une fonction pour calculer le nombre de rangées
  const getRowsClass = useCallback(() => {
    if (isMobile) return '';

    // En mode large (3 colonnes)
    if (isLarge) {
      return currentCards.length <= 3 ? 'single-row' : 'double-row';
    }

    // En mode Desktop Tablette (2 colonnes)
    return currentCards.length <= 2 ? 'single-row' : 'double-row';
    
  }, [isLarge, currentCards.length, isMobile]);

  return (
    <section className="housing-list" ref={containerRef}>
      <div className="housing-list__container">
        <div className={`housing-list__viewport ${getRowsClass()}`}>
          <div className={`housing-list__wrapper ${isTransitioning ? 'exiting' : ''}`}>
            {currentCards.map(housing => (
              <HousingCard 
                key={housing.id}
                id={housing.id}
                title={housing.title}
                cover={housing.cover}
              />
            ))}
          </div>
          {isTransitioning && (
            <div className="housing-list__wrapper entering">
              {nextCards.map(housing => (
                <HousingCard 
                  key={housing.id}
                  id={housing.id}
                  title={housing.title}
                  cover={housing.cover}
                />
              ))}
            </div>
          )}
        </div>
        {isMobile && loadedCount < housingsList.length && (
          <div ref={loadingRef} className="housing-list__loading">
            Chargement...
          </div>
        )}
        {!isMobile && (
          <PaginationDots 
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  )
}

export default HousingList