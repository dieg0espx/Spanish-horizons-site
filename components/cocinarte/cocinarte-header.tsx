"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Instagram } from "lucide-react"
import { useState, useEffect } from "react"

export default function CocinarteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering interactive elements until mounted
  if (!isMounted) {
    return (
      <header className="bg-cocinarte-navy shadow-xl w-full fixed top-0 left-0 right-0 z-50 border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/cocinarte" className="flex items-center group">
                <Image 
                  src="/cocinarte/cocinarteLogo.png" 
                  alt="Cocinarte Logo" 
                  width={200} 
                  height={64} 
                  className="object-contain h-14 sm:h-16 lg:h-20 max-w-[120px] sm:max-w-[150px] lg:max-w-[200px]" 
                />
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              <Link
                href="#calendar"
                className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              >
                Calendar
              </Link>
              <Link
                href="#about"
                className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              >
                About
              </Link>
              <Link
                href="#classes"
                className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              >
                Classes
              </Link>
              <Link
                href="#birthday-parties"
                className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              >
                Birthday Parties
              </Link>
              <Link
                href="#private-events"
                className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              >
                Private Events
              </Link>
              <Link
                href="#faq"
                className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              >
                FAQ
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              <Link href="https://instagram.com/cocinarte" target="_blank" rel="noopener noreferrer" className="flex items-center p-3">
                <Instagram className="h-6 w-6 text-cocinarte-white" />
              </Link>
              <Button
                size="lg"
                className="bg-cocinarte-red hover:bg-cocinarte-orange text-cocinarte-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-base"
              >
                <Link href="#calendar">Book Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button - Static for SSR */}
            <button
              className="lg:hidden p-2 rounded-xl bg-cocinarte-orange text-cocinarte-black hover:bg-cocinarte-yellow transition-colors duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu - Hidden on SSR */}
          <div className="lg:hidden hidden">
            <nav className="px-4 py-4 space-y-2">
              <Link
                href="#calendar"
                className="flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              >
                Calendar
              </Link>
              <Link
                href="#about"
                className="flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              >
                About
              </Link>
              <Link
                href="#classes"
                className="flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              >
                Classes
              </Link>
              <Link
                href="#birthday-parties"
                className="flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              >
                Birthday Parties
              </Link>
              <Link
                href="#private-events"
                className="flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              >
                Private Events
              </Link>
              <Link
                href="#faq"
                className="flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              >
                FAQ
              </Link>
              <Button className="w-full bg-cocinarte-yellow hover:bg-cocinarte-orange text-cocinarte-black font-medium py-3 text-sm rounded-xl shadow-lg transition-all duration-200">
                <Link href="https://instagram.com/cocinarte" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  <span className="mr-2">📸</span>
                  Instagram
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-cocinarte-navy shadow-xl w-full fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/cocinarte" className="flex items-center group">
              <Image 
                src="/cocinarte/cocinarteLogo.png" 
                alt="Cocinarte Logo" 
                width={200} 
                height={64} 
                className="object-contain h-14 sm:h-16 lg:h-20 max-w-[120px] sm:max-w-[150px] lg:max-w-[200px]" 
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            <Link
              href="#calendar"
              className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
            >
              Calendar
            </Link>
            <Link
              href="#about"
              className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
            >
              About
            </Link>
            <Link
              href="#classes"
              className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
            >
              Classes
            </Link>
            <Link
              href="#birthday-parties"
              className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
            >
              Birthday Parties
            </Link>
            <Link
              href="#private-events"
              className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
            >
              Private Events
            </Link>
            <Link
              href="#faq"
              className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
            >
              FAQ
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              <Link href="https://instagram.com/cocinarte" target="_blank" rel="noopener noreferrer" className="flex items-center p-3">
                <Instagram className="h-6 w-6 text-cocinarte-white" />
              </Link>
            <Button
              size="lg"
              className="bg-cocinarte-red hover:bg-cocinarte-orange text-cocinarte-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-base"
            >
              <Link href="#calendar">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl bg-cocinarte-orange text-cocinarte-black hover:bg-cocinarte-yellow transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-cocinarte-navy shadow-2xl border-t border-cocinarte-blue`}>
          <nav className="px-4 py-4 space-y-2">
            <Link
              href="#calendar"
              className="flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Calendar
            </Link>
            <Link
              href="#about"
              className="flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#classes"
              className="flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Classes
            </Link>
            <Link
              href="#birthday-parties"
              className="flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Birthday Parties
            </Link>
            <Link
              href="#private-events"
              className="flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Private Events
            </Link>
            <Link
              href="#faq"
              className="flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-cocinarte-white hover:bg-cocinarte-orange hover:text-cocinarte-black"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Button className="w-full bg-cocinarte-yellow hover:bg-cocinarte-orange text-cocinarte-black font-medium py-3 text-sm rounded-xl shadow-lg transition-all duration-200">
              <Link href="https://instagram.com/cocinarte" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <span className="mr-2">📸</span>
                Instagram
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
