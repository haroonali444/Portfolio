'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Education } from '@/components/education'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { TypewriterIntro } from '@/components/typewriter-intro'

export default function Page() {
  const [showPortfolio, setShowPortfolio] = useState(false)

  return (
    <>
      {!showPortfolio && (
        <TypewriterIntro onComplete={() => setShowPortfolio(true)} />
      )}
      {showPortfolio && (
        <main className="min-h-screen bg-background animate-fade-in-up">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  )
}
