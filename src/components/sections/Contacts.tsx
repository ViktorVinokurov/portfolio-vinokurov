import { motion } from 'motion/react'
import { Mail, MessageCircle, Phone, Send } from 'lucide-react'
import { GithubIcon } from '@/components/GithubIcon'
import { Reveal } from '@/components/Reveal'
import { SplitText } from '@/components/SplitText'
import { profile } from '@/data/profile'
import { easeOutExpo } from '@/lib/motion'

const { contacts, github } = profile

const links = [
  { icon: Send, label: 'Telegram', value: contacts.telegram, href: contacts.telegramHref },
  { icon: Mail, label: 'Email', value: contacts.email, href: `mailto:${contacts.email}` },
  { icon: Phone, label: 'Телефон', value: contacts.phone, href: contacts.phoneHref },
  { icon: MessageCircle, label: 'ВКонтакте', value: contacts.vk, href: contacts.vkHref },
  { icon: GithubIcon, label: 'GitHub', value: github.username, href: github.url },
]

export function Contacts() {
  return (
    <section id="contacts" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
      <Reveal from="scale">
        {/* Вращающаяся градиентная рамка: conic-gradient под блоком с отступом в 1px */}
        <div className="relative overflow-hidden rounded-3xl bg-primary/20 p-px">
          <div
            aria-hidden
            className="absolute inset-[-50%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0%,var(--primary)_10%,transparent_25%,transparent_50%,var(--color-fuchsia-500)_60%,transparent_75%)] motion-reduce:animate-none"
          />
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-linear-to-br from-[color-mix(in_oklch,var(--primary)_22%,var(--card))] via-card to-card p-8 sm:p-12">
            <div aria-hidden className="absolute -top-24 -right-24 size-72 animate-float rounded-full bg-primary/30 blur-3xl motion-reduce:animate-none" />
            <p className="relative mb-3 font-mono text-sm tracking-widest text-primary uppercase">06 · Контакты</p>
            <h2 className="relative max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
              <SplitText text="Давайте поработаем вместе" />
            </h2>
            <Reveal delay={300}>
              <p className="relative mt-4 max-w-xl text-lg text-muted-foreground">
                Открыт к предложениям о работе в формате «{profile.workFormat.toLowerCase()}». Быстрее всего
                отвечаю в Telegram.
              </p>
            </Reveal>

            <div className="relative mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.08, ease: easeOutExpo }}
                  className="group flex items-center gap-4 rounded-xl border bg-background/50 p-4 backdrop-blur transition-colors hover:border-primary/60 hover:bg-background/80"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary transition-all duration-300 group-hover:rotate-[-8deg] group-hover:bg-primary group-hover:text-primary-foreground">
                    <link.icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs tracking-wider text-muted-foreground uppercase">{link.label}</span>
                    <span className="block truncate font-medium">{link.value}</span>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
