import { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.module.scss'

const Modal = ({ images, initialIndex, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);
    const modalRef = useRef(null); // équivalent de document.querySelector
  
    // Gestion de la fermeture de la modal avec un clic sur l'overlay qui 
    // est en dehors de la modal
    const handleCloseClick = (e) => {
      if (e.target === e.currentTarget ) {
        onClose();
      }
    };

    // Gestion de la fermeture de la modal avec la touche Escape
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [onClose]);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
      
    const previousImage = () => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
  
    return (
      <div className={styles.modalOverlay} onClick={handleCloseClick}>
        <div className={styles.modalContent} ref={modalRef}>
          <div className={styles.modalImage}>
            <img src={images[currentImageIndex]} alt="Logement" />
            <button 
              className={`${styles.navButton} ${styles.prev}`} 
              onClick={previousImage}
            >
                <span className={styles.arrow}></span>
            </button>
            <button 
              className={`${styles.navButton} ${styles.next}`} 
              onClick={nextImage}
            >
                <span className={styles.arrow}></span>
            </button>
          </div>
        </div>
      </div>
    );
  };

Modal.propTypes = {
  images: PropTypes.array.isRequired,
  initialIndex: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal
