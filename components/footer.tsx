'use client'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground">
            <p>© {currentYear} Haroon Ali. All rights reserved.</p>
          </div>
          <div className="text-sm text-muted-foreground">
            Built with React & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  )
}
