import { useEffect } from 'react'
import { motion, useMotionTemplate, useSpring } from 'motion/react'

// Мягкое пурпурное свечение, которое с запаздыванием следует за курсором. Только для мыши.
export function CursorGlow() {
  const x = useSpring(-1000, { stiffness: 120, damping: 20 })
  const y = useSpring(-1000, { stiffness: 120, damping: 20 })
  const background = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, color-mix(in oklch, var(--primary) 12%, transparent), transparent 70%)`

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [x, y])

  return <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-0" style={{ background }} />
}
