import { createAdminClient } from '@/lib/admin/client'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import type { HeroContent, TrainingType, ScheduleSlot, ExerciseCategory } from '@/lib/types'
import type { ExerciseRow } from '@/lib/types/exercises'

export default async function AdminPage() {
  const admin = createAdminClient()

  const [heroRes, trainingRes, scheduleRes, categoriesRes, exercisesRes] = await Promise.all([
    admin.from('hero_content').select('*').limit(1).maybeSingle(),
    admin.from('training_types').select('*').order('sort_order'),
    admin.from('schedule_slots').select('*').order('slot_date'),
    admin.from('exercise_categories').select('*').order('position'),
    admin.from('exercises').select('*').order('position'),
  ])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Administravimo skydelis</h1>
      <AdminDashboard
        hero={heroRes.data as HeroContent | null}
        trainingTypes={(trainingRes.data ?? []) as TrainingType[]}
        scheduleSlots={(scheduleRes.data ?? []) as ScheduleSlot[]}
        exerciseCategories={(categoriesRes.data ?? []) as ExerciseCategory[]}
        exercises={(exercisesRes.data ?? []) as ExerciseRow[]}
      />
    </div>
  )
}
