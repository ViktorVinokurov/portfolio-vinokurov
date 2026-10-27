import { motion, stagger } from 'motion/react'
import { cn } from 'cn'
import { easeOutExpo } from '@/lib/motion'

interface SplitTextProps {
  text: string
  // Разбивка по словам (заголовки) или по буквам (имя в Hero)
  by?: 'word' | 'letter'
  // Задержка старта в секундах
  delay?: number
  className?: string
  // Классы для каждой части — например, градиентный текст
  partClassName?: string
}

// Текст «выезжает» снизу из-под маски по частям, когда попадает в область видимости
export function SplitText({ text, by = 'word', delay = 0, className, partClassName }: SplitTextProps) {
  const parts = by === 'word' ? text.split(' ') : Array.from(text)

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { delayChildren: stagger(by === 'word' ? 0.08 : 0.04, { startDelay: delay }) } },
        }}
      >
        {parts.map((part, index) => (
          <span key={index} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={cn('inline-block', partClassName)}
              variants={{
                hidden: { y: '110%', rotate: 8 },
                visible: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: easeOutExpo } },
              }}
            >
              {part}
              {by === 'word' && index < parts.length - 1 && ' '}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  )
}
