import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-gray-50 text-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <span className="text-2xl">🌍</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Spanish Horizons Academy</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Where culture meets curiosity through immersive Spanish language learning and hands-on exploration
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Information */}
          <div className="group">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-blue-600 mr-4"></div>
              <h3 className="text-2xl font-bold text-gray-900">Get in Touch</h3>
            </div>
            <div className="space-y-6">
              <div className="group/item flex items-start p-4 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Visit Us</p>
                  <p className="text-gray-600 text-sm">770 NE Rogahn Street, Hillsboro, OR 97124</p>
                </div>
              </div>
              
              <div className="group/item flex items-start p-4 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Call Us</p>
                  <p className="text-gray-600 text-sm">(503) 916-9758</p>
                </div>
              </div>
              
              <div className="group/item flex items-start p-4 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Email Us</p>
                  <p className="text-gray-600 text-sm">infospanishhorizons@casitaazulpdx.org</p>
                </div>
              </div>
              
              <div className="group/item flex items-start p-4 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Office Hours</p>
                  <p className="text-gray-600 text-sm">8:00 AM – 4:00 PM (Mon-Fri)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="group">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-green-600 mr-4"></div>
              <h3 className="text-2xl font-bold text-gray-900">Quick Links</h3>
            </div>
            <div className="space-y-3">
              {[
                { href: "/admissions", text: "Admissions Process", icon: "📝" },
                { href: "/tuition", text: "Tuition & Enrollment", icon: "💰" },
                { href: "/calendar", text: "2025-2026 Calendar", icon: "📅" },
                { href: "/programs", text: "Academic Programs", icon: "🎓" },
                { href: "/about", text: "About Our School", icon: "🏫" },
                { href: "/contact", text: "Contact Us", icon: "📞" }
              ].map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group/item flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300 hover:translate-x-2 shadow-sm border border-gray-200"
                >
                  <span className="text-lg mr-3 group-hover/item:scale-110 transition-transform duration-300">{link.icon}</span>
                  <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors duration-300">{link.text}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Info */}
          <div className="group">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-purple-600 mr-4"></div>
              <h3 className="text-2xl font-bold text-gray-900">Connect With Us</h3>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Follow Our Journey</h4>
                <a
                  href="https://instagram.com/spanishhorizonsacademy"
                  className="inline-flex items-center p-3 bg-pink-600 rounded-lg hover:bg-pink-700 transition-all duration-300 group-hover:scale-105"
                >
                  <span className="text-xl mr-3">📸</span>
                  <span className="font-medium text-white">@spanishhorizonsacademy</span>
                </a>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Part of Casita Azul</h4>
                <p className="text-gray-600 text-sm mb-4">We're proud to be part of the Casita Azul family of schools, bringing authentic Spanish immersion education to our community.</p>
                <div className="flex items-center text-blue-600">
                  <span className="text-sm font-medium">Learn More</span>
                  <span className="ml-2 text-lg">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Spanish Immersion</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-sm text-gray-600">K-5 Education</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Hillsboro, OR</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Spanish Horizons Academy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 