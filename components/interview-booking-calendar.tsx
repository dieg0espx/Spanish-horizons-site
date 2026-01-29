"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle
} from 'lucide-react'

interface TimeSlot {
  id: string
  date: string
  start_time: string
  end_time: string
  is_booked: boolean
}

interface InterviewBookingCalendarProps {
  applicationId: string
  childName: string
  onBooked?: (interviewDate: string) => void
  onClose?: () => void
}

export default function InterviewBookingCalendar({
  applicationId,
  childName,
  onBooked,
  onClose
}: InterviewBookingCalendarProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1)) // February 2026 for mock data
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  useEffect(() => {
    fetchSlots()
  }, [])

  const fetchSlots = async () => {
    try {
      const response = await fetch('/api/admin/availability')
      const data = await response.json()
      if (response.ok) {
        // Only show available (not booked) slots
        const availableSlots = (data.slots || []).filter((slot: TimeSlot) => !slot.is_booked)
        setSlots(availableSlots)
      }
    } catch (error) {
      console.error('Error fetching slots:', error)
    } finally {
      setLoading(false)
    }
  }

  const bookSlot = async () => {
    if (!selectedSlot) return

    setIsBooking(true)
    try {
      const response = await fetch('/api/admissions/book-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          slotId: selectedSlot.id
        })
      })

      if (response.ok) {
        const data = await response.json()
        setBookingSuccess(true)
        if (onBooked) {
          onBooked(data.interview_date)
        }
      }
    } catch (error) {
      console.error('Error booking interview:', error)
    } finally {
      setIsBooking(false)
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

  const getSlotsForDate = (dateStr: string) => {
    return slots.filter(slot => slot.date === dateStr)
  }

  const hasAvailableSlots = (day: number) => {
    const dateStr = formatDate(day)
    return slots.some(slot => slot.date === dateStr)
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const selectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot)
    setIsConfirmModalOpen(true)
  }

  const days = getDaysInMonth(currentMonth)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  if (bookingSuccess) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-ivry font-bold text-green-700 mb-2">
            Interview Booked!
          </h3>
          <p className="text-green-600 font-questa mb-4">
            Your interview for {childName} has been scheduled for:
          </p>
          {selectedSlot && (
            <div className="bg-white p-4 rounded-xl border border-green-200 inline-block">
              <p className="font-questa font-bold text-slate">
                {new Date(selectedSlot.date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <p className="font-questa text-slate-medium">
                {selectedSlot.start_time} - {selectedSlot.end_time}
              </p>
            </div>
          )}
          <p className="text-sm text-green-600 font-questa mt-4">
            A confirmation email has been sent to you.
          </p>
          {onClose && (
            <Button
              onClick={onClose}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-xl font-questa"
            >
              Close
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-amber border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (slots.length === 0) {
    return (
      <Card className="border-amber/30 bg-amber/5">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-amber mx-auto mb-4" />
          <h3 className="text-lg font-ivry font-bold text-slate mb-2">
            No Available Times
          </h3>
          <p className="text-slate-medium font-questa">
            There are currently no interview slots available. Please check back later or contact us.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-ivry font-bold text-slate mb-2">
          Schedule Your Interview
        </h3>
        <p className="text-slate-medium font-questa">
          Select an available time slot for {childName}'s interview
        </p>
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
            <div key={day} className="p-2 sm:p-3 text-center text-xs sm:text-sm font-questa font-semibold">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dateStr = day ? formatDate(day) : ''
            const daySlots = day ? getSlotsForDate(dateStr) : []
            const isSelected = selectedDate === dateStr
            const hasSlots = day && hasAvailableSlots(day)
            const isPast = day ? new Date(dateStr) < new Date(new Date().toDateString()) : false

            return (
              <div
                key={index}
                className={`min-h-[60px] sm:min-h-[80px] border-b border-r p-1 sm:p-2 ${
                  day && !isPast && hasSlots
                    ? 'cursor-pointer hover:bg-green-50'
                    : day && isPast
                    ? 'bg-gray-100'
                    : 'bg-gray-50'
                } ${isSelected ? 'bg-green-100' : ''}`}
                onClick={() => day && !isPast && hasSlots && setSelectedDate(isSelected ? null : dateStr)}
              >
                {day && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-questa ${
                        hasSlots && !isPast ? 'font-bold text-green-600' : 'text-gray-400'
                      }`}>
                        {day}
                      </span>
                    </div>
                    {hasSlots && !isPast && (
                      <div className="mt-1">
                        <span className="text-xs bg-green-500 text-white px-1 sm:px-2 py-0.5 rounded-full">
                          {daySlots.length} slot{daySlots.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected Date Slots */}
      {selectedDate && (
        <Card className="border-green-200">
          <CardHeader className="pb-3 bg-green-50">
            <CardTitle className="text-lg font-ivry text-green-700">
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-slate-medium font-questa mb-4">
              Select a time slot:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {getSlotsForDate(selectedDate).map(slot => (
                <Button
                  key={slot.id}
                  variant="outline"
                  onClick={() => selectSlot(slot)}
                  className="border-green-300 text-green-700 hover:bg-green-500 hover:text-white hover:border-green-500 rounded-xl font-questa"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  {slot.start_time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirm Modal */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-ivry text-xl text-slate">
              Confirm Interview Time
            </DialogTitle>
          </DialogHeader>

          {selectedSlot && (
            <div className="py-4">
              <p className="text-slate-medium font-questa mb-4">
                You are booking an interview for <strong>{childName}</strong>:
              </p>
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-questa font-semibold text-slate">
                    {new Date(selectedSlot.date + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-questa font-semibold text-slate">
                    {selectedSlot.start_time} - {selectedSlot.end_time}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-medium font-questa mt-4">
                A confirmation email will be sent to you after booking.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmModalOpen(false)}
              className="rounded-xl font-questa"
            >
              Cancel
            </Button>
            <Button
              onClick={bookSlot}
              disabled={isBooking}
              className="bg-green-500 hover:bg-green-600 text-white rounded-xl font-questa"
            >
              {isBooking ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
