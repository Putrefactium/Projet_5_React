import CollapseButton from '@components/UI/CollapseButton/CollapseButton'
import dataAbout from '@data/about_data.json'
import styles from './OurValuesContainer.module.scss'

/**
 * @description Composant qui affiche les valeurs de Kasa avec un bouton de collapse pour chaque valeur
 * @component
 * 
 * @example
 * return (
 *   <OurValuesContainer />
 * )
 * 
 * @returns {JSX.Element} Un div contenant les boutons de collapse
 */

function OurValuesContainer() {
  return (
    <div className={styles.container}>
      {dataAbout.map((item) => (
        <CollapseButton 
          key={item.id} 
          title={item.title} 
          content={item.content} 
        />
      ))}
    </div>
  )
}

export default OurValuesContainer