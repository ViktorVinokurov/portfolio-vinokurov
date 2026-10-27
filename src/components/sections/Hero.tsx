import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { MapPin, Send } from 'lucide-react'
import { cn } from 'cn'
import photo from '@/assets/photo.jpg'
import { CountUp } from '@/components/CountUp'
import { GithubIcon } from '@/components/GithubIcon'
import { Reveal } from '@/components/Reveal'
import { SplitText } from '@/components/SplitText'
import { TiltCard } from '@/components/TiltCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { experience, profile } from '@/data/profile'
import { plural, yearsSince } from '@/lib/format'
import { easeOutExpo } from '@/lib/motion'

const yearForms: [string, string, string] = ['год', 'года', 'лет']

// Бейджи, парящие вокруг фото
const floatingChips = [
  { label: 'React', className: '-left-6 top-12', float: 0 },
  { label: 'Vue.js', className: '-right-5 top-1/3', float: 1.2 },
  { label: 'TypeScript', className: '-left-8 bottom-28', float: 2.1 },
  { label: '.NET', className: '-right-4 bottom-12', float: 0.6 },
]

function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200)
    return () => clearInterval(timer)
  }, [words.length])

  return (
    // align-top + та же высота строки, что у соседнего текста: блок с overflow-hidden не имеет текстовой базовой линии,
    // поэтому выравниваем по верху строки, а не по baseline/bottom
    <span className="relative inline-flex overflow-hidden align-top">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: easeOutExpo }}
          className="inline-block text-primary"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // При уходе Hero вверх: текст уплывает и гаснет, фото отстаёт и уменьшается, фон смещается медленнее
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 180])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 260])

  const webYears = yearsSince(profile.webDevStart)
  const stats = [
    { value: webYears, suffix: '+', label: `${plural(webYears, yearForms)} в веб-разработке` },
    {
      value: experience.length,
      suffix: '',
      label: plural(experience.length, ['компания', 'компании', 'компаний']),
    },
  ]

  return (
    <section ref={ref} id="top" className="relative overflow-hidden">
      {/* Декоративный фон: пурпурные пятна и сетка */}
      <motion.div aria-hidden style={{ y: backgroundY }} className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 size-[28rem] animate-float rounded-full bg-primary/25 blur-3xl motion-reduce:animate-none" />
        <div className="absolute top-1/3 -right-40 size-[32rem] animate-float rounded-full bg-fuchsia-600/15 blur-3xl [animation-delay:-7s] motion-reduce:animate-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)] opacity-40" />
      </motion.div>

      <div className="relative mx-auto grid min-h-svh max-w-6xl items-center gap-12 px-4 pt-28 pb-16 sm:px-6 md:grid-cols-[1.2fr_1fr] md:pt-20">
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <Reveal>
            <Badge variant="outline" className="mb-6 h-7 gap-2 border-primary/40 bg-primary/10 px-3 text-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Открыт к предложениям
            </Badge>
          </Reveal>
          <h1 className="text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <SplitText text={profile.firstName} by="letter" delay={0.15} />
            <br />
            <SplitText
              text={profile.lastName}
              delay={0.5}
              partClassName="animate-shimmer bg-linear-to-r from-violet-300 via-fuchsia-400 to-violet-300 bg-size-[200%_auto] bg-clip-text text-transparent motion-reduce:animate-none"
            />
          </h1>
          <Reveal delay={700}>
            <p className="mt-6 text-xl font-medium sm:text-2xl">
              {profile.role} <span className="text-muted-foreground">·</span>{' '}
              <RotatingWord words={profile.heroStack} />
            </p>
            <p className="mt-4 flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4 text-primary" />
              {profile.location} · {profile.workFormat.toLowerCase()}
            </p>
          </Reveal>
          <Reveal delay={850} className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-11 px-5 shadow-[0_0_30px_-6px] shadow-primary/70">
              <a href={profile.contacts.telegramHref} target="_blank" rel="noreferrer">
                <Send /> Написать в Telegram
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-5">
              <a href={profile.github.url} target="_blank" rel="noreferrer">
                <GithubIcon className="size-4" /> GitHub
              </a>
            </Button>
          </Reveal>
          <Reveal delay={1000}>
            <dl className="mt-12 grid max-w-xs grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-4xl font-semibold text-primary">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </motion.div>

        <motion.div style={{ y: photoY, scale: photoScale }} className="relative mx-auto w-full max-w-sm">
          <Reveal from="scale" delay={300}>
            <div className="absolute -inset-4 animate-pulse rounded-[2rem] bg-linear-to-br from-primary/60 via-fuchsia-500/30 to-transparent opacity-70 blur-2xl [animation-duration:4s] motion-reduce:animate-none" />
            <TiltCard max={10} className="rounded-[2rem]">
              <div className="relative overflow-hidden rounded-[2rem] border border-primary/30 bg-card">
                <img
                  src={photo}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  width={1200}
                  height={1500}
                  className="aspect-4/5 w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background/90 to-transparent" />
              </div>
            </TiltCard>
          </Reveal>
          {floatingChips.map((chip, index) => (
            <motion.span
              key={chip.label}
              aria-hidden
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
              transition={{
                opacity: { delay: 1 + index * 0.15, duration: 0.4 },
                scale: { delay: 1 + index * 0.15, type: 'spring', stiffness: 300, damping: 15 },
                y: { delay: chip.float, duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
              className={cn(
                'absolute z-10 rounded-full border border-primary/40 bg-background/70 px-3 py-1.5 font-mono text-xs shadow-lg shadow-primary/20 backdrop-blur',
                chip.className,
              )}
            >
              {chip.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Индикатор «листайте дальше»: мышь с бегущим колесиком */}
      <a
        href="#about"
        aria-label="Прокрутить вниз"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-muted-foreground/50 pt-2 transition-colors hover:border-primary">
          <motion.span
            className="size-1.5 rounded-full bg-primary"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </a>
    </section>
  )
}
