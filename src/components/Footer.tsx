import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-dot" />
            Djem's Agency
          </div>
          <p className="footer-tagline">Agence digitale africaine — Solutions numériques modernes.</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <div className="footer-col-title">Produits</div>
            <a href="https://konsulta-cameroun.com" target="_blank" rel="noopener">Konsulta</a>
            <a href="https://djem-s.site" target="_blank" rel="noopener">Djem's</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <a href="#services">Sites web</a>
            <a href="#services">Applications web</a>
            <a href="#services">Solutions digitales</a>
            <a href="#services">Communication</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <a href="mailto:djieritechnology@gmail.com">djieritechnology@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} Djem's Agency. Tous droits réservés.</span>
      </div>
    </footer>
  )
}
