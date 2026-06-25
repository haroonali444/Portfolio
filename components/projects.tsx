'use client'

import { Award, Lock } from 'lucide-react'

interface Project {
  title: string
  description: string
  highlights: string[]
  badge?: string
  icon: React.ReactNode
}

export function Projects() {

  const projects: Project[] = [
    {
      title: 'Access360 – Visitor Management System',
      description: 'Full-stack system digitizing visitor registration, verification, tracking, and reporting.',
      highlights: ['Commercialized and deployed institution-wide at FCCU', 'Real-time tracking and reporting'],
      badge: '🏆 Best Final Year Project Award 2026',
      icon: <Lock size={20} />,
    },
    {
      title: 'AI/ML Data Quality Detection Framework',
      description: 'Framework to detect data smells in ML datasets with unstable dependencies and hidden feedback loops.',
      highlights: ['Python-based analysis modules', 'Identifies underutilized features', 'Currently ongoing'],
      icon: <Lock size={20} />,
    },
    {
      title: 'Automated Phishing Detection & Response System',
      description: 'Built with n8n, VirusTotal, and Gmail integrations for automated threat analysis.',
      highlights: ['Real-time Slack/Gmail alerting', 'Reduced manual SOC workload', 'Threat analysis automation'],
      icon: <Lock size={20} />,
    },
    {
      title: 'Automated Security Testing Pipeline',
      description: 'CI/CD pipeline integrating OWASP ZAP for automated pentesting and Snyk for vulnerability monitoring.',
      highlights: ['GitHub Actions integration', 'Continuous vulnerability scanning', 'Automated security testing'],
      icon: <Lock size={20} />,
    },
    {
      title: 'Penetration Testing Lab',
      description: 'Isolated Kali Linux lab environment for full-cycle pentesting operations.',
      highlights: ['Metasploitable 2/3 targets', 'Recon to post-exploitation', 'Real-world attack simulation'],
      icon: <Lock size={20} />,
    },
    {
      title: 'Malware Analysis & Reverse Engineering',
      description: 'Static & dynamic analysis of RAT, Swayzryptor, and WannaCry samples.',
      highlights: ['PEStudio & IDA Free analysis', 'Behavioral pattern identification', 'Obfuscation techniques'],
      icon: <Lock size={20} />,
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 hover:scale-105 group animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Badge */}
              {project.badge && (
                <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/30">
                  <Award size={14} className="text-primary" />
                  <span className="text-xs font-semibold text-primary">{project.badge}</span>
                </div>
              )}

              <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
              
              <p className="text-muted-foreground mb-4">{project.description}</p>

              <div className="space-y-2 mb-4">
                {project.highlights.map((highlight, highlightIdx) => (
                  <div key={highlightIdx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span className="text-sm text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
