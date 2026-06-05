export type HeroContent = {
  id: string
  heading: string
  subheading: string
  cta_text: string
  background_image_url: string | null
  created_at: string
}

export type Exercise = {
  id: string
  title: string
  subtitle: string
  video_url: string
  thumbnail_url: string | null
  sort_order: number
  created_at: string
}

export type TrainingType = {
  id: string
  name: string
  description: string
  price_monthly: number
  price_per_session: number | null
  currency: string
  badge_text: string | null
  sort_order: number
  created_at: string
}

export type ScheduleSlot = {
  id: string
  slot_date: string
  start_time: string
  end_time: string
  training_type_id: string | null
  title: string
  available_spots: number
  booked_spots: number
  created_at: string
  training_types?: {
    name: string
  }
}
