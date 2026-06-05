'use client'

import { motion } from 'framer-motion'
import { Check, Users, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import type { TrainingType } from '@/lib/types'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
}

const groupFeatures = [
  'Iki 15 dalyvių grupėje',
  'Socialinė motyvacija',
  'Įvairios programos',
  'Savaitinis tvarkaraštis',
]

const personalFeatures = [
  'Individuali programa',
  'Visiškas trenerio dėmesys',
  'Lanksčios treniruočių datos',
  'Progreso stebėjimas',
]

type Props = {
  trainingTypes: TrainingType[]
}

export function TreniruotesSection({ trainingTypes }: Props) {
  const features: Record<string, string[]> = {
    'Grupinės treniruotės': groupFeatures,
    'Asmeninės treniruotės': personalFeatures,
  }

  const icons: Record<string, React.ReactNode> = {
    'Grupinės treniruotės': <Users className="size-6 text-primary" />,
    'Asmeninės treniruotės': <User className="size-6 text-primary" />,
  }

  return (
    <section id="treniruotes" className="py-24 bg-secondary/30 border-y border-border/30">
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
            Pasirinkite programą
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Treniruotės
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            Pasirinkite treniruočių tipą, kuris geriausiai atitinka jūsų tikslus ir gyvenimo būdą.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {trainingTypes.map((type, index) => {
            const isPremium = type.badge_text === 'Premium'
            const cardFeatures = features[type.name] ?? []
            const icon = icons[type.name]

            return (
              <motion.div key={type.id} variants={cardVariants}>
                <Card
                  className={`relative flex flex-col h-full border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                    isPremium
                      ? 'border-primary/50 bg-card hover:shadow-primary/20'
                      : 'border-border/50 bg-card hover:border-primary/30 hover:shadow-primary/10'
                  }`}
                >
                  {/* Popular/Premium badge */}
                  {type.badge_text && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge
                        className={`px-3 py-1 text-xs font-semibold ${
                          isPremium
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-secondary text-foreground border-border'
                        }`}
                      >
                        {type.badge_text}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4 pt-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        {icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {type.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed text-sm mt-2">
                      {type.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 pb-4">
                    {/* Pricing */}
                    <div className="bg-secondary/50 rounded-xl p-4 mb-6 border border-border/40">
                      <div className="flex items-end gap-1">
                        <span className="text-4xl font-bold text-foreground">
                          {Math.round(type.price_monthly)}
                        </span>
                        <span className="text-muted-foreground text-sm mb-1.5">
                          {type.currency}/mėn
                        </span>
                      </div>
                      {type.price_per_session && (
                        <div className="text-muted-foreground text-sm mt-1">
                          arba{' '}
                          <span className="text-foreground font-medium">
                            {Math.round(type.price_per_session)} {type.currency}
                          </span>{' '}
                          / užsiėmimas
                        </div>
                      )}
                    </div>

                    {/* Features list */}
                    <ul className="flex flex-col gap-3">
                      {cardFeatures.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm">
                          <div className="size-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                            <Check className="size-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-0 pb-6">
                    <Button
                      className={`w-full font-semibold rounded-xl py-5 ${
                        isPremium
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25'
                          : 'bg-secondary hover:bg-secondary/80 text-foreground border border-border/60'
                      }`}
                      asChild
                    >
                      <a href="#tvarkarastis">Registruotis</a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
