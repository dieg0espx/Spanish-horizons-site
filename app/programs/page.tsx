import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Globe,
  BookOpen,
  Palette,
  Music,
  ChefHat,
  Sprout,
  Heart,
  Clock,
  Users,
  Target,
  ChevronRight,
} from "lucide-react"

export default function ProgramsPage() {
  const dailySchedule = [
    { time: "8:15 – 8:30", activity: "Arrival & Morning Greeting", description: "Warm welcome in Spanish" },
    { time: "8:30 – 9:00", activity: "Breakfast & Community Circle", description: "Shared meal and daily planning" },
    { time: "9:00 – 9:30", activity: "Phonics / Literacy (Small Groups)", description: "Targeted reading instruction" },
    { time: "9:30 – 10:15", activity: "Expeditionary Block", description: "Project-based learning" },
    { time: "10:15 – 10:45", activity: "Outdoor Play", description: "Physical activity and fresh air" },
    { time: "10:45 – 11:15", activity: "Math", description: "Mathematical thinking and problem solving" },
    { time: "11:15 – 11:45", activity: "Storytime", description: "Bilingual literature and discussion" },
    { time: "11:45 – 12:15", activity: "Lunch", description: "Community dining experience" },
    { time: "12:15 – 12:45", activity: "Mindfulness / Journaling", description: "Reflection and emotional regulation" },
    { time: "12:45 – 1:30", activity: "Specials (Music, Cooking, etc.)", description: "Arts and cultural enrichment" },
    { time: "1:30 – 2:15", activity: "Expeditionary Block (Continued)", description: "Extended project work" },
    { time: "2:15 – 2:45", activity: "Snack & Reflection", description: "Community sharing time" },
    { time: "2:45 – 3:15", activity: "Outdoor Play / Pick-Up", description: "End of day activities" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate-light rounded-full text-white text-sm font-questa font-medium mb-6">
              <Target className="h-4 w-4 mr-2" />
              K-5 Academic Excellence
            </div>
            <h1 className="text-5xl md:text-6xl font-ivry font-bold text-white mb-6">K-5 Spanish Immersion Program</h1>
            <p className="text-xl text-white max-w-3xl mx-auto mb-8 font-questa">
              Built on two powerful pillars: Expeditionary Learning and Spanish Immersion (80/20 model). Where academic
              excellence meets cultural richness and hands-on discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button
              size="lg"
              className="bg-amber hover:bg-golden hover:text-slate text-white px-8 py-4 rounded-xl font-questa font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
                <a href="/admissions" className="flex items-center">
                  Schedule a Tour
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white px-8 py-4 rounded-xl font-questa font-semibold bg-transparent"
              >
                <a href="/tuition">View Tuition Information</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

             {/* Program Pillars */}
       <section className="py-12 md:py-16 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-ivry font-bold text-slate mb-4">Built on Two Pillars</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <Globe className="h-10 w-10 text-white group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-2xl font-ivry font-bold text-white">Spanish Immersion (80/20 Model)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-white/90 font-questa">
                  <p>
                    <strong>80% Spanish:</strong> Core subjects including math, science, social studies, and arts are
                    taught in Spanish, providing authentic language acquisition through meaningful content.
                  </p>
                  <p>
                    <strong>20% English:</strong> English Language Arts ensures strong literacy development in students'
                    native language while building bilingual competency.
                  </p>
                  <p>
                    <strong>No Prior Spanish Required:</strong> Families don't need Spanish language experience. Our
                    immersion model supports all learners in developing bilingual skills naturally.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <Target className="h-10 w-10 text-white group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-2xl font-ivry font-bold text-white">Expeditionary Learning (EL)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-white/90 font-questa">
                  <p>
                    <strong>Project-Based Units:</strong> Students explore real-world topics through multi-week
                    expeditions that integrate multiple subjects and culminate in authentic products.
                  </p>
                  <p>
                    <strong>Learning by Doing:</strong> Hands-on experiences through cooking, art, gardening, and
                    movement make learning memorable and meaningful.
                  </p>
                  <p>
                    <strong>Character Development:</strong> Academic achievement is balanced with social-emotional
                    learning, building confident, compassionate learners.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

             {/* Core Academic Areas */}
       <section className="py-12 md:py-16 bg-slate-light">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-ivry font-bold text-white mb-4">Core Academic Areas</h2>
            <p className="text-lg text-white/50 font-questa">
              Comprehensive curriculum delivered through immersive, hands-on experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                         <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-6 text-center">
               <CardContent className="pt-4">
                 <div className="w-20 h-20 bg-slate-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-slate transition-colors duration-300">
                   <BookOpen className="h-10 w-10 text-white group-hover:text-white transition-colors duration-300" />
                 </div>
                 <h3 className="text-lg font-ivry font-semibold mb-2 text-slate">Daily Academics</h3>
                 <p className="text-slate-medium text-sm font-questa">Math, Literacy, Phonics & Writing</p>
               </CardContent>
             </Card>

                         <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-6 text-center">
               <CardContent className="pt-4">
                 <div className="w-20 h-20 bg-golden-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-golden transition-colors duration-300">
                   <Target className="h-10 w-10 text-white group-hover:text-white transition-colors duration-300" />
                 </div>
                 <h3 className="text-lg font-ivry font-semibold mb-2 text-slate">Project-Based Units</h3>
                 <p className="text-slate-medium text-sm font-questa">Expeditions & Investigations</p>
               </CardContent>
             </Card>

                         <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-6 text-center">
               <CardContent className="pt-4">
                 <div className="w-20 h-20 bg-amber-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber transition-colors duration-300">
                   <Heart className="h-10 w-10 text-white group-hover:text-white transition-colors duration-300" />
                 </div>
                 <h3 className="text-lg font-ivry font-semibold mb-2 text-slate">Social-Emotional</h3>
                 <p className="text-slate-medium text-sm font-questa">Emotional Regulation & Executive Function</p>
               </CardContent>
             </Card>

                         <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-6 text-center">
               <CardContent className="pt-4">
                 <div className="w-20 h-20 bg-slate-medium rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-slate transition-colors duration-300">
                   <Palette className="h-10 w-10 text-white group-hover:text-white transition-colors duration-300" />
                 </div>
                 <h3 className="text-lg font-ivry font-semibold mb-2 text-slate">Specials</h3>
                 <p className="text-slate-medium text-sm font-questa">Art, Music, Cooking, Gardening, Movement</p>
               </CardContent>
             </Card>
          </div>
        </div>
      </section>

             {/* Sample Curriculum Showcase */}
       <section className="py-12 md:py-16 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-ivry font-bold text-slate mb-4">
              Sample Curriculum: Adventures Across Latin America
            </h2>
            <p className="text-lg text-slate-medium font-questa">See how our expeditionary approach brings learning to life</p>
          </div>

                     <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-6 max-w-4xl mx-auto">
             <CardHeader className="pb-4">
               <CardTitle className="text-center text-2xl font-ivry text-slate">Multi-Week Expedition Example</CardTitle>
             </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-ivry font-semibold mb-4 text-slate">Countries Explored</h3>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2 font-questa">
                      Mexico
                    </Badge>
                    <Badge variant="outline" className="mr-2 font-questa">
                      Colombia
                    </Badge>
                    <Badge variant="outline" className="mr-2 font-questa">
                      Peru
                    </Badge>
                    <Badge variant="outline" className="mr-2 font-questa">
                      Argentina
                    </Badge>
                    <Badge variant="outline" className="mr-2 font-questa">
                      And more...
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-ivry font-semibold mb-4 text-slate">Learning Activities</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <ChefHat className="h-5 w-5 text-amber mr-2" />
                      <span className="text-slate-medium font-questa">Cooking traditional foods</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-slate mr-2" />
                      <span className="text-slate-medium font-questa">Storytelling and bilingual literature</span>
                    </div>
                    <div className="flex items-center">
                      <Music className="h-5 w-5 text-golden mr-2" />
                      <span className="text-slate-medium font-questa">Music and cultural dances (Cumbia)</span>
                    </div>
                    <div className="flex items-center">
                      <Sprout className="h-5 w-5 text-golden mr-2" />
                      <span className="text-slate-medium font-questa">Science (rainforest ecosystems)</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="h-5 w-5 text-amber mr-2" />
                      <span className="text-slate-medium font-questa">Math with cultural contexts</span>
                    </div>
                    <div className="flex items-center">
                      <Palette className="h-5 w-5 text-golden mr-2" />
                      <span className="text-slate-medium font-questa">Art (Andean-inspired projects)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-slate-light rounded-lg">
                <h4 className="text-lg font-ivry font-semibold text-white mb-2">Culmination Event</h4>
                <p className="text-white/50 font-questa">
                  <strong>Student-led Latin America Fair:</strong> Students showcase their learning through
                  presentations, cultural performances, food tastings, and interactive displays for families and the
                  community.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

             {/* Daily Schedule */}
       <section className="py-12 md:py-16 bg-slate-light">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-ivry font-bold text-white mb-4">Kindergarten Daily Schedule</h2>
            <p className="text-lg text-white/50 font-questa">A balanced day of learning, play, and discovery</p>
          </div>

                     <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-6 max-w-4xl mx-auto">
             <CardContent className="p-0">
               <div className="divide-y divide-gray-200">
                 {dailySchedule.map((item, index) => (
                   <div key={index} className="p-3 hover:bg-slate-light text-slate  hover:text-white transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center mb-2 md:mb-0">
                        <Clock className="h-5 w-5 mr-3" />
                        <span className="font-questa font-semibold min-w-[120px]">{item.time}</span>
                        <span className="font-questa font-medium ml-4">{item.activity}</span>
                      </div>
                      <span className="medium text-sm md:ml-4 font-questa">{item.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-white mb-4 font-questa">
              <em>Schedule may vary slightly for grades 1-5 to accommodate developmental needs</em>
            </p>
            <Button variant="outline" className="font-questa">
              <a href="/admissions">Schedule a Visit to See Our Program in Action</a>
            </Button>
          </div>
        </div>
      </section>

             {/* Program Features */}
       <section className="py-12 md:py-16 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-ivry font-bold text-slate mb-4">Program Highlights</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
                         <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-6">
               <CardContent className="pt-4 text-center">
                 <div className="w-20 h-20 bg-slate-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-slate transition-colors duration-300">
                  <Users className="h-10 w-10 text-white group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-ivry font-semibold mb-3 text-slate">Small Class Sizes</h3>
                <p className="text-slate-medium font-questa">
                  12–16 students per grade with one classroom per grade level for personalized attention
                </p>
              </CardContent>
            </Card>

                         <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-6">
               <CardContent className="pt-4 text-center">
                 <div className="w-20 h-20 bg-amber-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber transition-colors duration-300">
                  <Heart className="h-10 w-10 text-white group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-ivry font-semibold mb-3 text-slate">Emotional Development</h3>
                <p className="text-slate-medium font-questa">
                  Strong focus on emotional regulation, mental health, and prefrontal cortex development
                </p>
              </CardContent>
            </Card>

                         <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-6">
               <CardContent className="pt-4 text-center">
                 <div className="w-20 h-20 bg-golden-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-golden transition-colors duration-300">
                  <Globe className="h-10 w-10 text-white group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-ivry font-semibold mb-3 text-slate">Cultural Immersion</h3>
                <p className="text-slate-medium font-questa">
                  Authentic cultural experiences woven throughout the curriculum and daily life
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-slate text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-ivry font-bold mb-4">Ready to Explore Our Program?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto font-questa">
            Experience our vibrant learning community firsthand. Schedule a tour to see our students engaged in
            authentic Spanish immersion and hands-on expeditionary learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa">
              <a href="/admissions">Schedule a Tour</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white bg-transparent font-questa">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
