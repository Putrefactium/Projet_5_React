import { Outlet } from 'react-router-dom'
import Header from '@layout/Header/Header'
import Footer from '@layout/Footer/Footer'

function Layout() {
  return (
    <div className="layout">
      <div className="layout__content"> 
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout   