import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, BookOpen, Star, Globe, ChefHat, Palette } from "lucide-react"
import Link from "next/link"
import HeroWithImages from "@/components/hero-with-images"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroWithImages
        badge="Meet Our Team & Story"
        title="About Spanish Horizons Academy"
        description="Discover our story, meet our founder, and learn about the educational philosophy that guides our K-5 Spanish immersion program."
        primaryButton={{ text: "Schedule a Tour", href: "/admissions" }}
        secondaryButton={{ text: "Contact Us", href: "/contact" }}
        heroImage={{
          title: "Our Learning Community",
          description: "Teachers and students together",
        }}
      />

      {/* Our Story Section with Images */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg text-gray-700 space-y-6">
                <p>
                  Spanish Horizons Academy was born from a vision: to create a school where learning is joyful,
                  meaningful, and deeply connected to the world around us.
                </p>
                <p>
                  Founded by Laura Paz-Whitmore, the heart behind Casita Azul and Amanecer Academy, Spanish Horizons
                  continues a legacy of culturally rich, bilingual programs. What began with early childhood education
                  has expanded into a full K–5 school where students explore the world through movement, cooking, art,
                  and storytelling.
                </p>
                <p>
                  Our approach combines the proven methodology of Expeditionary Learning with authentic Spanish
                  immersion, creating an environment where children don't just learn about the world—they experience it.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-gray-600 font-medium text-sm">School History</p>
                    <p className="text-xs text-gray-400 mt-1">From Dropbox</p>
                  </div>
                </div>
              </div>
              <div className="aspect-square bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Our Community</p>
                    <p className="text-xs text-gray-400 mt-1">From Dropbox</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 aspect-video bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="text-gray-600 font-semibold">Campus Overview</p>
                    <p className="text-sm text-gray-500 mt-1">Aerial view of our learning spaces</p>
                    <p className="text-xs text-gray-400 mt-1">From Dropbox Gallery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section with Enhanced Images */}
      <section id="leadership" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Founder</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Founder Photo */}
            <div className="text-center">
              <div className="w-80 h-80 bg-white rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl border border-gray-100">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-12 w-12 text-blue-600" />
                  </div>
                  <p className="text-gray-600 font-semibold text-lg">Laura Paz-Whitmore</p>
                  <p className="text-sm text-gray-500 mt-2">Professional Portrait</p>
                  <p className="text-xs text-gray-400 mt-1">From Dropbox</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Laura Paz-Whitmore</h3>
              <p className="text-blue-600 font-semibold text-lg">Founder & Educational Director</p>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white h-full">
                <CardContent className="p-10">
                  <div className="space-y-6 text-gray-700">
                    <p className="text-lg leading-relaxed">
                      With a background in psychology and behavioral health, Laura brings a strong passion for emotional
                      regulation, mental health, and prefrontal cortex development. She is the visionary behind Casita
                      Azul and Amanecer Academy, and now Spanish Horizons Academy.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Laura designs schools where children are seen, nurtured, and deeply inspired. Her approach
                      integrates cutting-edge research in child development with authentic cultural experiences and
                      bilingual education.
                    </p>
                    <blockquote className="border-l-4 border-blue-500 pl-6 italic text-xl text-blue-800 bg-blue-50 p-6 rounded-r-lg">
                      "Children learn best when they feel loved, seen, and inspired."
                    </blockquote>

                    {/* Additional Images */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <ChefHat className="h-5 w-5 text-green-600" />
                          </div>
                          <p className="text-gray-600 font-medium text-xs">Laura Teaching</p>
                          <p className="text-xs text-gray-400">From Dropbox</p>
                        </div>
                      </div>
                      <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Palette className="h-5 w-5 text-purple-600" />
                          </div>
                          <p className="text-gray-600 font-medium text-xs">With Students</p>
                          <p className="text-xs text-gray-400">From Dropbox</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Coming Soon */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Leadership Team</h2>
            <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white">
              <CardContent className="p-12 text-center">
                <Star className="h-20 w-20 text-yellow-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We're building an exceptional team of educators and leaders who share our passion for bilingual,
                  experiential education. Meet our full leadership team soon!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values in Action with Images */}
      <section id="values" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values in Action</h2>
            <p className="text-xl text-gray-600">
              See how our core values shape every aspect of our educational approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="aspect-video bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">💡</span>
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Curiosity in Action</p>
                    <p className="text-xs text-gray-400 mt-1">From Dropbox</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Curiosity</h3>
                <p className="text-gray-600">
                  We foster natural wonder through hands-on exploration, encouraging students to ask questions and seek
                  answers through investigation.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="aspect-video bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">🌎</span>
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Cultural Learning</p>
                    <p className="text-xs text-gray-400 mt-1">From Dropbox</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Culture</h3>
                <p className="text-gray-600">
                  Rich cultural experiences through cooking, music, art, and storytelling connect students to the
                  broader Spanish-speaking world.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="aspect-video bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">🤝</span>
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Community Building</p>
                    <p className="text-xs text-gray-400 mt-1">From Dropbox</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-gray-600">
                  Strong partnerships between families, teachers, and students create a supportive learning environment
                  for everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="aspect-video bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">💬</span>
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Language Immersion</p>
                    <p className="text-xs text-gray-400 mt-1">From Dropbox</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Language</h3>
                <p className="text-gray-600">
                  Authentic Spanish immersion develops true bilingual competency while maintaining strong English
                  language arts skills.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="aspect-video bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">🧩</span>
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Project Discovery</p>
                    <p className="text-xs text-gray-400 mt-1">From Dropbox</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Discovery</h3>
                <p className="text-gray-600">
                  Project-based expeditions allow students to uncover connections between subjects and real-world
                  applications.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="aspect-video bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="h-6 w-6 text-orange-600" />
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Emotional Learning</p>
                    <p className="text-xs text-gray-400 mt-1">From Dropbox</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Heart-Centered Learning</h3>
                <p className="text-gray-600">
                  Emotional regulation and social-emotional learning are woven throughout our curriculum and daily
                  practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Learn More?</h3>
          <p className="text-gray-300 mb-8 text-lg">
            Schedule a tour to experience our vibrant learning community firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              Schedule a Tour
            </Link>
            <Link
              href="/contact"
              className="border-2 border-gray-300 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
