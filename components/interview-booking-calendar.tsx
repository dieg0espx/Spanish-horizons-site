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
        // Show all slots (we'll display booked ones as unavailable)
        setSlots(data.slots || [])
      }
    } catch (error) {
      console.error('Error fetching slots:', error)
    } finally {
      setLoading(false)
    }
  }

  const [bookingError, setBookingError] = useState<string | null>(null)

  const bookSlot = async () => {
    if (!selectedSlot) return

    setIsBooking(true)
    setBookingError(null)
    try {
      const response = await fetch('/api/admissions/book-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          slotId: selectedSlot.id
        })
      })

      const data = await response.json()

      if (response.ok) {
        setBookingSuccess(true)
        // Update local slots to mark this one as booked
        setSlots(prevSlots =>
          prevSlots.map(s =>
            s.id === selectedSlot.id
              ? { ...s, is_booked: true }
              : s
          )
        )
        if (onBooked) {
          onBooked(data.interview_date)
        }
      } else {
        setBookingError(data.error || 'Failed to book interview. Please try again.')
        setIsConfirmModalOpen(false)
      }
    } catch (error) {
      console.error('Error booking interview:', error)
      setBookingError('Failed to book interview. Please try again.')
      setIsConfirmModalOpen(false)
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
    return slots.some(slot => slot.date === dateStr && !slot.is_booked)
  }

  const getAvailableCount = (day: number) => {
    const dateStr = formatDate(day)
    return slots.filter(slot => slot.date === dateStr && !slot.is_booked).length
  }

  const getBusyCount = (day: number) => {
    const dateStr = formatDate(day)
    return slots.filter(slot => slot.date === dateStr && slot.is_booked).length
  }

  const hasAnySlots = (day: number) => {
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
        <CardContent className="p-4 sm:p-8 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Check className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-ivry font-bold text-green-700 mb-2">
            Interview Booked!
          </h3>
          <p className="text-green-600 font-questa mb-3 sm:mb-4 text-sm sm:text-base">
            Your interview for {childName} has been scheduled for:
          </p>
          {selectedSlot && (
            <div className="bg-white p-3 sm:p-4 rounded-xl border border-green-200 inline-block max-w-full">
              <p className="font-questa font-bold text-slate text-sm sm:text-base">
                {new Date(selectedSlot.date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <p className="font-questa text-slate-medium text-sm">
                {selectedSlot.start_time} - {selectedSlot.end_time}
              </p>
            </div>
          )}
          <p className="text-xs sm:text-sm text-green-600 font-questa mt-3 sm:mt-4">
            A confirmation email has been sent to you.
          </p>
          <p className="text-[10px] sm:text-xs text-green-500 font-questa mt-2">
            This window will close automatically...
          </p>
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

  const availableSlots = slots.filter(s => !s.is_booked)

  if (slots.length === 0) {
    return (
      <Card className="border-amber/30 bg-amber/5">
        <CardContent className="p-4 sm:p-8 text-center">
          <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-amber mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-ivry font-bold text-slate mb-2">
            No Interview Times Set
          </h3>
          <p className="text-slate-medium font-questa text-sm sm:text-base">
            There are currently no interview slots available. Please check back later or contact us.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (availableSlots.length === 0) {
    return (
      <Card className="border-amber/30 bg-amber/5">
        <CardContent className="p-4 sm:p-8 text-center">
          <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-amber mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-ivry font-bold text-slate mb-2">
            All Times Are Booked
          </h3>
          <p className="text-slate-medium font-questa text-sm sm:text-base">
            All available interview slots are currently booked. Please check back later or contact us to request additional times.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-base sm:text-xl font-ivry font-bold text-slate mb-1 sm:mb-2">
          Schedule Your Interview
        </h3>
        <p className="text-slate-medium font-questa text-xs sm:text-base">
          Select an available time slot for {childName}'s interview
        </p>
      </div>

      {/* Error Message */}
      {bookingError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
          <div className="flex items-start sm:items-center">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2 mt-0.5 sm:mt-0 shrink-0" />
            <p className="text-red-700 font-questa text-xs sm:text-base">{bookingError}</p>
          </div>
        </div>
      )}

      {/* Month Navigation */}
      <div className="flex items-center justify-between bg-slate/5 p-2 sm:p-4 rounded-xl">
        <Button variant="ghost" onClick={prevMonth} size="sm" className="rounded-xl h-8 w-8 sm:h-10 sm:w-10 p-0">
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <h4 className="text-sm sm:text-lg font-ivry font-bold text-slate">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
        <Button variant="ghost" onClick={nextMonth} size="sm" className="rounded-xl h-8 w-8 sm:h-10 sm:w-10 p-0">
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="border rounded-xl overflow-hidden">
        {/* Week day headers */}
        <div className="grid grid-cols-7 bg-slate text-white">
          {weekDays.map((day, i) => (
            <div key={day} className="p-1.5 sm:p-3 text-center text-[10px] sm:text-sm font-questa font-semibold">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.charAt(0)}</span>
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dateStr = day ? formatDate(day) : ''
            const daySlots = day ? getSlotsForDate(dateStr) : []
            const isSelected = selectedDate === dateStr
            const hasAvailable = day && hasAvailableSlots(day)
            const hasSlotsOnDay = day && hasAnySlots(day)
            const isPast = day ? new Date(dateStr) < new Date(new Date().toDateString()) : false
            const availableCount = day ? getAvailableCount(day) : 0
            const busyCount = day ? getBusyCount(day) : 0

            return (
              <div
                key={index}
                className={`min-h-[44px] sm:min-h-[80px] border-b border-r p-0.5 sm:p-2 ${
                  day && !isPast && hasSlotsOnDay
                    ? hasAvailable
                      ? 'cursor-pointer hover:bg-green-50 active:bg-green-100'
                      : 'cursor-pointer hover:bg-gray-100 active:bg-gray-200'
                    : day && isPast
                    ? 'bg-gray-100'
                    : 'bg-gray-50'
                } ${isSelected ? 'bg-green-100 ring-2 ring-green-500 ring-inset' : ''}`}
                onClick={() => day && !isPast && hasSlotsOnDay && setSelectedDate(isSelected ? null : dateStr)}
              >
                {day && (
                  <div className="h-full flex flex-col">
                    <span className={`text-[10px] sm:text-sm font-questa leading-none ${
                      hasAvailable && !isPast ? 'font-bold text-green-600' : hasSlotsOnDay && !isPast ? 'font-bold text-gray-500' : 'text-gray-400'
                    }`}>
                      {day}
                    </span>
                    {hasSlotsOnDay && !isPast && (
                      <div className="mt-0.5 sm:mt-1 flex flex-col gap-0.5">
                        {availableCount > 0 && (
                          <div className="text-[8px] sm:text-xs bg-green-500 text-white px-1 py-0 sm:py-0.5 rounded-full leading-tight text-center">
                            <span className="hidden sm:inline">{availableCount} open</span>
                            <span className="sm:hidden">{availableCount}</span>
                          </div>
                        )}
                        {busyCount > 0 && (
                          <div className="text-[8px] sm:text-xs bg-gray-400 text-white px-1 py-0 sm:py-0.5 rounded-full leading-tight text-center hidden sm:block">
                            {busyCount} busy
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected Date Slots */}
      {selectedDate && (
        <Card className="border-green-200">
          <CardHeader className="pb-2 sm:pb-3 bg-green-50 px-3 sm:px-6 pt-3 sm:pt-4">
            <CardTitle className="text-sm sm:text-lg font-ivry text-green-700">
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 sm:pt-4 px-3 sm:px-6 pb-3 sm:pb-6">
            <p className="text-xs sm:text-sm text-slate-medium font-questa mb-3 sm:mb-4">
              Select an available time slot:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {getSlotsForDate(selectedDate).map(slot => (
                slot.is_booked ? (
                  <Button
                    key={slot.id}
                    variant="outline"
                    disabled
                    size="sm"
                    className="border-gray-200 text-gray-400 bg-gray-50 rounded-xl font-questa cursor-not-allowed h-10 sm:h-11 text-xs sm:text-sm px-2 sm:px-4"
                  >
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 shrink-0" />
                    <span>{slot.start_time}</span>
                    <span className="ml-1 text-[10px] sm:text-xs hidden sm:inline">(Busy)</span>
                  </Button>
                ) : (
                  <Button
                    key={slot.id}
                    variant="outline"
                    onClick={() => selectSlot(slot)}
                    size="sm"
                    className="border-green-300 text-green-700 hover:bg-green-500 hover:text-white hover:border-green-500 active:bg-green-600 rounded-xl font-questa h-10 sm:h-11 text-xs sm:text-sm px-2 sm:px-4"
                  >
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 shrink-0" />
                    {slot.start_time}
                  </Button>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirm Modal */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-md p-4 sm:p-6 rounded-xl">
          <DialogHeader className="pb-2">
            <DialogTitle className="font-ivry text-lg sm:text-xl text-slate">
              Confirm Interview Time
            </DialogTitle>
          </DialogHeader>

          {selectedSlot && (
            <div className="py-2 sm:py-4">
              <p className="text-slate-medium font-questa mb-3 sm:mb-4 text-sm sm:text-base">
                You are booking an interview for <strong>{childName}</strong>:
              </p>
              <div className="bg-green-50 p-3 sm:p-4 rounded-xl border border-green-200">
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2 shrink-0" />
                  <span className="font-questa font-semibold text-slate text-sm sm:text-base">
                    {new Date(selectedSlot.date + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2 shrink-0" />
                  <span className="font-questa font-semibold text-slate text-sm sm:text-base">
                    {selectedSlot.start_time} - {selectedSlot.end_time}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-medium font-questa mt-3 sm:mt-4">
                A confirmation email will be sent to you after booking.
              </p>
            </div>
          )}

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setIsConfirmModalOpen(false)}
              className="rounded-xl font-questa w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={bookSlot}
              disabled={isBooking}
              className="bg-green-500 hover:bg-green-600 text-white rounded-xl font-questa w-full sm:w-auto"
            >
              {isBooking ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
