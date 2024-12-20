import { Link } from 'react-router-dom'
import Header from '@layout/Header/Header'
import Footer from '@layout/Footer/Footer'
import styles from './Error.module.scss'

function Error() {
  return (
    <>
    <div className={styles.mainError}>
    <Header />
      <main className={styles.error}> 
        <h1>404</h1>
        <p>
          <span>Oups! La page que </span>
          <span>vous demandez n&apos;existe pas.</span> 
        </p>
        <Link to="/">Retourner sur la page d&apos;accueil</Link>
      </main>
    </div>
    <Footer />
    </>
  )
}

export default Error 