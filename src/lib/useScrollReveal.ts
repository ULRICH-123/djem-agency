import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from './gsap'

type Direction = 'up' | 'left' | 'right' | 'scale'

export function useScrollReveal<T extends HTMLElement>(
  direction: Direction = 'up',
  stagger = 0,
  selector?: string
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = selector ? el.querySelectorAll(selector) : [el]

    const fromVars: gsap.TweenVars = { opacity: 0, duration: 0.8, ease: 'power3.out' }
    if (direction === 'up') fromVars.y = 50
    if (direction === 'left') fromVars.x = -40
    if (direction === 'right') fromVars.x = 40
    if (direction === 'scale') { fromVars.scale = 0.85; fromVars.y = 20 }

    const toVars: gsap.TweenVars = {
      opacity: 1, y: 0, x: 0, scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      }
    }

    gsap.fromTo(targets, fromVars, toVars)

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [direction, stagger, selector])

  return ref
}
