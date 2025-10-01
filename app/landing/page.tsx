"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Globe, 
  Users, 
  BookOpen,
  ChefHat,
  Sun,
  ArrowRight,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  GraduationCap,
  Home,
  Utensils,
  TreePine
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import LandingNav from "@/components/landing-nav"
import LandingFooter from "@/components/landing-footer"
import ProgramCarousel from "@/components/program-carousel"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Media data for each program
  const programMedia = {
    spanishHorizons: [
      {
        id: '1',
        type: 'image' as const,
        src: '/pictures/classroom.jpeg',
        alt: 'Spanish Horizons classroom',
        description: 'Students engaged in Spanish immersion learning with hands-on activities and cultural experiences.'
      },
      {
        id: '2',
        type: 'image' as const,
        src: '/pictures/whats1.JPG',
        alt: 'Students learning Spanish',
        description: 'Interactive learning environment where students develop bilingual skills through meaningful content.'
      },
      {
        id: '3',
        type: 'image' as const,
        src: '/pictures/whats2.JPG',
        alt: 'Cultural activities',
        description: 'Cultural celebrations and activities that bring Spanish language learning to life.'
      },
      {
        id: '4',
        type: 'video' as const,
        src: '/videos/video 2.mp4',
        alt: 'Music and dance activities',
        description: 'Students experience Latin American music and dance, building cultural connections through movement.'
      },
      {
        id: '5',
        type: 'image' as const,
        src: '/pictures/classroom2.jpeg',
        alt: 'Learning environment',
        description: 'Modern classroom setup designed for immersive Spanish language education and collaborative learning.'
      },
      {
        id: '6',
        type: 'image' as const,
        src: '/pictures/classroom3.png',
        alt: 'Student activities',
        description: 'Hands-on learning experiences that combine language acquisition with practical skills and creativity.'
      }
    ],
    casitaAzul: [
      {
        id: '1',
        type: 'image' as const,
        src: '/casitaAzul/casita1.jpeg',
        alt: 'Casita Azul classroom',
        description: 'Warm, nurturing environment designed for early childhood Spanish immersion learning.'
      },
      {
        id: '2',
        type: 'image' as const,
        src: '/casitaAzul/casita2.jpeg',
        alt: 'Children playing and learning',
        description: 'Heart-centered teaching approach that nurtures confident, curious, and compassionate little humans.'
      },
      {
        id: '3',
        type: 'image' as const,
        src: '/casitaAzul/casita3.jpeg',
        alt: 'Spanish immersion activities',
        description: 'Complete Spanish language environment for natural language acquisition through play and exploration.'
      },
      {
        id: '4',
        type: 'image' as const,
        src: '/casitaAzul/casita4.jpeg',
        alt: 'Cultural learning experiences',
        description: 'Authentic cultural experiences that build awareness and appreciation for Spanish-speaking cultures.'
      },
      {
        id: '5',
        type: 'image' as const,
        src: '/casitaAzul/casita5.jpeg',
        alt: 'Learning through play',
        description: 'Play-based learning activities that make Spanish language acquisition natural and enjoyable for young children.'
      },
      {
        id: '6',
        type: 'image' as const,
        src: '/casitaAzul/casita6.jpeg',
        alt: 'Child development',
        description: 'Comprehensive child development program that integrates Spanish language learning with social and emotional growth.'
      }
    ],
    cocinarte: [
      {
        id: '6',
        type: 'image' as const,
        src: '/cocinarte/cocinarte6.jpeg',
        alt: 'Cooking techniques',
        description: 'Learning fundamental cooking techniques and kitchen safety in a fun, interactive environment.'
      },
      {
        id: '3',
        type: 'image' as const,
        src: '/cocinarte/cocinarte3.jpeg',
        alt: 'Cooking ingredients and tools',
        description: 'Interactive learning about ingredients, cooking techniques, and cultural traditions.',
        imagePosition: 'center 100%'
      },
      {
        id: '1',
        type: 'image' as const,
        src: '/cocinarte/cocinarte1.jpeg',
        alt: 'Cooking class in progress',
        description: 'Hands-on cooking experiences where kids learn Latin American cuisine and Spanish vocabulary.',
        imagePosition: 'center 25%'
      },
      {
        id: '4',
        type: 'image' as const,
        src: '/cocinarte/cocinarte4.jpeg',
        alt: 'Finished cooking creations',
        description: 'Celebrating the joy of cooking and sharing delicious Latin American dishes.'
      },
      {
        id: '2',
        type: 'image' as const,
        src: '/cocinarte/cocinarte2.jpeg',
        alt: 'Kids cooking together',
        description: 'Family cooking sessions that create lasting memories while exploring Latin flavors.',
        imagePosition: 'center 15%'
      },
      {
        id: '5',
        type: 'image' as const,
        src: '/cocinarte/cocinarte5.jpeg',
        alt: 'Culinary creativity',
        description: 'Encouraging creativity and confidence in the kitchen while learning traditional Latin American recipes.'
      }
    ],
    campAlegria: [
      {
        id: '1',
        type: 'image' as const,
        src: '/pictures/6-DSC02581.jpg',
        alt: 'Camp Alegria activities',
        description: 'Summer camp adventures exploring Latin American culture through storytelling and hands-on activities.'
      },
      {
        id: '2',
        type: 'video' as const,
        src: '/videos/clip_jumping.mp4',
        alt: 'Outdoor camp activities',
        description: 'Active outdoor learning experiences that combine Spanish language with physical activities and fun.'
      },
      {
        id: '3',
        type: 'image' as const,
        src: '/pictures/whats3.JPG',
        alt: 'Cultural celebrations',
        description: 'Community celebrations and cultural events that bring Latin American traditions to life.'
      },
      {
        id: '4',
        type: 'image' as const,
        src: '/pictures/whats4.JPG',
        alt: 'Group activities and games',
        description: 'Collaborative activities and games that build friendships while practicing Spanish language skills.'
      },
      {
        id: '5',
        type: 'image' as const,
        src: '/pictures/1-DSC02558.jpg',
        alt: 'Summer camp fun',
        description: 'Exciting summer activities that combine Spanish language learning with outdoor adventures and cultural exploration.'
      },
      {
        id: '6',
        type: 'image' as const,
        src: '/pictures/2-DSC02562.jpg',
        alt: 'Camp community',
        description: 'Building lasting friendships and community connections through shared Spanish immersion experiences.'
      }
    ]
  };

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <LandingNav />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-8">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
          style={{
            backgroundImage: `url('/pictures/classroom.jpeg')`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="bg-white/90 text-slate-800 border-white/20 px-6 py-3 text-base mb-6">
              <Globe className="w-5 h-5 mr-2" />
              Complete Spanish Immersion Education Ecosystem
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-questa leading-tight text-white mb-6">
              Spanish Horizons
              <span className="block text-amber">Family of Programs</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              From early childhood through elementary school, cooking adventures to summer camps — 
              we provide comprehensive Spanish immersion education for every stage of your child's journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-slate hover:bg-slate-800 text-white font-questa px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="/admissions" className="flex items-center">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-slate hover:bg-white/10 font-questa px-8 py-4 text-lg rounded-xl transition-all duration-200">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-questa text-slate mb-4">
              Four Programs, One Mission
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive Spanish immersion ecosystem serves children and families at every stage, 
              creating a seamless educational journey from early childhood through elementary school.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Spanish Horizons Academy */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 cursor-pointer">
              <Link href="/" className="block">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-slate rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-800 transition-colors duration-300">
                    <GraduationCap className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-questa font-bold mb-4 text-slate">Spanish Horizons Academy</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    K-5 Spanish immersion school with Expeditionary Learning approach
                  </p>
                  <Badge variant="secondary" className="bg-slate-200 text-slate-800 text-sm">
                    Ages 5-11
                  </Badge>
                </CardContent>
              </Link>
            </Card>

            {/* Casita Azul */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 cursor-pointer">
              <Link href="/casita-azul" className="block">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-700 transition-colors duration-300">
                    <Home className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-questa font-bold mb-4 text-slate">Casita Azul</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Bilingual preschool & daycare with heart-centered teaching
                  </p>
                  <Badge variant="secondary" className="bg-green-200 text-green-800 text-sm">
                    Ages 2-5
                  </Badge>
                </CardContent>
              </Link>
            </Card>

            {/* Cocinarte */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 cursor-pointer">
              <Link href="/cocinarte" className="block">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                    <ChefHat className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-questa font-bold mb-4 text-slate">Cocinarte</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Cooking classes celebrating Latin flavors for kids & families
                  </p>
                  <Badge variant="secondary" className="bg-orange-200 text-orange-800 text-sm">
                    All Ages
                  </Badge>
                </CardContent>
              </Link>
            </Card>

            {/* Camp Alegría */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 cursor-pointer">
              <Link href="/camp-alegria" className="block">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-amber rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-600 transition-colors duration-300">
                    <Sun className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-questa font-bold mb-4 text-slate">Camp Alegría</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Immersive summer camp exploring Latin American culture
                  </p>
                  <Badge variant="secondary" className="bg-amber-200 text-amber-800 text-sm">
                    Ages 5-12
                  </Badge>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Program Sections */}
      <section ref={cardsRef} className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Spanish Horizons Academy */}
          <div id="spanish-horizons" className={`mb-40 transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-slate-200 text-slate-800 text-sm">
                      K-5 Elementary School
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-questa text-slate">
                    Spanish Horizons Academy
                  </h2>
                  <p className="text-lg text-slate-600">
                    Our flagship K-5 Spanish immersion school combines 80/20 Spanish-English instruction 
                    with Expeditionary Learning, creating bilingual leaders prepared for our interconnected world.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-slate mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-lg text-slate">Spanish Immersion</h3>
                      <p className="text-slate-600">80/20 model with authentic bilingual development</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-slate mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-lg text-slate">Expeditionary Learning</h3>
                      <p className="text-slate-600">Hands-on learning through cooking, art, gardening, and movement</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-slate mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-lg text-slate">Community Focus</h3>
                      <p className="text-slate-600">Culture, connection, and collaboration in a supportive environment</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-slate hover:bg-slate-800 text-white font-questa px-6 py-3 rounded-xl">
                    <Link href="/" className="flex items-center">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 font-questa px-6 py-3 rounded-xl">
                    <Link href="/admissions">Schedule Tour</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <ProgramCarousel
                  media={programMedia.spanishHorizons}
                  color="slate"
                />
              </div>
            </div>
          </div>

          {/* Casita Azul */}
          <div id="casita-azul" className={`mb-40 transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '150ms' }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <ProgramCarousel
                  media={programMedia.casitaAzul}
                  color="green"
                />
              </div>

              <div className="space-y-8 order-1 lg:order-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-green-200 text-green-800 text-sm">
                      Preschool & Daycare
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-questa text-slate">
                    Casita Azul
                  </h2>
                  <p className="text-lg text-slate-600">
                    Bilingual Minds, Boundless Hearts. Complete Spanish immersion preschool and daycare 
                    that nurtures confident, curious, and compassionate little humans.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-lg text-slate">Language Immersion</h3>
                      <p className="text-slate-600">Complete Spanish environment for natural language acquisition</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-lg text-slate">Heart-Centered Teaching</h3>
                      <p className="text-slate-600">Nurturing environment supporting emotional and social development</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-lg text-slate">Flexible Programs</h3>
                      <p className="text-slate-600">Preschool and daycare options to meet your family's needs</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-questa px-6 py-3 rounded-xl">
                    <Link href="/casita-azul" className="flex items-center">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 font-questa px-6 py-3 rounded-xl">
                    <Link href="https://www.casitaazulpdx.com/contact-us" target="_blank" rel="noopener noreferrer">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Cocinarte */}
          <div id="cocinarte" className={`mb-40 transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '300ms' }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <ChefHat className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-orange-200 text-orange-800 text-sm">
                      Cooking Classes
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-questa text-slate">
                    Cocinarte
                  </h2>
                  <p className="text-lg text-slate-600">
                    Cooking classes that celebrate Latin flavors, designed for kids and families. 
                    Hands-on learning experiences that make cooking fun and educational.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-lg text-slate">Latin Flavors</h3>
                      <p className="text-slate-600">Explore authentic Latin American cuisine and cooking techniques</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-lg text-slate">Family Fun</h3>
                      <p className="text-slate-600">Perfect for kids and families to cook together</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-lg text-slate">Hands-On Learning</h3>
                      <p className="text-slate-600">Interactive cooking experiences building confidence and skills</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-questa px-6 py-3 rounded-xl">
                    <Link href="/cocinarte" className="flex items-center">
                      View Classes
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50 font-questa px-6 py-3 rounded-xl">
                    <Link href="/cocinarte#calendar">Book Now</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <ProgramCarousel
                  media={programMedia.cocinarte}
                  color="orange"
                />
              </div>
            </div>
          </div>

          {/* Camp Alegría */}
          <div id="camp-alegria" className={`transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '450ms' }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <ProgramCarousel
                  media={programMedia.campAlegria}
                  color="amber"
                />
              </div>

              <div className="space-y-8 order-1 lg:order-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber rounded-full flex items-center justify-center">
                      <Sun className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-amber-200 text-amber-800 text-sm">
                      Summer Camp
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-questa text-slate">
                    Camp Alegría
                  </h2>
                  <p className="text-lg text-slate-600">
                    Immersive summer camp for ages 5-12 to experience Latin American culture 
                    through storytelling, hands-on activities, and unforgettable experiences.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-amber mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-lg text-slate">Cultural Immersion</h3>
                      <p className="text-slate-600">Explore Latin American culture through themed sessions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-amber mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-lg text-slate">Spanish Learning</h3>
                      <p className="text-slate-600">Full Spanish immersion with native speakers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-amber mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-lg text-slate">Fun Activities</h3>
                      <p className="text-slate-600">Soccer, cooking, crafts, and community celebrations</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-amber hover:bg-amber-600 text-white font-questa px-6 py-3 rounded-xl">
                    <Link href="/camp-alegria" className="flex items-center">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 font-questa px-6 py-3 rounded-xl">
                    <Link href="https://campalegria.campmanagement.com/p/request_for_info_m.php?action=enroll" target="_blank" rel="noopener noreferrer">Register Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-questa text-slate mb-4">
              Why Choose Our Spanish Immersion Programs?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive approach ensures your child receives the best bilingual education 
              from early childhood through elementary school.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-slate rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-questa font-bold mb-4 text-slate">Authentic Immersion</h3>
                <p className="text-slate-600 leading-relaxed">
                  Complete Spanish language environment with native speakers and cultural activities
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-questa font-bold mb-4 text-slate">Heart-Centered</h3>
                <p className="text-slate-600 leading-relaxed">
                  Nurturing environment that supports whole child development
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-amber-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-questa font-bold mb-4 text-slate">Community Focus</h3>
                <p className="text-slate-600 leading-relaxed">
                  Strong family-school partnerships and supportive learning community
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-questa font-bold mb-4 text-slate">Proven Methods</h3>
                <p className="text-slate-600 leading-relaxed">
                  Research-based approaches including Expeditionary Learning and play-based education
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-questa text-slate mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get in touch with us to learn more about our programs and find the perfect fit for your child.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-slate rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-questa font-bold mb-4 text-slate">Location</h3>
                <p className="text-slate-600">
                  <span className="font-semibold">Spanish Horizons Academy</span><br />
                  770 NE Rogahn Street<br />
                  Hillsboro, Oregon
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-slate rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-questa font-bold mb-4 text-slate">Phone</h3>
                <p className="text-slate-600">
                  <span className="font-semibold">(503) 916-9758</span>
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-slate rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-questa font-bold mb-4 text-slate">Email</h3>
                <p className="text-slate-600">
                  <span className="font-semibold">info@spanishhorizons.org</span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-slate hover:bg-slate-800 text-white font-questa px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="/admissions" className="flex items-center">
                  Schedule a Tour
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 font-questa px-8 py-4 text-lg rounded-xl transition-all duration-200">
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
