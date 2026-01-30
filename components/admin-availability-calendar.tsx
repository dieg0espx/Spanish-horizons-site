"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Check,
  X
} from 'lucide-react'

interface TimeSlot {
  id: string
  date: string
  start_time: string
  end_time: string
  is_booked: boolean
  booked_by_application_id: string | null
  booked_child_name?: string | null
}

interface AdminAvailabilityCalendarProps {
  onSlotSelect?: (slot: TimeSlot) => void
}

export default function AdminAvailabilityCalendar({ onSlotSelect }: AdminAvailabilityCalendarProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1)) // February 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newSlot, setNewSlot] = useState({ date: '', start_time: '09:00', end_time: '09:30' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchSlots()
  }, [])

  const fetchSlots = async () => {
    try {
      const response = await fetch('/api/admin/availability')
      const data = await response.json()
      if (response.ok) {
        setSlots(data.slots || [])
      }
    } catch (error) {
      console.error('Error fetching slots:', error)
    } finally {
      setLoading(false)
    }
  }

  const addSlot = async () => {
    if (!newSlot.date || !newSlot.start_time || !newSlot.end_time) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSlot)
      })

      if (response.ok) {
        const data = await response.json()
        setSlots([...slots, data.slot])
        // Keep modal open to add more slots for the same day
        setNewSlot({ ...newSlot, start_time: '09:00', end_time: '09:30' })
      }
    } catch (error) {
      console.error('Error adding slot:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteSlot = async (slotId: string) => {
    try {
      const response = await fetch(`/api/admin/availability?id=${slotId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setSlots(slots.filter(s => s.id !== slotId))
      }
    } catch (error) {
      console.error('Error deleting slot:', error)
    }
  }

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days: (number | null)[] = []
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const formatDate = (day: number) => {
    const year = currentMonth.getFullYear()
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0')
    const dayStr = String(day).padStart(2, '0')
    return `${year}-${month}-${dayStr}`
  }

  const formatDisplayDate = (dateStr: string) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getSlotsForDate = (dateStr: string) => {
    return slots.filter(slot => slot.date === dateStr)
  }

  const hasSlots = (day: number) => {
    const dateStr = formatDate(day)
    return slots.some(slot => slot.date === dateStr)
  }

  const hasAvailableSlots = (day: number) => {
    const dateStr = formatDate(day)
    return slots.some(slot => slot.date === dateStr && !slot.is_booked)
  }

  const getBookedCount = (day: number) => {
    const dateStr = formatDate(day)
    return slots.filter(slot => slot.date === dateStr && slot.is_booked).length
  }

  const getAvailableCount = (day: number) => {
    const dateStr = formatDate(day)
    return slots.filter(slot => slot.date === dateStr && !slot.is_booked).length
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDayClick = (day: number) => {
    const dateStr = formatDate(day)
    setSelectedDate(dateStr)
    setNewSlot({ date: dateStr, start_time: '09:00', end_time: '09:30' })
    setIsAddModalOpen(true)
  }

  const days = getDaysInMonth(currentMonth)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-ivry font-bold text-slate flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-amber" />
          Interview Availability
        </h3>
        <p className="text-sm text-slate-medium font-questa">Click on a day to add time slots</p>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between bg-slate/5 p-4 rounded-xl">
        <Button variant="ghost" onClick={prevMonth} className="rounded-xl">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h4 className="text-lg font-ivry font-bold text-slate">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
        <Button variant="ghost" onClick={nextMonth} className="rounded-xl">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="border rounded-xl overflow-hidden">
        {/* Week day headers */}
        <div className="grid grid-cols-7 bg-slate text-white">
          {weekDays.map(day => (
            <div key={day} className="p-3 text-center text-sm font-questa font-semibold">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dateStr = day ? formatDate(day) : ''
            const daySlots = day ? getSlotsForDate(dateStr) : []
            const hasAnySlots = day && hasSlots(day)
            const hasAvailable = day && hasAvailableSlots(day)

            return (
              <div
                key={index}
                className={`min-h-[100px] border-b border-r p-2 transition-all ${
                  day ? 'cursor-pointer hover:bg-amber/10 hover:border-amber' : 'bg-gray-50'
                }`}
                onClick={() => day && handleDayClick(day)}
              >
                {day && (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-questa ${
                        hasAnySlots ? 'font-bold text-slate' : 'text-gray-400'
                      }`}>
                        {day}
                      </span>
                      {hasAnySlots && (
                        <div className="flex gap-0.5">
                          {hasAvailable && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                          {getBookedCount(day) > 0 && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                        </div>
                      )}
                    </div>
                    {daySlots.length > 0 && (
                      <div className="space-y-1">
                        {getBookedCount(day) > 0 && (
                          <div className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded flex items-center">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                            {getBookedCount(day)} booked
                          </div>
                        )}
                        {getAvailableCount(day) > 0 && (
                          <div className="text-xs bg-green-100 text-green-700 px-1 py-0.5 rounded flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                            {getAvailableCount(day)} available
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm font-questa">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
          Available
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
          Booked
        </div>
      </div>

      {/* Add/View Slots Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-ivry text-xl text-slate">
              {selectedDate && formatDisplayDate(selectedDate)}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Existing slots for this day */}
            {selectedDate && getSlotsForDate(selectedDate).length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-questa font-semibold text-slate-medium">Existing Time Slots</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {getSlotsForDate(selectedDate).map(slot => (
                    <div
                      key={slot.id}
                      className={`p-3 rounded-xl flex items-center justify-between ${
                        slot.is_booked ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <Clock className={`h-4 w-4 mr-2 ${slot.is_booked ? 'text-blue-500' : 'text-green-500'}`} />
                        <span className="font-questa font-medium">
                          {slot.start_time} - {slot.end_time}
                        </span>
                        {slot.is_booked && (
                          <span className="ml-2 text-xs bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full">
                            {slot.booked_child_name || 'Booked'}
                          </span>
                        )}
                      </div>
                      {!slot.is_booked && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSlot(slot.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-xl h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add new slot */}
            <div className="border-t pt-4">
              <p className="text-sm font-questa font-semibold text-slate mb-3">Add New Time Slot</p>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Label htmlFor="start-time" className="text-xs text-slate-medium font-questa">
                    Start Time
                  </Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={newSlot.start_time}
                    onChange={(e) => setNewSlot({ ...newSlot, start_time: e.target.value })}
                    className="mt-1 rounded-xl border-2 border-slate/20 focus:border-amber focus:ring-amber/50"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="end-time" className="text-xs text-slate-medium font-questa">
                    End Time
                  </Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={newSlot.end_time}
                    onChange={(e) => setNewSlot({ ...newSlot, end_time: e.target.value })}
                    className="mt-1 rounded-xl border-2 border-slate/20 focus:border-amber focus:ring-amber/50"
                  />
                </div>
                <Button
                  onClick={addSlot}
                  disabled={isSubmitting}
                  className="bg-amber hover:bg-golden hover:text-slate text-white rounded-xl font-questa px-4"
                >
                  {isSubmitting ? (
                    <span className="animate-spin">...</span>
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
              className="rounded-xl font-questa w-full"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
