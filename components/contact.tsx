'use client'

import { useState } from 'react'
import { Mail, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Client-side validation
  const validateForm = (): boolean => {
    setError('')

    if (formData.name.trim().length < 2 || formData.name.trim().length > 100) {
      setError('Name must be between 2 and 100 characters')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    if (formData.subject.trim().length < 3 || formData.subject.trim().length > 200) {
      setError('Subject must be between 3 and 200 characters')
      return false
    }

    if (formData.message.trim().length < 10 || formData.message.trim().length > 5000) {
      setError('Message must be between 10 and 5000 characters')
      return false
    }

    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate before submitting
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to send message')
      }
    } catch (err) {
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Get In Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4 mb-3">
                <Mail className="text-primary" size={24} />
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a href="mailto:haroonali8838@gmail.com" className="text-primary hover:underline">
                    haroonali8838@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4 mb-3">
                <Phone className="text-primary" size={24} />
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <a href="tel:+923174004211" className="text-primary hover:underline">
                    +92-317-4004211
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="font-semibold text-foreground">Follow Me</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/haroonali444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110 text-muted-foreground hover:text-primary"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/haroon-ali-0332b5227"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110 text-muted-foreground hover:text-primary"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.047-8.733 0-9.637h3.554v1.364c.429-.662 1.196-1.602 2.905-1.602 2.117 0 3.704 1.385 3.704 4.362v5.513zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.706 0-.968.771-1.71 1.954-1.71 1.18 0 1.916.742 1.937 1.71 0 .948-.757 1.706-1.976 1.706zm1.581 11.597H3.715V9.27h3.203v11.182zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/30 transition-all animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-red-500 text-sm">{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 size={20} />
                    Sent!
                  </>
                ) : loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
