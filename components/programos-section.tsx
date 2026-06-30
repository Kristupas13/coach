'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Dumbbell, Flame, Zap, Target, ChevronRight, Clock, BarChart2, Users, MessageCircle, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { AuthDialog } from '@/components/auth-dialog'
import Link from 'next/link'

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

type Program = {
    id: number
    name: string
    category: string
    duration: string
    level: string
    participants: string
    sessions: number
    description: string
    tags: string[]
    icon: React.ReactNode
    featured?: boolean
}

const programs: Program[] = [
    {
        id: 1,
        name: 'Jėgos pagrindai',
        category: 'Jėga',
        duration: '8 savaitės',
        level: 'Pradedantysis',
        participants: '1–4 žmonės',
        sessions: 24,
        description: 'Kompleksinė jėgos programa skirta tvirtam pagrindui sukurti. Pratimų technika, progresyvus apkrova ir tinkama mityba.',
        tags: ['Jėga', 'Technika', 'Raumenys'],
        icon: <Dumbbell className="size-5" />,
        featured: true,
    },
    {
        id: 2,
        name: 'Fat Burn Pro',
        category: 'Deginti riebalus',
        duration: '6 savaitės',
        level: 'Vidutinis',
        participants: 'Iki 10 žmonių',
        sessions: 18,
        description: 'Intensyvi riebalų deginimo programa su HIIT treniruotėmis, funkciniais judesiais ir mitybos planu.',
        tags: ['HIIT', 'Kardio', 'Degimas'],
        icon: <Flame className="size-5" />,
    },
    {
        id: 3,
        name: 'Sprogstamoji galia',
        category: 'Atletizmas',
        duration: '10 savaitės',
        level: 'Pažengęs',
        participants: '1–2 žmonės',
        sessions: 30,
        description: 'Plometriniai pratimai, greitis ir galios ugdymas sportininkams, norintiems pasiekti aukštesnį lygį.',
        tags: ['Galia', 'Greitis', 'Sportininkai'],
        icon: <Zap className="size-5" />,
    },
    {
        id: 4,
        name: 'Kūno transformacija',
        category: 'Kompleksinė',
        duration: '12 savaitės',
        level: 'Visi lygiai',
        participants: 'Individuali',
        sessions: 36,
        description: 'Visapusė kūno transformacijos programa: raumenų kūrimas, riebalų deginimas ir gyvenimo būdo pokyčiai.',
        tags: ['Transformacija', 'Mityba', 'Laikysena'],
        icon: <Target className="size-5" />,
        featured: true,
    },
    {
        id: 5,
        name: 'Funkciniai judėjimai',
        category: 'Funkcionalumas',
        duration: '6 savaitės',
        level: 'Pradedantysis',
        participants: 'Iki 8 žmonių',
        sessions: 18,
        description: 'Kasdieniniam gyvenimui skirti funkciniai pratimai. Judėjimo kokybė, pusiausvyra ir koordinacija.',
        tags: ['Funkcionalumas', 'Mobilumas', 'Pusiausvyra'],
        icon: <BarChart2 className="size-5" />,
    },
    {
        id: 6,
        name: 'Grupinė energija',
        category: 'Grupinė',
        duration: '4 savaitės',
        level: 'Visi lygiai',
        participants: 'Iki 15 žmonių',
        sessions: 12,
        description: 'Motyvuojančios grupinės treniruotės muzikos ritmu. Linksma, energinga ir efektyvu.',
        tags: ['Grupė', 'Energija', 'Motyvacija'],
        icon: <Users className="size-5" />,
    },
]

const levelColors: Record<string, string> = {
    'Pradedantysis': 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
    'Vidutinis': 'bg-amber-500/15 text-amber-600 border-amber-500/30',
    'Pažengęs': 'bg-red-500/15 text-red-600 border-red-500/30',
    'Visi lygiai': 'bg-primary/15 text-primary border-primary/30',
}

