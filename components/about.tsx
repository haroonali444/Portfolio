'use client'

import { Shield } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="text-primary" size={32} />
          <h2 className="text-4xl font-bold text-foreground">About Me</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-lg p-8 border border-border hover:border-primary/30 transition-all">
            <h3 className="text-xl font-semibold text-foreground mb-4">Professional Overview</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Certified Ethical Hacker (CEH v13) and Computer Science graduate with expertise in cybersecurity, software development, and web application security. Hands-on experience in vulnerability assessment, penetration testing, malware analysis, and secure coding practices through professional internships and academic research.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 border border-border hover:border-primary/30 transition-all">
            <h3 className="text-xl font-semibold text-foreground mb-4">Core Competencies</h3>
            <div className="space-y-3">
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="text-primary font-semibold">Development:</span> Python, JavaScript, React, .NET, Java, C++, SQL, REST APIs
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="text-primary font-semibold">Security Tools:</span> Burp Suite, OWASP ZAP, Metasploit, Nmap, SQLMap, Splunk, Wazuh
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="text-primary font-semibold">Security Expertise:</span> Website Testing, Penetration Testing, Malware Analysis, Firewall Security, OWASP Top 10, PCI DSS, CI/CD Security
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="text-primary font-semibold">Infrastructure:</span> Linux, Docker, GitHub Actions, Cloud Security
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 border border-border hover:border-primary/30 transition-all">
            <h3 className="text-xl font-semibold text-foreground mb-4">Research & Innovation</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ML Technical Debt Researcher with focus on AI security and LLM robustness. Passionate about emerging security threats, AI safety, and staying current with industry best practices through continuous learning and collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
