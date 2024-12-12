import React from 'react'
import { useParams } from 'react-router-dom'
import './Housing.scss'

function Housing() {
  const { id } = useParams()
  
  return (
    <main className="housing">
      <h1>Logement {id}</h1>
    </main>
  )
}

export default Housing 