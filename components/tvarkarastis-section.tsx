'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock, Users, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ScheduleSlot } from '@/lib/types'

const LT_MONTHS = [
  'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis',
  'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis',
]
const LT_DAYS = ['Pr', 'An', 'Tr', 'Kt', 'Pn', 'Št', 'Sk']
const LT_DAYS_FULL = ['Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis', 'Sekmadienis']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1 // Monday = 0
}

function formatTime(timeStr: string) {
  return timeStr.slice(0, 5)
}

type Props = {
  slots: ScheduleSlot[]
}

export function TvarkarastisSection({ slots }: Props) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  // Map slots by date
  const slotsByDate = slots.reduce<Record<string, ScheduleSlot[]>>((acc, slot) => {
    if (!acc[slot.slot_date]) acc[slot.slot_date] = []
    acc[slot.slot_date].push(slot)
    return acc
  }, {})

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const formatDate = (year: number, month: number, day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const selectedSlots = selectedDate ? (slotsByDate[selectedDate] ?? []) : []

  const getDayOfWeek = (dateStr: string) => {
    const d = new Date(dateStr)
    const day = d.getDay()
    return LT_DAYS_FULL[day === 0 ? 6 : day - 1]
  }

  return (
    <section id="tvarkarastis" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-3 block">
          Rezervuokite vietą
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
          Tvarkaraštis
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
          Pasirinkite jums patogią datą ir laiką. Paryškintos datos turi laisvų vietų.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Calendar */}
        <div className="bg-card border border-border/50 rounded-2xl p-6">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="size-9 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              aria-label="Ankstesnis mėnuo"
            >
              <ChevronLeft className="size-4 text-foreground" />
            </button>
            <h3 className="text-foreground font-semibold text-lg">
              {LT_MONTHS[viewMonth]} {viewYear}
            </h3>
            <button
              onClick={nextMonth}
              className="size-9 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              aria-label="Kitas mėnuo"
            >
              <ChevronRight className="size-4 text-foreground" />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 mb-2">
            {LT_DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const dateStr = formatDate(viewYear, viewMonth, day)
              const hasSlots = !!slotsByDate[dateStr]
              const isToday =
                day === today.getDate() &&
                viewMonth === today.getMonth() &&
                viewYear === today.getFullYear()
              const isSelected = selectedDate === dateStr
              const isPast = new Date(dateStr) < new Date(today.toDateString())

              return (
                <button
                  key={day}
                  disabled={isPast}
                  onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                  className={`
                    relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all
                    ${isPast ? 'text-muted-foreground/30 cursor-default' : ''}
                    ${!isPast && !hasSlots ? 'text-muted-foreground hover:bg-secondary/50' : ''}
                    ${!isPast && hasSlots && !isSelected ? 'text-foreground hover:bg-primary/15 cursor-pointer' : ''}
                    ${isSelected ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' : ''}
                    ${isToday && !isSelected ? 'ring-1 ring-primary/50' : ''}
                  `}
                >
                  {day}
                  {hasSlots && !isPast && (
                    <span className={`absolute bottom-1 size-1 rounded-full ${isSelected ? 'bg-primary-foreground' : 'bg-primary'}`} />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground border-t border-border/40 pt-4">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-primary" />
              Laisvų vietų yra
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded border border-primary/50 inline-block" />
              Šiandien
            </div>
          </div>
        </div>

        {/* Slots panel */}
        <div className="bg-card border border-border/50 rounded-2xl p-6">
          {!selectedDate ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 min-h-[300px]">
              <div className="size-14 rounded-2xl bg-secondary flex items-center justify-center">
                <Clock className="size-6 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium">Pasirinkite datą</p>
              <p className="text-muted-foreground text-sm max-w-xs">
                Spustelėkite ant pažymėtos datos kalendoriuje, kad pamatytumėte prieinamus laikus.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-5">
                <h3 className="text-foreground font-semibold text-lg">
                  {getDayOfWeek(selectedDate)},{' '}
                  {new Date(selectedDate).getDate()} {LT_MONTHS[new Date(selectedDate).getMonth()]}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {selectedSlots.length > 0
                    ? `${selectedSlots.length} prieinami laikai`
                    : 'Nėra laisvų vietų'}
                </p>
              </div>

              {selectedSlots.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground text-sm">
                    Šiai dienai nėra suplanuotų treniruočių.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {selectedSlots.map((slot) => {
                    const freeSpots = slot.available_spots - slot.booked_spots
                    const isFull = freeSpots <= 0
                    const isPersonal = slot.available_spots === 1

                    return (
                      <motion.div
                        key={slot.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`rounded-xl border p-4 transition-all ${
                          isFull
                            ? 'border-border/30 bg-secondary/20 opacity-60'
                            : 'border-border/50 bg-secondary/40 hover:border-primary/40 hover:bg-secondary/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="size-3.5 text-primary flex-shrink-0" />
                              <span className="text-foreground font-semibold text-sm">
                                {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
                              </span>
                            </div>
                            <p className="text-foreground font-medium text-sm mb-1">{slot.title}</p>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Users className="size-3" />
                              {isPersonal
                                ? 'Asmeninė treniruotė'
                                : `${freeSpots} iš ${slot.available_spots} vietų laisvos`}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {isFull ? (
                              <Badge variant="secondary" className="text-xs whitespace-nowrap">
                                Užpildyta
                              </Badge>
                            ) : (
                              <Badge className="bg-primary/15 text-primary border-primary/30 text-xs whitespace-nowrap">
                                Laisva vieta
                              </Badge>
                            )}
                          </div>
                        </div>
                        {!isFull && (
                          <Button
                            size="sm"
                            className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-2"
                          >
                            <CheckCircle className="size-3 mr-1.5" />
                            Registruotis
                          </Button>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
