"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, Users, Globe, Heart } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

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
  // Array of all available images for background
  const allImages = [
    "/pictures/1-DSC02558.jpg",
    "/pictures/2-DSC02562.jpg",
    "/pictures/3-DSC02563.jpg",
    "/pictures/4-DSC02569.jpg",
    "/pictures/5-DSC02576.jpg",
    "/pictures/6-DSC02581.jpg",
    "/pictures/7-DSC02580.jpg",
    "/pictures/8-DSC02584.jpg",
    "/pictures/9-DSC02596.jpg",
    "/pictures/10-DSC02610.jpg",
    "/pictures/11-DSC02612.jpg",
    "/pictures/12-DSC02622.jpg",
    "/pictures/13-DSC02624.jpg",
    "/pictures/14-DSC02635.jpg",
    "/pictures/15-DSC02634.jpg",
    "/pictures/16-DSC02642.jpg",
    "/pictures/17-DSC02646.jpg",
    "/pictures/18-DSC02649.jpg",
    "/pictures/19-DSC02675.jpg",
    "/pictures/20-DSC02677.jpg",
    "/pictures/21-DSC02692.jpg",
    "/pictures/22-DSC02691.jpg",
    "/pictures/23-DSC02698.jpg",
    "/pictures/24-DSC02700.jpg",
    "/pictures/25-DSC02739.jpg",
    "/pictures/26-DSC02753.jpg",
    "/pictures/27-DSC02764.jpg",
    "/pictures/28-DSC02777.jpg",
    "/pictures/29-DSC02795.jpg",
    "/pictures/30-DSC02799.jpg",
    "/pictures/31-DSC02844.jpg",
    "/pictures/32-DSC02871.jpg",
    "/pictures/33-DSC02875.jpg",
    "/pictures/34-DSC02882.jpg",
    "/pictures/35-DSC02888.jpg",
    "/pictures/36-DSC02905.jpg",
    "/pictures/37-DSC02941.jpg"
  ];

  // Function to shuffle array
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle the images array
  const shuffledImages = shuffleArray(allImages);

  // State for current background image
  const [currentImage, setCurrentImage] = useState(shuffledImages[0]);
  const [isChanging, setIsChanging] = useState(false);

  // Function to get random image
  const getRandomImage = () => {
    return shuffledImages[Math.floor(Math.random() * shuffledImages.length)];
  };

  // Function to change background image
  const changeBackgroundImage = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentImage(getRandomImage());
      setIsChanging(false);
    }, 500);
  };

  // Effect to change background image at random intervals (8-15 seconds)
  useEffect(() => {
    const scheduleNextChange = () => {
      const randomDelay = Math.random() * 7000 + 8000; // Random delay between 8-15 seconds
      setTimeout(() => {
        changeBackgroundImage();
        scheduleNextChange(); // Schedule the next change
      }, randomDelay);
    };

    scheduleNextChange(); // Start the first change

    return () => {
      // Cleanup is handled by the timeout
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentImage})`,
          filter: isChanging ? 'blur(2px)' : 'blur(0px)',
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
     
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-golden-light rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-amber-light rounded-full opacity-20 animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/30">
          <Globe className="h-4 w-4 mr-2" />
          {badge}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          {title}
          {subtitle && <span className="text-golden block">{subtitle}</span>}
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed max-w-3xl mx-auto font-sans">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-amber hover:bg-golden hover:text-slate text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
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
              className="border-2 border-white text-white hover:bg-white hover:text-slate px-8 py-4 rounded-xl font-semibold bg-transparent backdrop-blur-sm"
            >
              <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
