'use client'

import { Code2, Zap, Shield, Bot } from 'lucide-react'

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
}

export function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Programming',
      icon: <Code2 size={24} />,
      skills: ['Python', 'Java', 'C++', 'JavaScript', 'Bash Scripting', 'SQL'],
    },
    {
      title: 'Web & Development',
      icon: <Zap size={24} />,
      skills: ['React.js', '.NET', 'REST APIs', 'HTML', 'CSS', 'Git/GitHub'],
    },
    {
      title: 'Tools & Platforms',
      icon: <Shield size={24} />,
      skills: ['Linux', 'Docker', 'JMeter', 'Splunk', 'Wazuh', 'GitHub Actions'],
    },
    {
      title: 'Security & Testing',
      icon: <Shield size={24} />,
      skills: ['Burp Suite', 'OWASP ZAP', 'Nmap', 'SQLMap', 'Metasploit', 'Website Testing', 'Vulnerability Assessment', 'Kali Linux', 'Malware Analysis', 'Firewall Security'],
    },
    {
      title: 'Generative AI',
      icon: <Bot size={24} />,
      skills: ['Prompt Engineering', 'LLM Security Testing', 'LLM API Integration', 'AI Workflow Automation', 'RAG Concepts', 'AI Agents & Tool Use'],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Technical Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 hover:bg-card/80 transition-all hover:scale-105 group animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="px-3 py-1 bg-background rounded-full text-sm text-primary border border-primary/30 hover:border-primary/100 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
