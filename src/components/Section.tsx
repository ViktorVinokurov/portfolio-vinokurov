import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Reveal } from './Reveal'
import { SplitText } from './SplitText'

interface SectionProps {
  id: string
  number: string
  eyebrow: string
  title: string
  children: ReactNode
}

export function Section({ id, number, eyebrow, title, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Большой контурный номер секции движется медленнее контента — эффект глубины
  const numberY = useTransform(scrollYProgress, [0, 1], [160, -160])

  return (
    <section ref={ref} id={id} className="relative mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
      <motion.span
        aria-hidden
        style={{ y: numberY }}
        className="pointer-events-none absolute top-4 right-4 -z-10 font-mono text-[8rem] leading-none font-bold text-transparent select-none [-webkit-text-stroke:1px_color-mix(in_oklch,var(--primary)_35%,transparent)] sm:right-6 sm:text-[13rem]"
      >
        {number}
      </motion.span>
      <div className="mb-12">
        <Reveal>
          <p className="mb-3 font-mono text-sm tracking-widest text-primary uppercase">
            {number} · {eyebrow}
          </p>
        </Reveal>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          <SplitText text={title} />
        </h2>
      </div>
      {children}
    </section>
  )
}
