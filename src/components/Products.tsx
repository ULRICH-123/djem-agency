import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { gsap } from '../lib/gsap'
import * as THREE from 'three'
import './Products.css'

function KonsultaScene() {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock, mouse }) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.3 + mouse.x * 0.1
    group.current.rotation.x = mouse.y * 0.05
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.6) * 0.15
  })
  return (
    <group ref={group}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 3.2, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[1.6, 2.9, 0.01]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {[0.6, 0.2, -0.2, -0.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0.12]}>
          <boxGeometry args={[1.2, 0.12, 0.01]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
      ))}
      <mesh position={[0, -1.1, 0.12]}>
        <boxGeometry args={[0.7, 0.25, 0.01]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  )
}

function DjemsScene() {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock, mouse }) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.35) * 0.3 + mouse.x * 0.1
    group.current.rotation.x = mouse.y * 0.05
    group.current.position.y = Math.cos(clock.getElapsedTime() * 0.5) * 0.15
  })
  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[0.9, 0.28, 128, 16]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh>
        <torusKnotGeometry args={[0.9, 0.28, 128, 16]} />
        <meshStandardMaterial color="#000000" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.products .section-label, .products .section-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
      )
      gsap.fromTo('.product-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.2,
          scrollTrigger: { trigger: '.products-grid', start: 'top 80%', once: true } }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section products" id="products" ref={sectionRef}>
      <div className="container">
        <div className="section-label" style={{ opacity: 0 }}>Nos produits</div>
        <h2 className="section-title" style={{ opacity: 0 }}>
          Des solutions numériques<br />pensées pour l'Afrique.
        </h2>

        <div className="products-grid">
          <div className="product-card" style={{ opacity: 0 }}>
            <div className="product-canvas">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.7} />
                <pointLight position={[3, 3, 3]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-3, -3, 3]} intensity={0.8} color="#eeeeee" />
                <KonsultaScene />
              </Canvas>
            </div>
            <div className="product-info">
              <div className="product-tag">Santé digitale</div>
              <h3 className="product-name">KONSULTA</h3>
              <p className="product-desc">
                La plateforme de prise de rendez-vous médicaux en ligne au Cameroun. Konsulta connecte les patients avec des médecins, spécialistes et cliniques près de chez eux — consultation, suivi et gestion des rendez-vous en quelques clics.
              </p>
              <div className="product-features">
                <span>Médecins & spécialistes</span>
                <span>Rendez-vous en ligne</span>
                <span>Géolocalisation</span>
              </div>
              <div className="product-footer">
                <span className="product-url">konsulta-cameroun.com</span>
                <a href="https://konsulta-cameroun.com" target="_blank" rel="noopener" className="product-cta">
                  Découvrir Konsulta →
                </a>
              </div>
            </div>
          </div>

          <div className="product-card product-card--alt" style={{ opacity: 0 }}>
            <div className="product-canvas">
              <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.7} />
                <pointLight position={[3, 3, 3]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-3, -3, 3]} intensity={0.8} color="#eeeeee" />
                <DjemsScene />
              </Canvas>
            </div>
            <div className="product-info">
              <div className="product-tag">Logement & Services</div>
              <h3 className="product-name">DJEM'S</h3>
              <p className="product-desc">
                La plateforme qui simplifie la recherche de logement et de services à domicile au Cameroun. Trouvez des appartements meublés ou non meublés, et accédez à des prestataires qualifiés pour vos besoins du quotidien — plomberie, ménage, électricité, livraison et bien plus.
              </p>
              <div className="product-features">
                <span>Logements meublés & non meublés</span>
                <span>Prestataires à domicile</span>
                <span>Géolocalisation</span>
              </div>
              <div className="product-footer">
                <span className="product-url">djem-s.site</span>
                <a href="https://djem-s.site" target="_blank" rel="noopener" className="product-cta">
                  Découvrir Djem's →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
