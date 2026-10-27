import { useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from 'cn'

interface TiltCardProps {
  children: ReactNode
  className?: string
  // Максимальный наклон в градусах
  max?: number
}

const spring = { stiffness: 220, damping: 22 }

// 3D-наклон за курсором и световое пятно под ним. Работает только для мыши, на тач-экранах карточка статична.
export function TiltCard({ children, className, max = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Позиция курсора внутри карточки, 0..1
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const glowOpacity = useSpring(0, spring)

  const rotateX = useSpring(useTransform(pointerY, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-max, max]), spring)
  const glowX = useTransform(pointerX, (v) => `${v * 100}%`)
  const glowY = useTransform(pointerY, (v) => `${v * 100}%`)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, color-mix(in oklch, var(--primary) 22%, transparent), transparent 60%)`

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width)
    pointerY.set((event.clientY - rect.top) / rect.height)
    glowOpacity.set(1)
  }

  function handleLeave() {
    pointerX.set(0.5)
    pointerY.set(0.5)
    glowOpacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn('relative', className)}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: glow, opacity: glowOpacity }}
      />
    </motion.div>
  )
}
