"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function CocinarteHero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-[200px] md:pb-32 bg-cocinarte-white overflow-hidden h-[800px]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cocinarte-orange rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cocinarte-red rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-32 h-32 bg-cocinarte-yellow rounded-full opacity-25 animate-bounce"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            {/* Enhanced title section with animation */}
            <div className="space-y-8 text-left">
              <div className="inline-block">
                <div className="flex items-center gap-6">
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-cocinarte-black animate-in fade-in duration-1000">
                    Cocinarte
                  </h1>
                  <div className="flex flex-col gap-3">
                    <Image
                      src="/cocinarte/floating_elements/COCINARTE_cupcakes.svg"
                      alt="Cupcakes"
                      width={100}
                      height={100}
                      className="opacity-70 animate-float-slow"
                    />
                    <Image
                      src="/cocinarte/floating_elements/COCINARTE_batidora.svg"
                      alt="Mixer"
                      width={90}
                      height={90}
                      className="opacity-70 animate-float-medium"
                    />
                  </div>
                </div>
                <div className="h-2 bg-cocinarte-orange rounded-full mt-4 animate-in slide-in-from-left duration-800 delay-300"></div>
              </div>
              
              <p className="text-2xl lg:text-3xl text-cocinarte-black leading-relaxed font-medium">
                Cooking classes that celebrate <span className="text-cocinarte-orange font-semibold">Latin flavors</span>, designed for <span className="text-cocinarte-red font-semibold">kids and families</span>.
              </p>
              
              <p className="text-xl text-cocinarte-black leading-relaxed">
                Pick your class, reserve your spot, and let's get cooking!
              </p>
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

          {/* Enhanced image section with floating elements */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/cocinarte/cocinarteLogo.png"
                alt="Cocinarte - Cooking Adventures for Kids & Families"
                width={600}
                height={600}
                className="w-full drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Floating decorative elements around the logo */}
            <div className="absolute top-10 -left-10 w-20 h-20 bg-cocinarte-orange rounded-full opacity-70 animate-bounce"></div>
            <div className="absolute bottom-20 -right-10 w-16 h-16 bg-cocinarte-red rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-1/2 -left-5 w-12 h-12 bg-cocinarte-yellow rounded-full opacity-50 animate-ping"></div>
            <div className="absolute bottom-10 right-5 w-14 h-14 bg-cocinarte-navy rounded-full opacity-65 animate-bounce"></div>
          </div>
        </div>
      </div>

    </section>
  )
}