export function ProgramosSection() {
    const [authOpen, setAuthOpen] = useState(false)

    return (
        <>
            <section id="programos" className="py-24 bg-secondary/20 border-y border-border/30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-3 block">
                            Trenerio programos
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                            Pratimų programos
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
                            Prisijunkite, kad gautumėte prieigą prie visų trenerio sukurtų programų ir pradėtumėte savo transformacijos kelionę.
                        </p>

                        {/* Lock teaser */}
                        <div className="inline-flex items-center gap-2 mt-5 bg-primary/10 border border-primary/25 text-primary text-sm font-medium rounded-full px-4 py-2">
                            <Lock className="size-3.5" />
                            Prisijunkite, kad peržiūrėtumėte programas
                        </div>
                    </motion.div>

                    {/* Programs grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {programs.map((program) => (
                            <motion.div key={program.id} variants={cardVariants}>
                                <button
                                    onClick={() => setAuthOpen(true)}
                                    className="group relative w-full text-left rounded-2xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    aria-label={`Peržiūrėti programą: ${program.name} — reikalingas prisijungimas`}
                                >
                                    {/* Featured ribbon */}
                                    {program.featured && (
                                        <div className="absolute top-3 right-3 z-20">
                                            <Badge className="bg-primary text-primary-foreground border-primary text-[10px] px-2 py-0.5 font-semibold">
                                                Populiari
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Blurred content */}
                                    <div className="p-5 select-none">
                                        {/* Icon row */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="size-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary flex-shrink-0">
                                                {program.icon}
                                            </div>
                                            <div className="min-w-0">
                                                {/* Category — not blurred */}
                                                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-0.5">
                                                    {program.category}
                                                </p>
                                                {/* Name — blurred */}
                                                <h3 className="font-bold text-foreground text-base leading-tight blur-[3px] group-hover:blur-[4px] transition-all duration-200 select-none">
                                                    {program.name}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Description — blurred */}
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 blur-[4px] group-hover:blur-[5px] transition-all duration-200 select-none line-clamp-2">
                                            {program.description}
                                        </p>

                                        {/* Stats row — blurred */}
                                        <div className="flex items-center gap-3 mb-4 blur-[3px] group-hover:blur-[4px] transition-all duration-200 select-none">
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Clock className="size-3 text-primary/70 flex-shrink-0" />
                                                {program.duration}
                                            </div>
                                            <span className="text-border">·</span>
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Dumbbell className="size-3 text-primary/70 flex-shrink-0" />
                                                {program.sessions} treniruotės
                                            </div>
                                        </div>

                                        {/* Tags — blurred */}
                                        <div className="flex flex-wrap gap-1.5 mb-4 blur-[3px] group-hover:blur-[4px] transition-all duration-200 select-none">
                                            {program.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[11px] bg-secondary border border-border/50 text-muted-foreground rounded-full px-2.5 py-0.5"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Bottom row: level + participants — partially blurred */}
                                        <div className="flex items-center justify-between pt-3 border-t border-border/40">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border blur-[2px] group-hover:blur-[3px] transition-all duration-200 select-none ${levelColors[program.level] ?? 'bg-secondary text-muted-foreground border-border/50'}`}>
                                                {program.level}
                                            </span>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground blur-[2px] group-hover:blur-[3px] transition-all duration-200 select-none">
                                                <Users className="size-3" />
                                                {program.participants}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover overlay — lock prompt */}
                                    <div className="absolute inset-0 bg-card/60 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                                        <div className="size-11 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                                            <Lock className="size-5 text-primary-foreground" />
                                        </div>
                                        <p className="text-foreground font-semibold text-sm">Prisijungti</p>
                                        <p className="text-muted-foreground text-xs">kad peržiūrėtumėte programą</p>
                                        <div className="flex items-center gap-1 text-primary text-xs font-medium mt-1">
                                            Prisijungti <ChevronRight className="size-3" />
                                        </div>
                                    </div>
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Bottom CTA — view all programs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center mt-12"
                    >
                        <p className="text-muted-foreground text-sm mb-4">
                            Norite pamatyti visas {programs.length} programas su išsamiais planais?
                        </p>
                        <button
                            onClick={() => setAuthOpen(true)}
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-6 py-3 transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 text-sm"
                        >
                            <Lock className="size-4" />
                            Prisijungti ir peržiūrėti programas
                            <ChevronRight className="size-4" />
                        </button>
                    </motion.div>

                    {/* Custom program CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-16"
                    >
                        <div className="relative rounded-3xl border border-primary/20 bg-primary/5 overflow-hidden px-6 py-10 sm:px-12 sm:py-12 text-center">
                            {/* Subtle grid texture */}
                            <div
                                className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage:
                                        'repeating-linear-gradient(0deg,var(--color-primary) 0 1px,transparent 1px 40px),repeating-linear-gradient(90deg,var(--color-primary) 0 1px,transparent 1px 40px)',
                                }}
                            />

                            <div className="relative z-10 flex flex-col items-center gap-6">
                                {/* Icon */}
                                <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <Sparkles className="size-6 text-primary" />
                                </div>

                                {/* Heading */}
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-balance">
                                        Nori savo asmeninės programos?
                                    </h3>
                                    <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto text-pretty leading-relaxed">
                                        Kiekvienas žmogus yra skirtingas. Prisijunk ir užpildyk savo poreikių anketą — arba tiesiog susisiek su manimi ir aptarsime, kokia programa tinka tau labiausiai.
                                    </p>
                                </div>

                                {/* Action buttons */}
                                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                                    <button
                                        onClick={() => setAuthOpen(true)}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-7 py-3.5 transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/35 hover:-translate-y-0.5 text-sm"
                                    >
                                        <Lock className="size-4" />
                                        Prisijungti ir pateikti poreikius
                                    </button>
                                    <Link
                                        href="#kontaktai"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-card hover:bg-secondary border border-border/60 hover:border-primary/30 text-foreground font-semibold rounded-xl px-7 py-3.5 transition-all duration-200 hover:-translate-y-0.5 text-sm"
                                    >
                                        <MessageCircle className="size-4 text-primary" />
                                        Susisiekti su manimi
                                    </Link>
                                </div>

                                {/* Trust line */}
                                <p className="text-xs text-muted-foreground">
                                    Individualus įvertinimas · Pritaikyta programa · Reguliarus palaikymas
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
        </>
    )
}
