"use client"

import { useState } from "react"
import Image from "next/image"

interface FlipCardProps {
  title: string
  description: string
  category: string
  imageSrc: string
  videoSrc?: string
  detailedDescription?: string
  learningOutcomes?: string[]
}

export default function FlipCard({
  title,
  description,
  category,
  imageSrc,
  videoSrc,
  detailedDescription,
  learningOutcomes = []
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="relative w-[28rem] h-[22rem] mx-6 cursor-pointer flex-shrink-0"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* Card Container with 3D Flip Effect */}
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card - Image or Video */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative w-full h-full">
            {videoSrc ? (
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{ 
                  pointerEvents: 'none',
                  objectPosition: 'center 20%'
                }}
              />
            ) : (
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                <span className="text-white text-sm font-medium capitalize">{category}</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-2 drop-shadow-lg">{title}</h3>
              <p className="text-white/90 text-sm drop-shadow-lg">{description}</p>
            </div>
          </div>
        </div>

        {/* Back of Card - Information */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl bg-slate rotate-y-180"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="inline-block bg-amber/20 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                <span className="text-amber text-sm font-medium capitalize">{category}</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                {detailedDescription || description}
              </p>
            </div>
            
            {learningOutcomes.length > 0 && (
              <div>
                <h4 className="text-amber text-sm font-semibold mb-2">Learning Outcomes:</h4>
                <ul className="text-white/80 text-xs space-y-1">
                  {learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber mr-2">•</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
