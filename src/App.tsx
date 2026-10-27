import { MotionConfig } from 'motion/react'
import { CursorGlow } from '@/components/CursorGlow'
import { Header } from '@/components/Header'
import { About } from '@/components/sections/About'
import { Contacts } from '@/components/sections/Contacts'
import { Education } from '@/components/sections/Education'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { profile } from '@/data/profile'

const currentYear = new Date().getFullYear()

function App() {
  return (
    // reducedMotion="user": при prefers-reduced-motion motion отключает перемещения и оставляет только прозрачность
    <MotionConfig reducedMotion="user">
      <CursorGlow />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contacts />
      </main>
      <footer className="relative z-10 border-t py-8 text-center text-sm text-muted-foreground">
        © {currentYear} {profile.firstName} {profile.lastName}
      </footer>
    </MotionConfig>
  )
}

export default App
