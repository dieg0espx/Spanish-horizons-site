"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle, CheckCircle, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function ContactPage() {

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

  // State for current image
  const [campusImage, setCampusImage] = useState(shuffledImages[0]);
  const [changingImage, setChangingImage] = useState<'campus' | null>(null);

  // Function to get random image
  const getRandomImage = () => {
    return shuffledImages[Math.floor(Math.random() * shuffledImages.length)];
  };

  // Function to change image
  const changeImage = () => {
    setChangingImage('campus');
    setTimeout(() => {
      setCampusImage(getRandomImage());
      setChangingImage(null);
    }, 500);
  };

  // Effect to change image at random intervals (6-12 seconds)
  useEffect(() => {
    const scheduleNextChange = () => {
      const randomDelay = Math.random() * 6000 + 6000; // Random delay between 6-12 seconds
      setTimeout(() => {
        changeImage();
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
      <section className="bg-slate py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate rounded-full text-white text-sm font-questa font-medium mb-6">
              <MessageCircle className="h-4 w-4 mr-2" />
              Get In Touch
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-ivry font-bold text-white mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto font-questa px-4">
              We're here to answer your questions and help you learn more about our K-5 Spanish immersion program. Reach
              out to schedule a tour or discuss enrollment.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-ivry font-bold text-slate mb-6 md:mb-8">Get in Touch</h2>

              <div className="space-y-4 md:space-y-6">
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-slate rounded-2xl flex items-center justify-center mr-4 md:mr-6 group-hover:bg-slate-medium transition-colors duration-300">
                        <MapPin className="h-6 w-6 md:h-8 md:w-8 text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-ivry font-bold text-lg md:text-xl text-slate mb-2 md:mb-3">School Address</h3>
                        <p className="text-slate-medium leading-relaxed font-questa text-sm md:text-base">
                          770 NE Rogahn Street
                          <br />
                          Hillsboro, OR 97124
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 md:h-6 md:w-6 text-golden mr-3 md:mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-ivry font-semibold text-slate mb-1 text-sm md:text-base">Phone</h3>
                        <p className="text-slate-medium font-questa text-sm md:text-base">
                          <a href="tel:5039169758" className="hover:text-golden transition-colors">
                            (503) 916-9758
                          </a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 md:h-6 md:w-6 text-amber mr-3 md:mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-ivry font-semibold text-slate mb-1 text-sm md:text-base">Email</h3>
                        <p className="text-slate-medium font-questa text-sm md:text-base break-all">
                          <a
                            href="mailto:infospanishhorizons@casitaazulpdx.org"
                            className="hover:text-amber transition-colors"
                          >
                            infospanishhorizons@casitaazulpdx.org
                          </a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 md:h-6 md:w-6 text-slate mr-3 md:mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-ivry font-semibold text-slate mb-1 text-sm md:text-base">Office Hours</h3>
                        <p className="text-slate-medium font-questa text-sm md:text-base">
                          8:00 AM – 4:00 PM
                          <br />
                          Monday through Friday
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start">
                      <Instagram className="h-5 w-5 md:h-6 md:w-6 text-golden mr-3 md:mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-ivry font-semibold text-slate mb-1 text-sm md:text-base">Follow Us</h3>
                        <p className="text-slate-medium font-questa text-sm md:text-base">
                          <a
                            href="https://instagram.com/spanishhorizonsacademy"
                            className="hover:text-golden transition-colors"
                          >
                            @spanishhorizonsacademy
                          </a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Start Application CTA */}
            <div>
              <Card className="bg-slate border-0 shadow-xl">
                <CardContent className="p-6 md:p-10 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-golden rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-slate" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-ivry font-bold text-white mb-4">
                    Ready to Apply?
                  </h2>
                  <p className="text-white/90 font-questa mb-6 text-sm md:text-base max-w-md mx-auto">
                    Start your application for Spanish Horizons Academy's Kindergarten program for Fall 2026. We're excited to learn more about your family.
                  </p>
                  <div className="space-y-4">
                    <Button
                      size="lg"
                      className="w-full bg-amber hover:bg-golden hover:text-slate text-white font-questa text-base md:text-lg py-6"
                      asChild
                    >
                      <a href="/admissions/application" className="flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        Start Your Application
                      </a>
                    </Button>
                    <p className="text-white/60 text-xs font-questa">
                      Currently accepting applications for Kindergarten only
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <p className="text-white/70 font-questa text-sm mb-3">Have questions first?</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="mailto:infospanishhorizons@casitaazulpdx.org"
                        className="text-golden hover:text-golden-light font-questa text-sm transition-colors"
                      >
                        Email Us
                      </a>
                      <span className="hidden sm:inline text-white/40">|</span>
                      <a
                        href="tel:5039169758"
                        className="text-golden hover:text-golden-light font-questa text-sm transition-colors"
                      >
                        Call (503) 916-9758
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Our Campus Section */}
      <section className="py-12 md:py-16 bg-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-ivry font-bold text-white mb-3 md:mb-4">Visit Our Campus</h2>
            <p className="text-base md:text-lg text-white/50 font-questa">Located in the heart of Hillsboro, Oregon</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Campus Photos - Left Column */}
            <div>
              <Card className="h-full">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
                    <img 
                      src={campusImage} 
                      alt="Spanish Horizons Academy Campus" 
                      className={`w-full h-full object-cover transition-all duration-1000 ${
                        changingImage === 'campus' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Google Maps - Right Column */}
            <div>
              <Card className="h-full">
                <CardContent className="p-0">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src="https://maps.google.com/maps?q=770+NE+Rogahn+Street+Hillsboro+OR+97124&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Spanish Horizons Academy Location"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url('/pictures/classroom4.png')`,
          }}
        />
        
        {/* Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate/40 via-slate/30 to-slate/50"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-ivry font-bold text-white mb-4">Frequently Requested Information</h2>
            <p className="text-lg text-white/90 font-questa">Quick access to the information families need most</p>
          </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
             <Card className="text-center p-3 md:p-6 hover:shadow-lg transition-shadow">
               <CardContent className="pt-3 md:pt-6">
                 <h3 className="text-base md:text-lg font-ivry font-semibold mb-2 md:mb-3 text-slate">2025-2026 Calendar</h3>
                 <p className="text-slate-medium text-xs md:text-sm mb-2 md:mb-4 font-questa">School closure dates and important events</p>
                 <Button size="sm" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa text-xs md:text-sm">
                   <a href="/calendar">View Calendar</a>
                 </Button>
               </CardContent>
             </Card>

             <Card className="text-center p-3 md:p-6 hover:shadow-lg transition-shadow">
               <CardContent className="pt-3 md:pt-6">
                 <h3 className="text-base md:text-lg font-ivry font-semibold mb-2 md:mb-3 text-slate">Tuition Information</h3>
                 <p className="text-slate-medium text-xs md:text-sm mb-2 md:mb-4 font-questa">Pricing and financial assistance options</p>
                 <Button size="sm" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa text-xs md:text-sm">
                   <a href="/tuition">View Tuition</a>
                 </Button>
               </CardContent>
             </Card>

             <Card className="text-center p-3 md:p-6 hover:shadow-lg transition-shadow">
               <CardContent className="pt-3 md:pt-6">
                 <h3 className="text-base md:text-lg font-ivry font-semibold mb-2 md:mb-3 text-slate">Admissions Process</h3>
                 <p className="text-slate-medium text-xs md:text-sm mb-2 md:mb-4 font-questa">Application timeline and requirements</p>
                 <Button size="sm" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa text-xs md:text-sm">
                   <a href="/admissions">Learn More</a>
                 </Button>
               </CardContent>
             </Card>

             <Card className="text-center p-3 md:p-6 hover:shadow-lg transition-shadow">
               <CardContent className="pt-3 md:pt-6">
                 <h3 className="text-base md:text-lg font-ivry font-semibold mb-2 md:mb-3 text-slate">Academic Programs</h3>
                 <p className="text-slate-medium text-xs md:text-sm mb-2 md:mb-4 font-questa">Spanish immersion and expeditionary learning</p>
                 <Button size="sm" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa text-xs md:text-sm">
                   <a href="/programs">Explore Programs</a>
                 </Button>
               </CardContent>
             </Card>
           </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-slate text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-ivry font-bold mb-3 md:mb-4">Ready to Join Our Community?</h2>
          <p className="text-lg md:text-xl text-white mb-6 md:mb-8 max-w-2xl mx-auto font-questa px-4">
            Take the next step in your child's educational journey. We're excited to meet your family and share more
            about our Spanish immersion program.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button size="lg" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa text-sm md:text-base">
              <a href="/admissions">Schedule a Tour</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white bg-transparent font-questa text-sm md:text-base">
              <a href="tel:5039169758">Call Us Today</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}