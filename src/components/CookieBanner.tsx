import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './CookieBanner.css'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showPolicy, setShowPolicy] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setTimeout(() => setVisible(true), 1500)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const refuse = () => {
    localStorage.setItem('cookie_consent', 'refused')
    setVisible(false)
  }

  if (!visible && !showPolicy) return null

  return createPortal(
    <>
      {visible && (
        <div className="cookie-banner">
          <div className="cookie-content">
            <div className="cookie-icon">🍪</div>
            <div className="cookie-text">
              <p className="cookie-title">Nous utilisons des cookies</p>
              <p className="cookie-desc">
                Pour améliorer votre expérience et analyser notre trafic.{' '}
                <button className="cookie-link" onClick={() => setShowPolicy(true)}>
                  Politique de confidentialité
                </button>
              </p>
            </div>
            <div className="cookie-actions">
              <button className="cookie-btn cookie-btn--refuse" onClick={refuse}>Refuser</button>
              <button className="cookie-btn cookie-btn--accept" onClick={accept}>Accepter</button>
            </div>
          </div>
        </div>
      )}

      {showPolicy && (
        <div className="cookie-policy-overlay" onClick={() => setShowPolicy(false)}>
          <div className="cookie-policy" onClick={e => e.stopPropagation()}>
            <button className="cookie-policy-close" onClick={() => setShowPolicy(false)}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <h2>Politique de confidentialité</h2>
            <p><strong>Djem's Agency</strong> — <a href="https://www.djems-agency.site">www.djems-agency.site</a></p>

            <h3>1. Cookies utilisés</h3>
            <p>Nous utilisons des cookies essentiels pour le bon fonctionnement du site et des cookies analytiques pour comprendre comment les visiteurs interagissent avec nos pages.</p>

            <h3>2. Données collectées</h3>
            <p>Nous pouvons collecter des données de navigation anonymes (pages visitées, durée de session) via des outils d'analyse. Aucune donnée personnelle identifiable n'est collectée sans votre consentement explicite.</p>

            <h3>3. Finalité</h3>
            <p>Les données collectées sont utilisées uniquement pour améliorer nos services et notre site web. Elles ne sont jamais vendues à des tiers.</p>

            <h3>4. Vos droits</h3>
            <p>Vous pouvez à tout moment refuser les cookies non essentiels, ou retirer votre consentement en effaçant les données de votre navigateur.</p>

            <h3>5. Contact</h3>
            <p>Pour toute question : <a href="mailto:djieritechnology@gmail.com">djieritechnology@gmail.com</a> — Tél : +237 686 618 240</p>

            <div className="cookie-policy-actions">
              <button className="cookie-btn cookie-btn--refuse" onClick={() => { refuse(); setShowPolicy(false) }}>Refuser</button>
              <button className="cookie-btn cookie-btn--accept" onClick={() => { accept(); setShowPolicy(false) }}>Accepter</button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  )
}
