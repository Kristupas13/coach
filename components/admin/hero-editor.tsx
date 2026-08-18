'use client'

import { useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import type { HeroContent } from '@/lib/types'
import { ADMIN_TABLES } from '@/lib/admin/tables'
import { upsertSingleton } from '@/app/admin/actions'
import { Field } from './fields'

export function HeroEditor({ hero }: { hero: HeroContent | null }) {
  const config = ADMIN_TABLES.hero_content
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [pending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSaved(false)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      try {
        await upsertSingleton('hero_content', hero?.id ?? null, formData)
        setSaved(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Nepavyko išsaugoti.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      {config.columns.map((col) => (
        <label key={col.key} className="block text-sm text-muted-foreground">
          <span className="block mb-1">{col.label}</span>
          <Field col={col} value={hero ? (hero as unknown as Record<string, unknown>)[col.key] : ''} />
        </label>
      ))}

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2 text-destructive text-sm">
          {error}
        </div>
      )}
      {saved && !error && (
        <div className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 text-primary text-sm">
          Išsaugota.
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 disabled:opacity-50"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : 'Išsaugoti'}
      </button>
    </form>
  )
}
