"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Globe, 
  Users, 
  BookOpen,
  Sun,
  ArrowRight,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  GraduationCap,
  Home,
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
        src: 'https://res.cloudinary.com/dhuhpf3wq/video/upload/v1759936340/video2_xwke0b.mp4',
        alt: 'Music and dance activities',
        description: 'Students experience Latin American music and dance, building cultural connections through movement.',
        previewImage: '/landing/preview1.png'
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
        src: 'https://res.cloudinary.com/dhuhpf3wq/video/upload/v1759936324/clip_jumping_vgs3sf.mp4',
        alt: 'Outdoor camp activities',
        description: 'Active outdoor learning experiences that combine Spanish language with physical activities and fun.',
        previewImage: '/landing/preview2.png'
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

  // Removed program modal data/state

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
    <div className="min-h-screen bg-white overflow-x-hidden">
      <LandingNav />
      
      {/* Hero Section */}
      <section className="relative w-full mt-[60px] sm:mt-[70px] md:mt-[90px]">
        {/* Background image - full width, dynamic height */}
        <div className="relative w-full">
          {/* Mobile Image */}
          <Image
            src="/collage 1.1 format.png"
            alt="Spanish Horizons background"
            width={1080}
            height={1920}
            className="w-full h-auto block md:hidden"
            priority
          />
          {/* Desktop Image */}
          <Image
            src="/collage horizontal format.png"
            alt="Spanish Horizons background"
            width={1920}
            height={1080}
            className="w-full h-auto hidden md:block"
            priority
          />
          
          {/* Gradient Overlay - improved for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="text-center max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
              {/* Main heading */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-questa mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight animate-slide-up px-2 sm:px-4">
                <span className="text-[#00ADEE]">Casita Azul</span> <span className="text-white">Education</span>
              </h1>
              
              {/* Description */}
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed px-3 sm:px-4 md:px-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12 font-light tracking-wide shadow-text animate-slide-up-delay">
                From early childhood through elementary school and summer camps,
                we provide comprehensive Spanish immersion education for every stage of your child's journey.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-center px-3 sm:px-4 animate-slide-up-delay-2">
                <Button 
                  size="lg" 
                  className="bg-[#00ADEE] hover:bg-[#0090C8] text-white font-questa px-6 py-4 xs:px-8 xs:py-5 sm:px-10 sm:py-6 md:px-12 md:py-7 text-sm xs:text-base sm:text-lg md:text-xl rounded-xl shadow-2xl hover:shadow-[#00ADEE]/50 hover:scale-105 transition-all duration-300 w-1/2 sm:w-auto group"
                >
                  <Link href="#spanish-horizons" className="flex items-center justify-center whitespace-nowrap">
                    Get Started Today
                    <ArrowRight className="ml-2 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/60 backdrop-blur-sm text-black hover:bg-white hover:text-slate font-questa px-6 py-4 xs:px-8 xs:py-5 sm:px-10 sm:py-6 md:px-12 md:py-7 text-sm xs:text-base sm:text-lg md:text-xl rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-1/2 sm:w-auto"
                >
                  <Link href="#contact" className="flex items-center justify-center whitespace-nowrap">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-questa text-slate mb-4 px-4">
              Three Programs, One Mission
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-4">
              Our comprehensive Spanish immersion ecosystem serves children and families at every stage, 
              creating a seamless educational journey from early childhood through elementary school.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
            {/* Spanish Horizons Academy */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 cursor-pointer">
              <Link href="/" className="block">
                <CardContent className="p-3 sm:p-4 lg:p-6 text-center flex flex-col h-full">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden mx-auto mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/branding/logo.png"
                    alt="Spanish Horizons Academy"
                    width={112}
                    height={112}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-questa font-bold mb-2 sm:mb-3 text-slate leading-tight">Spanish Horizons Academy</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2 sm:mb-3 flex-grow">
                  K-5 Spanish immersion school with Expeditionary Learning approach
                </p>
                <div className="flex justify-center">
                  <Badge variant="secondary" className="bg-slate-200 text-slate-800 text-xs w-fit">
                    Ages 5-11
                  </Badge>
                </div>
                </CardContent>
              </Link>
            </Card>

            {/* Casita Azul */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 cursor-pointer">
              <Link href="/casita-azul" className="block">
                <CardContent className="p-3 sm:p-4 lg:p-6 text-center flex flex-col h-full">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden mx-auto mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/casita-azul.png"
                    alt="Casita Azul"
                    width={112}
                    height={112}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-questa font-bold mb-2 sm:mb-3 text-slate leading-tight">
                  Casita Azul
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2 sm:mb-3 flex-grow">
                  Bilingual preschool & daycare with heart-centered teaching
                </p>
                <div className="flex justify-center">
                  <Badge variant="secondary" className="bg-green-200 text-green-800 text-xs w-fit">
                    Ages 2-5
                  </Badge>
                </div>
                </CardContent>
              </Link>
            </Card>

            {/* Camp Alegría */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 cursor-pointer">
              <Link href="/camp-alegria" className="block">
                <CardContent className="p-3 sm:p-4 lg:p-6 text-center flex flex-col h-full">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden mx-auto mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/camp-alegria.png"
                    alt="Camp Alegría"
                    width={112}
                    height={112}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-questa font-bold mb-2 sm:mb-3 text-slate leading-tight">
                  Camp Alegría
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2 sm:mb-3 flex-grow">
                  Immersive summer camp exploring Latin American culture
                </p>
                <div className="flex justify-center">
                  <Badge variant="secondary" className="bg-amber-200 text-amber-800 text-xs w-fit">
                    Ages 5-12
                  </Badge>
                </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Program Sections */}
      <section ref={cardsRef} className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
          
          {/* Spanish Horizons Academy */}
          <div id="spanish-horizons" className={`mb-12 sm:mb-16 lg:mb-24 transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center w-full">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6 w-full max-w-full overflow-hidden">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                      <Image
                        src="/branding/logo.png"
                        alt="Spanish Horizons Academy"
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <Badge variant="secondary" className="bg-slate-200 text-slate-800 text-xs sm:text-sm w-fit">
                      K-5 Elementary School
                    </Badge>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-questa text-slate leading-tight text-center">
                    Spanish Horizons Academy
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed break-words">
                    Our flagship K-5 Spanish immersion school combines 80/20 Spanish-English instruction 
                    with Expeditionary Learning, creating bilingual leaders prepared for our interconnected world.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-slate mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-sm sm:text-base lg:text-lg text-slate">Spanish Immersion</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed break-words">80/20 model with authentic bilingual development</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-slate mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-sm sm:text-base lg:text-lg text-slate">Expeditionary Learning</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed break-words">Hands-on learning through cooking, art, gardening, and movement</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-slate mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-sm sm:text-base lg:text-lg text-slate">Community Focus</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed break-words">Culture, connection, and collaboration in a supportive environment</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button size="sm" className="bg-slate hover:bg-slate-800 text-white font-questa px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm w-full sm:w-auto">
                    <Link href="/" className="flex items-center justify-center">
                      Learn More
                      <ArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 font-questa px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm w-full sm:w-auto">
                    <Link href="/contact" className="flex items-center justify-center">Schedule Tour</Link>
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
          <div id="casita-azul" className={`mb-12 sm:mb-16 lg:mb-24 transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '150ms' }}>
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <ProgramCarousel
                  media={programMedia.casitaAzul}
                  color="green"
                />
              </div>

              <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-1 lg:order-2 w-full">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                      <Image
                        src="/casita-azul.png"
                        alt="Casita Azul"
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <Badge variant="secondary" className="bg-green-200 text-green-800 text-xs sm:text-sm w-fit">
                      Preschool & Daycare
                    </Badge>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-questa text-slate leading-tight text-center">
                    Casita Azul
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Bilingual Minds, Boundless Hearts. Complete Spanish immersion preschool and daycare 
                    that nurtures confident, curious, and compassionate little humans.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-sm sm:text-base lg:text-lg text-slate">Language Immersion</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">Complete Spanish environment for natural language acquisition</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-sm sm:text-base lg:text-lg text-slate">Heart-Centered Teaching</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">Nurturing environment supporting emotional and social development</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-sm sm:text-base lg:text-lg text-slate">Flexible Programs</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">Preschool and daycare options to meet your family's needs</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-questa px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm w-full sm:w-auto">
                    <Link href="/casita-azul" className="flex items-center justify-center">
                      Learn More
                      <ArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 font-questa px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm w-full sm:w-auto">
                    <Link href="https://www.casitaazulpdx.com/contact-us" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Camp Alegría */}
          <div id="camp-alegria" className={`transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '300ms' }}>
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <ProgramCarousel
                  media={programMedia.campAlegria}
                  color="amber"
                />
              </div>

              <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-1 lg:order-2 w-full">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                      <Image
                        src="/camp-alegria.png"
                        alt="Camp Alegría"
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <Badge variant="secondary" className="bg-amber-200 text-amber-800 text-xs sm:text-sm w-fit">
                      Summer Camp
                    </Badge>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-questa text-slate leading-tight text-center">
                    Camp Alegría
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Immersive summer camp for ages 5-12 to experience Latin American culture 
                    through storytelling, hands-on activities, and unforgettable experiences.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-sm sm:text-base lg:text-lg text-slate">Cultural Immersion</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">Explore Latin American culture through themed sessions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-sm sm:text-base lg:text-lg text-slate">Spanish Learning</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">Full Spanish immersion with native speakers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-questa font-semibold text-sm sm:text-base lg:text-lg text-slate">Fun Activities</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">Soccer, cooking, crafts, and community celebrations</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button size="sm" className="bg-amber hover:bg-amber-600 text-white font-questa px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm w-full sm:w-auto">
                    <Link href="/camp-alegria" className="flex items-center justify-center">
                      Learn More
                      <ArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 font-questa px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm w-full sm:w-auto">
                    <Link href="https://campalegria.campmanagement.com/p/request_for_info_m.php?action=enroll" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">Register Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Programs */}
      <section 
        className="py-12 md:py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url('/pictures/classroom2.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-questa text-yellow-400 mb-4 px-4">
              Why Choose Our Spanish Immersion Programs?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto px-4">
              Our comprehensive approach ensures your child receives the best bilingual education 
              from early childhood through elementary school.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-questa font-bold mb-3 sm:mb-4 text-slate">Authentic Immersion</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Complete Spanish language environment with native speakers and cultural activities
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-questa font-bold mb-3 sm:mb-4 text-slate">Heart-Centered</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Nurturing environment that supports whole child development
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-amber-100">
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-questa font-bold mb-3 sm:mb-4 text-slate">Community Focus</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Strong family-school partnerships and supportive learning community
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-questa font-bold mb-3 sm:mb-4 text-slate">Proven Methods</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Research-based approaches including Expeditionary Learning and play-based education
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact" className="py-12 md:py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-questa text-slate mb-4 px-4">
              Ready to Start Your <span className="block sm:inline">Journey?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-4">
              Get in touch with us to learn more about our programs and find the perfect fit for your child.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 md:mb-16">
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 cursor-pointer">
              <Link href="https://maps.app.goo.gl/fqpVt8rUhnFzenYg9" target="_blank" rel="noopener noreferrer">
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-questa font-bold mb-3 sm:mb-4 text-slate">Location</h3>
                  <p className="text-sm sm:text-base text-slate-600">
                    <span className="font-semibold">Spanish Horizons Academy</span><br />
                    770 NE Rogahn Street<br />
                    Hillsboro, Oregon
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 cursor-pointer">
              <Link href="tel:+15039169758">
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-questa font-bold mb-3 sm:mb-4 text-slate">Phone</h3>
                  <p className="text-sm sm:text-base text-slate-600">
                    <span className="font-semibold">(503) 916-9758</span>
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 cursor-pointer">
              <Link href="mailto:info@spanishhorizons.org">
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-questa font-bold mb-3 sm:mb-4 text-slate">Email</h3>
                  <p className="text-sm sm:text-base text-slate-600">
                    <span className="font-semibold">info@spanishhorizons.org</span>
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>

        </div>
      </section>

      <LandingFooter />

      {/* Removed program modals */}
    </div>
  )
}
