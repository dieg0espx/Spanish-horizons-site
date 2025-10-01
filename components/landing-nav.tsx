"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Menu, 
  X,
  Phone,
  Mail,
  MapPin,
  BookOpen,
  Calendar
} from "lucide-react"
import Image from "next/image"

export default function LandingNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const programs = [
    {
      name: "Spanish Horizons Academy",
      href: "#spanish-horizons",
      logo: "/branding/logo.png",
      description: "K-5 Spanish Immersion",
      badge: "Ages 5-11"
    },
    {
      name: "Casita Azul",
      href: "#casita-azul",
      logo: "/casita-azul.png",
      description: "Preschool & Daycare",
      badge: "Ages 2-5"
    },
    {
      name: "Cocinarte",
      href: "#cocinarte",
      logo: "/cocinarte/cocinarteLogo.png",
      description: "Cooking Classes",
      badge: "All Ages"
    },
    {
      name: "Camp Alegría",
      href: "#camp-alegria",
      logo: "/camp-alegria.png",
      description: "Summer Camp",
      badge: "Ages 5-12"
    }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {programs.map((program) => {
                return (
                  <Link
                    key={program.name}
                    href={program.href}
                    className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-200">
                      <Image
                        src={program.logo}
                        alt={program.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                        {program.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {program.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              <Link href="/programs" className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Learn More
              </Link>
            </Button>
            <Button size="sm" className="bg-slate hover:bg-slate-800 text-white">
              <Link href="/admissions" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Apply Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-6 space-y-6">
              {/* Programs Grid */}
              <div className="grid grid-cols-2 gap-4">
                {programs.map((program) => {
                  return (
                    <Link
                      key={program.name}
                      href={program.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 rounded-lg overflow-hidden">
                          <Image
                            src={program.logo}
                            alt={program.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-800 text-xs">
                          {program.badge}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-slate-700 text-sm mb-1">
                        {program.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {program.description}
                      </p>
                    </Link>
                  )
                })}
              </div>

              {/* Contact Info */}
              <div className="border-t border-slate-200 pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>770 NE Rogahn Street, Hillsboro, OR</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>(503) 916-9758</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>info@spanishhorizons.org</span>
                  </div>
                </div>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 pt-6 border-t border-slate-200">
                <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50">
                  <Link href="/programs" className="flex items-center justify-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learn More
                  </Link>
                </Button>
                <Button className="w-full bg-slate hover:bg-slate-800 text-white">
                  <Link href="/admissions" className="flex items-center justify-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Apply Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
