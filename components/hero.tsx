'use client'

import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function Hero() {
  const [displayedTitle, setDisplayedTitle] = useState('')
  const [displayedTagline, setDisplayedTagline] = useState('')
  const [displayedDescription, setDisplayedDescription] = useState('')
  const [animationComplete, setAnimationComplete] = useState(false)

  const title = 'Haroon Ali'
  const tagline = 'Certified Ethical Hacker (CEH v13) | Software Engineer'
  const description = 'Security Testing • CI/CD | ML Technical Debt Researcher | Penetration Tester • Malware Analysis • Firewall Security | Website Testing & Vulnerability Assessment'

  useEffect(() => {
    let charIndex = 0
    let currentPhase = 0 // 0: title, 1: tagline, 2: description

    const typeChar = () => {
      if (currentPhase === 0) {
        if (charIndex <= title.length) {
          setDisplayedTitle(title.slice(0, charIndex))
          charIndex++
        } else {
          currentPhase = 1
          charIndex = 0
        }
      } else if (currentPhase === 1) {
        if (charIndex <= tagline.length) {
          setDisplayedTagline(tagline.slice(0, charIndex))
          charIndex++
        } else {
          currentPhase = 2
          charIndex = 0
        }
      } else if (currentPhase === 2) {
        if (charIndex <= description.length) {
          setDisplayedDescription(description.slice(0, charIndex))
          charIndex++
        } else {
          setAnimationComplete(true)
          return
        }
      }

      setTimeout(typeChar, 50) // Typing speed
    }

    typeChar()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 bg-gradient-to-b from-background via-background to-background/80 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-3xl animate-fade-in-up">
        <div className="mb-8 flex justify-center">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20">
            <Image
              src="/profile.jpg"
              alt="Haroon Ali"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight min-h-[80px]">
          {displayedTitle}
          {!animationComplete && displayedTitle.length < title.length && <span className="animate-pulse">|</span>}
        </h1>
        
        <p className="text-xl md:text-2xl text-primary font-semibold mb-2 min-h-[32px]">
          {displayedTagline}
          {displayedTitle === title && displayedTagline.length < tagline.length && !animationComplete && <span className="animate-pulse">|</span>}
        </p>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed min-h-[80px]">
          {displayedDescription}
          {displayedTagline === tagline && displayedDescription.length < description.length && !animationComplete && <span className="animate-pulse">|</span>}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all hover:scale-105 active:scale-95"
          >
            Contact Me
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center animate-bounce mt-8">
          <ArrowDown className="text-primary" size={24} />
        </div>
      </div>
    </section>
  )
}
