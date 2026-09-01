import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLLIElement[]>([])

  const links = [
    { label: 'Produits', href: '#products' },
    { label: 'Services', href: '#services' },
    { label: 'Approche', href: '#approach' },
    { label: 'Technologies', href: '#technologies' },
  ]

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    )
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    if (open) {
      document.body.style.overflow = 'hidden'
      gsap.set(menu, { display: 'flex' })
      gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(linksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.07, delay: 0.1 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(menu, {
        opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => gsap.set(menu, { display: 'none' })
      })
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <nav ref={navRef} className={`navbar${scrolled ? ' scrolled' : ''}`} style={{ opacity: 0 }}>
      <div className="navbar-inner container">
        <a href="#" className="navbar-logo">
          <span className="logo-dot" />
          Djem's Agency
        </a>

        <ul className="navbar-links-desktop">
          {links.map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
          <li>
            <a href="#cta" className="navbar-cta">Démarrer un projet</a>
          </li>
        </ul>

        <button
          className={`navbar-burger${open ? ' is-open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div ref={menuRef} className="navbar-mobile" style={{ display: 'none' }}>
        <div className="mobile-top">
          <a href="#" className="navbar-logo" onClick={close}>
            <span className="logo-dot" />
            Djem's Agency
          </a>
          <button className="mobile-close" onClick={close} aria-label="Fermer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <ul className="mobile-links">
          {links.map((l, i) => (
            <li key={l.href} ref={el => { if (el) linksRef.current[i] = el }}>
              <a href={l.href} onClick={close}>
                <span className="mobile-link-num">0{i + 1}</span>
                {l.label}
                <svg className="mobile-link-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <div
          className="mobile-cta-wrap"
          ref={el => { if (el) linksRef.current[links.length] = el as unknown as HTMLLIElement }}
        >
          <a href="#cta" className="btn-primary mobile-cta-btn" onClick={close}>
            Démarrer un projet
          </a>
          <a href="tel:+237686618240" className="mobile-phone">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 1h3l1.5 4L6 6.5c1 2 2.5 3.5 4.5 4.5L12 9.5l4 1.5v3a1 1 0 01-1 1C6.16 15 1 9.84 1 2a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            +237 686 618 240
          </a>
          <p className="mobile-tagline">Transformons votre idée en produit.</p>
        </div>
      </div>
    </nav>
  )
}
