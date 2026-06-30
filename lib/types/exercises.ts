// lib/types/exercises.ts

export type SubscriptionTier = 'public' | 'basic' | 'premium'

export const TIER_RANK: Record<SubscriptionTier, number> = {
  public: 0,
  basic: 1,
  premium: 2,
}

export function canAccessTier(
  userTier: SubscriptionTier,
  requiredTier: SubscriptionTier
): boolean {
  return TIER_RANK[userTier] >= TIER_RANK[requiredTier]
}

// Matches the `exercises` table row exactly
export interface ExerciseRow {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  required_tier: SubscriptionTier
  video_path: string
  thumbnail_path: string | null
  category_id: string | null
  position: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface ProfileRow {
  id: string
  full_name: string | null
  tier: SubscriptionTier
  created_at: string
  updated_at: string
}

// ─── What gets sent to the client ────────────────────────────────────────────
//
// Discriminated union. The locked variant intentionally omits video_url and
// thumbnail_url so there is nothing exploitable in the client JS bundle or
// React hydration payload.

export interface AccessibleExercise {
  accessible: true
  id: string
  title: string
  subtitle: string | null
  description: string | null
  required_tier: SubscriptionTier
  video_url: string        // signed, short-lived
  thumbnail_url: string | null
  category_id: string | null
  position: number
}

export interface LockedExercise {
  accessible: false
  id: string
  title: string
  subtitle: string | null
  required_tier: SubscriptionTier
  category_id: string | null
  position: number
  // No video_url. No thumbnail_url. Intentional.
}

export type Exercise = AccessibleExercise | LockedExercise