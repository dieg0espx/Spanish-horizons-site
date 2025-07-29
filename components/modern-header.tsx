"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Menu, X, Star, MapPin, Phone, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ModernHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const headerRef = useRef<HTMLDivElement>(null)

  const navigation = [
    { name: "Home", href: "/" },
    {
      name: "About",
      href: "/about"
    },
    {
      name: "Programs",
      href: "/programs",
    },
    {
      name: "Enrollment",
      href: "/admissions",
      submenu: [
        { name: "Admissions Process", href: "/admissions" },
        { name: "Tuition & Fees", href: "/tuition" },
      ],
    },
    { name: "Calendar", href: "/calendar" },
    { name: "Contact", href: "/contact" },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isActivePage = (href: string, submenu?: any[]) => {
    if (pathname === href) return true
    if (submenu) {
      return submenu.some((item) => pathname === item.href || pathname.startsWith(item.href.split("#")[0]))
    }
    return false
  }

  const handleDropdownToggle = (itemName: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  return (
    <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 text-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">770 NE Rogahn Street, Hillsboro, OR 97124</span>
                <span className="sm:hidden">Hillsboro, OR</span>
              </div>
              <div className="hidden md:flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>(503) 916-9758</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                <span className="text-xs hidden sm:inline">K-5 Spanish Immersion Excellence</span>
                <span className="text-xs sm:hidden">K-5 Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-xl  sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-4 group">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="h-3 w-3 text-blue-900" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-2xl font-bold text-blue-900 leading-tight">Spanish Horizons</div>
                  <div className="text-sm font-semibold text-blue-600 -mt-1">Academy</div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <div className="relative">
                      <button
                        className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          isActivePage(item.href, item.submenu)
                            ? "bg-blue-100 text-blue-700 shadow-md"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                        onClick={(e) => handleDropdownToggle(item.name, e)}
                      >
                        {item.name}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                                pathname === subItem.href || pathname.startsWith(subItem.href.split("#")[0])
                                  ? "bg-blue-50 text-blue-700 font-semibold"
                                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                              }`}
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        pathname === item.href
                          ? "bg-blue-100 text-blue-700 shadow-md"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl bg-transparent"
              >
                <Link href="/admissions">Schedule Tour</Link>
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link href="/contact">Apply Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
                          isActivePage(item.href, item.submenu)
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                        onClick={(e) => handleDropdownToggle(item.name, e)}
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                                pathname === subItem.href || pathname.startsWith(subItem.href.split("#")[0])
                                  ? "bg-blue-50 text-blue-700 font-medium"
                                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                              }`}
                              onClick={() => {
                                setIsMenuOpen(false)
                                setActiveDropdown(null)
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
                        pathname === item.href
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl bg-transparent"
                >
                  <Link href="/admissions" onClick={() => setIsMenuOpen(false)}>
                    Schedule Tour
                  </Link>
                </Button>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/contact">Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
