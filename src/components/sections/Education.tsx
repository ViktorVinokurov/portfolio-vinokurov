import { motion } from 'motion/react'
import { GraduationCap } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { TiltCard } from '@/components/TiltCard'
import { Card, CardContent } from '@/components/ui/card'
import { courses, education } from '@/data/profile'
import { easeOutExpo } from '@/lib/motion'

export function Education() {
  return (
    <Section id="education" number="05" eyebrow="Образование" title="Образование и курсы">
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal from="left">
          <TiltCard max={5} className="h-full rounded-xl">
            <Card className="h-full bg-linear-to-br from-primary/20 via-card/60 to-card/60">
              <CardContent className="flex gap-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <GraduationCap className="size-6" />
                </div>
                <div>
                  <p className="font-mono text-sm text-primary">{education.year} · Высшее</p>
                  <h3 className="mt-2 text-lg leading-snug font-semibold">{education.university}</h3>
                  <p className="mt-2 text-muted-foreground">{education.faculty}</p>
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </Reveal>

        <ul className="space-y-3">
          {courses.map((course, index) => (
            <motion.li
              key={course.title}
              initial={{ opacity: 0, x: 64 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ x: 8 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: easeOutExpo }}
              className="group flex items-center gap-5 rounded-xl border bg-card/60 px-5 py-4 transition-colors hover:border-primary/50"
            >
              <span className="font-mono text-sm text-primary">{course.year}</span>
              <div>
                <p className="font-medium transition-colors group-hover:text-primary">{course.title}</p>
                <p className="text-sm text-muted-foreground">{course.school}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
