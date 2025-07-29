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
      <section className="bg-blue-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
              <Target className="h-4 w-4 mr-2" />
              K-5 Academic Excellence
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">K-5 Spanish Immersion Program</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Built on two powerful pillars: Expeditionary Learning and Spanish Immersion (80/20 model). Where academic
              excellence meets cultural richness and hands-on discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <a href="/admissions" className="flex items-center">
                  Schedule a Tour
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold bg-transparent"
              >
                <a href="/tuition">View Tuition Information</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Pillars */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built on Two Pillars</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Globe className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-2xl font-bold">Spanish Immersion (80/20 Model)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700">
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

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Target className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-2xl font-bold">Expeditionary Learning (EL)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700">
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Academic Areas</h2>
            <p className="text-lg text-gray-600">
              Comprehensive curriculum delivered through immersive, hands-on experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-8 text-center">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <BookOpen className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Daily Academics</h3>
                <p className="text-gray-600 text-sm">Math, Literacy, Phonics & Writing</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-8 text-center">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Target className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Project-Based Units</h3>
                <p className="text-gray-600 text-sm">Expeditions & Investigations</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-8 text-center">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Heart className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Social-Emotional</h3>
                <p className="text-gray-600 text-sm">Emotional Regulation & Executive Function</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-8 text-center">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Palette className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Specials</h3>
                <p className="text-gray-600 text-sm">Art, Music, Cooking, Gardening, Movement</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Curriculum Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sample Curriculum: Adventures Across Latin America
            </h2>
            <p className="text-lg text-gray-600">See how our expeditionary approach brings learning to life</p>
          </div>

          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Multi-Week Expedition Example</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Countries Explored</h3>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2">
                      Mexico
                    </Badge>
                    <Badge variant="outline" className="mr-2">
                      Colombia
                    </Badge>
                    <Badge variant="outline" className="mr-2">
                      Peru
                    </Badge>
                    <Badge variant="outline" className="mr-2">
                      Argentina
                    </Badge>
                    <Badge variant="outline" className="mr-2">
                      And more...
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-800">Learning Activities</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <ChefHat className="h-5 w-5 text-orange-600 mr-2" />
                      <span className="text-gray-700">Cooking traditional foods</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-gray-700">Storytelling and bilingual literature</span>
                    </div>
                    <div className="flex items-center">
                      <Music className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-gray-700">Music and cultural dances (Cumbia)</span>
                    </div>
                    <div className="flex items-center">
                      <Sprout className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-gray-700">Science (rainforest ecosystems)</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-gray-700">Math with cultural contexts</span>
                    </div>
                    <div className="flex items-center">
                      <Palette className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="text-gray-700">Art (Andean-inspired projects)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Culmination Event</h4>
                <p className="text-blue-700">
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kindergarten Daily Schedule</h2>
            <p className="text-lg text-gray-600">A balanced day of learning, play, and discovery</p>
          </div>

          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-8 max-w-4xl mx-auto">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {dailySchedule.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center mb-2 md:mb-0">
                        <Clock className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="font-semibold text-gray-900 min-w-[120px]">{item.time}</span>
                        <span className="font-medium text-gray-800 ml-4">{item.activity}</span>
                      </div>
                      <span className="text-gray-600 text-sm md:ml-4">{item.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              <em>Schedule may vary slightly for grades 1-5 to accommodate developmental needs</em>
            </p>
            <Button variant="outline">
              <a href="/admissions">Schedule a Visit to See Our Program in Action</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Highlights</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-8">
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Users className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Small Class Sizes</h3>
                <p className="text-gray-600">
                  12–16 students per grade with one classroom per grade level for personalized attention
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-8">
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Heart className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Emotional Development</h3>
                <p className="text-gray-600">
                  Strong focus on emotional regulation, mental health, and prefrontal cortex development
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white p-8">
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Globe className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cultural Immersion</h3>
                <p className="text-gray-600">
                  Authentic cultural experiences woven throughout the curriculum and daily life
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Our Program?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience our vibrant learning community firsthand. Schedule a tour to see our students engaged in
            authentic Spanish immersion and hands-on expeditionary learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <a href="/admissions">Schedule a Tour</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 bg-transparent">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
