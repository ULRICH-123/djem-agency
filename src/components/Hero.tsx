import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { gsap } from '../lib/gsap'
import * as THREE from 'three'
import './Hero.css'

function ParticleField() {
  const mesh = useRef<THREE.Points>(null)
  const count = 1800
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const c1 = new THREE.Color('#c4b5fd')
    const c2 = new THREE.Color('#ddd6fe')
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      const c = Math.random() > 0.5 ? c1 : c2
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [])
  useFrame(({ clock, mouse }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = clock.getElapsedTime() * 0.04 + mouse.x * 0.1
    mesh.current.rotation.x = clock.getElapsedTime() * 0.02 + mouse.y * 0.05
  })
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function FloatingTorus() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(({ clock, mouse }) => {
    if (!mesh.current) return
    mesh.current.rotation.x = clock.getElapsedTime() * 0.3 + mouse.y * 0.2
    mesh.current.rotation.y = clock.getElapsedTime() * 0.2 + mouse.x * 0.2
    mesh.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3
  })
  return (
    <mesh ref={mesh} position={[2.5, 0, -1]}>
      <torusGeometry args={[1.4, 0.4, 32, 80]} />
      <meshStandardMaterial color="#7C5CFC" wireframe transparent opacity={0.15} />
    </mesh>
  )
}

function FloatingSphere() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = clock.getElapsedTime() * 0.15
    mesh.current.position.y = Math.cos(clock.getElapsedTime() * 0.4) * 0.2
  })
  return (
    <mesh ref={mesh} position={[-2.8, 0.5, -2]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#a78bfa" wireframe transparent opacity={0.12} />
    </mesh>
  )
}

function CameraRig() {
  const { camera } = useThree()
  useFrame(({ mouse }) => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.03
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(actionsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
  }, [])

  return (
    <section className="hero">
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#c4b5fd" />
          <pointLight position={[-5, -5, 5]} intensity={0.3} color="#ede9fe" />
          <ParticleField />
          <FloatingTorus />
          <FloatingSphere />
          <CameraRig />
        </Canvas>
      </div>

      <div className="hero-content container">
        <h1 ref={titleRef} className="hero-title" style={{ opacity: 0 }}>
          Nous créons les <span>solutions digitales</span> qui font avancer les entreprises.
        </h1>
        <p ref={subtitleRef} className="hero-subtitle" style={{ opacity: 0 }}>
          Sites web modernes, applications web et communication digitale : nous transformons vos idées en produits numériques performants.
        </p>
        <div ref={actionsRef} className="hero-actions" style={{ opacity: 0 }}>
          <a href="#cta" className="btn-primary">Démarrer un projet</a>
          <a href="#products" className="btn-ghost">Découvrir nos produits</a>
        </div>
        <div ref={scrollRef} className="hero-scroll" style={{ opacity: 0 }}>
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  )
}
