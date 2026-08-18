import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { TreniruotesSection } from '@/components/treniruotes-section'
import { Footer } from '@/components/footer'
import type { HeroContent, TrainingType } from '@/lib/types'
import { PhotoGallery } from '@/components/ui/photo-gallery'
import { ProgramosSection } from '@/components/programos-section'

export default async function HomePage() {
  const supabase = await createClient()

  const [heroRes, trainingRes] = await Promise.all([
    supabase.from('hero_content').select('*').limit(1).single(),
    supabase.from('training_types').select('*').order('sort_order'),
  ])


  const hero = heroRes.data as HeroContent | null
  const trainingTypes = (trainingRes.data ?? []) as TrainingType[]

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
      <TreniruotesSection trainingTypes={trainingTypes} />
      <PhotoGallery />
      <Footer />
    </>
  )
}
