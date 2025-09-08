"use client"

import { useState } from "react"
import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, Clock, AlertCircle, Download } from "lucide-react"

// Import the calendar styles
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: "start" | "end" | "closure" | "early"
  description: string
  date: string
}

export default function SchoolCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "First Day of School",
      start: new Date(2025, 8, 2), // September 2, 2025
      end: new Date(2025, 8, 2),
      type: "start",
      description: "Welcome back! School begins for all K-5 students.",
      date: "September 2, 2025",
    },
    {
      id: "2",
      title: "Professional Development Day",
      start: new Date(2025, 9, 10), // October 10, 2025
      end: new Date(2025, 9, 10),
      type: "closure",
      description: "No school - Teacher professional development",
      date: "October 10, 2025",
    },
    {
      id: "3",
      title: "Fall Parent Conferences",
      start: new Date(2025, 9, 16), // October 16, 2025
      end: new Date(2025, 9, 17), // October 17, 2025
      type: "early",
      description: "Early dismissal both days for parent-teacher conferences",
      date: "October 16-17, 2025",
    },
    {
      id: "4",
      title: "Thanksgiving Break",
      start: new Date(2025, 10, 26), // November 26, 2025
      end: new Date(2025, 10, 28), // November 28, 2025
      type: "closure",
      description: "School closed for Thanksgiving holiday",
      date: "November 26-28, 2025",
    },
    {
      id: "5",
      title: "Winter Break",
      start: new Date(2025, 11, 22), // December 22, 2025
      end: new Date(2026, 0, 2), // January 2, 2026
      type: "closure",
      description: "Extended winter holiday break",
      date: "December 22, 2025 - January 2, 2026",
    },
    {
      id: "6",
      title: "Martin Luther King Jr. Day",
      start: new Date(2026, 0, 19), // January 19, 2026
      end: new Date(2026, 0, 19),
      type: "closure",
      description: "School closed in observance of MLK Jr. Day",
      date: "January 19, 2026",
    },
    {
      id: "7",
      title: "President's Day",
      start: new Date(2026, 1, 16), // February 16, 2026
      end: new Date(2026, 1, 16),
      type: "closure",
      description: "School closed for President's Day",
      date: "February 16, 2026",
    },
    {
      id: "8",
      title: "Spring Break",
      start: new Date(2026, 2, 23), // March 23, 2026
      end: new Date(2026, 2, 27), // March 27, 2026
      type: "closure",
      description: "One week spring break for all students",
      date: "March 23-27, 2026",
    },
    {
      id: "9",
      title: "Last Day of School",
      start: new Date(2026, 4, 22), // May 22, 2026
      end: new Date(2026, 4, 22),
      type: "end",
      description: "Final day of the 2025-2026 school year",
      date: "May 22, 2026",
    },
  ]

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
      default:
        return "bg-slate text-white"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "start":
        return "School Starts"
      case "end":
        return "School Ends"
      case "closure":
        return "Full Day Closure"
      case "early":
        return "Early Closure"
      default:
        return "Event"
    }
  }

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = ""
    let borderColor = ""
    let color = ""

    switch (event.type) {
      case "start":
        backgroundColor = "#2a2f6c" // slate-light
        borderColor = "#000638" // slate
        color = "#FFFFFF" // white
        break
      case "end":
        backgroundColor = "#000638" // slate
        borderColor = "#1a1f5c" // slate-medium
        color = "#FFFFFF" // white
        break
      case "closure":
        backgroundColor = "#FFA726" // amber-light
        borderColor = "#FF8C00" // amber
        color = "#000638" // slate
        break
      case "early":
        backgroundColor = "#2a2f6c" // slate-light
        borderColor = "#000638" // slate
        color = "#FFFFFF" // white
        break
      default:
        backgroundColor = "#000638" // slate
        borderColor = "#1a1f5c" // slate-medium
        color = "#FFFFFF" // white
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        color,
        border: `2px solid ${borderColor}`,
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        fontFamily: "SF Pro Display, system-ui, sans-serif",
      },
    }
  }

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedEvent(null)
  }

  const generateICSFile = (event: CalendarEvent) => {
    const startDate = moment(event.start).format('YYYYMMDDTHHmmss')
    const endDate = moment(event.end).format('YYYYMMDDTHHmmss')
    const now = moment().format('YYYYMMDDTHHmmss')
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Spanish Horizons Academy//School Calendar//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}@spanishhorizonsacademy.com`,
      `DTSTAMP:${now}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}\\n\\nEvent Type: ${getTypeLabel(event.type)}\\n\\nSpanish Horizons Academy\\nPhone: (503) 916-9758\\nEmail: infospanishhorizons@casitaazulpdx.org`,
      'LOCATION:Spanish Horizons Academy',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const generateGoogleCalendarURL = (event: CalendarEvent) => {
    const startDate = moment(event.start).format('YYYYMMDDTHHmmss')
    const endDate = moment(event.end).format('YYYYMMDDTHHmmss')
    const title = encodeURIComponent(event.title)
    const description = encodeURIComponent(`${event.description}\n\nEvent Type: ${getTypeLabel(event.type)}\n\nSpanish Horizons Academy\nPhone: (503) 916-9758\nEmail: infospanishhorizons@casitaazulpdx.org`)
    const location = encodeURIComponent('Spanish Horizons Academy')
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}`
  }

  return (
    <div className="w-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={Views.MONTH}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        popup
        showMultiDayTimes
        step={60}
        timeslots={1}
        className="custom-calendar"
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-bold text-slate">
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-slate" />
                <span className="text-slate font-sf-pro font-medium">
                  {selectedEvent.date}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className={`font-sf-pro !text-white ${getTypeColor(selectedEvent.type)}`}>
                  {getTypeLabel(selectedEvent.type)}
                </Badge>
              </div>

              <div className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-slate mt-0.5 flex-shrink-0" />
                <p className="text-slate-medium leading-relaxed font-sf-pro">
                  {selectedEvent.description}
                </p>
              </div>

              {selectedEvent.type === "early" && (
                <div className="bg-amber-light p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-amber mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-slate font-sf-pro font-medium text-sm">
                        Early Dismissal Notice
                      </p>
                      <p className="text-slate-medium font-sf-pro text-sm mt-1">
                        Aftercare services may be modified or unavailable on early closure days. 
                        Please check with the office for specific arrangements.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Add to Calendar Buttons */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-slate font-sf-pro font-medium text-sm mb-3">
                  Add to your calendar:
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={() => generateICSFile(selectedEvent)}
                    className="flex items-center space-x-2 bg-slate hover:bg-slate-medium text-white font-sf-pro"
                    size="sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download .ics file</span>
                  </Button>
                  <Button
                    onClick={() => window.open(generateGoogleCalendarURL(selectedEvent), '_blank')}
                    className="flex items-center space-x-2 bg-amber hover:bg-amber-dark text-white font-sf-pro"
                    size="sm"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    <span>Add to Google Calendar</span>
                  </Button>
                </div>
                <p className="text-slate-medium font-sf-pro text-xs mt-2">
                  The .ics file works with Apple Calendar, Outlook, and most calendar apps.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .custom-calendar {
          font-family: 'SF Pro Display', system-ui, sans-serif;
        }
        
        .custom-calendar .rbc-header {
          background-color: #000638;
          color: white;
          font-weight: 600;
          font-family: 'SF Pro Display', system-ui, sans-serif;
          padding: 12px 8px;
          border-bottom: 2px solid #1a1f5c;
        }
        
        .custom-calendar .rbc-today {
          background-color: #F7FAFC;
        }
        
        .custom-calendar .rbc-off-range-bg {
          background-color: #F7FAFC;
        }
        
        .custom-calendar .rbc-month-view {
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .custom-calendar .rbc-date-cell {
          padding: 8px;
          font-family: 'SF Pro Display', system-ui, sans-serif;
        }
        
        .custom-calendar .rbc-event {
          border-radius: 6px;
          padding: 2px 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'SF Pro Display', system-ui, sans-serif;
        }
        
        .custom-calendar .rbc-event:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .custom-calendar .rbc-toolbar {
          margin-bottom: 20px;
          font-family: 'SF Pro Display', system-ui, sans-serif;
        }
        
        .custom-calendar .rbc-toolbar button {
          background-color: #000638;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-family: 'SF Pro Display', system-ui, sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .custom-calendar .rbc-toolbar button:hover {
          background-color: #1a1f5c;
        }
        
        .custom-calendar .rbc-toolbar button.rbc-active {
          background-color: #FF8C00;
        }
        
        .custom-calendar .rbc-toolbar-label {
          font-size: 20px;
          font-weight: 700;
          color: #000638;
          font-family: 'SF Pro Display', system-ui, sans-serif;
        }
        
        .custom-calendar .rbc-month-row {
          border-bottom: 1px solid #E2E8F0;
        }
        
        .custom-calendar .rbc-date-cell > a {
          color: #000638;
          font-weight: 500;
        }
        
        .custom-calendar .rbc-date-cell > a:hover {
          color: #FF8C00;
        }
        
        .custom-calendar .rbc-today > a {
          color: #FF8C00;
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}
