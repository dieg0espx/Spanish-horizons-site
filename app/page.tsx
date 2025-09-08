import { Card, CardContent } from "@/components/ui/card"
import { Heart, Globe, Users } from "lucide-react"
import { FiZap, FiGlobe, FiUsers, FiMessageCircle, FiSearch } from "react-icons/fi"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import HeroWithImages from "@/components/hero-with-images"
import ImageGallery from "@/components/image-gallery"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Images */}
      <HeroWithImages
        title="Spanish Horizons Academy"
        subtitle="K-5 Spanish Immersion"
        description="Bilingual fluency through Expeditionary Learning and cultural experiences. Located in Hillsboro, Oregon."
        primaryButton={{ text: "Schedule a Tour", href: "/admissions" }}
        secondaryButton={{ text: "Learn About Our Programs", href: "/programs" }}
        heroImage={{
          title: "Students in Spanish Immersion",
          description: "Classroom learning and cultural activities",
        }}
      />

      {/* Quick Highlights */}
      <section className="py-20 md:py-20 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-ivry font-bold text-slate mb-4">Why Choose Spanish Horizons Academy?</h2>
            <p className="text-xl text-slate-medium max-w-3xl mx-auto font-questa">
              Our educational approach is built on three foundational pillars that create an exceptional learning environment for K-5 students
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <Globe className="h-10 w-10 text-white group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-ivry font-bold mb-4 text-white">Spanish Immersion</h3>
                <p className="text-white/90 leading-relaxed font-questa">
                  Our 80/20 Spanish-English model provides authentic bilingual development through meaningful content learning, ensuring students develop true fluency while maintaining strong English language arts skills.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <Heart className="h-10 w-10 text-white group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-ivry font-bold mb-4 text-white">Experiential Learning</h3>
                <p className="text-white/90 leading-relaxed font-questa">
                  Hands-on learning through cooking, art, gardening, and movement activities that make education memorable and meaningful, connecting academic concepts to real-world experiences.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <Users className="h-10 w-10 text-white group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-ivry font-bold mb-4 text-white">Community Focus</h3>
                <p className="text-white/90 leading-relaxed font-questa">
                  We foster culture, connection, and collaboration in a supportive learning environment where families, teachers, and students work together to create a vibrant educational community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <ImageGallery />

             {/* Testimonials Carousel */}
       <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-ivry font-bold text-slate mb-4">What Parents Are Saying</h2>
            <p className="text-xl text-slate-medium font-questa">Hear from families in our community</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Mission & Vision with Images */}
      <section className="py-20 bg-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Mission */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-10 shadow-xl h-full">
                <div className="w-16 h-16 bg-slate rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-ivry font-bold text-slate mb-6">Our Mission</h2>
                <p className="text-lg text-slate-medium leading-relaxed font-questa">
                  At Spanish Horizons Academy, our mission is to nurture curious, compassionate, and culturally grounded students through an immersive Spanish-English education rooted in Expeditionary Learning. We are committed to developing bilingual leaders who are prepared to thrive in our interconnected world.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="lg:col-span-1 h-full">
              <div className="bg-white rounded-3xl p-10 shadow-xl h-full">
                <div className="w-16 h-16 bg-golden-light rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-ivry font-bold text-slate mb-6">Our Vision</h2>
                <p className="text-lg text-slate-medium leading-relaxed font-questa">
                  We envision a vibrant, inclusive community of learners who grow into bilingual leaders, cultural ambassadors, and agents of change—equipped with the skills, empathy, and global perspective to thrive in an interconnected world and make meaningful contributions to society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl font-ivry font-bold text-slate mb-4">Our Core Values</h2>
            <p className="text-xl text-slate-medium font-questa">The fundamental principles that guide our educational philosophy and daily practices</p>
          </div>
                     <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-golden-light rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-golden transition-colors duration-300">
                <FiZap className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-ivry font-bold text-xl text-slate mb-2">Curiosity</h3>
              <p className="text-slate-medium text-sm font-questa">Fostering wonder and inquiry</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-slate rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-medium transition-colors duration-300">
                <FiGlobe className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-ivry font-bold text-xl text-slate mb-2">Culture</h3>
              <p className="text-slate-medium text-sm font-questa">Celebrating diversity and heritage</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-amber-light rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber transition-colors duration-300">
                <FiUsers className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-ivry font-bold text-xl text-slate mb-2">Community</h3>
              <p className="text-slate-medium text-sm font-questa">Building connections together</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-slate rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-medium transition-colors duration-300">
                <FiMessageCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-ivry font-bold text-xl text-slate mb-2">Language</h3>
              <p className="text-slate-medium text-sm font-questa">Authentic bilingual development</p>
            </div>
                         <div className="text-center group col-span-2 md:col-span-1">
               <div className="w-20 h-20 bg-golden-light rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-golden transition-colors duration-300">
                 <FiSearch className="h-10 w-10 text-white" />
               </div>
               <h3 className="font-ivry font-bold text-xl text-slate mb-2">Discovery</h3>
               <p className="text-slate-medium text-sm font-questa max-w-[120px] mx-auto">Learning through exploration</p>
             </div>
          </div>
        </div>
      </section>


    </div>
  )
}
