import CollapseButton from '@components/UI/CollapseButton/CollapseButton'
import dataAbout from '@data/about_data.json'
import styles from './OurValuesContainer.module.scss'

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