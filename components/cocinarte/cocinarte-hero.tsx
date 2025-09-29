"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function CocinarteHero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-[200px] lg:pb-32 overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/cocinarte_bg.png"
          alt="Cocinarte background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/60"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl relative">
          <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 lg:space-y-10">
            {/* Content before logo */}
            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              <div>
                <p className="text-lg sm:text-xl text-cocinarte-black leading-relaxed">
                  Pick your class, reserve your spot, and let's get cooking!
                </p>
              </div>
              
              {/* Logo section */}
              <div className="inline-block">
                <div className="flex items-center justify-center">
                  <Image
                    src="/cocinarte/cocinarteLogo.png"
                    alt="Cocinarte - Cooking Adventures for Kids & Families"
                    width={400}
                    height={400}
                    className="w-64 sm:w-80 md:w-96 lg:w-[400px] h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              <div className="relative">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-cocinarte-black leading-relaxed font-medium px-2">
                  Cooking classes that celebrate <span className="text-cocinarte-orange font-semibold">Latin flavors</span>, designed for <span className="text-cocinarte-red font-semibold">kids and families</span>.
                </p>
                {/* Bottom floating elements around subtitle - hidden on mobile */}
                <Image
                  src="/cocinarte/floating_elements/COCINARTE_para amasar .png"
                  alt="Rolling Pin"
                  width={70}
                  height={70}
                  className="hidden md:block absolute -bottom-2 -left-16 opacity-60 animate-float-slow"
                />
                <Image
                  src="/cocinarte/floating_elements/COCINARTE_sarten.png"
                  alt="Pan"
                  width={75}
                  height={75}
                  className="hidden md:block absolute -bottom-2 -right-16 opacity-65 animate-float-medium"
                />
              </div>
            </div>

            {/* Enhanced CTA buttons with better styling */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md sm:max-w-none justify-center">
              <Button size="lg" className="bg-cocinarte-orange hover:bg-cocinarte-red text-cocinarte-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 text-lg sm:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-bold border-2 border-transparent hover:border-cocinarte-yellow w-full sm:w-auto">
                <Link href="#calendar" className="flex items-center justify-center">
                  <Calendar className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                  Book a Class Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-cocinarte-navy text-cocinarte-navy hover:bg-cocinarte-navy hover:text-cocinarte-white hover:border-cocinarte-navy px-6 sm:px-8 lg:px-10 py-4 sm:py-5 text-lg sm:text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 font-semibold w-full sm:w-auto">
                <Link href="#faq">Sign Up to Learn More</Link>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
