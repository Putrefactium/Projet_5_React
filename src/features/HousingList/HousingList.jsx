import { useState, useEffect, useRef, useCallback } from 'react'
import HousingCard from '@features/HousingCard/HousingCard'
import PaginationDots from '@components/UI/PaginationDots/PaginationDots'
import useHousingList from '@hooks/useHousingList' // Import du hook personnalisé
import styles from './HousingList.module.scss'

function HousingList() {
  // Constantes
  const INITIAL_LOADED_COUNT = 4 // Nombre de cartes à charger par défaut en mode mobile
  const NEXT_CARDS_TO_LOAD = 2 // Nombre de cartes à charger au scroll en mode mobile

  // States
  const { housingsList, error, isLoading } = useHousingList() // Récupération des logements depuis le hook personnalisé qui récupère les logements depuis le contexte
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
  }, [isMobile, loadedCount, cardsPerPage, currentPage, housingsList])

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
  }, [isMobile, housingsList])

  // Initialisation des cartes à afficher 
  useEffect(() => {
    setCurrentCards(getDisplayedHousings())
  }, [getDisplayedHousings, housingsList])

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
      return currentCards.length <= 3 ? 'singleRow' : 'doubleRow';
    }

    // En mode Desktop Tablette (2 colonnes)
    return currentCards.length <= 2 ? 'singleRow' : 'doubleRow';
    
  }, [isLarge, currentCards.length, isMobile]);

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
    return (
      <section className={styles.list}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            Chargement des logements...
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.list}>
        <div className={styles.container}>
          <div className={styles.errorState}>
            Une erreur est survenue : {error}
          </div>
        </div>
      </section>
    )
  }

  // Si pas de logements
  if (!housingsList || housingsList.length === 0) {
    return (
      <section className={styles.list}>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            Aucun logement disponible
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.list} ref={containerRef}>
      <div className={styles.container}>
        <div className={`${styles.viewport} ${getRowsClass() ? styles[getRowsClass()] : ''}`}>
          <div className={`${styles.wrapper} ${isTransitioning ? styles.exiting : ''}`}>
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
            <div className={`${styles.wrapper} ${styles.entering}`}>
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
          <div ref={loadingRef} className={styles.loading}>
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