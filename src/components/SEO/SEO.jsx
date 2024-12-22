import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import PropTypes from 'prop-types';
/**
 * @description Composant pour gérer les balises meta du document
 * @param {string} title - Le titre de la page
 * @param {string} description - La description de la page
 * @param {string} canonical - L'URL canonique de la page
 * @param {string} ogImage - L'URL de l'image Open Graph de la page
 * @returns {null}
 */
function SEO({ title, description, canonical, ogImage }) {
 useDocumentMeta({ title, description, canonical, ogImage });
 return null;
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonical: PropTypes.string,
  ogImage: PropTypes.string,
};

export default SEO;