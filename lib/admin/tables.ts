export type ColumnType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'checkbox'
  | 'select'
  | 'date'
  | 'time'

export type AdminTableKey =
  | 'hero_content'
  | 'training_types'
  | 'schedule_slots'
  | 'exercise_categories'
  | 'exercises'

export type ColumnConfig = {
  key: string
  label: string
  type: ColumnType
  optional?: boolean
  // Fixed set of choices for `select` columns.
  options?: readonly string[]
  // For `select` columns whose choices come from another admin table's rows
  // (e.g. schedule_slots.training_type_id -> training_types).
  foreignTable?: AdminTableKey
  foreignLabelKey?: string
  // Pre-filled value for the "add row" form only.
  defaultValue?: string
}

export type TableConfig = {
  table: string
  label: string
  singleton?: boolean
  columns: ColumnConfig[]
}

export const ADMIN_TABLES: Record<AdminTableKey, TableConfig> = {
  hero_content: {
    table: 'hero_content',
    label: 'Pagrindinis skydelis',
    singleton: true,
    columns: [
      { key: 'heading', label: 'Antraštė', type: 'text' },
      { key: 'subheading', label: 'Paantraštė', type: 'textarea' },
      { key: 'cta_text', label: 'Mygtuko tekstas', type: 'text' },
      { key: 'background_image_url', label: 'Fono nuotraukos URL', type: 'text', optional: true },
    ],
  },
  training_types: {
    table: 'training_types',
    label: 'Treniruočių tipai',
    columns: [
      { key: 'name', label: 'Pavadinimas', type: 'text' },
      { key: 'description', label: 'Aprašymas', type: 'textarea' },
      { key: 'price_monthly', label: 'Kaina / mėn.', type: 'number' },
      { key: 'price_per_session', label: 'Kaina / užsiėmimas', type: 'number', optional: true },
      { key: 'currency', label: 'Valiuta', type: 'text', defaultValue: 'EUR' },
      { key: 'badge_text', label: 'Ženkliuko tekstas', type: 'text', optional: true },
      { key: 'sort_order', label: 'Eiliškumas', type: 'number', defaultValue: '0' },
    ],
  },
  schedule_slots: {
    table: 'schedule_slots',
    label: 'Tvarkaraštis',
    columns: [
      { key: 'slot_date', label: 'Data', type: 'date' },
      { key: 'start_time', label: 'Nuo', type: 'time' },
      { key: 'end_time', label: 'Iki', type: 'time' },
      {
        key: 'training_type_id',
        label: 'Treniruotės tipas',
        type: 'select',
        optional: true,
        foreignTable: 'training_types',
        foreignLabelKey: 'name',
      },
      { key: 'title', label: 'Pavadinimas', type: 'text' },
      { key: 'available_spots', label: 'Vietų skaičius', type: 'number', defaultValue: '10' },
      { key: 'booked_spots', label: 'Užimta vietų', type: 'number', defaultValue: '0' },
    ],
  },
  exercise_categories: {
    table: 'exercise_categories',
    label: 'Pratimų kategorijos',
    columns: [
      { key: 'name', label: 'Pavadinimas', type: 'text' },
      { key: 'position', label: 'Eiliškumas', type: 'number', defaultValue: '0' },
    ],
  },
  exercises: {
    table: 'exercises',
    label: 'Pratimai',
    columns: [
      { key: 'title', label: 'Pavadinimas', type: 'text' },
      { key: 'subtitle', label: 'Paantraštė', type: 'text', optional: true },
      { key: 'description', label: 'Aprašymas', type: 'textarea', optional: true },
      {
        key: 'required_tier',
        label: 'Reikalingas planas',
        type: 'select',
        options: ['public', 'basic', 'premium'],
        defaultValue: 'public',
      },
      { key: 'video_path', label: 'Video kelias (storage)', type: 'text' },
      { key: 'thumbnail_path', label: 'Nuotraukos kelias (storage)', type: 'text', optional: true },
      {
        key: 'category_id',
        label: 'Kategorija',
        type: 'select',
        optional: true,
        foreignTable: 'exercise_categories',
        foreignLabelKey: 'name',
      },
      { key: 'position', label: 'Eiliškumas', type: 'number', defaultValue: '0' },
      { key: 'is_published', label: 'Publikuota', type: 'checkbox', defaultValue: 'on' },
    ],
  },
}
