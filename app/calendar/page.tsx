import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, AlertCircle } from "lucide-react"
import InteractiveSchoolCalendar from "@/components/interactive-school-calendar"

export default function CalendarPage() {

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <section className="bg-slate py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-slate rounded-full text-white text-xs sm:text-sm font-questa font-medium mb-4 sm:mb-6">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Important School Dates
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ivry font-bold text-white mb-4 sm:mb-6 leading-tight">2025-2026 Closure Calendar</h1>
            <p className="text-base sm:text-lg lg:text-xl text-white font-questa max-w-3xl mx-auto">Important dates for the upcoming school year</p>
          </div>
        </div>
      </section>

      {/* Priority Notice */}
      <section className="py-4 sm:py-6 bg-amber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-center sm:text-left">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white mr-2 flex-shrink-0" />
            <p className="text-white font-questa font-medium text-sm sm:text-base">
              This calendar has been updated for the 2025-2026 school year. Please save these dates for planning
              purposes.
            </p>
          </div>
        </div>
      </section>

      {/* Calendar Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <InteractiveSchoolCalendar />
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="mt-8 sm:mt-12 bg-slate">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-white font-ivry text-lg sm:text-xl">Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4 text-white font-questa">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
                    <strong>Early Closure Days:</strong> On early closure days, students will be dismissed early to
                    accommodate parent-teacher conferences. Specific dismissal times will be communicated closer to the
                    date.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
                    <strong>Aftercare:</strong> Aftercare services may be modified or unavailable on early closure days.
                    Please check with the office for specific arrangements.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
                    <strong>Updates:</strong> Any changes to this calendar will be communicated through Brightwheel and
                    posted on our website immediately.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base">
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
      <section className="py-8 sm:py-12 bg-slate text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg sm:text-xl font-ivry font-semibold mb-3 sm:mb-4">Questions About Our Calendar?</h3>
          <p className="text-white mb-4 sm:mb-6 font-questa text-sm sm:text-base">
            Contact our office for any questions about school closures, early dismissals, or special events.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center font-questa text-sm sm:text-base">
            <div className="flex items-center">
              <span className="font-medium">Phone:</span>
              <span className="ml-2">(503) 916-9758</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">Email:</span>
              <span className="ml-2 break-all">infospanishhorizons@casitaazulpdx.org</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
