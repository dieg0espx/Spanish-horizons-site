"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import dynamic from "next/dynamic"

const Slider = dynamic(() => import("react-slick"), { 
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-64">Loading...</div>
})

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
      title: "Community Time", 
      description: "Building friendships", 
      category: "community",
      imageSrc: "/pictures/8-DSC02584.jpg",
    },
  ],
}: ImageGalleryProps) {

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl font-ivry font-bold text-slate mb-6">{title}</h2>
          <p className="text-2xl text-slate-medium font-questa max-w-4xl mx-auto">{subtitle}</p>
        </div>

        <div className="px-2">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="px-4">
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-xl bg-white overflow-hidden cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <div className="absolute inset-0">
                        <Image
                          src={image.imageSrc}
                          alt={image.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 via-black/50 to-transparent p-12">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-ivry font-bold text-white text-3xl drop-shadow-2xl">{image.title}</h3>
                        </div>
                        <p className="text-lg text-white font-questa drop-shadow-xl leading-relaxed max-w-2xl">{image.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}
