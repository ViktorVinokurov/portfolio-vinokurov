import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { easeOutExpo } from '@/lib/motion'

type From = 'bottom' | 'left' | 'right' | 'scale'

const offsets: Record<From, { x?: number; y?: number; scale?: number }> = {
  bottom: { y: 48 },
  left: { x: -64 },
  right: { x: 64 },
  scale: { scale: 0.85 },
}

interface RevealProps {
  children: ReactNode
  className?: string
  // Задержка в мс — для каскадного появления элементов списка
  delay?: number
  // Откуда «выезжает» блок
  from?: From
}

// Проявляет содержимое при попадании в область видимости при скролле. Срабатывает один раз.
export function Reveal({ children, className, delay = 0, from = 'bottom' }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(8px)', ...offsets[from] }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  )
}
