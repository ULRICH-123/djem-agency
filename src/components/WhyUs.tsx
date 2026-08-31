import { useRef, useEffect } from 'react'
import { gsap } from '../lib/gsap'
import './WhyUs.css'

const features = [
  { icon: '✦', title: 'Design moderne', desc: 'Des interfaces pensées pour offrir une expérience utilisateur de qualité.' },
  { icon: '⬡', title: 'Technologies modernes', desc: 'Nous utilisons des technologies web modernes pour créer des produits rapides et évolutifs.' },
  { icon: '◎', title: 'Vision produit', desc: "Nous ne faisons pas uniquement du code : nous réfléchissons à la manière dont le produit peut réellement répondre au besoin." },
  { icon: '◈', title: 'Accompagnement', desc: "Nous travaillons avec nos clients de l'idée jusqu'au lancement et à l'évolution du produit." },
]

const stats = [
  { value: '100%', label: 'Projets livrés' },
  { value: '2+', label: 'Produits lancés' },
  { value: '∞', label: 'Ambition' },
]

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.whyus .section-label, .whyus .section-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
      )
      gsap.fromTo('.stat',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.whyus-stats', start: 'top 85%', once: true } }
      )
      gsap.fromTo('.feature-item',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.whyus-features', start: 'top 80%', once: true } }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section whyus" id="whyus" ref={sectionRef}>
      <div className="container">
        <div className="section-label" style={{ opacity: 0 }}>Pourquoi nous ?</div>
        <div className="whyus-layout">
          <div className="whyus-left">
            <h2 className="section-title" style={{ opacity: 0 }}>
              Une agence qui pense<br />produit avant tout.
            </h2>
            <div className="whyus-stats">
              {stats.map(s => (
                <div key={s.label} className="stat" style={{ opacity: 0 }}>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="whyus-features">
            {features.map(f => (
              <div key={f.title} className="feature-item" style={{ opacity: 0 }}>
                <span className="feature-icon">{f.icon}</span>
                <div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
