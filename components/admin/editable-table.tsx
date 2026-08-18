'use client'

import { useState, useTransition } from 'react'
import { Trash2, Plus, Loader2 } from 'lucide-react'
import { ADMIN_TABLES, type AdminTableKey, type ColumnConfig } from '@/lib/admin/tables'
import { updateRow, insertRow, deleteRow } from '@/app/admin/actions'
import { Field, insertDefault } from './fields'

type Row = Record<string, unknown> & { id: string }

type Props = {
  tableKey: AdminTableKey
  rows: Row[]
  foreignRows?: Partial<Record<AdminTableKey, Row[]>>
}

export function EditableTable({ tableKey, rows, foreignRows }: Props) {
  const config = ADMIN_TABLES[tableKey]
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const relatedRows = (col: ColumnConfig) => (col.foreignTable ? foreignRows?.[col.foreignTable] : undefined)

  const handleUpdate = (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      try {
        await updateRow(tableKey, id, formData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Nepavyko išsaugoti.')
      }
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Ištrinti šį įrašą?')) return
    setError(null)
    startTransition(async () => {
      try {
        await deleteRow(tableKey, id)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Nepavyko ištrinti.')
      }
    })
  }

  const handleInsert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const formData = new FormData(form)
    startTransition(async () => {
      try {
        await insertRow(tableKey, formData)
        setAdding(false)
        form.reset()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Nepavyko sukurti įrašo.')
      }
    })
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="sm:overflow-x-auto border border-border/60 rounded-xl">
        <div
          className="admin-row-grid grid gap-y-3 sm:gap-y-0 p-3 sm:p-0 sm:min-w-max"
          style={{ '--admin-grid-cols': `repeat(${config.columns.length}, minmax(140px, 1fr)) auto` } as React.CSSProperties}
        >
          {config.columns.map((col) => (
            <div
              key={col.key}
              className="hidden sm:block px-3 py-2 text-xs font-semibold text-muted-foreground bg-secondary border-b border-border/60"
            >
              {col.label}
            </div>
          ))}
          <div className="hidden sm:block px-3 py-2 text-xs font-semibold text-muted-foreground bg-secondary border-b border-border/60">
            Veiksmai
          </div>

          {rows.map((row) => (
            <form
              key={row.id}
              className="block sm:contents border border-border/60 rounded-xl p-3 space-y-2 sm:border-0 sm:rounded-none sm:p-0 sm:space-y-0"
              onSubmit={(e) => handleUpdate(row.id, e)}
            >
              {config.columns.map((col) => (
                <div key={col.key} className="sm:px-3 sm:py-2 sm:border-b sm:border-border/40 flex flex-col gap-1 sm:flex-row sm:items-center">
                  <span className="sm:hidden text-xs font-medium text-muted-foreground">{col.label}</span>
                  <Field col={col} value={row[col.key]} foreignRows={relatedRows(col)} />
                </div>
              ))}
              <div className="flex items-center gap-3 pt-1 sm:px-3 sm:py-2 sm:pt-2 sm:border-b sm:border-border/40">
                <button
                  type="submit"
                  disabled={pending}
                  className="text-xs font-medium text-primary hover:underline disabled:opacity-50"
                >
                  Išsaugoti
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => handleDelete(row.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                  aria-label="Ištrinti"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </form>
          ))}

          {rows.length === 0 && (
            <div
              className="px-3 py-6 text-center text-sm text-muted-foreground"
              style={{ gridColumn: `1 / -1` }}
            >
              Įrašų nėra.
            </div>
          )}
        </div>
      </div>

      {adding ? (
        <form onSubmit={handleInsert} className="border border-border/60 rounded-xl p-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {config.columns.map((col) => (
            <label key={col.key} className="text-xs text-muted-foreground flex flex-col gap-1">
              {col.label}
              <Field col={col} value={insertDefault(col)} foreignRows={relatedRows(col)} />
            </label>
          ))}
          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              disabled={pending}
              className="text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg px-3 py-1.5 disabled:opacity-50"
            >
              {pending ? <Loader2 className="size-4 animate-spin" /> : 'Sukurti'}
            </button>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5"
            >
              Atšaukti
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <Plus className="size-4" /> Pridėti įrašą
        </button>
      )}
    </div>
  )
}
