import { Card, CardContent } from "@/components/ui/card"
import { Heart, Globe, Users } from "lucide-react"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import HeroWithImages from "@/components/hero-with-images"
import ImageGallery from "@/components/image-gallery"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Images */}
      <HeroWithImages
        title="Where Culture Meets"
        subtitle="Curiosity"
        description="Welcome to Spanish Horizons Academy, where children grow through immersive Spanish language learning and hands-on, project-based exploration. Rooted in the success of Casita Azul and Amanecer Academy."
        primaryButton={{ text: "Schedule a Tour", href: "/admissions" }}
        secondaryButton={{ text: "Learn About Our Programs", href: "/programs" }}
        heroImage={{
          title: "Students in Spanish Immersion",
          description: "Classroom learning and cultural activities",
        }}
      />

      {/* Quick Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Spanish Horizons?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three pillars that make our educational approach unique and effective
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Globe className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Spanish Immersion</h3>
                <p className="text-gray-600 leading-relaxed">
                  80/20 model for authentic bilingual development through meaningful content learning
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
                  <Heart className="h-10 w-10 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Experiential Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Through Cooking, Art, Gardening & Movement that makes learning memorable
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                  <Users className="h-10 w-10 text-orange-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Community Focus</h3>
                <p className="text-gray-600 leading-relaxed">
                  Culture, Connection, and Collaboration in a supportive learning environment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <ImageGallery />

      {/* Testimonials Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Parents Are Saying</h2>
            <p className="text-xl text-gray-600">Hear from families in our community</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Mission & Vision with Images */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Mission */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-10 shadow-xl h-full">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At Spanish Horizons Academy, our mission is to nurture curious, compassionate, and culturally grounded
                  students through an immersive Spanish-English education rooted in Expeditionary Learning.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-10 shadow-xl h-full">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We envision a vibrant, inclusive community of learners who grow into bilingual leaders, cultural
                  ambassadors, and agents of change—equipped with the skills and empathy to thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-400 transition-colors duration-300">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Curiosity</h3>
              <p className="text-gray-600 text-sm">Fostering wonder and inquiry</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-400 transition-colors duration-300">
                <span className="text-3xl">🌎</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Culture</h3>
              <p className="text-gray-600 text-sm">Celebrating diversity and heritage</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-400 transition-colors duration-300">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 text-sm">Building connections together</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-400 transition-colors duration-300">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Language</h3>
              <p className="text-gray-600 text-sm">Authentic bilingual development</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-400 transition-colors duration-300">
                <span className="text-3xl">🧩</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Discovery</h3>
              <p className="text-gray-600 text-sm">Learning through exploration</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}
