'use client'

import { motion } from 'framer-motion'
import { Mail, ChevronDown, Award, Dumbbell, HeartPulse, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut', delay: 0.1 } },
}

const credentials = [
  {
    icon: GraduationCap,
    label: 'Išsilavinimas',
    items: ['Kineziterapijos bakalauras', 'Sporto specialisto licencija'],
  },
  {
    icon: Dumbbell,
    label: 'Specializacija',
    items: ['Asmeninis treneris', 'Reabilitacija po traumų', 'Sveikatingumo treneris'],
  },
  {
    icon: Award,
    label: 'Pasiekimai',
    items: [
      'Daugkartinis BKI Lietuvos čempionas',
      'BKI Baltijos šalių čempionas',
      'Judesių biomechanika — 1 lygis',
    ],
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Subtle noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px',
        }}
      />

      {/* Accent glow — top right */}
      <div className="pointer-events-none absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Text ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            {/* Since badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary inline-block" />
                Treneris nuo 2023 m.
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] text-balance">
                Armandas
              </h1>
              <p className="mt-3 text-primary text-lg font-medium tracking-wide uppercase">
                Asmeninis treneris &amp; Kineziterapeutas
              </p>
            </motion.div>

            {/* Motto */}
            <motion.div variants={itemVariants}>
              <blockquote className="border-l-2 border-primary/50 pl-5">
                <p className="text-muted-foreground text-base leading-relaxed italic text-pretty">
                  &ldquo;Jei negali nustoti apie tai galvoti,&nbsp;
                  nenustok dėl to dirbti.&rdquo;
                </p>
              </blockquote>
            </motion.div>

            {/* Credentials grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {credentials.map(({ icon: Icon, label, items }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2.5"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-primary shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li key={item} className="text-sm text-foreground leading-snug">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="mailto:treneris.armandas@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="size-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Mail className="size-3.5" />
                </span>
                treneris.armandas@gmail.com
              </Link>

              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="size-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                {/* Facebook f icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="size-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                {/* Instagram camera icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Square image ── */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden border border-border shadow-2xl shadow-black/40">
              <Image
                src="/hero.jpg"
                alt="Armandas — asmeninis treneris"
                fill
                sizes="(max-width: 768px) 90vw, 480px"
                className="object-cover"
                priority
              />
              {/* Bottom caption strip */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Armandas
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Asmeninis treneris
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HeartPulse className="size-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Nuo 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
