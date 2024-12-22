import { useEffect } from 'react';

/**
 * @description Hook pour mettre à jour les balises meta du document
 * @param {string} title - Le titre de la page
 * @param {string} description - La description de la page
 * @param {string} canonical - L'URL canonique de la page
 * @param {string} ogImage - L'URL de l'image Open Graph de la page
 * @returns {void}
 */
export const useDocumentMeta = ({ title, description, canonical, ogImage }) => {
 useEffect(() => {

   // Mise à jour du titre
   const defaultTitle = 'Kasa';
   document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;

    // Mise à jour ou création des meta tags
   const updateMetaTag = (name, content) => {
     let meta = document.querySelector(`meta[name="${name}"]`) ||
                document.querySelector(`meta[property="${name}"]`);
                
     if (!meta && content) {
       meta = document.createElement('meta');
       meta.setAttribute(name.includes('og:') ? 'property' : 'name', name);
       document.head.appendChild(meta);
     }
     
     if (meta && content) {
       meta.setAttribute('content', content);
     } else if (meta && !content) {
       meta.remove();
     }
   };

    // Mise à jour des balises meta
   updateMetaTag('description', description);
   updateMetaTag('og:title', title);
   updateMetaTag('og:description', description);
   updateMetaTag('og:image', ogImage);

    // Gestion du lien canonique
   let canonicalLink = document.querySelector('link[rel="canonical"]');

   if (!canonicalLink && canonical) {
     canonicalLink = document.createElement('link');
     canonicalLink.setAttribute('rel', 'canonical');
     document.head.appendChild(canonicalLink);
   }

   if (canonicalLink && canonical) {
     canonicalLink.setAttribute('href', canonical);
   } else if (canonicalLink && !canonical) {
     canonicalLink.remove();
   }

    // Nettoyage lors du démontage du composant
   return () => {
     // Optionnel : remettre les valeurs par défaut
     document.title = defaultTitle;
   };

 }, [title, description, canonical, ogImage]);
 
};