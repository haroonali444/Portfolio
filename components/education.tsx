'use client'

import { BookOpen, Award, CheckCircle2 } from 'lucide-react'

export function Education() {
  const coursework = [
    'Data Structures',
    'Algorithms',
    'Database Systems',
    'Cybersecurity',
    'Web Development',
    'Operating Systems',
    'AI & Machine Learning',
    'Computer Networks',
    'Information Security',
    'Generative AI Security',
    'CEH Preparation',
  ]

  return (
    <section id="education" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Education & Certifications</h2>

        {/* Education Card */}
        <div className="bg-card rounded-lg p-8 border border-border mb-8 hover:border-primary/30 transition-all animate-fade-in-up">
          <div className="flex items-start gap-4 mb-6">
            <BookOpen className="text-primary mt-1 flex-shrink-0" size={32} />
            <div>
              <h3 className="text-2xl font-bold text-foreground">BSc Computer Science</h3>
              <p className="text-primary font-semibold">Forman Christian College University</p>
              <p className="text-muted-foreground">2022 – 2026</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Relevant Coursework</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {coursework.map((course, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certification Card */}
        <div className="bg-primary/10 rounded-lg p-8 border border-primary/30 hover:border-primary/60 transition-all animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-start gap-4">
            <Award className="text-primary mt-1 flex-shrink-0" size={32} />
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Certified Ethical Hacker (CEH v13)
              </h3>
              <p className="text-muted-foreground mb-3">
                Professional certification demonstrating expertise in ethical hacking and penetration testing methodologies.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/30">
                <CheckCircle2 size={18} className="text-primary" />
                <span className="text-primary font-semibold">Certified & Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
