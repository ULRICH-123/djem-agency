import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    )
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Produits', href: '#products' },
    { label: 'Services', href: '#services' },
    { label: 'Approche', href: '#approach' },
    { label: 'Technologies', href: '#technologies' },
  ]

  return (
    <nav ref={navRef} className={`navbar${scrolled ? ' scrolled' : ''}`} style={{ opacity: 0 }}>
      <div className="navbar-inner container">
        <a href="#" className="navbar-logo">
          <span className="logo-dot" />
          Djem's Agency
        </a>

        <ul className={`navbar-links${open ? ' open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#cta" className="navbar-cta" onClick={() => setOpen(false)}>
              Démarrer un projet
            </a>
          </li>
        </ul>

        <button className="navbar-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span className={open ? 'open' : ''} />
          <span className={open ? 'open' : ''} />
        </button>
      </div>
    </nav>
  )
}
