import { Button } from "@/components/ui/button"
import { ChevronRight, Users, Globe, Heart } from "lucide-react"
import Link from "next/link"

interface HeroWithImagesProps {
  badge?: string
  title: string
  subtitle?: string
  description: string
  primaryButton: { text: string; href: string }
  secondaryButton?: { text: string; href: string }
  heroImage?: {
    title: string
    description: string
  }
}

export default function HeroWithImages({
  badge = "K-5 Spanish Immersion Excellence",
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  heroImage = {
    title: "Students in Learning Environment",
    description: "Classroom and outdoor activities",
  },
}: HeroWithImagesProps) {
  return (
    <section className="bg-blue-50 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/10"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
              <Globe className="h-4 w-4 mr-2" />
              {badge}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
              {subtitle && <span className="text-blue-600 block">{subtitle}</span>}
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">{description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link href={primaryButton.href} className="flex items-center">
                  {primaryButton.text}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {secondaryButton && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold bg-transparent"
                >
                  <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <div className="col-span-2 aspect-video bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="h-12 w-12 text-blue-600" />
                    </div>
                    <p className="text-gray-600 font-semibold text-lg">{heroImage.title}</p>
                    <p className="text-sm text-gray-500 mt-2">{heroImage.description}</p>
                    <p className="text-xs text-gray-400 mt-1">From Dropbox Gallery</p>
                  </div>
                </div>
              </div>

              {/* Two smaller images */}
              <div className="aspect-square bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Cultural Activities</p>
                    <p className="text-xs text-gray-400 mt-1">From Dropbox</p>
                  </div>
                </div>
              </div>

              <div className="aspect-square bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Globe className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Outdoor Learning</p>
                    <p className="text-xs text-gray-400 mt-1">From Dropbox</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-400 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
