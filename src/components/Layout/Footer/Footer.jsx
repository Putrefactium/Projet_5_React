import logo from '@assets/footer_logo_mobile.png'

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="Kasa" />
      <p className="footer__p">© 2020 Kasa. All rights reserved</p>
    </footer>
  )
}

export default Footer 