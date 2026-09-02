import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'
import { useModal } from '../lib/modalContext'
import './CTA.css'

function CTAScene() {
  const mesh = useRef<THREE.Mesh>(null)
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.2
      mesh.current.rotation.x = t * 0.1
    }
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.15
      ring1.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.3) * 0.1
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.1
      ring2.current.rotation.y = Math.PI / 4 + Math.cos(t * 0.25) * 0.1
    }
  })

  const particles = useMemo(() => {
    const count = 600
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  return (
    <group>
      <mesh ref={mesh}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring1}>
        <torusGeometry args={[2.2, 0.02, 8, 100]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3, 0.015, 8, 100]} />
        <meshStandardMaterial color="#aaaaaa" emissive="#aaaaaa" emissiveIntensity={0.3} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
      </points>
    </group>
  )
}

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { openModal } = useModal()

  return (
    <section className="cta-section" id="cta" ref={ref}>
      <div className="cta-canvas">
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />
          <CTAScene />
        </Canvas>
      </div>

      <div className="cta-overlay" />

      <div className="cta-content container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Démarrons ensemble
        </motion.div>

        <motion.h2
          className="cta-title"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          Votre prochaine idée<br />mérite d'exister.
        </motion.h2>

        <motion.p
          className="cta-desc"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Parlons de votre projet et construisons ensemble une solution digitale moderne, performante et adaptée à vos objectifs.
        </motion.p>

        <motion.button
          onClick={openModal}
          className="btn-primary cta-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Démarrer un projet →
        </motion.button>
      </div>
    </section>
  )
}
