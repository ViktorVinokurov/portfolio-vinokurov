import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { easeOutExpo } from '@/lib/motion'

// Число «набегает» от 0 до значения, когда попадает в область видимости
export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!inView || !element) return
    if (reduceMotion) {
      element.textContent = `${to}${suffix}`
      return
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: easeOutExpo,
      onUpdate: (value) => {
        element.textContent = `${Math.round(value)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, to, suffix])

  return <span ref={ref}>0{suffix}</span>
}
