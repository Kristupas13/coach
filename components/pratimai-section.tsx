'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, X, Lock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { Exercise, AccessibleExercise, SubscriptionTier } from '@/lib/types/exercises'

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─── Tier badge ───────────────────────────────────────────────────────────────

const TIER_LABELS: Record<SubscriptionTier, string | null> = {
  public: null,
  basic: 'Basic',
  premium: 'Premium',
}

const TIER_CLASSES: Record<SubscriptionTier, string> = {
  public: '',
  basic: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  premium: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
}

function TierBadge({ tier }: { tier: SubscriptionTier }) {
  const label = TIER_LABELS[tier]
  if (!label) return null
  return (
    <span
      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${TIER_CLASSES[tier]}`}
    >
      {label}
    </span>
  )
}

// ─── Locked card ─────────────────────────────────────────────────────────────
// Rendered server-side as static HTML. No URLs in props.

function LockedCard({ exercise }: { exercise: Exercise & { accessible: false } }) {
  const tierLabel = exercise.required_tier === 'premium' ? 'Premium' : 'Basic'

  return (
    <Card className="bg-card border-border/50 overflow-hidden cursor-not-allowed select-none">
      {/* Blurred placeholder thumbnail */}
      <div className="relative overflow-hidden aspect-video bg-muted">
        <div className="w-full h-full bg-gradient-to-br from-muted to-secondary blur-sm scale-110" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
          <div className="size-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
            <Lock className="size-5 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{tierLabel} planas</span>
        </div>
        <div className="absolute top-2 left-2">
          <TierBadge tier={exercise.required_tier} />
        </div>
      </div>

      <CardHeader className="pb-2">
        {/* Title visible but slightly muted — user can see what they're missing */}
        <CardTitle className="text-foreground/60 text-base font-semibold leading-snug">
          {exercise.title}
        </CardTitle>
        {exercise.subtitle && (
          <CardDescription className="text-muted-foreground/60 text-sm">
            {exercise.subtitle}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <span className="text-xs text-muted-foreground/50 font-medium">
          Atrakinkite su {tierLabel} planu →
        </span>
      </CardContent>
    </Card>
  )
}

// ─── Accessible card ──────────────────────────────────────────────────────────

function AccessibleCard({
  exercise,
  onClick,
}: {
  exercise: AccessibleExercise
  onClick: () => void
}) {
  return (
    <Card
      className="group cursor-pointer bg-card border-border/50 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
      onClick={onClick}
    >
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

        {exercise.required_tier !== 'public' && (
          <div className="absolute top-2 left-2">
            <TierBadge tier={exercise.required_tier} />
          </div>
        )}

        {/* Hover play overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="size-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40"
          >
            <Play className="size-6 text-primary-foreground ml-0.5" fill="currentColor" />
          </motion.div>
        </div>

        {/* Always-visible small play button */}
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
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

type Props = {
  exercises: Exercise[]
}

export function PratimaSection({ exercises }: Props) {
  const [activeVideo, setActiveVideo] = useState<AccessibleExercise | null>(null)

  return (
    <>
      <section id="pratimai" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {exercises.map((exercise) => (
            <motion.div key={exercise.id} variants={cardVariants}>
              {exercise.accessible ? (
                <AccessibleCard
                  exercise={exercise}
                  onClick={() => setActiveVideo(exercise)}
                />
              ) : (
                <LockedCard exercise={exercise} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Video modal — only mounts when accessible exercise is selected */}
      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-3xl p-0 bg-card border-border overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">
            {activeVideo?.title ?? 'Video pratimas'}
          </DialogTitle>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-foreground font-semibold">{activeVideo?.title}</h3>
                <p className="text-muted-foreground text-sm">{activeVideo?.subtitle}</p>
              </div>
              {activeVideo && <TierBadge tier={activeVideo.required_tier} />}
            </div>
            <button
              onClick={() => setActiveVideo(null)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Uždaryti"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="aspect-video bg-black">
            {activeVideo?.video_url && (
              <video
                key={activeVideo.id}
                src={activeVideo.video_url}
                controls
                autoPlay
                className="w-full h-full"
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
              />
            )}
          </div>
          {activeVideo?.description && (
            <div className="p-4 border-t border-border">
              <p className="text-muted-foreground text-sm">{activeVideo.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}