'use client'

import { useState } from 'react'
import { ADMIN_TABLES } from '@/lib/admin/tables'
import { EditableTable } from './editable-table'
import { HeroEditor } from './hero-editor'
import { CustomersTable } from './customers-table'
import type { HeroContent, TrainingType, ScheduleSlot, ExerciseCategory } from '@/lib/types'
import type { ExerciseRow } from '@/lib/types/exercises'

type Props = {
  hero: HeroContent | null
  trainingTypes: TrainingType[]
  scheduleSlots: ScheduleSlot[]
  exerciseCategories: ExerciseCategory[]
  exercises: ExerciseRow[]
}

const TABS = [
  { key: 'hero_content', label: ADMIN_TABLES.hero_content.label },
  { key: 'training_types', label: ADMIN_TABLES.training_types.label },
  { key: 'schedule_slots', label: ADMIN_TABLES.schedule_slots.label },
  { key: 'exercise_categories', label: ADMIN_TABLES.exercise_categories.label },
  { key: 'exercises', label: ADMIN_TABLES.exercises.label },
  { key: 'customers', label: 'Klientai' },
] as const

export function AdminDashboard({ hero, trainingTypes, scheduleSlots, exerciseCategories, exercises }: Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('hero_content')

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border/60 pb-3">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors ${
              tab === t.key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'hero_content' && <HeroEditor hero={hero} />}
      {tab === 'training_types' && <EditableTable tableKey="training_types" rows={trainingTypes} />}
      {tab === 'schedule_slots' && (
        <EditableTable tableKey="schedule_slots" rows={scheduleSlots} foreignRows={{ training_types: trainingTypes }} />
      )}
      {tab === 'exercise_categories' && <EditableTable tableKey="exercise_categories" rows={exerciseCategories} />}
      {tab === 'exercises' && (
        <EditableTable tableKey="exercises" rows={exercises} foreignRows={{ exercise_categories: exerciseCategories }} />
      )}
      {tab === 'customers' && <CustomersTable />}
    </div>
  )
}
