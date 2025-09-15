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
  Sun,
  Coffee,
  Book,
  Lightbulb,
  TreePine,
  Calculator,
  BookMarked,
  Utensils,
  Brain,
  Mic,
  Apple,
  Home,
} from "lucide-react"

export default function ProgramsPage() {
  const dailySchedule = [
    { 
      time: "8:15 – 8:30", 
      activity: "Arrival & Morning Greeting", 
      description: "Warm welcome in Spanish",
      icon: Sun,
      color: "bg-yellow-100 text-yellow-600",
      iconColor: "text-yellow-500"
    },
    { 
      time: "8:30 – 9:00", 
      activity: "Breakfast & Community Circle", 
      description: "Shared meal and daily planning",
      icon: Coffee,
      color: "bg-orange-100 text-orange-600",
      iconColor: "text-orange-500"
    },
    { 
      time: "9:00 – 9:30", 
      activity: "Phonics / Literacy (Small Groups)", 
      description: "Targeted reading instruction",
      icon: Book,
      color: "bg-blue-100 text-blue-600",
      iconColor: "text-blue-500"
    },
    { 
      time: "9:30 – 10:15", 
      activity: "Expeditionary Block", 
      description: "Project-based learning",
      icon: Lightbulb,
      color: "bg-purple-100 text-purple-600",
      iconColor: "text-purple-500"
    },
    { 
      time: "10:15 – 10:45", 
      activity: "Outdoor Play", 
      description: "Physical activity and fresh air",
      icon: TreePine,
      color: "bg-green-100 text-green-600",
      iconColor: "text-green-500"
    },
    { 
      time: "10:45 – 11:15", 
      activity: "Math", 
      description: "Mathematical thinking and problem solving",
      icon: Calculator,
      color: "bg-indigo-100 text-indigo-600",
      iconColor: "text-indigo-500"
    },
    { 
      time: "11:15 – 11:45", 
      activity: "Storytime", 
      description: "Bilingual literature and discussion",
      icon: BookMarked,
      color: "bg-pink-100 text-pink-600",
      iconColor: "text-pink-500"
    },
    { 
      time: "11:45 – 12:15", 
      activity: "Lunch", 
      description: "Community dining experience",
      icon: Utensils,
      color: "bg-red-100 text-red-600",
      iconColor: "text-red-500"
    },
    { 
      time: "12:15 – 12:45", 
      activity: "Mindfulness / Journaling", 
      description: "Reflection and emotional regulation",
      icon: Brain,
      color: "bg-teal-100 text-teal-600",
      iconColor: "text-teal-500"
    },
    { 
      time: "12:45 – 1:30", 
      activity: "Specials (Music, Cooking, etc.)", 
      description: "Arts and cultural enrichment",
      icon: Mic,
      color: "bg-rose-100 text-rose-600",
      iconColor: "text-rose-500"
    },
    { 
      time: "1:30 – 2:15", 
      activity: "Expeditionary Block (Continued)", 
      description: "Extended project work",
      icon: Lightbulb,
      color: "bg-purple-100 text-purple-600",
      iconColor: "text-purple-500"
    },
    { 
      time: "2:15 – 2:45", 
      activity: "Snack & Reflection", 
      description: "Community sharing time",
      icon: Apple,
      color: "bg-emerald-100 text-emerald-600",
      iconColor: "text-emerald-500"
    },
    { 
      time: "2:45 – 3:15", 
      activity: "Outdoor Play / Pick-Up", 
      description: "End of day activities",
      icon: Home,
      color: "bg-amber-100 text-amber-600",
      iconColor: "text-amber-500"
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate rounded-full text-white text-sm font-questa font-medium mb-6">
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
                className="bg-white text-slate hover:bg-amber hover:text-white px-8 py-4 rounded-xl font-questa font-semibold transition-all duration-200"
              >
                <a href="/tuition">View Tuition Information</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

             {/* Program Pillars */}
       <section className="relative py-12 md:py-16 overflow-hidden">
         {/* Background Image with Parallax */}
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
           style={{
             backgroundImage: `url('/pictures/classroom5.png')`,
           }}
         />
         
         {/* Blue Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-slate/40 via-slate/30 to-slate/50"></div>
         
         {/* Content */}
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-ivry font-bold text-white mb-4">Built on Two Pillars</h2>
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
       <section className="py-12 md:py-16 bg-slate">
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
                 <div className="w-20 h-20 bg-slate rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-medium transition-colors duration-300">
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
                                   <div className="w-20 h-20 bg-slate rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-medium transition-colors duration-300">
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
       <section className="relative py-12 md:py-16 overflow-hidden">
         {/* Background Image with Parallax */}
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
           style={{
             backgroundImage: `url('/pictures/classroom2.jpeg')`,
           }}
         />
         
         {/* Blue Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-slate/40 via-slate/30 to-slate/50"></div>
         
         {/* Content */}
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-ivry font-bold text-white mb-4">
              Sample Curriculum: Adventures Across Latin America
            </h2>
            <p className="text-lg text-white/90 font-questa">See how our expeditionary approach brings learning to life</p>
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

              <div className="mt-8 p-6 bg-slate rounded-lg">
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
       <section className="py-12 md:py-16 bg-slate">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-ivry font-bold text-white mb-4">Kindergarten Daily Schedule</h2>
            <p className="text-lg text-white/50 font-questa">A balanced day of learning, play, and discovery</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid gap-4">
              {dailySchedule.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center p-6 hover:bg-gray-50 transition-colors">
                        {/* Icon with colored background */}
                        <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className={`h-8 w-8 ${item.iconColor}`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="font-questa font-semibold text-gray-700 text-sm">{item.time}</span>
                              </div>
                              <h3 className="font-questa font-semibold text-gray-900 text-lg leading-tight">
                                {item.activity}
                              </h3>
                            </div>
                          </div>
                          <p className="text-gray-600 font-questa text-sm mt-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        
                        {/* Decorative element */}
                        <div className="flex-shrink-0 ml-4">
                          <div className="w-2 h-2 rounded-full bg-gray-200 group-hover:bg-gray-400 transition-colors"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-white mb-6 font-questa text-lg">
                <em>Schedule may vary slightly for grades 1-5 to accommodate developmental needs</em>
              </p>
              <Button variant="outline" className="font-questa bg-white/10 border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all duration-300">
                <a href="/admissions">Schedule a Visit to See Our Program in Action</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

             {/* Program Features */}
       <section className="relative py-12 md:py-16 overflow-hidden">
         {/* Background Image with Parallax */}
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
           style={{
             backgroundImage: `url('/pictures/classroom6.jpeg')`,
           }}
         />
         
         {/* Blue Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-slate/40 via-slate/30 to-slate/50"></div>
         
         {/* Content */}
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-ivry font-bold text-white mb-4">Program Highlights</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
                         <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-6">
               <CardContent className="pt-4 text-center">
                                   <div className="w-20 h-20 bg-slate rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-medium transition-colors duration-300">
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
