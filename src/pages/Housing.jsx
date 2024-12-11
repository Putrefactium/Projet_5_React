import React from 'react'
import { useParams } from 'react-router-dom'

function Housing() {
  const { id } = useParams()
  return (
    <div>
      <h1>Logement {id}</h1>
    </div>
  )
}

export default Housing 