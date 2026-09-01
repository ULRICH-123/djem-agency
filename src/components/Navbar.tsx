import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from '../lib/gsap'
import './Navbar.css'

const links = [
  { label: 'Produits', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'Approche', href: '#approach' },
  { label: 'Technologies', href: '#technologies' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLLIElement[]>([])

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
      menu.style.display = 'flex'
      gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      gsap.fromTo(linksRef.current.filter(Boolean),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.06, delay: 0.1 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(menu, {
        opacity: 0, duration: 0.2, ease: 'power2.in',
        onComplete: () => { menu.style.display = 'none' }
      })
    }
  }, [open])

  const close = () => setOpen(false)

  const mobileMenu = (
    <div ref={menuRef} className="navbar-mobile" style={{ display: 'none' }}>
      <div className="mobile-top">
        <span className="navbar-logo">
          <span className="logo-dot" />
          Djem's Agency
        </span>
        <button className="mobile-close" onClick={close} aria-label="Fermer">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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

      <div className="mobile-cta-wrap" ref={el => { if (el) linksRef.current[links.length] = el as unknown as HTMLLIElement }}>
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
  )

  return (
    <>
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
      </nav>

      {createPortal(mobileMenu, document.body)}
    </>
  )
}
