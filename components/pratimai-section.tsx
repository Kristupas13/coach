'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { Exercise } from '@/lib/types'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

type Props = {
  exercises: Exercise[]
}

export function PratimaSection({ exercises }: Props) {
  const [activeVideo, setActiveVideo] = useState<Exercise | null>(null)

  return (
    <>
      <section id="pratimai" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-3 block">
            Video pamokos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Pratimai
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            Išmokite teisingos technikos su mūsų video pamokų biblioteka. Kiekvienas pratimas
            parengtas profesionaliai ir aiškiai.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {exercises.map((exercise) => (
            <motion.div key={exercise.id} variants={cardVariants}>
              <Card
                className="group cursor-pointer bg-card border-border/50 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
                onClick={() => setActiveVideo(exercise)}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden aspect-video bg-muted">
                  {exercise.thumbnail_url ? (
                    <img
                      src={exercise.thumbnail_url}
                      alt={exercise.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-secondary" />
                  )}
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="size-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40"
                    >
                      <Play className="size-6 text-primary-foreground ml-0.5" fill="currentColor" />
                    </motion.div>
                  </div>
                  {/* Always-visible play button (small) */}
                  <div className="absolute bottom-3 right-3 size-9 bg-primary/90 rounded-full flex items-center justify-center group-hover:opacity-0 transition-opacity">
                    <Play className="size-4 text-primary-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-foreground text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                    {exercise.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    {exercise.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <span className="text-xs text-primary/70 font-medium">Žiūrėti video →</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Video modal */}
      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-3xl p-0 bg-card border-border overflow-hidden">
          <DialogTitle className="sr-only">
            {activeVideo?.title ?? 'Video pratimas'}
          </DialogTitle>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-foreground font-semibold">{activeVideo?.title}</h3>
              <p className="text-muted-foreground text-sm">{activeVideo?.subtitle}</p>
            </div>
            <button
              onClick={() => setActiveVideo(null)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Uždaryti"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="aspect-video">
            {activeVideo && (
              <iframe
                src={`${activeVideo.video_url}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
