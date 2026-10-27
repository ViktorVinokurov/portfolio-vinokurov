import { motion, stagger } from 'motion/react'
import { Marquee } from '@/components/Marquee'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { TiltCard } from '@/components/TiltCard'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { skillGroups } from '@/data/profile'

const allSkills = skillGroups.flatMap((group) => group.skills)
const half = Math.ceil(allSkills.length / 2)

export function Skills() {
  return (
    <Section id="skills" number="02" eyebrow="Навыки" title="Технологии и инструменты">
      <Reveal className="mb-12 space-y-3">
        <Marquee items={allSkills.slice(0, half)} />
        <Marquee items={allSkills.slice(half)} reverse />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.title}
            delay={(index % 3) * 120}
            // Самая большая группа (frontend) занимает две колонки на широких экранах
            className={index === 0 ? 'md:col-span-2' : undefined}
          >
            <TiltCard max={4} className="h-full rounded-xl">
              <Card className="h-full bg-card/60 transition-colors hover:ring-primary/50">
                <CardHeader>
                  <CardTitle className="text-lg">{group.title}</CardTitle>
                </CardHeader>
                {/* Бейджи «выпрыгивают» по очереди, когда карточка появляется на экране */}
                <CardContent>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                    variants={{ visible: { transition: { delayChildren: stagger(0.035, { startDelay: 0.2 }) } } }}
                  >
                    {group.skills.map((skill) => (
                      <motion.div
                        key={skill}
                        variants={{
                          hidden: { opacity: 0, scale: 0.4, y: 12 },
                          visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 420, damping: 18 } },
                        }}
                        whileHover={{ y: -3, scale: 1.08 }}
                      >
                        <Badge
                          variant="secondary"
                          className="h-7 px-3 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
