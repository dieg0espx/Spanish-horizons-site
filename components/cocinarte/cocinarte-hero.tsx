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
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full">
        <div className="bg-gradient-to-b from-transparent to-white px-8 lg:px-12 pt-8 lg:pt-12 pb-4 shadow-2xl relative h-[500px]">
          <div className="flex flex-col items-center justify-end text-center space-y-6 h-full">
            {/* Content before logo */}
            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              <div>
                <p className="text-lg sm:text-xl text-cocinarte-black leading-relaxed">
                  Pick your class, reserve your spot, and let's get cooking!
                </p>
              </div>
              
              <div className="relative">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-cocinarte-black leading-relaxed font-medium px-2">
                  Cooking classes that celebrate <span className="text-cocinarte-orange font-semibold">Latin flavors</span>, designed for <span className="text-cocinarte-red font-semibold">kids and families</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
