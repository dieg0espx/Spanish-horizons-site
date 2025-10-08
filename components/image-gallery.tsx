"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import FlipCard from "./flip-card"

interface ImageGalleryProps {
  title?: string
  subtitle?: string
  images?: Array<{
    title: string
    description: string
    category: string
    imageSrc: string
    videoSrc?: string
    videoPosition?: string
    detailedDescription?: string
    learningOutcomes?: string[]
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
      imageSrc: "/pictures/2.png",
      detailedDescription: "Our students participate in immersive Spanish language learning through interactive activities, storytelling, and collaborative projects that make language acquisition natural and engaging.",
      learningOutcomes: [
        "Spanish vocabulary expansion",
        "Confidence in speaking",
        "Cultural understanding",
        "Peer collaboration skills"
      ]
    },
    { 
      title: "Music & Dance", 
      description: "Latin American cultural activities", 
      category: "culture",
      imageSrc: "/pictures/11-DSC02612.jpg",
      videoSrc: "https://res.cloudinary.com/dhuhpf3wq/video/upload/v1759936340/video2_xwke0b.mp4",
      videoPosition: "center 60%",
      detailedDescription: "Students experience the rhythm and joy of Latin American music and dance, learning traditional songs and movements while building cultural connections.",
      learningOutcomes: [
        "Musical rhythm and coordination",
        "Spanish song lyrics",
        "Cultural dance traditions",
        "Confidence in performance"
      ]
    },
    { 
      title: "Cooking Activities", 
      description: "Cultural cooking experiences", 
      category: "culture",
      imageSrc: "/kid-cooking.jpeg",
      detailedDescription: "Students explore Latin American cuisine through hands-on cooking activities, learning about ingredients, traditions, and cultural significance while practicing Spanish vocabulary.",
      learningOutcomes: [
        "Cultural appreciation",
        "Spanish food vocabulary",
        "Following instructions in Spanish",
        "Teamwork and cooperation"
      ]
    },
    { 
      title: "Art Projects", 
      description: "Creative expression in Spanish", 
      category: "arts",
      imageSrc: "/pictures/1.jpeg",
      videoSrc: "https://res.cloudinary.com/dhuhpf3wq/video/upload/v1759936329/video1_mvzsi6.mp4",
      detailedDescription: "Art becomes a medium for Spanish language learning as students create projects inspired by Latin American artists and cultural themes.",
      learningOutcomes: [
        "Creative expression",
        "Art vocabulary in Spanish",
        "Cultural art appreciation",
        "Fine motor skills development"
      ]
    },
    { 
      title: "Community Time", 
      description: "Building friendships", 
      category: "community", 
      imageSrc: "/pictures/classroom3.png",
      detailedDescription: "Students develop social skills and friendships through structured community time, practicing Spanish conversation and building a supportive learning community.",
      learningOutcomes: [
        "Social communication skills",
        "Spanish conversation practice",
        "Friendship building",
        "Community responsibility"
      ]
    },
    { 
      title: "Outdoor Learning", 
      description: "Garden and nature exploration", 
      category: "outdoor",
      imageSrc: "/pictures/11-DSC02612.jpg",
      videoSrc: "https://res.cloudinary.com/dhuhpf3wq/video/upload/v1759936324/clip_jumping_vgs3sf.mp4",
      videoPosition: "center 60%",
      detailedDescription: "Our garden classroom provides hands-on learning about nature, sustainability, and Spanish vocabulary related to plants, animals, and environmental concepts.",
      learningOutcomes: [
        "Environmental awareness",
        "Nature vocabulary in Spanish",
        "Scientific observation skills",
        "Responsibility for living things"
      ]
    },
    // { 
    //   title: "Music & Dance", 
    //   description: "Latin American cultural activities", 
    //   category: "culture",
    //   imageSrc: "/pictures/11-DSC02612.jpg",
    //   videoSrc: "https://res.cloudinary.com/dhuhpf3wq/video/upload/v1759936340/video2_xwke0b.mp4",
    //   videoPosition: "center 60%",
    //   detailedDescription: "Students experience the rhythm and joy of Latin American music and dance, learning traditional songs and movements while building cultural connections.",
    //   learningOutcomes: [
    //     "Musical rhythm and coordination",
    //     "Spanish song lyrics",
    //     "Cultural dance traditions",
    //     "Confidence in performance"
    //   ]
    // },
   
  ],
}: ImageGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', updateScrollButtons)
      updateScrollButtons() // Initial check
      return () => container.removeEventListener('scroll', updateScrollButtons)
    }
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="relative py-12 md:py-24 overflow-hidden bg-slate">
      
      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-ivry font-bold text-white mb-4 md:mb-6 px-4">Experience Our Learning Environment</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-questa max-w-4xl mx-auto px-4">{subtitle}</p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`flex absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 shadow-lg hover:shadow-xl transition-all duration-200 rounded-full w-10 h-10 md:w-12 md:h-12 p-0 ${
              canScrollLeft 
                ? 'bg-white/90 hover:bg-white text-slate' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
          
          <Button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`flex absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 shadow-lg hover:shadow-xl transition-all duration-200 rounded-full w-10 h-10 md:w-12 md:h-12 p-0 ${
              canScrollRight 
                ? 'bg-white/90 hover:bg-white text-slate' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </Button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4 md:space-x-6 pb-6 px-4 md:px-16" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image, index) => (
              <FlipCard
                key={index}
                title={image.title}
                description={image.description}
                category={image.category}
                imageSrc={image.imageSrc}
                videoSrc={image.videoSrc}
                videoPosition={image.videoPosition}
                detailedDescription={image.detailedDescription}
                learningOutcomes={image.learningOutcomes}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  )
}
