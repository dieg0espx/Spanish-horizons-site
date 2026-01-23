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
      <section className="bg-slate py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-slate rounded-full text-white text-xs sm:text-sm font-questa font-medium mb-4 md:mb-6">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Join Our Community
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ivry font-bold text-white mb-4 md:mb-6 px-4">Join Our Learning Community</h1>
            <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto mb-6 md:mb-8 font-questa px-4">
              Begin your family's journey with Spanish Horizons Academy. Our admissions process is designed to help you
              understand our program and ensure the best fit for your child's educational journey.
            </p>
            <Button
              size="lg"
              className="bg-amber hover:bg-golden hover:text-slate text-white px-8 py-4 rounded-xl font-questa font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <a href="/admissions/application" className="flex items-center">
                Start Your Application
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

             {/* Application Timeline */}
       <section className="relative py-12 md:py-16 overflow-hidden">
         {/* Background Image with Parallax */}
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
           style={{
             backgroundImage: `url('/pictures/classroom8.jpeg')`,
           }}
         />
         
         {/* Blue Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-slate/40 via-slate/30 to-slate/50"></div>
         
         {/* Content */}
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-ivry font-bold text-white mb-4 px-4">2025-2026 Application Timeline</h2>
            <p className="text-base sm:text-lg text-white/90 font-questa px-4">Important dates for the upcoming school year</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white text-center p-4 md:p-6">
              <CardContent className="pt-3 md:pt-4">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-golden-light rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:bg-golden transition-colors duration-300">
                  <Calendar className="h-6 w-6 md:h-10 md:w-10 text-white group-hover:text-white transition-colors duration-300" />
                </div>
                                  <h3 className="text-base md:text-xl lg:text-2xl font-ivry font-bold mb-1 md:mb-3 text-slate text-center h-[40px] md:h-[60px] flex items-center justify-center">Applications Open</h3>
                 <p className="text-lg md:text-2xl lg:text-3xl font-ivry font-bold text-golden mb-1 md:mb-3 text-center">Nov 3, 2025</p>
                 <p className="text-slate-medium font-questa text-xs md:text-sm text-center">Begin application</p>
             </CardContent>
           </Card>

                        <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white text-center p-4 md:p-6">
              <CardContent className="pt-3 md:pt-4">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-slate rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:bg-slate-medium transition-colors duration-300">
                  <FileText className="h-6 w-6 md:h-10 md:w-10 text-white group-hover:text-white transition-colors duration-300" />
                </div>
                                  <h3 className="text-base md:text-xl lg:text-2xl font-ivry font-bold mb-1 md:mb-3 text-slate text-center h-[40px] md:h-[60px] flex items-center justify-center">Priority Deadline</h3>
                 <p className="text-lg md:text-2xl lg:text-3xl font-ivry font-bold text-slate mb-1 md:mb-3 text-center">Jan 30, 2026</p>
                 <p className="text-slate-medium font-questa text-xs md:text-sm text-center">Priority consideration</p>
             </CardContent>
           </Card>

                        <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white text-center p-4 md:p-6">
              <CardContent className="pt-3 md:pt-4">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-amber-light rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:bg-amber transition-colors duration-300">
                  <MessageCircle className="h-6 w-6 md:h-10 md:w-10 text-white group-hover:text-white transition-colors duration-300" />
                </div>
                                  <h3 className="text-base md:text-xl lg:text-2xl font-ivry font-bold mb-1 md:mb-3 text-slate text-center h-[40px] md:h-[60px] flex items-center justify-center">Interview Period</h3>
                 <p className="text-lg md:text-2xl lg:text-3xl font-ivry font-bold text-amber mb-1 md:mb-3 text-center">Feb–March</p>
                 <p className="text-slate-medium font-questa text-xs md:text-sm text-center">Family interviews</p>
             </CardContent>
           </Card>

                        <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white text-center p-4 md:p-6">
              <CardContent className="pt-3 md:pt-4">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-golden-light rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:bg-golden transition-colors duration-300">
                  <Users className="h-6 w-6 md:h-10 md:w-10 text-white group-hover:text-white transition-colors duration-300" />
                </div>
                                  <h3 className="text-base md:text-xl lg:text-2xl font-ivry font-bold mb-1 md:mb-3 text-slate text-center h-[40px] md:h-[60px] flex items-center justify-center">First Day of School</h3>
                 <p className="text-lg md:text-2xl lg:text-3xl font-ivry font-bold text-golden mb-1 md:mb-3 text-center">Sep 1, 2026</p>
                 <p className="text-slate-medium font-questa text-xs md:text-sm text-center">Welcome!</p>
             </CardContent>
           </Card>
          </div>
        </div>
      </section>

             {/* Application Process Steps */}
       <section className="py-12 md:py-16 bg-slate">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-ivry font-bold text-white mb-4 px-4">Application Process</h2>
            <p className="text-base sm:text-lg text-white/50 font-questa px-4">Five simple steps to join our learning community</p>
          </div>

                     <div className="space-y-4 md:space-y-8">
             {applicationSteps.map((step, index) => (
               <Card key={index} className="max-w-4xl mx-auto">
                 <CardContent className="p-4 md:p-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start">
                                         <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-6">
                       <div className="w-12 h-12 md:w-16 md:h-16 bg-slate rounded-full flex items-center justify-center">
                        <step.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col sm:flex-row items-center sm:justify-center md:justify-start mb-1 md:mb-2 gap-1 sm:gap-0">
                        <Badge className="bg-slate text-white sm:mr-3 font-questa text-xs md:text-sm">Step {step.step}</Badge>
                        <h3 className="text-base md:text-xl font-ivry font-semibold text-slate text-center sm:text-left">{step.title}</h3>
                      </div>
                      <p className="text-slate-medium mb-2 md:mb-4 font-questa text-center sm:text-left text-xs md:text-base">{step.description}</p>
                      <div className="flex justify-center md:justify-start">
                        <Button variant="outline" size="sm" className="font-questa text-xs md:text-sm">
                          {step.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

             {/* Important Notes */}
       <section className="relative py-12 md:py-16 overflow-hidden">
         {/* Background Image with Parallax */}
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
           style={{
             backgroundImage: `url('/pictures/classroom7.jpeg')`,
           }}
         />
         
         {/* Blue Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-slate/40 via-slate/30 to-slate/50"></div>
         
         {/* Content */}
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-ivry font-bold text-white mb-4 px-4">Important Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="p-4 md:p-6 text-center bg-slate">
              <CardContent className="pt-3 md:pt-6">
                <Heart className="h-10 w-10 md:h-12 md:w-12 text-white mx-auto mb-2 md:mb-4" />
                <h3 className="text-base md:text-lg font-ivry font-semibold mb-2 md:mb-3 text-white h-[40px] md:h-auto flex items-center justify-center">No Spanish Required</h3>
                <p className="text-white/90 text-xs md:text-sm font-questa">
                  No Spanish experience required. Our immersion model supports all learners.
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 md:p-6 text-center bg-slate">
              <CardContent className="pt-3 md:pt-6">
                <Users className="h-10 w-10 md:h-12 md:w-12 text-white mx-auto mb-2 md:mb-4" />
                <h3 className="text-base md:text-lg font-ivry font-semibold mb-2 md:mb-3 text-white h-[40px] md:h-auto flex items-center justify-center">Small Class Sizes</h3>
                <p className="text-white/90 text-xs md:text-sm font-questa">
                  12–16 students per grade for personalized attention.
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 md:p-6 text-center bg-slate">
              <CardContent className="pt-3 md:pt-6">
                <DollarSign className="h-10 w-10 md:h-12 md:w-12 text-white mx-auto mb-2 md:mb-4" />
                <h3 className="text-base md:text-lg font-ivry font-semibold mb-2 md:mb-3 text-white h-[40px] md:h-auto flex items-center justify-center">Financial Assistance</h3>
                <p className="text-white/90 text-xs md:text-sm font-questa">
                  Need-based and equity scholarships available.
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 md:p-6 text-center bg-slate">
              <CardContent className="pt-3 md:pt-6">
                <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-white mx-auto mb-2 md:mb-4" />
                <h3 className="text-base md:text-lg font-ivry font-semibold mb-2 md:mb-3 text-white h-[40px] md:h-auto flex items-center justify-center">Rolling Admissions</h3>
                <p className="text-white/90 text-xs md:text-sm font-questa">
                  Applications accepted year-round based on availability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-slate text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-ivry font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto font-questa">
            Take the first step toward your child's bilingual, culturally rich education. Schedule a tour to experience
            our vibrant learning community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa">
              <a href="/contact">Schedule a Tour</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white bg-transparent font-questa">
              <a href="/tuition">View Tuition Information</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
