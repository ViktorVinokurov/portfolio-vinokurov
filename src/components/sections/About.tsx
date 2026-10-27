import { motion } from 'motion/react'
import { Globe, Languages, MapPin, Plane } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { ScrollHighlight } from '@/components/ScrollHighlight'
import { Section } from '@/components/Section'
import { TiltCard } from '@/components/TiltCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { profile } from '@/data/profile'
import { easeOutExpo } from '@/lib/motion'

export function About() {
  const [lead, ...paragraphs] = profile.summary
  const facts = [
    { icon: MapPin, label: 'Город', value: profile.location },
    { icon: Globe, label: 'Формат работы', value: profile.workFormat },
    { icon: Plane, label: 'Командировки', value: profile.businessTrips },
    {
      icon: Languages,
      label: 'Языки',
      value: profile.languages.map((lang) => `${lang.name} — ${lang.level}`).join(', '),
    },
  ]

  return (
    <Section id="about" number="01" eyebrow="Обо мне" title="Немного о себе">
      <ScrollHighlight text={lead} className="mb-14 text-2xl leading-snug font-medium sm:text-3xl" />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          {paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 100}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal from="right">
          <Card className="bg-card/60 backdrop-blur">
            <CardContent className="space-y-5">
              {facts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: easeOutExpo }}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <fact.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs tracking-wider text-muted-foreground uppercase">{fact.label}</p>
                    <p className="mt-0.5 font-medium">{fact.value}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.qualities.map((quality, index) => (
          <Reveal key={quality.title} delay={index * 120} from="scale">
            <TiltCard className="h-full rounded-xl">
              <Card className="h-full bg-card/60 transition-colors hover:ring-primary/50">
                <CardHeader>
                  <span className="font-mono text-xs text-primary/70">0{index + 1}</span>
                  <CardTitle className="text-primary">{quality.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{quality.text}</CardDescription>
                </CardHeader>
              </Card>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
