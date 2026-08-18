import { createClient as createServiceClient } from '@supabase/supabase-js'

// Service-role client for admin dashboard reads/writes. Bypasses RLS, so it
// must only ever be used after an isAdmin() check on the server.
export function createAdminClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // server-only env var, no NEXT_PUBLIC_ prefix
  )
}
