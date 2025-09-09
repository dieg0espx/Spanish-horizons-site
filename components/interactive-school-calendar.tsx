"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Calendar, 
  Clock, 
  Download, 
  School, 
  Home, 
  Star, 
  Heart, 
  Gift,
  Sun,
  Snowflake,
  Leaf,
  Flower2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Info,
  Printer
} from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: "start" | "end" | "closure" | "early" | "holiday"
  description: string
  date: string
  icon: React.ReactNode
  shortDescription: string
}

export default function InteractiveSchoolCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [viewMode, setViewMode] = useState<'cards' | 'calendar'>('calendar')

  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "First Day of School",
      start: new Date(2025, 8, 2),
      end: new Date(2025, 8, 2),
      type: "start",
      description: "Welcome back! School begins for all K-5 students. Meet your teachers and classmates.",
      shortDescription: "School starts for everyone!",
      date: "September 2, 2025",
      icon: <School className="h-5 w-5" />
    },
    {
      id: "2",
      title: "Professional Development Day",
      start: new Date(2025, 9, 10),
      end: new Date(2025, 9, 10),
      type: "closure",
      description: "No school - Teachers are learning new things to help you learn better.",
      shortDescription: "Teachers are learning!",
      date: "October 10, 2025",
      icon: <Star className="h-5 w-5" />
    },
    {
      id: "3",
      title: "Parent Conferences",
      start: new Date(2025, 9, 16),
      end: new Date(2025, 9, 17),
      type: "early",
      description: "Early dismissal so parents can talk with teachers about your progress.",
      shortDescription: "Parents meet teachers",
      date: "October 16-17, 2025",
      icon: <Heart className="h-5 w-5" />
    },
    {
      id: "4",
      title: "Thanksgiving Break",
      start: new Date(2025, 10, 26),
      end: new Date(2025, 10, 28),
      type: "holiday",
      description: "Time to be with family and eat delicious food!",
      shortDescription: "Family time!",
      date: "November 26-28, 2025",
      icon: <Gift className="h-5 w-5" />
    },
    {
      id: "5",
      title: "Winter Break",
      start: new Date(2025, 11, 22),
      end: new Date(2026, 0, 2),
      type: "holiday",
      description: "Long winter vacation! Time to play in the snow and open presents.",
      shortDescription: "Winter fun!",
      date: "December 22, 2025 - January 2, 2026",
      icon: <Snowflake className="h-5 w-5" />
    },
    {
      id: "6",
      title: "Martin Luther King Jr. Day",
      start: new Date(2026, 0, 19),
      end: new Date(2026, 0, 19),
      type: "holiday",
      description: "A day to remember a hero who helped make the world better for everyone.",
      shortDescription: "Remembering a hero",
      date: "January 19, 2026",
      icon: <Heart className="h-5 w-5" />
    },
    {
      id: "7",
      title: "President's Day",
      start: new Date(2026, 1, 16),
      end: new Date(2026, 1, 16),
      type: "holiday",
      description: "A day to remember the presidents who helped our country.",
      shortDescription: "Presidents' day",
      date: "February 16, 2026",
      icon: <Star className="h-5 w-5" />
    },
    {
      id: "8",
      title: "Spring Break",
      start: new Date(2026, 2, 23),
      end: new Date(2026, 2, 27),
      type: "holiday",
      description: "Spring vacation! Time to play outside and see the flowers bloom.",
      shortDescription: "Spring fun!",
      date: "March 23-27, 2026",
      icon: <Flower2 className="h-5 w-5" />
    },
    {
      id: "9",
      title: "Last Day of School",
      start: new Date(2026, 4, 22),
      end: new Date(2026, 4, 22),
      type: "end",
      description: "The last day of school! Time for summer vacation!",
      shortDescription: "Summer starts!",
      date: "May 22, 2026",
      icon: <Sun className="h-5 w-5" />
    },
  ]

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const getEventsForMonth = (month: Date) => {
    return events.filter(event => 
      event.start.getMonth() === month.getMonth() && 
      event.start.getFullYear() === month.getFullYear()
    )
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "start":
        return "School Starts"
      case "end":
        return "School Ends"
      case "closure":
        return "No School"
      case "early":
        return "Early Dismissal"
      case "holiday":
        return "Holiday"
      default:
        return "Event"
    }
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

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (!printWindow) return

    // Generate the calendar HTML
    const calendarHTML = generatePrintCalendarHTML()
    
    // Create print content with proper CSS
    const printContent = `<!DOCTYPE html>
<html>
<head>
  <title>Spanish Horizons Academy - School Calendar</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: white;
      color: black;
      padding: 20px;
      line-height: 1.4;
    }
    .calendar-container {
      max-width: 100%;
      margin: 0 auto;
    }
    .calendar-header {
      text-align: center;
      margin-bottom: 20px;
      padding: 20px;
      background: #475569 !important;
      color: white !important;
      border-radius: 8px;
    }
    .calendar-header h2 {
      margin: 0 0 10px 0;
      font-size: 24px;
      font-weight: bold;
    }
    .calendar-header p {
      margin: 0;
      font-size: 14px;
      opacity: 0.8;
    }
    .calendar-grid {
      border: 1px solid #d1d5db;
      border-radius: 8px;
      overflow: hidden;
    }
    .calendar-header-row {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      background: #475569 !important;
      color: white !important;
    }
    .calendar-header-cell {
      padding: 12px 8px;
      text-align: center;
      font-weight: bold;
      font-size: 12px;
      border-right: 1px solid #64748b;
    }
    .calendar-header-cell:last-child {
      border-right: none;
    }
    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }
    .calendar-day {
      min-height: 80px;
      padding: 8px;
      border-right: 1px solid #d1d5db;
      border-bottom: 1px solid #d1d5db;
      background: white;
      position: relative;
    }
    .calendar-day:nth-child(7n) {
      border-right: none;
    }
    .calendar-day.empty {
      background: #f9fafb !important;
    }
    .calendar-day.today {
      background: #fef3c7 !important;
    }
    .calendar-day.weekend {
      background: #f9fafb !important;
    }
    .day-number {
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 4px;
      color: #334155;
    }
    .day-number.today {
      font-weight: bold;
      color: #334155;
    }
    .day-number.weekend {
      color: #6b7280;
    }
    .event {
      font-size: 10px;
      padding: 2px 4px;
      margin: 1px 0;
      border-radius: 3px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .event.start {
      background: #64748b !important;
      color: white !important;
    }
    .event.end {
      background: #475569 !important;
      color: white !important;
    }
    .event.closure {
      background: #fef3c7 !important;
      color: #334155 !important;
    }
    .event.early {
      background: #64748b !important;
      color: white !important;
    }
    .event.holiday {
      background: #f59e0b !important;
      color: white !important;
    }
    .event-more {
      font-size: 10px;
      color: #6b7280;
      margin-top: 2px;
    }
    @media print {
      body {
        margin: 0;
        padding: 10px;
      }
      .calendar-header {
        border-radius: 0;
      }
      .calendar-grid {
        border-radius: 0;
      }
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  </style>
</head>
<body>
  <div class="calendar-container">
    <div class="calendar-header">
      <h2>${months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}</h2>
      <p>Spanish Horizons Academy - School Calendar</p>
    </div>
    <div class="calendar-grid">
      <div class="calendar-header-row">
        <div class="calendar-header-cell">Sun</div>
        <div class="calendar-header-cell">Mon</div>
        <div class="calendar-header-cell">Tue</div>
        <div class="calendar-header-cell">Wed</div>
        <div class="calendar-header-cell">Thu</div>
        <div class="calendar-header-cell">Fri</div>
        <div class="calendar-header-cell">Sat</div>
      </div>
      <div class="calendar-days">
        ${calendarHTML}
      </div>
    </div>
  </div>
</body>
</html>`

    // Write content to print window
    printWindow.document.write(printContent)
    printWindow.document.close()

    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.focus()
      printWindow.print()
      // Close the window after printing
      setTimeout(() => {
        printWindow.close()
      }, 1000)
    }, 500)
  }

  const generatePrintCalendarHTML = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const today = new Date()
    let html = ''

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      html += '<div class="calendar-day empty"></div>'
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const dayEvents = getEventsForDate(date)
      const isCurrentDay = isToday(date)
      const isWeekendDay = isWeekend(date)

      let dayClass = 'calendar-day'
      if (isCurrentDay) dayClass += ' today'
      if (isWeekendDay) dayClass += ' weekend'

      let numberClass = 'day-number'
      if (isCurrentDay) numberClass += ' today'
      if (isWeekendDay) numberClass += ' weekend'

      html += `<div class="${dayClass}">`
      html += `<div class="${numberClass}">${day}</div>`

      // Add events
      dayEvents.slice(0, 2).forEach(event => {
        html += `<div class="event ${event.type}">${event.title}</div>`
      })

      if (dayEvents.length > 2) {
        html += `<div class="event-more">+${dayEvents.length - 2} more</div>`
      }

      html += '</div>'
    }

    return html
  }

  const currentEvents = getEventsForMonth(currentMonth)

  // Calendar grid functions
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

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-16 sm:h-20 lg:h-24 border border-gray-200 bg-gray-50 print:bg-white print:border-gray-300"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const dayEvents = getEventsForDate(date)
      const isCurrentDay = isToday(date)

      days.push(
        <div
          key={day}
          className={`h-16 sm:h-20 lg:h-24 border border-gray-200 p-1 sm:p-2 relative ${
            isCurrentDay ? 'bg-amber-light print:bg-amber-light' : 'bg-white hover:bg-gray-50 print:bg-white'
          } transition-colors duration-200 print:transition-none`}
        >
          <div className={`text-xs sm:text-sm font-questa font-medium ${
            isCurrentDay ? 'text-slate font-bold' : 'text-slate'
          }`}>
            {day}
          </div>
          <div className="mt-0.5 sm:mt-1 space-y-0.5 sm:space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event)}
                className={`text-xs p-0.5 sm:p-1 rounded cursor-pointer transition-all duration-200 hover:scale-105 print:hover:scale-100 print:cursor-default ${
                  event.type === 'start' ? 'bg-slate-light text-white' :
                  event.type === 'end' ? 'bg-slate text-white' :
                  event.type === 'closure' ? 'bg-amber-light text-slate' :
                  event.type === 'early' ? 'bg-slate-light text-white' :
                  'bg-amber text-white'
                }`}
              >
                <div className="flex items-center space-x-0.5 sm:space-x-1">
                  <div className="hidden sm:block">{event.icon}</div>
                  <span className="truncate font-questa font-medium text-xs">
                    <span className="sm:hidden">{event.title.split(' ')[0]}</span>
                    <span className="hidden sm:inline">{event.title}</span>
                  </span>
                </div>
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
    <div className="w-full space-y-6" data-calendar-content>
      {/* Month Navigation and View Toggle */}
      <div className="flex items-center justify-between bg-slate rounded-2xl p-4 sm:p-6 text-white print:bg-slate print:rounded-none print:p-4">
        <Button
          onClick={prevMonth}
          className="bg-slate-light hover:bg-slate-medium text-white border-0 rounded-full p-2 sm:p-3 transition-colors duration-200 print:hidden"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <div className="text-center flex-1 px-2">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-ivry font-bold print:text-2xl">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <p className="text-white/80 font-questa print:text-sm text-xs sm:text-sm">
            {currentEvents.length} special {currentEvents.length === 1 ? 'event' : 'events'}
          </p>
        </div>
        <div className="flex space-x-1 sm:space-x-2">
          <Button
            onClick={nextMonth}
            className="bg-slate-light hover:bg-slate-medium text-white border-0 rounded-full p-2 sm:p-3 transition-colors duration-200 print:hidden"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      {/* View Toggle Buttons and Print */}
      <div className="flex justify-center items-center space-x-1 sm:space-x-2 print:hidden">
        <Button
          onClick={() => setViewMode('calendar')}
          className={`px-3 py-2 sm:px-6 sm:py-2 rounded-full font-questa font-medium transition-all duration-200 text-xs sm:text-sm ${
            viewMode === 'calendar'
              ? 'bg-slate text-white shadow-lg'
              : 'bg-white text-slate border border-slate hover:bg-slate-light hover:text-white'
          }`}
        >
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Calendar View</span>
          <span className="sm:hidden">Calendar</span>
        </Button>
        <Button
          onClick={() => setViewMode('cards')}
          className={`px-3 py-2 sm:px-6 sm:py-2 rounded-full font-questa font-medium transition-all duration-200 text-xs sm:text-sm ${
            viewMode === 'cards'
              ? 'bg-slate text-white shadow-lg'
              : 'bg-white text-slate border border-slate hover:bg-slate-light hover:text-white'
          }`}
        >
          <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Event Cards</span>
          <span className="sm:hidden">Cards</span>
        </Button>
        <Button
          onClick={handlePrint}
          className="px-3 py-2 sm:px-4 sm:py-2 rounded-full font-questa font-medium transition-all duration-200 text-xs sm:text-sm bg-amber hover:bg-amber-dark text-white border-0 flex items-center justify-center"
        >
          <Printer className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
          <span className="hidden sm:inline">Print</span>
        </Button>
      </div>

      {/* Calendar Grid View */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none print:border-gray-300 print:rounded-none">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 bg-slate text-white print:bg-slate">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 sm:p-3 lg:p-4 text-center font-questa font-bold text-xs sm:text-sm print:p-2 print:text-xs">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {renderCalendarGrid()}
          </div>
        </div>
      )}

      {/* Events Cards View */}
      {viewMode === 'cards' && (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentEvents.map((event) => (
            <Card
              key={event.id}
              className="group cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white"
              onClick={() => handleEventClick(event)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className={`p-2 sm:p-3 rounded-2xl flex-shrink-0 ${getTypeColor(event.type)}`}>
                    {event.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge 
                        className={`text-xs font-bold font-questa ${getTypeColor(event.type)}`}
                      >
                        {getTypeLabel(event.type)}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-slate mb-2 font-ivry">
                      {event.title}
                    </h3>
                    <p className="text-slate-medium text-sm font-questa mb-3">
                      {event.date}
                    </p>
                    <p className="text-slate-medium text-sm font-questa line-clamp-2">
                      {event.shortDescription}
                    </p>
                  </div>
                </div>
                
                {/* Interactive hover effect */}
                <div className="mt-3 sm:mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-medium">
                    <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs font-questa">Click for details</span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-slate" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Events Message */}
      {currentEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate mb-2 font-ivry">
            No special events this month
          </h3>
          <p className="text-slate-medium font-questa">
            All days are regular school days. Perfect for learning!
          </p>
        </div>
      )}

      {/* Event Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-md mx-auto my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-2 sm:pb-4">
            <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-ivry font-bold text-slate flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className={`p-2 sm:p-2 rounded-xl flex-shrink-0 ${selectedEvent ? getTypeColor(selectedEvent.type) : ''}`}>
                {selectedEvent?.icon}
              </div>
              <span className="break-words leading-tight">{selectedEvent?.title}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-3 sm:space-y-4 px-1">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-slate flex-shrink-0" />
                <span className="text-slate font-questa font-medium text-sm sm:text-base break-words">
                  {selectedEvent.date}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge 
                  className={`font-questa !text-white text-xs sm:text-sm ${getTypeColor(selectedEvent.type)}`}
                >
                  {getTypeLabel(selectedEvent.type)}
                </Badge>
              </div>

              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-slate mt-0.5 flex-shrink-0" />
                <p className="text-slate-medium leading-relaxed font-questa text-sm sm:text-base break-words">
                  {selectedEvent.description}
                </p>
              </div>

              {selectedEvent.type === "early" && (
                <div className="bg-amber-light p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-slate font-questa font-medium text-sm">
                        Early Dismissal Notice
                      </p>
                      <p className="text-slate-medium font-questa text-sm mt-1 break-words">
                        Aftercare services may be modified or unavailable on early closure days. 
                        Please check with the office for specific arrangements.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </DialogContent>
      </Dialog>

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
          
          .print\\:hover\\:scale-100:hover {
            transform: scale(1) !important;
          }
          
          .print\\:cursor-default {
            cursor: default !important;
          }
          
          .print\\:h-5 {
            height: 1.25rem !important;
          }
          
          .print\\:w-5 {
            width: 1.25rem !important;
          }
          
          .print\\:grid-cols-5 {
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  )
}
