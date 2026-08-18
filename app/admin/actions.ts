'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/admin/client'
import { isAdmin } from '@/lib/admin'
import { ADMIN_TABLES, type AdminTableKey } from '@/lib/admin/tables'

async function assertAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!isAdmin(user?.email)) {
    throw new Error('Forbidden')
  }
}

// Builds a write-safe values object: only known columns for this table are
// read from the form, and each value is coerced to the column's declared type.
function coerceValues(tableKey: AdminTableKey, formData: FormData) {
  const config = ADMIN_TABLES[tableKey]
  const values: Record<string, string | number | boolean | null> = {}

  for (const col of config.columns) {
    if (col.type === 'checkbox') {
      values[col.key] = formData.get(col.key) === 'on'
      continue
    }

    const raw = formData.get(col.key)
    const str = typeof raw === 'string' ? raw.trim() : ''

    if (str === '') {
      values[col.key] = col.optional ? null : col.type === 'number' ? 0 : ''
      continue
    }

    values[col.key] = col.type === 'number' ? Number(str) : str
  }

  return values
}

export async function updateRow(tableKey: AdminTableKey, id: string, formData: FormData) {
  await assertAdmin()
  const config = ADMIN_TABLES[tableKey]
  const admin = createAdminClient()
  const { error } = await admin.from(config.table).update(coerceValues(tableKey, formData)).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin')
}

export async function insertRow(tableKey: AdminTableKey, formData: FormData) {
  await assertAdmin()
  const config = ADMIN_TABLES[tableKey]
  const admin = createAdminClient()
  const { error } = await admin.from(config.table).insert(coerceValues(tableKey, formData))
  if (error) throw new Error(error.message)
  revalidatePath('/admin')
}

export async function deleteRow(tableKey: AdminTableKey, id: string) {
  await assertAdmin()
  const config = ADMIN_TABLES[tableKey]
  const admin = createAdminClient()
  const { error } = await admin.from(config.table).delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin')
}

// hero_content has at most one row: update it if present, otherwise create it.
export async function upsertSingleton(tableKey: AdminTableKey, id: string | null, formData: FormData) {
  await assertAdmin()
  const config = ADMIN_TABLES[tableKey]
  const admin = createAdminClient()
  const values = coerceValues(tableKey, formData)
  const { error } = id
    ? await admin.from(config.table).update(values).eq('id', id)
    : await admin.from(config.table).insert(values)
  if (error) throw new Error(error.message)
  revalidatePath('/admin')
}
