import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react"
import { FiFileText, FiDollarSign, FiCalendar, FiBookOpen, FiHome, FiPhone, FiCamera } from "react-icons/fi"

export default function Footer() {
  return (
    <footer className="relative bg-gray-50 text-slate overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate rounded-full mb-6">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-ivry font-bold mb-4 text-slate">Spanish Horizons Academy</h2>
          <p className="text-slate-medium text-lg max-w-2xl mx-auto font-questa">
            Where culture meets curiosity through immersive Spanish language learning and hands-on exploration
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Information */}
          <div className="group">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-slate mr-4"></div>
              <h3 className="text-2xl font-ivry font-bold text-slate">Get in Touch</h3>
            </div>
            <div className="space-y-6">
              <div className="group/item flex items-start p-4 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-slate rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-questa font-semibold text-slate mb-1">Visit Us</p>
                  <p className="text-slate-medium text-sm font-questa">770 NE Rogahn Street, Hillsboro, OR 97124</p>
                </div>
              </div>
              
              <div className="group/item flex items-start p-4 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-golden rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <Phone className="h-6 w-6 text-slate" />
                </div>
                <div>
                  <p className="font-questa font-semibold text-slate mb-1">Call Us</p>
                  <p className="text-slate-medium text-sm font-questa">(503) 916-9758</p>
                </div>
              </div>
              
              <div className="group/item flex items-start p-4 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-amber rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-questa font-semibold text-slate mb-1">Email Us</p>
                  <p className="text-slate-medium text-sm font-questa">infospanishhorizons@casitaazulpdx.org</p>
                </div>
              </div>
              
              <div className="group/item flex items-start p-4 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-slate-medium rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-questa font-semibold text-slate mb-1">Office Hours</p>
                  <p className="text-slate-medium text-sm font-questa">8:00 AM – 4:00 PM (Mon-Fri)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="group">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-golden mr-4"></div>
              <h3 className="text-2xl font-ivry font-bold text-slate">Quick Links</h3>
            </div>
            <div className="space-y-3">
              {[
                { href: "/admissions", text: "Admissions Process", icon: <FiFileText className="h-5 w-5" /> },
                { href: "/tuition", text: "Tuition & Enrollment", icon: <FiDollarSign className="h-5 w-5" /> },
                { href: "/calendar", text: "2025-2026 Calendar", icon: <FiCalendar className="h-5 w-5" /> },
                { href: "/programs", text: "Academic Programs", icon: <FiBookOpen className="h-5 w-5" /> },
                { href: "/about", text: "About Our School", icon: <FiHome className="h-5 w-5" /> },
                { href: "/contact", text: "Contact Us", icon: <FiPhone className="h-5 w-5" /> }
              ].map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group/item flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300 hover:translate-x-2 shadow-sm border border-gray-200"
                >
                  <span className="mr-3 group-hover/item:scale-110 transition-transform duration-300 text-slate-medium">{link.icon}</span>
                  <span className="text-slate-medium group-hover/item:text-slate transition-colors duration-300 font-questa">{link.text}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Info */}
          <div className="group">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-amber mr-4"></div>
              <h3 className="text-2xl font-ivry font-bold text-slate">Connect With Us</h3>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <h4 className="font-questa font-semibold text-slate mb-3">Follow Our Journey</h4>
                <a
                  href="https://instagram.com/spanishhorizonsacademy"
                  className="inline-flex items-center p-3 bg-amber rounded-lg hover:bg-amber-dark transition-all duration-300 group-hover:scale-105"
                >
                  <FiCamera className="h-5 w-5 mr-3" />
                  <span className="font-questa font-medium text-white">@spanishhorizonsacademy</span>
                </a>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <h4 className="font-questa font-semibold text-slate mb-3">Part of Casita Azul</h4>
                <p className="text-slate-medium text-sm mb-4 font-questa">We're proud to be part of the Casita Azul family of schools, bringing authentic Spanish immersion education to our community.</p>
                <div className="flex items-center text-slate">
                  <span className="text-sm font-questa font-medium">Learn More</span>
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
                <div className="w-3 h-3 bg-slate rounded-full"></div>
                <span className="text-sm text-slate-medium font-questa">Spanish Immersion</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-golden rounded-full"></div>
                <span className="text-sm text-slate-medium font-questa">K-5 Education</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber rounded-full"></div>
                <span className="text-sm text-slate-medium font-questa">Hillsboro, OR</span>
              </div>
            </div>
            <p className="text-slate-medium text-sm font-questa">
              © {new Date().getFullYear()} Spanish Horizons Academy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 