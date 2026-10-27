import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { easeOutExpo } from '@/lib/motion'

const navItems = [
  { id: 'about', label: 'Обо мне' },
  { id: 'skills', label: 'Навыки' },
  { id: 'experience', label: 'Опыт' },
  { id: 'projects', label: 'Проекты' },
  { id: 'education', label: 'Образование' },
]

// id секции, которая сейчас в середине экрана
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return active
}

export function Header() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const active = useActiveSection()

  // Шапка прячется при прокрутке вниз и возвращается при прокрутке вверх
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 16)
    setHidden(y > previous && y > 400)
  })

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.4, ease: easeOutExpo }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'border-border bg-background/75 backdrop-blur-xl' : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-sm font-semibold tracking-wider">
          <span className="text-primary">&lt;</span>vinokurov<span className="text-primary"> /&gt;</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'relative rounded-full px-3 py-1.5 text-sm transition-colors',
                active === item.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {active === item.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full border border-primary/40 bg-primary/15"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </a>
          ))}
        </nav>
        <Button asChild size="sm">
          <a href="#contacts">Связаться</a>
        </Button>
      </div>
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-linear-to-r from-fuchsia-500 via-primary to-violet-400"
      />
    </motion.header>
  )
}
