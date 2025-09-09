"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft,
  ChevronRight,
  Printer
} from "lucide-react"

export default function SimpleMonthlyCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const events = [
    {
      id: "1",
      title: "First Day of School",
      start: new Date(2025, 8, 2),
      type: "start"
    },
    {
      id: "2",
      title: "Professional Development Day",
      start: new Date(2025, 9, 10),
      type: "closure"
    },
    {
      id: "3",
      title: "Parent Conferences",
      start: new Date(2025, 9, 16),
      type: "early"
    },
    {
      id: "4",
      title: "Thanksgiving Break",
      start: new Date(2025, 10, 26),
      type: "holiday"
    },
    {
      id: "5",
      title: "Winter Break",
      start: new Date(2025, 11, 22),
      type: "holiday"
    },
    {
      id: "6",
      title: "Martin Luther King Jr. Day",
      start: new Date(2026, 0, 19),
      type: "holiday"
    },
    {
      id: "7",
      title: "President's Day",
      start: new Date(2026, 1, 16),
      type: "holiday"
    },
    {
      id: "8",
      title: "Spring Break",
      start: new Date(2026, 2, 23),
      type: "holiday"
    },
    {
      id: "9",
      title: "Last Day of School",
      start: new Date(2026, 4, 22),
      type: "end"
    },
  ]

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.start.getDate() === date.getDate() &&
      event.start.getMonth() === date.getMonth() &&
      event.start.getFullYear() === date.getFullYear()
    )
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "start":
        return "bg-slate-light text-white"
      case "end":
        return "bg-slate text-white"
      case "closure":
        return "bg-amber-light text-slate"
      case "early":
        return "bg-slate-light text-white"
      case "holiday":
        return "bg-amber text-white"
      default:
        return "bg-slate text-white"
    }
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handlePrint = () => {
    window.print()
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50 print:bg-white print:border-gray-300"></div>
      )
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const dayEvents = getEventsForDate(date)
      const isCurrentDay = isToday(date)
      const isWeekendDay = isWeekend(date)

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 relative ${
            isCurrentDay 
              ? 'bg-amber-light print:bg-amber-light' 
              : isWeekendDay 
                ? 'bg-gray-50 print:bg-gray-50' 
                : 'bg-white print:bg-white'
          } transition-colors duration-200 print:transition-none`}
        >
          {/* Date Number */}
          <div className={`text-sm font-questa font-medium mb-1 ${
            isCurrentDay 
              ? 'text-slate font-bold' 
              : isWeekendDay 
                ? 'text-gray-500' 
                : 'text-slate'
          }`}>
            {day}
          </div>

          {/* Events */}
          <div className="space-y-1 overflow-hidden">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded font-questa font-medium ${
                  event.type === 'start' ? 'bg-slate-light text-white' :
                  event.type === 'end' ? 'bg-slate text-white' :
                  event.type === 'closure' ? 'bg-amber-light text-slate' :
                  event.type === 'early' ? 'bg-slate-light text-white' :
                  'bg-amber text-white'
                }`}
              >
                <span className="truncate">
                  {event.title}
                </span>
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-slate-medium font-questa">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      )
    }

    return days
  }

  return (
    <div className="w-full space-y-6 print:space-y-4">
      {/* Header with Navigation and Print Button */}
      <div className="flex items-center justify-between bg-slate rounded-2xl p-6 text-white print:bg-slate print:rounded-none print:p-4">
        <Button
          onClick={prevMonth}
          className="bg-slate-light hover:bg-slate-medium text-white border-0 rounded-full p-3 transition-colors duration-200 print:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <h2 className="text-3xl font-ivry font-bold print:text-2xl">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <p className="text-white/80 font-questa print:text-sm">
            Spanish Horizons Academy
          </p>
        </div>
        <div className="flex space-x-2 print:hidden">
          <Button
            onClick={nextMonth}
            className="bg-slate-light hover:bg-slate-medium text-white border-0 rounded-full p-3 transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-amber hover:bg-amber-dark text-white border-0 rounded-full p-3 transition-colors duration-200"
          >
            <Printer className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Simple Legend */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 print:shadow-none print:border-gray-300 print:rounded-none">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 print:grid-cols-5">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-slate-light rounded"></div>
            <span className="text-sm font-questa text-slate">School Starts</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-slate rounded"></div>
            <span className="text-sm font-questa text-slate">School Ends</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-amber-light rounded"></div>
            <span className="text-sm font-questa text-slate">No School</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-amber rounded"></div>
            <span className="text-sm font-questa text-slate">Holiday</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-slate-light rounded"></div>
            <span className="text-sm font-questa text-slate">Early Dismissal</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none print:border-gray-300 print:rounded-none">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 bg-slate text-white print:bg-slate">
          {weekDays.map((day) => (
            <div key={day} className="p-4 text-center font-questa font-bold text-sm print:p-2 print:text-xs">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white !important;
            color: black !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:bg-white {
            background: white !important;
          }
          
          .print\\:bg-slate {
            background: #475569 !important;
          }
          
          .print\\:bg-amber-light {
            background: #fef3c7 !important;
          }
          
          .print\\:bg-gray-50 {
            background: #f9fafb !important;
          }
          
          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }
          
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .print\\:text-2xl {
            font-size: 1.5rem !important;
          }
          
          .print\\:text-sm {
            font-size: 0.875rem !important;
          }
          
          .print\\:text-xs {
            font-size: 0.75rem !important;
          }
          
          .print\\:p-4 {
            padding: 1rem !important;
          }
          
          .print\\:p-2 {
            padding: 0.5rem !important;
          }
          
          .print\\:space-y-4 > * + * {
            margin-top: 1rem !important;
          }
          
          .print\\:transition-none {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}
