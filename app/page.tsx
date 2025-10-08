"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Globe, Users } from "lucide-react"
import { FiZap, FiGlobe, FiUsers, FiMessageCircle, FiSearch } from "react-icons/fi"
// import TestimonialsCarousel from "@/components/testimonials-carousel" // Commented out until testimonials are available
import HeroWithImages from "@/components/hero-with-images"
import ImageGallery from "@/components/image-gallery"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => {
      if (cardsRef.current) {
        observer.unobserve(cardsRef.current);
      }
    };
  }, []);


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
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-ivry font-bold text-slate mb-4 px-4">Why Choose Spanish Horizons Academy?</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-medium max-w-3xl mx-auto font-questa px-4">
              Our educational approach is built on three foundational pillars that create an exceptional learning environment for K-5 students
            </p>
          </div>
          <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className={`group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate cursor-pointer transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '0ms' }}>
              <Link href="/programs" className="block">
                <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 group-hover:bg-white/30 transition-colors duration-300">
                    <Globe className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-ivry font-bold mb-2 sm:mb-3 md:mb-4 text-white">Spanish Immersion</h3>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-questa">
                    Our 80/20 Spanish-English model provides authentic bilingual development through meaningful content learning, ensuring students develop true fluency while maintaining strong English language arts skills.
                  </p>
                </CardContent>
              </Link>
            </Card>
            <Card className={`group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate cursor-pointer transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '150ms' }}>
              <Link href="/programs" className="block">
                <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 group-hover:bg-white/30 transition-colors duration-300">
                    <Heart className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-ivry font-bold mb-2 sm:mb-3 md:mb-4 text-white">Expeditionary Learning</h3>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-questa">
                    Hands-on learning through cooking, art, gardening, and movement activities that make education memorable and meaningful, connecting academic concepts to real-world experiences.
                  </p>
                </CardContent>
              </Link>
            </Card>
            <Card className={`group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate cursor-pointer transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '300ms' }}>
              <Link href="/about" className="block">
                <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 group-hover:bg-white/30 transition-colors duration-300">
                    <Users className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-ivry font-bold mb-2 sm:mb-3 md:mb-4 text-white">Community Focus</h3>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-questa">
                    We foster culture, connection, and collaboration in a supportive learning environment where families, teachers, and students work together to create a vibrant educational community.
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <ImageGallery />

             {/* Testimonials Carousel - Commented out until testimonials are available */}
       {/* <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-ivry font-bold text-slate mb-4">What Parents Are Saying</h2>
            <p className="text-xl text-slate-medium font-questa">Hear from families in our community</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section> */}

      {/* Mission & Vision with Images */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url('/pictures/classroom.jpeg')`,
          }}
        />
        
        {/* Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate/40 via-slate/30 to-slate/50"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Mission */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl h-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-slate rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-ivry font-bold text-slate mb-3 sm:mb-4 md:mb-6">Our Mission</h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-medium leading-relaxed font-questa">
                  At Spanish Horizons Academy, our mission is to nurture curious, compassionate, and culturally grounded students through an immersive Spanish-English education rooted in Expeditionary Learning. We are committed to developing bilingual leaders who are prepared to thrive in our interconnected world.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="lg:col-span-1 h-full">
              <div className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl h-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-golden-light rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
                  <Globe className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-ivry font-bold text-slate mb-3 sm:mb-4 md:mb-6">Our Vision</h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-medium leading-relaxed font-questa">
                  We envision a vibrant, inclusive community of learners who grow into bilingual leaders, cultural ambassadors, and agents of change—equipped with the skills, empathy, and global perspective to thrive in an interconnected world and make meaningful contributions to society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-20 bg-white">
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-ivry font-bold text-slate mb-4 px-4">Our Core Values</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-medium font-questa px-4">The fundamental principles that guide our educational philosophy and daily practices</p>
          </div>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-golden-light rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 group-hover:bg-golden transition-colors duration-300">
                <FiZap className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="font-ivry font-bold text-lg md:text-xl text-slate mb-1 md:mb-2">Curiosity</h3>
              <p className="text-slate-medium text-xs md:text-sm font-questa">Fostering wonder and inquiry</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 group-hover:bg-slate-medium transition-colors duration-300">
                <FiGlobe className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="font-ivry font-bold text-lg md:text-xl text-slate mb-1 md:mb-2">Culture</h3>
              <p className="text-slate-medium text-xs md:text-sm font-questa">Celebrating diversity and heritage</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-light rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 group-hover:bg-amber transition-colors duration-300">
                <FiUsers className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="font-ivry font-bold text-lg md:text-xl text-slate mb-1 md:mb-2">Community</h3>
              <p className="text-slate-medium text-xs md:text-sm font-questa">Building connections together</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 group-hover:bg-slate-medium transition-colors duration-300">
                <FiMessageCircle className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="font-ivry font-bold text-lg md:text-xl text-slate mb-1 md:mb-2">Language</h3>
              <p className="text-slate-medium text-xs md:text-sm font-questa">Authentic bilingual development</p>
            </div>
                         <div className="text-center group col-span-2 md:col-span-3 lg:col-span-1">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-golden-light rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 group-hover:bg-golden transition-colors duration-300">
                 <FiSearch className="h-8 w-8 md:h-10 md:w-10 text-white" />
               </div>
               <h3 className="font-ivry font-bold text-lg md:text-xl text-slate mb-1 md:mb-2">Discovery</h3>
               <p className="text-slate-medium text-xs md:text-sm font-questa">Learning through exploration</p>
             </div>
          </div>
        </div>
      </section>


    </div>
  )
}
