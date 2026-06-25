'use client'

import { Briefcase, Calendar } from 'lucide-react'

interface Experience {
  role: string
  company: string
  period: string
  description: string
  responsibilities: string[]
}

export function Experience() {
  const experiences: Experience[] = [
    {
      role: 'Cyber Security Intern',
      company: 'UET NCAI',
      period: '2026',
      description: 'Contributed to Blue Team operations with focus on network security and vulnerability management.',
      responsibilities: [
        'Monitored and analyzed network traffic for Blue Team operations',
        'Conducted comprehensive vulnerability assessments',
        'Performed system hardening and security configurations',
        'Worked with IDS systems to reduce false positives',
      ],
    },
    {
      role: 'Research Assistant',
      company: 'Forman Christian College University',
      period: '2025',
      description: 'Collaborated on security research with Dr. Saad Bin Saleem.',
      responsibilities: [
        'Research on Optimization of Storage on Network Intrusion Detection Systems at Edge Devices',
        'Literature review and data analysis',
        'Documentation and reporting',
      ],
    },
    {
      role: 'Web Development Intern',
      company: 'SIGI Technologies',
      period: '2023',
      description: 'Developed responsive web interfaces and improved user engagement metrics.',
      responsibilities: [
        'Built structured, responsive web pages with HTML/CSS',
        'Collaborated on design improvements that increased user engagement',
        'Implemented cross-browser compatibility solutions',
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Professional Experience</h2>

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="relative pl-8 pb-6 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Timeline line */}
              {idx !== experiences.length - 1 && (
                <div className="absolute left-2 top-12 w-0.5 h-24 bg-gradient-to-b from-primary to-primary/20"></div>
              )}

              {/* Timeline dot */}
              <div className="absolute -left-2 top-0 w-6 h-6 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>

              {/* Content */}
              <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mt-2 md:mt-0">
                    <Calendar size={16} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, respIdx) => (
                    <li key={respIdx} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-primary mt-1.5">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
