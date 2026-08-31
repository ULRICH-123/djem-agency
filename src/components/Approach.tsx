import { useRef, useEffect } from 'react'
import { gsap } from '../lib/gsap'
import './Approach.css'

const steps = [
  { num: '01', title: 'Comprendre', desc: 'Nous analysons votre besoin, votre activité et vos objectifs.' },
  { num: '02', title: 'Concevoir', desc: 'Nous transformons votre idée en une expérience et une interface modernes.' },
  { num: '03', title: 'Développer', desc: 'Nous construisons une solution performante, sécurisée et évolutive.' },
  { num: '04', title: 'Déployer', desc: 'Nous mettons votre produit en ligne et vous accompagnons dans son évolution.' },
]

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.approach .section-label, .approach .section-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
      )
      gsap.fromTo('.approach-step',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.approach-steps', start: 'top 80%', once: true } }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section approach" id="approach" ref={sectionRef}>
      <div className="container">
        <div className="section-label" style={{ opacity: 0 }}>Notre approche</div>
        <h2 className="section-title" style={{ opacity: 0 }}>
          Un processus clair,<br />du concept au lancement.
        </h2>
        <div className="approach-steps">
          {steps.map((step, i) => (
            <div key={step.num} className="approach-step" style={{ opacity: 0 }}>
              <div className="step-left">
                <div className="step-num">{step.num}</div>
                {i < steps.length - 1 && <div className="step-line" />}
              </div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
