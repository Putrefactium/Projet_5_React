import { Link } from 'react-router-dom'
import Header from '@layout/Header/Header'
import Footer from '@layout/Footer/Footer'
import './Error.scss'

function Error() {
  return (
    <>
    <div className="main-error">
    <Header />
      <main className="error"> 
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