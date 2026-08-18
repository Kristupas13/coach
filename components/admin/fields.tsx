import type { ColumnConfig } from '@/lib/admin/tables'

export const inputClass =
  'w-full bg-secondary border border-border/60 rounded-lg px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all'

type Row = Record<string, unknown>

type FieldProps = {
  col: ColumnConfig
  value: unknown
  foreignRows?: Row[]
}

export function Field({ col, value, foreignRows }: FieldProps) {
  if (col.type === 'checkbox') {
    return (
      <input
        type="checkbox"
        name={col.key}
        defaultChecked={!!value}
        className="size-4 accent-primary"
      />
    )
  }

  if (col.type === 'textarea') {
    return (
      <textarea
        name={col.key}
        defaultValue={(value as string) ?? ''}
        rows={2}
        className={inputClass}
      />
    )
  }

  if (col.type === 'select') {
    const options = col.foreignTable
      ? (foreignRows ?? []).map((r) => ({
          value: String(r.id),
          label: String(r[col.foreignLabelKey ?? 'name']),
        }))
      : (col.options ?? []).map((o) => ({ value: o, label: o }))

    return (
      <select name={col.key} defaultValue={(value as string) ?? ''} className={inputClass}>
        {col.optional && <option value="">—</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    )
  }

  if (col.type === 'date') {
    return <input type="date" name={col.key} defaultValue={(value as string) ?? ''} className={inputClass} />
  }

  if (col.type === 'time') {
    return (
      <input
        type="time"
        name={col.key}
        defaultValue={typeof value === 'string' ? value.slice(0, 5) : ''}
        className={inputClass}
      />
    )
  }

  if (col.type === 'number') {
    return (
      <input
        type="number"
        step="any"
        name={col.key}
        defaultValue={(value as number | string) ?? ''}
        className={inputClass}
      />
    )
  }

  return <input type="text" name={col.key} defaultValue={(value as string) ?? ''} className={inputClass} />
}

export function insertDefault(col: ColumnConfig): unknown {
  if (col.type === 'checkbox') return col.defaultValue === 'on'
  return col.defaultValue ?? ''
}
