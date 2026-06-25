'use client'

import { useEffect, useState } from 'react'

interface TypewriterIntroProps {
  onComplete: () => void
}

export function TypewriterIntro({ onComplete }: TypewriterIntroProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)

  const lines = [
    'Haroon Ali',
    'Certified Ethical Hacker (CEH v13)',
    'Security Testing • Penetration Testing • Web Application Security',
  ]

  useEffect(() => {
    const typingSpeed = 50
    const deletingSpeed = 30
    const delayBetweenLines = 800
    const delayBeforeFade = 3000

    let timer: NodeJS.Timeout

    if (lineIndex < lines.length) {
      const currentLine = lines[lineIndex]

      if (!isDeleting && charIndex < currentLine.length) {
        // Typing
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev + currentLine[charIndex])
          setCharIndex(charIndex + 1)
        }, typingSpeed)
      } else if (!isDeleting && charIndex === currentLine.length) {
        // Move to next line
        timer = setTimeout(() => {
          setIsDeleting(false)
          setLineIndex(lineIndex + 1)
          setCharIndex(0)
          setDisplayedText((prev) => prev + '\n')
        }, delayBetweenLines)
      }
    } else if (showOverlay) {
      // Animation complete, fade out after delay
      timer = setTimeout(() => {
        setShowOverlay(false)
        setTimeout(onComplete, 500) // Wait for fade animation
      }, delayBeforeFade)
    }

    return () => clearTimeout(timer)
  }, [charIndex, lineIndex, isDeleting, showOverlay, onComplete, lines])

  if (!showOverlay) return null

  return (
    <div
      className={`fixed inset-0 bg-background z-50 flex items-center justify-center transition-opacity duration-500 ${
        showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center">
          <pre className="text-3xl md:text-5xl font-bold text-foreground whitespace-pre-wrap font-sans leading-tight">
            <span className="text-primary">{displayedText}</span>
            <span className="animate-pulse text-primary">|</span>
          </pre>
        </div>
      </div>
    </div>
  )
}
