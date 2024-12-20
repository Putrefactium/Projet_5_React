import { Outlet } from 'react-router-dom'
import Header from '@layout/Header/Header'
import Footer from '@layout/Footer/Footer'
import styles from './MainLayout.module.scss'

function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.content}> 
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout   