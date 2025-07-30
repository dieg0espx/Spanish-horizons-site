import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, AlertCircle } from "lucide-react"

export default function CalendarPage() {
  const closureDates = [
    {
      date: "September 2, 2025",
      event: "First Day of School",
      type: "start",
      description: "Welcome back! School begins for all K-5 students.",
    },
    {
      date: "October 10, 2025",
      event: "Professional Development Day",
      type: "closure",
      description: "No school - Teacher professional development",
    },
    {
      date: "October 16-17, 2025",
      event: "Fall Parent Conferences",
      type: "early",
      description: "Early dismissal both days for parent-teacher conferences",
    },
    {
      date: "November 26-28, 2025",
      event: "Thanksgiving Break",
      type: "closure",
      description: "School closed for Thanksgiving holiday",
    },
    {
      date: "December 22, 2025 - January 2, 2026",
      event: "Winter Break",
      type: "closure",
      description: "Extended winter holiday break",
    },
    {
      date: "January 19, 2026",
      event: "Martin Luther King Jr. Day",
      type: "closure",
      description: "School closed in observance of MLK Jr. Day",
    },
    {
      date: "February 16, 2026",
      event: "President's Day",
      type: "closure",
      description: "School closed for President's Day",
    },
    {
      date: "March 23-27, 2026",
      event: "Spring Break",
      type: "closure",
      description: "One week spring break for all students",
    },
    {
      date: "May 22, 2026",
      event: "Last Day of School",
      type: "end",
      description: "Final day of the 2025-2026 school year",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "start":
        return "bg-golden-light text-slate"
      case "end":
        return "bg-slate-light text-slate"
      case "closure":
        return "bg-amber-light text-slate"
      case "early":
        return "bg-golden-light text-slate"
      default:
        return "bg-slate-light text-slate"
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

  return (
    <div className="min-h-screen bg-slate-light">
      {/* Header */}
      <section className="bg-slate py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate-light rounded-full text-white text-sm font-questa font-medium mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              Important School Dates
            </div>
            <h1 className="text-5xl md:text-6xl font-ivry font-bold text-white mb-6">2025-2026 Closure Calendar</h1>
            <p className="text-xl text-white font-questa">Important dates for the upcoming school year</p>
          </div>
        </div>
      </section>

      {/* Priority Notice */}
      <section className="py-6 bg-amber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <AlertCircle className="h-5 w-5 text-white mr-2" />
            <p className="text-white font-questa font-medium">
              This calendar has been updated for the 2025-2026 school year. Please save these dates for planning
              purposes.
            </p>
          </div>
        </div>
      </section>

      {/* Calendar Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {closureDates.map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-slate-light rounded-2xl flex items-center justify-center mr-4 group-hover:bg-slate transition-colors duration-300">
                          <Clock className="h-6 w-6 text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <span className="text-lg font-questa font-bold text-slate block">{item.date}</span>
                          <Badge className={`mt-1 font-questa !text-white ${getTypeColor(item.type)}`}>{getTypeLabel(item.type)}</Badge>
                        </div>
                      </div>
                      <h3 className="text-2xl font-ivry font-bold text-slate mb-3">{item.event}</h3>
                      <p className="text-slate-medium leading-relaxed font-questa">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <Card className="mt-12 bg-slate-light">
            <CardHeader>
              <CardTitle className="text-slate font-ivry">Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-slate-medium font-questa">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-slate rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Early Closure Days:</strong> On early closure days, students will be dismissed early to
                    accommodate parent-teacher conferences. Specific dismissal times will be communicated closer to the
                    date.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-slate rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Aftercare:</strong> Aftercare services may be modified or unavailable on early closure days.
                    Please check with the office for specific arrangements.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-slate rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Updates:</strong> Any changes to this calendar will be communicated through Brightwheel and
                    posted on our website immediately.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-slate rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Questions:</strong> Contact our office at (503) 916-9758 or
                    infospanishhorizons@casitaazulpdx.org for any calendar-related questions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Footer */}
      <section className="py-12 bg-slate text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-ivry font-semibold mb-4">Questions About Our Calendar?</h3>
          <p className="text-white mb-6 font-questa">
            Contact our office for any questions about school closures, early dismissals, or special events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-questa">
            <div className="flex items-center">
              <span className="font-medium">Phone:</span>
              <span className="ml-2">(503) 916-9758</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">Email:</span>
              <span className="ml-2">infospanishhorizons@casitaazulpdx.org</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
