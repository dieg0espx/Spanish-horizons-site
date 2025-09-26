"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function CocinarteHero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-[200px] md:pb-32 overflow-hidden h-[800px]">
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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl relative">
          <div className="flex flex-col items-center justify-center text-center space-y-10">
            {/* Content before logo */}
            <div className="space-y-8">
              <div>
                <p className="text-xl text-cocinarte-black leading-relaxed">
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
                    className="drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              <div className="relative">
                <p className="text-2xl lg:text-3xl text-cocinarte-black leading-relaxed font-medium">
                  Cooking classes that celebrate <span className="text-cocinarte-orange font-semibold">Latin flavors</span>, designed for <span className="text-cocinarte-red font-semibold">kids and families</span>.
                </p>
                {/* Bottom floating elements around subtitle - moved further to sides */}
                <Image
                  src="/cocinarte/floating_elements/COCINARTE_para amasar .png"
                  alt="Rolling Pin"
                  width={70}
                  height={70}
                  className="absolute -bottom-2 -left-16 opacity-60 animate-float-slow"
                />
                <Image
                  src="/cocinarte/floating_elements/COCINARTE_sarten.png"
                  alt="Pan"
                  width={75}
                  height={75}
                  className="absolute -bottom-2 -right-16 opacity-65 animate-float-medium"
                />
              </div>
            </div>

            {/* Enhanced CTA buttons with better styling */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="bg-cocinarte-orange hover:bg-cocinarte-red text-cocinarte-white px-10 py-5 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-bold border-2 border-transparent hover:border-cocinarte-yellow">
                <Link href="#calendar" className="flex items-center">
                  <Calendar className="mr-3 w-6 h-6" />
                  Book a Class Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-cocinarte-navy text-cocinarte-navy hover:bg-cocinarte-navy hover:text-cocinarte-white hover:border-cocinarte-navy px-10 py-5 text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 font-semibold">
                <Link href="#faq">Sign Up to Learn More</Link>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
