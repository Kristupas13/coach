import { Dumbbell, Globe, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
              <Dumbbell className="size-4 text-primary-foreground" />
            </div>
            <span className="text-foreground font-bold text-lg tracking-tight">CoachArmandas</span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6">
            {[
              { label: 'Pratimai', href: '#pratimai' },
              { label: 'Treniruotės', href: '#treniruotes' },
              { label: 'Tvarkaraštis', href: '#tvarkarastis' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { Icon: Globe, label: 'Svetainė' },
              { Icon: Mail, label: 'El. paštas' },
              { Icon: Phone, label: 'Telefonas' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="size-9 rounded-lg bg-secondary hover:bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 text-center text-muted-foreground text-xs">
          © {new Date().getFullYear()} CoachArmandas. Visos teisės saugomos.
        </div>
      </div>
    </footer>
  )
}
