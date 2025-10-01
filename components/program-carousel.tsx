"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

interface MediaItem {
  id: string
  type: 'image' | 'video'
  src: string
  alt: string
  description: string
  imagePosition?: string // Custom positioning for images
  imageScale?: 'cover' | 'contain' // Custom scaling for images
}

interface ProgramCarouselProps {
  media: MediaItem[]
  color?: string
  className?: string
}

export default function ProgramCarousel({ media, color = "blue", className = "" }: ProgramCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length)
    setIsPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length)
    setIsPlaying(false)
  }

  const toggleVideo = () => {
    if (media[currentIndex].type === 'video') {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause()
        } else {
          videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
      }
    }
  }

  const currentMedia = media[currentIndex]

  // Auto-play videos when they become the current slide
  useEffect(() => {
    if (currentMedia.type === 'video' && videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
    } else {
      setIsPlaying(false)
    }
  }, [currentIndex, currentMedia.type])

  // Color mappings for different programs
  const colorClasses = {
    slate: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      text: 'text-slate-600',
      buttonBorder: 'border-slate-300',
      buttonText: 'text-slate-600',
      buttonHover: 'hover:bg-slate-100',
      description: 'text-slate-700',
      thumbnailBorder: 'border-slate-200',
      thumbnailRing: 'ring-slate-500',
      videoBg: 'bg-slate-200',
      videoText: 'text-slate-600'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      buttonBorder: 'border-green-300',
      buttonText: 'text-green-600',
      buttonHover: 'hover:bg-green-100',
      description: 'text-green-700',
      thumbnailBorder: 'border-green-200',
      thumbnailRing: 'ring-green-500',
      videoBg: 'bg-green-200',
      videoText: 'text-green-600'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-600',
      buttonBorder: 'border-orange-300',
      buttonText: 'text-orange-600',
      buttonHover: 'hover:bg-orange-100',
      description: 'text-orange-700',
      thumbnailBorder: 'border-orange-200',
      thumbnailRing: 'ring-orange-500',
      videoBg: 'bg-orange-200',
      videoText: 'text-orange-600'
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-600',
      buttonBorder: 'border-amber-300',
      buttonText: 'text-amber-600',
      buttonHover: 'hover:bg-amber-100',
      description: 'text-amber-700',
      thumbnailBorder: 'border-amber-200',
      thumbnailRing: 'ring-amber-500',
      videoBg: 'bg-amber-200',
      videoText: 'text-amber-600'
    }
  }

  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue

  return (
    <div className={`${colors.bg} rounded-2xl shadow-lg overflow-hidden ${className}`}>

      {/* Media Display */}
      <div className="relative aspect-video bg-slate-100">
        {currentMedia.type === 'image' ? (
          <Image
            src={currentMedia.src}
            alt={currentMedia.alt}
            fill
            className={currentMedia.imageScale === 'contain' ? 'object-contain' : 'object-cover'}
            style={{
              objectPosition: currentMedia.imagePosition || 'center'
            }}
          />
        ) : (
          <video
            ref={videoRef}
            src={currentMedia.src}
            className="w-full h-full object-cover"
            loop
            muted
            autoPlay
            playsInline
            onClick={toggleVideo}
          />
        )}
      </div>

      {/* Description */}
      <div className="p-6">
        <p className={`${colors.description} leading-relaxed`}>{currentMedia.description}</p>
      </div>

      {/* Thumbnail Navigation */}
      {media.length > 1 && (
        <div className={`p-4 border-t ${colors.border}`}>
          <div className="flex space-x-2 overflow-x-auto">
            {media.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${
                  index === currentIndex ? `ring-2 ${colors.thumbnailRing}` : 'opacity-60 hover:opacity-80'
                }`}
              >
                {item.type === 'image' ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
