import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HousingProvider } from '@providers/HousingProvider'
import { router } from './router'
import './styles/main.scss'
import { config } from '@config/config'
import '@utils/fontawesome'

document.title = config.app.name

ReactDOM.createRoot(document.getElementById('root')).render(
  <HousingProvider>
    <RouterProvider router={router} />
  </HousingProvider>
) 