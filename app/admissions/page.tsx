import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, FileText, MessageCircle, CheckCircle, DollarSign, Heart, ChevronRight } from "lucide-react"

export default function AdmissionsPage() {
  const applicationSteps = [
    {
      step: 1,
      title: "Schedule a Tour or Information Session",
      description: "Visit our campus to experience our learning environment firsthand",
      icon: Calendar,
      action: "Schedule Now",
    },
    {
      step: 2,
      title: "Submit Application + $120 Application Fee",
      description: "Complete our comprehensive application form",
      icon: FileText,
      action: "Apply Online",
    },
    {
      step: 3,
      title: "Complete Family Interview",
      description: "Meet with our admissions team to discuss your family's goals",
      icon: MessageCircle,
      action: "Interview Scheduled",
    },
    {
      step: 4,
      title: "Receive Acceptance & Registration Packet",
      description: "Get your enrollment materials and next steps",
      icon: CheckCircle,
      action: "Enrollment Materials",
    },
    {
      step: 5,
      title: "Attend Orientation Night + Brightwheel Setup",
      description: "Join our community and set up communication systems",
      icon: Users,
      action: "Orientation",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
              <Users className="h-4 w-4 mr-2" />
              Join Our Community
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Join Our Learning Community</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Begin your family's journey with Spanish Horizons Academy. Our admissions process is designed to help you
              understand our program and ensure the best fit for your child's educational journey.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <a href="/contact" className="flex items-center">
                Start Your Application
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Application Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2025-2026 Application Timeline</h2>
            <p className="text-lg text-gray-600">Important dates for the upcoming school year</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white text-center p-8">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
                  <Calendar className="h-10 w-10 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Applications Open</h3>
                <p className="text-3xl font-bold text-green-700 mb-4">November 1, 2024</p>
                <p className="text-gray-600">Begin your application process</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white text-center p-8">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <FileText className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Priority Deadline</h3>
                <p className="text-3xl font-bold text-blue-700 mb-4">January 31, 2025</p>
                <p className="text-gray-600">Submit for priority consideration</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white text-center p-8">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                  <MessageCircle className="h-10 w-10 text-purple-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Interview Period</h3>
                <p className="text-3xl font-bold text-purple-700 mb-4">February–March</p>
                <p className="text-gray-600">Family interviews scheduled</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white text-center p-8">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                  <Users className="h-10 w-10 text-orange-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">First Day of School</h3>
                <p className="text-3xl font-bold text-orange-700 mb-4">September 2, 2025</p>
                <p className="text-gray-600">Welcome to our community!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process Steps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Process</h2>
            <p className="text-lg text-gray-600">Five simple steps to join our learning community</p>
          </div>

          <div className="space-y-8">
            {applicationSteps.map((step, index) => (
              <Card key={index} className="max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <step.icon className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start mb-2">
                        <Badge className="bg-blue-600 text-white mr-3">Step {step.step}</Badge>
                        <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <Button variant="outline" size="sm">
                        {step.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Information</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-3">No Spanish Required</h3>
                <p className="text-gray-600 text-sm">
                  No Spanish language experience required for families. Our immersion model supports all learners.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-3">Small Class Sizes</h3>
                <p className="text-gray-600 text-sm">
                  12–16 students per grade with one classroom per grade level for personalized attention.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-3">Financial Assistance</h3>
                <p className="text-gray-600 text-sm">
                  Need-based and equity-based scholarships available to support diverse families.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-3">Rolling Admissions</h3>
                <p className="text-gray-600 text-sm">
                  Applications accepted throughout the year based on space availability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the first step toward your child's bilingual, culturally rich education. Schedule a tour to experience
            our vibrant learning community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <a href="/contact">Schedule a Tour</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 bg-transparent">
              <a href="/tuition">View Tuition Information</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
