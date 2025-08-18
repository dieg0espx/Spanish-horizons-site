"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, BookOpen, Star, Globe, ChefHat, Palette } from "lucide-react"
import { FiZap, FiGlobe, FiUsers, FiMessageCircle, FiSearch } from "react-icons/fi"
import Link from "next/link"
import HeroWithImages from "@/components/hero-with-images"
import { useState, useEffect } from "react"

export default function AboutPage() {
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
  const [storyImage1, setStoryImage1] = useState(shuffledImages[0]);
  const [storyImage2, setStoryImage2] = useState(shuffledImages[1]);
  const [storyImage3, setStoryImage3] = useState(shuffledImages[2]);
  const [founderImage] = useState("/pictures/founder.png");
  const [valueImage1, setValueImage1] = useState(shuffledImages[4]);
  const [valueImage2, setValueImage2] = useState(shuffledImages[5]);
  const [valueImage3, setValueImage3] = useState(shuffledImages[6]);
  const [valueImage4, setValueImage4] = useState(shuffledImages[7]);
  const [valueImage5, setValueImage5] = useState(shuffledImages[8]);
  const [valueImage6, setValueImage6] = useState(shuffledImages[9]);
  const [changingImage, setChangingImage] = useState<'story1' | 'story2' | 'story3' | 'value1' | 'value2' | 'value3' | 'value4' | 'value5' | 'value6' | null>(null);

  // Function to get random image
  const getRandomImage = () => {
    return shuffledImages[Math.floor(Math.random() * shuffledImages.length)];
  };

  // Function to change one image at a time
  const changeOneImage = () => {
    const imageTypes = ['story1', 'story2', 'story3', 'value1', 'value2', 'value3', 'value4', 'value5', 'value6'] as const;
    const randomType = imageTypes[Math.floor(Math.random() * imageTypes.length)];
    
    setChangingImage(randomType);
    
    setTimeout(() => {
      switch (randomType) {
        case 'story1':
          setStoryImage1(getRandomImage());
          break;
        case 'story2':
          setStoryImage2(getRandomImage());
          break;
        case 'story3':
          setStoryImage3(getRandomImage());
          break;
        case 'value1':
          setValueImage1(getRandomImage());
          break;
        case 'value2':
          setValueImage2(getRandomImage());
          break;
        case 'value3':
          setValueImage3(getRandomImage());
          break;
        case 'value4':
          setValueImage4(getRandomImage());
          break;
        case 'value5':
          setValueImage5(getRandomImage());
          break;
        case 'value6':
          setValueImage6(getRandomImage());
          break;
      }
      setChangingImage(null);
    }, 500);
  };

  // Effect to change one image at random intervals (4-10 seconds)
  useEffect(() => {
    const scheduleNextChange = () => {
      const randomDelay = Math.random() * 6000 + 4000; // Random delay between 4-10 seconds
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroWithImages
        badge="Meet Our Team & Story"
        title="About Spanish Horizons Academy"
        description="Discover our story, meet our founder, and learn about the educational philosophy that guides our K-5 Spanish immersion program."
        primaryButton={{ text: "Schedule a Tour", href: "/admissions" }}
        secondaryButton={{ text: "Contact Us", href: "/contact" }}
        heroImage={{
          title: "Our Learning Community",
          description: "Teachers and students together",
        }}
      />

      {/* Our Story Section - Clean Modern Design */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 md:mb-20">
            <h2 className="text-5xl md:text-6xl font-ivry font-bold text-slate mb-4">Our Story</h2>
            <p className="text-xl text-slate-medium max-w-3xlfont-questa">
              A journey of passion, innovation, and commitment to bilingual excellence
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Content Side */}
            <div className="space-y-12">
              {/* Vision Statement */}
              <div className="border-l-4 border-golden pl-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-golden rounded-lg flex items-center justify-center mr-4">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-ivry font-bold text-slate">Our Vision</h3>
                </div>
                <p className="text-lg text-slate-medium leading-relaxed font-questa">
                  Spanish Horizons Academy was born from a vision: to create a school where learning is joyful,
                  meaningful, and deeply connected to the world around us.
                </p>
              </div>

              {/* Legacy Section */}
              <div className="border-l-4 border-amber pl-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-amber rounded-lg flex items-center justify-center mr-4">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-ivry font-bold text-slate">Our Legacy</h3>
                </div>
                <p className="text-lg text-slate-medium leading-relaxed font-questa mb-4">
                  Founded by Laura Paz-Whitmore, the heart behind Casita Azul and Amanecer Academy, Spanish Horizons
                  continues a legacy of culturally rich, bilingual programs.
                </p>
                <p className="text-lg text-slate-medium leading-relaxed font-questa">
                  What began with early childhood education has expanded into a full K–5 school where students explore 
                  the world through movement, cooking, art, and storytelling.
                </p>
              </div>

              {/* Approach Section */}
              <div className="bg-slate text-white p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4">
                    <Globe className="h-5 w-5 text-slate" />
                  </div>
                  <h3 className="text-2xl font-ivry font-bold text-white">Our Approach</h3>
                </div>
                <p className="text-lg text-white/90 leading-relaxed font-questa">
                  Our approach combines the proven methodology of Expeditionary Learning with authentic Spanish
                  immersion, creating an environment where children don't just learn about the world—they experience it.
                </p>
              </div>

              {/* Key Features */}
              {/* <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
                  <div className="w-12 h-12 bg-golden rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-questa font-semibold text-slate text-sm mb-2">Bilingual Excellence</h4>
                  <p className="text-xs text-slate-medium">Immersion in Spanish language and culture</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
                  <div className="w-12 h-12 bg-amber rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-questa font-semibold text-slate text-sm mb-2">Creative Learning</h4>
                  <p className="text-xs text-slate-medium">Art, movement, and hands-on experiences</p>
                </div>
              </div> */}
            </div>

            {/* Images Side */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                  <img 
                    src={storyImage1} 
                    alt="School History" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      changingImage === 'story1' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                </div>
                <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                  <img 
                    src={storyImage2} 
                    alt="Our Community" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      changingImage === 'story2' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                </div>
              </div>
              <div className="aspect-video bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                <img 
                  src={storyImage3} 
                  alt="Campus Overview" 
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    changingImage === 'story3' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section with Enhanced Images */}
      <section id="leadership" className="py-16 bg-slate-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-ivry font-bold text-white mb-4">Meet Our Founder</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Founder Photo */}
            <div className="text-center h-full">
              <div className="w-80 h-[calc(100%-80px)] bg-white rounded-lg mx-auto mb-6 overflow-hidden shadow-2xl">
                <img 
                  src={founderImage} 
                  alt="Laura Paz-Whitmore - Founder & Educational Director" 
                  className="w-full h-full object-cover grayscale opacity-90"
                />
              </div>
              <h3 className="text-2xl font-ivry font-bold text-white">Laura Paz-Whitmore</h3>
              <p className="text-white/50 font-questa font-semibold text-lg">Founder & Educational Director</p>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white h-full">
                <CardContent className="p-10">
                  <div className="space-y-6 text-slate-medium font-questa">
                    <p className="text-lg leading-relaxed">
                      With a background in psychology and behavioral health, Laura brings a strong passion for emotional
                      regulation, mental health, and prefrontal cortex development. She is the visionary behind Casita
                      Azul and Amanecer Academy, and now Spanish Horizons Academy.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Laura designs schools where children are seen, nurtured, and deeply inspired. Her approach
                      integrates cutting-edge research in child development with authentic cultural experiences and
                      bilingual education.
                    </p>
                    <blockquote className=" pl-6 italic text-xl text-white bg-slate-light p-6 rounded-lg font-questa">
                      "Children learn best when they feel loved, seen, and inspired."
                    </blockquote>

                    {/* Additional Images */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                        <img 
                          src="/pictures/3-DSC02563.jpg" 
                          alt="Laura Teaching" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                        <img 
                          src="/pictures/5-DSC02576.jpg" 
                          alt="With Students" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>



             {/* Our Values in Action with Images */}
       <section id="values" className="py-12 md:py-16 ">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 md:mb-12">
            <h2 className="text-4xl font-ivry font-bold text-slate mb-4">Our Values in Action</h2>
            <p className="text-xl text-slate-medium font-questa">
              See how our core values shape every aspect of our educational approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate">
              <CardContent className="p-8">
                <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden">
                  <img 
                    src={valueImage1} 
                    alt="Curiosity in Action" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      changingImage === 'value1' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-ivry font-semibold mb-3 text-white">Curiosity</h3>
                <p className="text-white/90 font-questa">
                  We foster natural wonder through hands-on exploration, encouraging students to ask questions and seek
                  answers through investigation.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate">
              <CardContent className="p-8">
                <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden">
                  <img 
                    src={valueImage2} 
                    alt="Cultural Learning" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      changingImage === 'value2' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-ivry font-semibold mb-3 text-white">Culture</h3>
                <p className="text-white/90 font-questa">
                  Rich cultural experiences through cooking, music, art, and storytelling connect students to the
                  broader Spanish-speaking world.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate">
              <CardContent className="p-8">
                <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden">
                  <img 
                    src={valueImage3} 
                    alt="Community Building" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      changingImage === 'value3' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-ivry font-semibold mb-3 text-white">Community</h3>
                <p className="text-white/90 font-questa">
                  Strong partnerships between families, teachers, and students create a supportive learning environment
                  for everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate">
              <CardContent className="p-8">
                <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden">
                  <img 
                    src={valueImage4} 
                    alt="Language Immersion" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      changingImage === 'value4' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-ivry font-semibold mb-3 text-white">Language</h3>
                <p className="text-white/90 font-questa">
                  Authentic Spanish immersion develops true bilingual competency while maintaining strong English
                  language arts skills.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate">
              <CardContent className="p-8">
                <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden">
                  <img 
                    src={valueImage5} 
                    alt="Project Discovery" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      changingImage === 'value5' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-ivry font-semibold mb-3 text-white">Discovery</h3>
                <p className="text-white/90 font-questa">
                  Project-based expeditions allow students to uncover connections between subjects and real-world
                  applications.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-slate">
              <CardContent className="p-8">
                <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden">
                  <img 
                    src={valueImage6} 
                    alt="Emotional Learning" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      changingImage === 'value6' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-ivry font-semibold mb-3 text-white">Heart-Centered Learning</h3>
                <p className="text-white/90 font-questa">
                  Emotional regulation and social-emotional learning are woven throughout our curriculum and daily
                  practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <section className="py-12 bg-slate text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-ivry font-bold mb-4">Ready to Learn More?</h3>
          <p className="text-white mb-8 text-lg font-questa">
            Schedule a tour to experience our vibrant learning community firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="bg-amber hover:bg-golden hover:text-slate text-white px-8 py-4 rounded-xl font-questa font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              Schedule a Tour
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white hover:bg-white hover:text-slate text-white px-8 py-4 rounded-xl font-questa font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
