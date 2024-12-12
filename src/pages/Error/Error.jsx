import React from 'react'
import { Link } from 'react-router-dom'
import './Error.scss'

function Error() {
  return (
    <main className="error">
      <h1>404</h1>
      <p>Oups! La page que vous demandez n'existe pas.</p>
      <Link to="/">Retourner sur la page d'accueil</Link>
    </main>
  )
}

export default Error 