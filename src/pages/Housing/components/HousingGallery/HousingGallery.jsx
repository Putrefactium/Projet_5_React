import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
import styles from './HousingGallery.module.scss'
import { config } from '@config/config'
import Modal from '../Modal/Modal'

/**
 * @description Composant qui affiche une galerie d'images avec une transition fluide entre les images
 * @component
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.pictures - Un tableau d'URL d'images
 * 
 * @example
 * return (
 *   <HousingGallery pictures={['image1.jpg', 'image2.jpg', 'image3.jpg']} />
 * )
 * 
 * @returns {JSX.Element} Un div contenant les images et les boutons de navigation
 */

function HousingGallery({ pictures }) {
  const [currentImage, setCurrentImage] = useState(0) 
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextImage, setNextImage] = useState(null)
  const [direction, setDirection] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < config.layout.breakpoints.mobile) 
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Gestion de la navigation entre les images
  const handleNavigation = useCallback((direction) => {
    if (isTransitioning) return // Si une transition est en cours, on ne fait rien
    if (isModalOpen) return // Si la modal est ouverte, on ne fait rien

    const nextIndex = direction === 'next' 
    ? (currentImage + 1) % pictures.length 
    : (currentImage - 1 + pictures.length) % pictures.length

    // Début de la transition
    setNextImage(nextIndex)
    setIsTransitioning(true)
    setDirection(direction)
    // Après 500ms (durée de la transition), on met à jour l'image courante
    setTimeout(() => {
      setCurrentImage(nextIndex)
      setIsTransitioning(false)
   }, 500)
  }, [currentImage, pictures, isTransitioning, isModalOpen])

  // Gestion de l'ouverture de la modal
  const openModal = (index) => {
    setIsModalOpen(true)
    setSelectedImageIndex(index)
  }

  // Gestion de la fermeture de la modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Gestion de la transition automatique entre les images
  useEffect(() => {
    const interval = setInterval(() => {
      handleNavigation('next')
    }, config.animation.autoScrollInterval)
    return () => clearInterval(interval)
  }, [handleNavigation])

  // Gestion du mode mobile
  useEffect(() => {
    const handleResize = () => { 
      setIsMobile(window.innerWidth < config.layout.breakpoints.mobile)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Gestion des erreurs
  if (!Array.isArray(pictures)) {
    return <div className={styles.error}>Une erreur est survenue lors du chargement des images</div>
  }
  if (pictures.length === 0) {
    return <div className={styles.error}>Aucune image disponible</div>
  }

  return (
   <div className={styles.gallery}>
     {/* Container principal avec les images */}
     <div className={styles.viewport}>
       <div className={`${styles.wrapper} ${
        isTransitioning 
          ? direction === 'next' 
            ? styles.exitingToRight 
            : styles.exitingToLeft 
          : ''
        }`}>
         <img 
           src={pictures[currentImage]} 
           alt={`Logement - Vue ${currentImage + 1}`} 
           onClick={() => openModal(currentImage)}
         />
       </div>
       
       {/* Image suivante (visible pendant la transition) */}
       {isTransitioning && (
         <div className={`${styles.wrapper} ${
          direction === 'next' 
            ? styles.enteringToRight 
            : styles.enteringToLeft
          }`}>
           <img 
             src={pictures[nextImage]} 
             alt={`Logement - Vue ${nextImage + 1}`} 
           />
         </div>
       )}
     </div>
      {/* Boutons de navigation (affichés uniquement s'il y a plus d'une image) */}
     {pictures.length > 1 && (
       <>
         <button 
           className={`${styles.navButton} ${styles.prev}`}
           onClick={() => handleNavigation('prev')}
           aria-label="Image précédente"
         >
           <span className={styles.arrow}></span>
         </button>
         {/* Ajout du compteur d'images */}
        {isMobile ? null : <div className={styles.counter}>
          {currentImage + 1}/{pictures.length}
        </div>}
         <button 
           className={`${styles.navButton} ${styles.next}`}
           onClick={() => handleNavigation('next')}
           aria-label="Image suivante"
         >
           <span className={styles.arrow}></span>
         </button>
       </>
     )}
     {isModalOpen && (
       <Modal 
         images={pictures} 
         initialIndex={selectedImageIndex} 
         onClose={closeModal}
       />
     )}
   </div>
 )
}

HousingGallery.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default HousingGallery
