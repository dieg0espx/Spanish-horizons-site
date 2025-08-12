"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Star, MapPin, Phone, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function ModernHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMenuAnimating, setIsMenuAnimating] = useState(false)
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMenuAnimating(false)
        setTimeout(() => setIsMenuOpen(false), 300)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

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
      <div className="hidden sm:block bg-slate text-white py-2 text-sm">
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
                <Star className="h-4 w-4 mr-1 text-golden" />
                <span className="text-xs hidden sm:inline">K-5 Spanish Immersion Excellence</span>
                <span className="text-xs sm:hidden">K-5 Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center h-24">
            {/* Logo Section */}
            <div className="flex items-center -ml-5 sm:ml-0 flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <Image 
                  src="/branding/logo.png" 
                  alt="Spanish Horizons Logo" 
                  width={200} 
                  height={64} 
                  className="object-contain h-16 sm:h-20 max-w-[150px] sm:max-w-[200px]" 
                />
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <div className="relative">
                      <button
                        className={`flex items-center px-6 py-3 rounded-xl text-base font-questa font-semibold transition-all duration-200 ${
                          isActivePage(item.href, item.submenu)
                            ? "bg-slate-light text-white shadow-md"
                            : "text-slate hover:bg-slate-light hover:text-white"
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
                              className={`block px-4 py-3 text-sm font-questa transition-colors duration-200 ${
                                pathname === subItem.href || pathname.startsWith(subItem.href.split("#")[0])
                                  ? "bg-slate-light text-white font-semibold"
                                  : "text-slate hover:bg-slate-light hover:text-white"
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
                      className={`px-6 py-3 rounded-xl text-base font-questa font-semibold transition-all duration-200 ${
                        pathname === item.href
                          ? "bg-slate-light text-white shadow-md"
                          : "text-slate hover:bg-slate-light hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
              <Button
                size="lg"
                className="bg-amber hover:bg-golden hover:text-slate text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-questa px-6 py-3 text-base"
              >
                <Link href="/admissions">Schedule Tour</Link>
              </Button>
              <Button
                size="lg"
                className="bg-amber hover:bg-golden hover:text-slate text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-questa px-6 py-3 text-base"
              >
                <Link href="/contact">Apply Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden mobile-menu-button p-2 rounded-xl bg-slate-light text-white hover:bg-slate-medium hover:text-white transition-colors duration-200"
              onClick={() => {
                if (!isMenuOpen) {
                  setIsMenuAnimating(true)
                  setIsMenuOpen(true)
                } else {
                  setIsMenuAnimating(false)
                  setTimeout(() => setIsMenuOpen(false), 300)
                }
              }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

                 {/* Mobile Menu */}
         {isMenuOpen && (
           <div className="lg:hidden mobile-menu fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
             <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
               isMenuAnimating ? 'translate-x-0' : 'translate-x-full'
             }`}>
                                              {/* Mobile Menu Header */}
                 <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-amber/5 to-golden/5">
                   <div className="flex items-center flex-1">
                     <Image 
                       src="/branding/logo.png" 
                       alt="Spanish Horizons Logo" 
                       width={120} 
                       height={40} 
                       className="object-contain h-12 mx-auto" 
                     />
                   </div>
                  <button
                    onClick={() => {
                      setIsMenuAnimating(false)
                      setTimeout(() => setIsMenuOpen(false), 300)
                    }}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                                               {/* Mobile Menu Content */}
                <div className="flex flex-col min-h-0">
                  <nav className="flex-1 px-4 py-4 space-y-2">
                                           {navigation.map((item, index) => (
                        <div key={item.name}>
                         {item.submenu ? (
                           <div>
                             <button
                                                                                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                                 isActivePage(item.href, item.submenu)
                                   ? "bg-amber text-white shadow-lg"
                                   : "text-gray-700 hover:bg-amber/10 hover:text-amber"
                               }`}
                               onClick={(e) => handleDropdownToggle(item.name, e)}
                             >
                                                          <span className="flex items-center">
                                {item.name}
                              </span>
                             <ChevronDown
                               className={`h-4 w-4 transition-all duration-300 ${
                                 activeDropdown === item.name ? "rotate-180" : ""
                               }`}
                             />
                           </button>
                           {activeDropdown === item.name && (
                                                           <div className="ml-6 mt-4 space-y-3 bg-gray-50 rounded-lg p-4">
                               {item.submenu.map((subItem, subIndex) => (
                                 <Link
                                   key={subItem.name}
                                   href={subItem.href}
                                                                                                         className={`block px-4 py-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                                     pathname === subItem.href || pathname.startsWith(subItem.href.split("#")[0])
                                       ? "bg-amber text-white shadow-md"
                                       : "text-gray-600 hover:bg-amber hover:text-white"
                                   }`}
                                                                 onClick={() => {
                                 setIsMenuAnimating(false)
                                 setTimeout(() => {
                                   setIsMenuOpen(false)
                                   setActiveDropdown(null)
                                 }, 300)
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
                                                                                 className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                             pathname === item.href
                               ? "bg-amber text-white shadow-lg"
                               : "text-gray-700 hover:bg-amber/10 hover:text-amber"
                           }`}
                           onClick={() => {
                             setIsMenuAnimating(false)
                             setTimeout(() => setIsMenuOpen(false), 300)
                           }}
                         >
                                                      {item.name}
                         </Link>
                       )}
                     </div>
                   ))}
                 </nav>

                                   {/* Action Buttons - Moved up for better accessibility */}
                  <div className="px-4 py-4 pb-6 border-t border-gray-100">
                    <div className="space-y-3">
                     <Button
                       size="lg"
                       className="w-full bg-amber hover:bg-golden hover:text-slate text-white rounded-xl font-medium py-3 text-base shadow-lg transition-all duration-200"
                     >
                       <Link href="/admissions" onClick={() => {
                         setIsMenuAnimating(false)
                         setTimeout(() => setIsMenuOpen(false), 300)
                       }}>
                         Schedule Tour
                       </Link>
                     </Button>
                     <Button
                       size="lg"
                       className="w-full bg-slate hover:bg-slate-medium text-white rounded-xl font-medium py-3 text-base shadow-lg transition-all duration-200"
                       onClick={() => {
                         setIsMenuAnimating(false)
                         setTimeout(() => setIsMenuOpen(false), 300)
                       }}
                     >
                       <Link href="/contact">Apply Now</Link>
                     </Button>
                   </div>
                 </div>

                 
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
