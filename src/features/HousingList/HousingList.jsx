import { useState, useEffect, useRef, useCallback } from 'react'
import HousingCard from '@features/HousingCard/HousingCard'
import PaginationDots from '@components/UI/PaginationDots/PaginationDots'
import housingsList from '@data/logements.json'

function HousingList() {
  // Constantes
  const INITIAL_LOADED_COUNT = 4 // Nombre de cartes à charger par défaut en mode mobile
  const NEXT_CARDS_TO_LOAD = 2 // Nombre de cartes à charger au scroll en mode mobile

  // States
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 1440)
  const [currentPage, setCurrentPage] = useState(0)
  const [loadedCount, setLoadedCount] = useState(INITIAL_LOADED_COUNT) // Nombre de cartes à charger par défaut en mode mobile
  const [isTransitioning, setIsTransitioning] = useState(false) // Indicateur de transition entre les pages
  const [currentCards, setCurrentCards] = useState([]) // Cartes actuellement affichées
  const [nextCards, setNextCards] = useState([]) // Cartes suivantes à afficher (pour une transition fluide)
  
  // Refs
  const observerRef = useRef() // Ref pour l'Intersection Observer pour le lazy loading artificiel en mode mobile
  const loadingRef = useRef(null) // Ref pour le div de chargement en mode mobile
  const containerRef = useRef(null) // Ref pour le container de la liste de logements

  // Calculs
  const cardsPerPage = isLarge ? 6 : 4 // Nombre de cartes par page en mode Large, sinon 4 en Tablette
  const totalPages = Math.ceil(housingsList.length / cardsPerPage) // Nombre total de pages
  
  // Fonction des logements à afficher
  const getDisplayedHousings = useCallback((page = currentPage) => {
    // Si on est en mode mobile, on affiche les 4 premiers logements
    if (isMobile) {
      return housingsList.slice(0, loadedCount)
    }
    // Sinon, on récupère l'index de la page actuelle
    const startIndex = page * cardsPerPage
    // On retourne les logements de la page actuelle
    return housingsList.slice(startIndex, startIndex + cardsPerPage)
  }, [isMobile, loadedCount, cardsPerPage, currentPage])

  // Configuration de l'Observer pour le lazy loading artificiel en mode mobile
  useEffect(() => {
    // Nouvelle instance de l'Observer
    observerRef.current = new IntersectionObserver(
      // Fonction de callback pour l'Observer
      (entries) => {
        // On récupère la première entrée de l'Observer
        const target = entries[0]
        // Si l'entrée est visible et que on est en mode mobile, on charge les cartes suivantes
        if (target.isIntersecting && isMobile) {
          setLoadedCount(prev => Math.min(prev + NEXT_CARDS_TO_LOAD, housingsList.length))
        }
      },
      // Options de l'Observer
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
  }, [getDisplayedHousings])

  // Gestion de la transition entre les pages 
  const handlePageTransition = useCallback((nextPage) => {
    if (isTransitioning) return
    
    // On récupère les logements de la page suivante
    const nextHousings = getDisplayedHousings(nextPage)

    // On met les logements de la page suivante dans le state nextCards
    setNextCards(nextHousings)

    // On active l'indicateur de transition
    setIsTransitioning(true)

    // On attend 500ms avant 
    // de mettre les logements de la page suivante 
    // dans le state currentCards 
    // et de désactiver l'indicateur de transition
    // car temps d'animation de la transition
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

    // On ajoute un écouteur d'événements pour le redimensionnement 
    // de la fenêtre
    window.addEventListener('resize', handleResize)

    // On retire l'écouteur d'événements lors du démontage du composant
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Défilement automatique (tout sauf mobile)
  // Change la page toutes les 5 secondes
  // Utilise un modulo pour boucler sur les pages
  useEffect(() => {
    // Si on est en mode non mobile et que la transition n'est pas active
    if (!isMobile && !isTransitioning) {
      // On définit un intervalle de 5000ms pour défiler les pages
      const interval = setInterval(() => {
        // On défile les pages en utilisant un modulo pour boucler sur les pages
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
          {/* Cartes actuelles */}
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
          {/* Cartes suivantes (pendant la transition) */}
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
         {/* Indicateur de chargement en mode mobile */}
         {/* TODO: Ajouter un loader */}
        {isMobile && loadedCount < housingsList.length && (
          <div ref={loadingRef} className="housing-list__loading">
            Chargement...
          </div>
        )}
        {/* Pagination en mode non mobile */}
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