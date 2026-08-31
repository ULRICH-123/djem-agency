import { useRef, useEffect } from 'react'
import { gsap } from '../lib/gsap'
import './Technologies.css'

const techs = [
  {
    name: 'Next.js',
    color: '#000000',
    svg: (
      <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="black"/>
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1V69.3L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white"/>
        <rect x="115" y="54" width="12" height="72" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'React',
    color: '#61DAFB',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="8" fill="#61DAFB"/>
        <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#61DAFB" strokeWidth="4" fill="none"/>
        <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#61DAFB" strokeWidth="4" fill="none" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#61DAFB" strokeWidth="4" fill="none" transform="rotate(120 50 50)"/>
      </svg>
    ),
  },
  {
    name: 'Vue.js',
    color: '#42B883',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,90 5,10 20,10 50,62 80,10 95,10" fill="#42B883"/>
        <polygon points="50,62 28,10 42,10 50,38 58,10 72,10" fill="#35495E"/>
      </svg>
    ),
  },
  {
    name: 'Nuxt.js',
    color: '#00DC82',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M55 20L90 80H65L50 53L35 80H10L45 20H55Z" fill="#00DC82"/>
        <path d="M65 80H90L75 55Z" fill="#00DC82" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    color: '#339933',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 8L90 30V70L50 92L10 70V30L50 8Z" fill="#339933"/>
        <path d="M50 8L90 30V70L50 92L10 70V30L50 8Z" fill="none" stroke="#fff" strokeWidth="1" opacity="0.2"/>
        <text x="50" y="58" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="monospace">JS</text>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="8" fill="#3178C6"/>
        <text x="50" y="68" textAnchor="middle" fill="white" fontSize="42" fontWeight="bold" fontFamily="monospace">TS</text>
      </svg>
    ),
  },
  {
    name: 'Three.js',
    color: '#000000',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,10 90,80 10,80" fill="none" stroke="#111" strokeWidth="5"/>
        <polygon points="50,30 70,65 30,65" fill="#111"/>
        <circle cx="50" cy="10" r="4" fill="#555"/>
        <circle cx="90" cy="80" r="4" fill="#555"/>
        <circle cx="10" cy="80" r="4" fill="#555"/>
      </svg>
    ),
  },
  {
    name: 'NestJS',
    color: '#E0234E',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M38 18C28 28 22 42 24 58C26 72 36 84 50 88C64 84 74 72 76 58C78 42 72 28 62 18C58 30 54 36 50 38C46 36 42 30 38 18Z" fill="#E0234E"/>
        <path d="M50 38C46 36 42 30 38 18C32 24 28 32 26 42C34 40 42 38 50 38Z" fill="#fff" opacity="0.15"/>
        <path d="M50 38C54 36 58 30 62 18C68 24 72 32 74 42C66 40 58 38 50 38Z" fill="#fff" opacity="0.08"/>
        <text x="50" y="72" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="monospace">nest</text>
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    color: '#336791',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="30" rx="32" ry="14" fill="#336791"/>
        <rect x="18" y="30" width="64" height="40" fill="#336791"/>
        <ellipse cx="50" cy="70" rx="32" ry="14" fill="#2d5f82"/>
        <ellipse cx="50" cy="30" rx="32" ry="14" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.3"/>
        <line x1="18" y1="45" x2="82" y2="45" stroke="#fff" strokeWidth="1" opacity="0.2"/>
        <line x1="18" y1="58" x2="82" y2="58" stroke="#fff" strokeWidth="1" opacity="0.2"/>
        <text x="50" y="34" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">PG</text>
      </svg>
    ),
  },
]

export default function Technologies() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.technologies .section-label, .technologies .section-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
      )
      gsap.fromTo('.tech-item',
        { y: 40, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: '.tech-grid', start: 'top 85%', once: true } }
      )
      gsap.fromTo('.tech-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.tech-line', start: 'top 90%', once: true } }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section technologies" id="technologies" ref={sectionRef}>
      <div className="container">
        <div className="section-label" style={{ opacity: 0 }}>Stack technique</div>
        <h2 className="section-title" style={{ opacity: 0 }}>
          Technologies<br />que nous maîtrisons.
        </h2>
        <div className="tech-grid">
          {techs.map(t => (
            <div key={t.name} className="tech-item" style={{ opacity: 0 }}>
              <div className="tech-logo">{t.svg}</div>
              <span className="tech-name">{t.name}</span>
              <div className="tech-dot" style={{ background: t.color, marginLeft: 'auto' }} />
            </div>
          ))}
        </div>
        <div className="tech-line" />
      </div>
    </section>
  )
}
