import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface ImageGalleryProps {
  title?: string
  subtitle?: string
  images?: Array<{
    title: string
    description: string
    category: string
    imageSrc: string
  }>
}

export default function ImageGallery({
  title = "Experience Our Learning Environment",
  subtitle = "See our students engaged in authentic Spanish immersion and hands-on learning",
  images = [
    {
      title: "Classroom Learning",
      description: "Students engaged in Spanish immersion",
      category: "academics",
      imageSrc: "/pictures/5-DSC02576.jpg",
    },
    { 
      title: "Cooking Activities", 
      description: "Cultural cooking experiences", 
      category: "culture",
      imageSrc: "/pictures/18-DSC02649.jpg",
    },
    { 
      title: "Art Projects", 
      description: "Creative expression in Spanish", 
      category: "arts",
      imageSrc: "/pictures/33-DSC02875.jpg",
    },
    { 
      title: "Music & Dance", 
      description: "Latin American cultural activities", 
      category: "culture",
      imageSrc: "/pictures/11-DSC02612.jpg",
    },
    { 
      title: "Outdoor Learning", 
      description: "Garden and nature exploration", 
      category: "outdoor",
      imageSrc: "/pictures/26-DSC02753.jpg",
    },
    { 
      title: "Reading Circle", 
      description: "Bilingual literature time", 
      category: "academics",
      imageSrc: "/pictures/14-DSC02635.jpg",
    },
    { 
      title: "Science Projects", 
      description: "Hands-on STEM learning", 
      category: "academics",
      imageSrc: "/pictures/30-DSC02799.jpg",
    },
    { 
      title: "Community Time", 
      description: "Building friendships", 
      category: "community",
      imageSrc: "/pictures/8-DSC02584.jpg",
    },
  ],
}: ImageGalleryProps) {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl font-ivry font-bold text-slate mb-4">{title}</h2>
          <p className="text-xl text-slate-medium font-questa">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden cursor-pointer"
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src={image.imageSrc}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                    <div className="flex justify-between items-start mb-0">
                      <h3 className="font-ivry font-bold text-white text-lg drop-shadow-lg">{image.title}</h3>
                    </div>
                    <p className="text-sm text-white/90 font-questa drop-shadow-md mb-3 leading-relaxed">{image.description}</p>
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
