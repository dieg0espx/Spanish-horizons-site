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
  // Array of all available images
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

  // State for current images
  const [mainImage, setMainImage] = useState(shuffledImages[0]);
  const [smallImage1, setSmallImage1] = useState(shuffledImages[1]);
  const [smallImage2, setSmallImage2] = useState(shuffledImages[2]);
  const [changingImage, setChangingImage] = useState<'main' | 'small1' | 'small2' | null>(null);

  // Function to get random image
  const getRandomImage = () => {
    return shuffledImages[Math.floor(Math.random() * shuffledImages.length)];
  };

  // Function to change one image at a time
  const changeOneImage = () => {
    const imageTypes = ['main', 'small1', 'small2'] as const;
    const randomType = imageTypes[Math.floor(Math.random() * imageTypes.length)];
    
    setChangingImage(randomType);
    
    setTimeout(() => {
      switch (randomType) {
        case 'main':
          setMainImage(getRandomImage());
          break;
        case 'small1':
          setSmallImage1(getRandomImage());
          break;
        case 'small2':
          setSmallImage2(getRandomImage());
          break;
      }
      setChangingImage(null);
    }, 500);
  };

  // Effect to change one image at random intervals (2-6 seconds)
  useEffect(() => {
    const scheduleNextChange = () => {
      const randomDelay = Math.random() * 4000 + 2000; // Random delay between 2-6 seconds
      setTimeout(() => {
        changeOneImage();
        scheduleNextChange(); // Schedule the next change
      }, randomDelay);
    };

    scheduleNextChange(); // Start the first change

    return () => {
      // Cleanup is handled by the timeout
    };
  }, []);

  return (
    <section className="bg-slate py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/10"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-golden-light rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-amber-light rounded-full opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-slate-light rounded-full text-white text-sm font-questa font-medium mb-6">
              <Globe className="h-4 w-4 mr-2" />
              {badge}
            </div>
            <h1 className="text-5xl md:text-6xl font-ivry font-bold text-white mb-6">
              {title}
              {subtitle && <span className="text-golden block">{subtitle}</span>}
            </h1>
            <p className="text-2xl text-white mb-8 leading-relaxed font-questa">{description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-amber hover:bg-golden hover:text-slate text-white px-8 py-4 rounded-xl font-questa font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
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
                  className="border-2 border-white text-white hover:bg-white hover:text-slate px-8 py-4 rounded-xl font-questa font-semibold bg-transparent"
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
              <div className="col-span-2 aspect-video bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src={mainImage} 
                  alt="Students in Spanish Immersion" 
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    changingImage === 'main' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                  }`}
                />
              </div>

              {/* Two smaller images */}
              <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
                <img 
                  src={smallImage1} 
                  alt="Cultural Activities" 
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    changingImage === 'small1' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                  }`}
                />
              </div>

              <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
                <img 
                  src={smallImage2} 
                  alt="Outdoor Learning" 
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    changingImage === 'small2' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                  }`}
                />
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-golden rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
