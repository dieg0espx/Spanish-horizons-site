import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, Globe, Star, BookOpen, Palette, Music, ChefHat } from "lucide-react"

interface ImageGalleryProps {
  title?: string
  subtitle?: string
  images?: Array<{
    title: string
    description: string
    icon: any
    category: string
  }>
}

export default function ImageGallery({
  title = "Experience Our Learning Environment",
  subtitle = "See our students engaged in authentic Spanish immersion and hands-on learning",
  images = [
    {
      title: "Classroom Learning",
      description: "Students engaged in Spanish immersion",
      icon: Users,
      category: "academics",
    },
    { title: "Cooking Activities", description: "Cultural cooking experiences", icon: ChefHat, category: "culture" },
    { title: "Art Projects", description: "Creative expression in Spanish", icon: Palette, category: "arts" },
    { title: "Music & Dance", description: "Latin American cultural activities", icon: Music, category: "culture" },
    { title: "Outdoor Learning", description: "Garden and nature exploration", icon: Globe, category: "outdoor" },
    { title: "Reading Circle", description: "Bilingual literature time", icon: BookOpen, category: "academics" },
    { title: "Science Projects", description: "Hands-on STEM learning", icon: Star, category: "academics" },
    { title: "Community Time", description: "Building friendships", icon: Heart, category: "community" },
  ],
}: ImageGalleryProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors duration-300">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                        <image.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{image.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{image.description}</p>
                      <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {image.category}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs text-gray-500 text-center">Photo from Dropbox Gallery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
