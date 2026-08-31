import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import './Services.css'

const services = [
  {
    num: '01',
    title: 'Création de sites web',
    desc: 'Des sites web modernes, rapides, responsives et adaptés aux besoins des entreprises.',
    tech: 'Next.js · React · Vue.js · Nuxt.js · Node.js',
    icon: '◈',
  },
  {
    num: '02',
    title: 'Applications web',
    desc: 'Nous concevons des applications web modernes permettant aux entreprises de digitaliser leurs activités et leurs processus.',
    tech: 'React · TypeScript · Node.js · PostgreSQL',
    icon: '⬡',
  },
  {
    num: '03',
    title: 'Solutions digitales',
    desc: 'Conception et développement de produits numériques adaptés aux problématiques spécifiques des entreprises.',
    tech: 'Architecture · API · Cloud · Scalabilité',
    icon: '◎',
  },
  {
    num: '04',
    title: 'Communication digitale',
    desc: 'Nous accompagnons les entreprises dans leur présence numérique : stratégie digitale, création de contenus, réseaux sociaux et visibilité en ligne.',
    tech: 'Stratégie · Contenu · SEO · Social',
    icon: '◉',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.services .section-label, .services .section-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
      )
      gsap.fromTo('.services .service-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.services-grid', start: 'top 80%', once: true } }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section services" id="services" ref={sectionRef}>
      <div className="container">
        <div className="section-label" style={{ opacity: 0 }}>Nos services</div>
        <h2 className="section-title" style={{ opacity: 0 }}>
          Nous transformons vos idées<br />en expériences digitales.
        </h2>
        <div className="services-grid">
          {services.map(s => (
            <div key={s.num} className="service-card" style={{ opacity: 0 }}>
              <div className="service-header">
                <span className="service-icon">{s.icon}</span>
                <span className="service-num">{s.num}</span>
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-tech">{s.tech}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
