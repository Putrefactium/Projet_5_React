import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './MainLayout/MainLayout'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Housing from './pages/Housing/Housing'
import Error from './pages/Error/Error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'housing/:id',
        element: <Housing />
      }
    ]
  }
]) 