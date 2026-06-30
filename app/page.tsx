import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { PratimaSection } from '@/components/pratimai-section'
import { TreniruotesSection } from '@/components/treniruotes-section'
import { TvarkarastisSection } from '@/components/tvarkarastis-section'
import { Footer } from '@/components/footer'
import type { HeroContent, TrainingType, ScheduleSlot } from '@/lib/types'
import { PhotoGallery } from '@/components/ui/photo-gallery'
import { ProgramosSection } from '@/components/programos-section'
import { getExercises } from '@/lib/exercises-data'
import { Exercise } from '@/lib/types/exercises'

export default async function HomePage() {
  const supabase = await createClient()

  const [heroRes, exercisesRes, trainingRes, slotsRes] = await Promise.all([
    supabase.from('hero_content').select('*').limit(1).single(),
    await getExercises(6),
    supabase.from('training_types').select('*').order('sort_order'),
    supabase
      .from('schedule_slots')
      .select('*, training_types(name)')
      .gte('slot_date', new Date().toISOString().split('T')[0])
      .order('slot_date')
      .order('start_time'),
  ])


  const hero = heroRes.data as HeroContent | null
  const exercises = (exercisesRes ?? []) as Exercise[];
  const trainingTypes = (trainingRes.data ?? []) as TrainingType[]
  const slots = (slotsRes.data ?? []) as ScheduleSlot[]

  const heroContent: HeroContent = hero ?? {
    id: '',
    heading: 'Pasiekite savo tikslus su profesionaliu treneriu',
    subheading: 'Individualios ir grupinės treniruotės, pritaikytos jūsų poreikiams.',
    cta_text: 'Pradėti dabar',
    background_image_url: null,
    created_at: '',
  }

  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-t border-border" />
      </div>
      <ProgramosSection />
      <PratimaSection exercises={exercises} />
      <TreniruotesSection trainingTypes={trainingTypes} />
      <TvarkarastisSection slots={slots} />
      <PhotoGallery />
      <Footer />
    </>
  )
}
