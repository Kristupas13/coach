import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import type {
  Exercise,
  ExerciseRow,
  AccessibleExercise,
  LockedExercise,
  SubscriptionTier,
} from '@/lib/types/exercises'
import { TIER_RANK } from '@/lib/types/exercises'

const VIDEO_BUCKET = 'exercise-videos'
const THUMB_BUCKET = 'exercise-thumbs'
const SIGNED_URL_EXPIRY = 60 * 60 // 1 hour

function createAdminClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // server-only env var, no NEXT_PUBLIC_ prefix
  )
}

export async function getExercises(take: number | null): Promise<Exercise[]> {
  const supabase = await createClient()

  let userTier: SubscriptionTier = 'public'

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', user.id)
      .single()

    if (profile?.tier) {
      userTier = profile.tier as SubscriptionTier
    }
  }

  const userRank = TIER_RANK[userTier]

  const admin = createAdminClient()

  const query = admin
    .from('exercises')
    .select('id, title, subtitle, description, required_tier, thumbnail_path, video_path, category_id, position')
    .eq('is_published', true)
    .order('position', { ascending: true })

  const { data, error } = take != null ? await query.limit(take) : await query;

  if (error) {
    console.error('[getExercises] query failed:', error.message)
    return []
  }

  if (!data?.length) return []

  const rows = data as ExerciseRow[]

  const accessibleRows = rows.filter((row) => userRank >= TIER_RANK[row.required_tier])
  const lockedRows = rows.filter((row) => userRank < TIER_RANK[row.required_tier])

  const signedResults = await Promise.all(
    accessibleRows.map((row) =>
      admin.storage.from(VIDEO_BUCKET).createSignedUrl(row.video_path, SIGNED_URL_EXPIRY)
    )
  )

  const accessible: AccessibleExercise[] = accessibleRows.map((row, i) => {
    const signed = signedResults[i]

    if (signed.error) {
      console.error(`[getExercises] failed to sign URL for "${row.id}":`, signed.error.message)
    }

    const thumbnail_url = row.thumbnail_path
      ? admin.storage.from(THUMB_BUCKET).getPublicUrl(row.thumbnail_path).data.publicUrl
      : null

    return {
      accessible: true,
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      description: row.description,
      required_tier: row.required_tier,
      video_url: signed.data?.signedUrl ?? '',
      thumbnail_url,
      category_id: row.category_id,
      position: row.position,
    }
  })

  const locked: LockedExercise[] = lockedRows.map((row) => ({
    accessible: false,
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    required_tier: row.required_tier,
    category_id: row.category_id,
    position: row.position,
  }))

  return [...accessible, ...locked].sort((a, b) => a.position - b.position)
}