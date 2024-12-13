import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HousingProvider } from '@providers/HousingProvider'
import { router } from './router'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HousingProvider>
      <RouterProvider router={router} />
    </HousingProvider>
  </React.StrictMode>
) 