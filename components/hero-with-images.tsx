"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, Users, Globe, Heart } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import FontTestingButton from "./font-testing-button"

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
  // Array of favorite images for background
  const allImages = [
    "/pictures/whats1.JPG",
    "/pictures/whats2.JPG", 
    "/pictures/whats3.JPG",
    "/pictures/whats4.JPG"
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
  
  // State for font testing
  const [titleFont, setTitleFont] = useState("font-test-playfair");

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
      

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Font Testing Button - positioned at top right */}
        <div className="absolute top-4 right-4 z-20 hidden sm:block">
          <FontTestingButton 
            onFontChange={setTitleFont} 
            currentFont={titleFont}
          />
        </div>
        
        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/30">
          <Globe className="h-4 w-4 mr-2" />
          {badge}
        </div>
        
        <h1 className={`${titleFont === 'font-test-poppins' ? 'text-4xl md:text-6xl' : 'text-5xl md:text-7xl'} font-light text-white mb-6 leading-tight tracking-wide ${titleFont}`}>
          {title}
          {subtitle && <span className={`text-golden block font-normal ${titleFont}`}>{subtitle}</span>}
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Button
            size="lg"
            className="bg-amber hover:bg-golden hover:text-slate text-white px-6 sm:px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base font-cta"
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
              className="border-2 border-white text-white hover:bg-white hover:text-slate px-6 sm:px-8 py-4 rounded-xl font-semibold bg-transparent backdrop-blur-sm text-sm sm:text-base font-cta"
            >
              <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
            </Button>
          )}
        </div>
        
        {/* Mobile Font Testing Button - positioned below buttons */}
        <div className="sm:hidden mt-6">
          <FontTestingButton 
            onFontChange={setTitleFont} 
            currentFont={titleFont}
          />
        </div>
      </div>
    </section>
  )
}
