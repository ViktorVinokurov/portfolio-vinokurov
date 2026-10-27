import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { TiltCard } from '@/components/TiltCard'
import { Badge } from '@/components/ui/badge'
import { experience } from '@/data/profile'

function StackList({ stack }: { stack: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {stack.map((tech) => (
        <Badge key={tech} variant="outline" className="border-primary/30 text-muted-foreground">
          {tech}
        </Badge>
      ))}
    </div>
  )
}

function Points({ points }: { points: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {points.map((point) => (
        <li key={point} className="flex gap-3 text-muted-foreground">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
          {point}
        </li>
      ))}
    </ul>
  )
}

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  // Линия таймлайна «прорисовывается» вслед за прокруткой
  const lineScale = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 })

  return (
    <Section id="experience" number="03" eyebrow="Опыт" title="Где я работал">
      <ol ref={listRef} className="relative space-y-16 pl-8 md:pl-10">
        <div aria-hidden className="absolute inset-y-0 left-0 w-px bg-primary/15" />
        <motion.div
          aria-hidden
          style={{ scaleY: lineScale }}
          className="absolute inset-y-0 left-0 w-px origin-top bg-linear-to-b from-fuchsia-400 via-primary to-violet-400 shadow-[0_0_12px_1px] shadow-primary"
        />

        {experience.map((job) => (
          <li key={job.company} className="relative">
            <motion.span
              className="absolute top-1.5 -left-[2.5rem] flex size-4 items-center justify-center rounded-full bg-primary/25 ring-4 ring-background md:-left-[3rem]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -30% 0px' }}
              transition={{ type: 'spring', stiffness: 400, damping: 14 }}
            >
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40 [animation-iteration-count:3] motion-reduce:animate-none" />
              <span className="size-2 rounded-full bg-primary" />
            </motion.span>
            <Reveal from="left">
              <p className="font-mono text-sm text-primary">{job.period}</p>
              <h3 className="mt-1 text-2xl font-semibold">{job.role}</h3>
              <p className="mt-1 text-muted-foreground">
                {job.company} · {job.city}
              </p>
              {job.summary && <p className="mt-4 leading-relaxed">{job.summary}</p>}
              {job.points && <Points points={job.points} />}
              {job.stack && <StackList stack={job.stack} />}
            </Reveal>

            {job.projects && (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {job.projects.map((project, index) => (
                  <Reveal key={project.title} delay={(index % 2) * 150} from={index % 2 ? 'right' : 'left'}>
                    <TiltCard max={4} className="h-full rounded-xl">
                      <div className="h-full rounded-xl border bg-card/60 p-5 transition-colors hover:border-primary/50">
                        <h4 className="font-semibold">{project.title}</h4>
                        <Points points={project.points} />
                        <StackList stack={project.stack} />
                      </div>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </Section>
  )
}
