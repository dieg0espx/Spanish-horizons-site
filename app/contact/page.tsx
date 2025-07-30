"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from "lucide-react"
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
      <section className="bg-slate py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate-light rounded-full text-white text-sm font-questa font-medium mb-6">
              <MessageCircle className="h-4 w-4 mr-2" />
              Get In Touch
            </div>
            <h1 className="text-5xl md:text-6xl font-ivry font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-white max-w-3xl mx-auto font-questa">
              We're here to answer your questions and help you learn more about our K-5 Spanish immersion program. Reach
              out to schedule a tour or discuss enrollment.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-ivry font-bold text-slate mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-start">
                      <div className="w-16 h-16 bg-slate-light rounded-2xl flex items-center justify-center mr-6 group-hover:bg-slate transition-colors duration-300">
                        <MapPin className="h-8 w-8 text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-ivry font-bold text-xl text-slate mb-3">School Address</h3>
                        <p className="text-slate-medium leading-relaxed font-questa">
                          770 NE Rogahn Street
                          <br />
                          Hillsboro, OR 97124
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-golden mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-ivry font-semibold text-slate mb-1">Phone</h3>
                        <p className="text-slate-medium font-questa">
                          <a href="tel:5039169758" className="hover:text-golden transition-colors">
                            (503) 916-9758
                          </a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-amber mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-ivry font-semibold text-slate mb-1">Email</h3>
                        <p className="text-slate-medium font-questa">
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
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Clock className="h-6 w-6 text-slate mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-ivry font-semibold text-slate mb-1">Office Hours</h3>
                        <p className="text-slate-medium font-questa">
                          8:00 AM – 4:00 PM
                          <br />
                          Monday through Friday
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Instagram className="h-6 w-6 text-golden mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-ivry font-semibold text-slate mb-1">Follow Us</h3>
                        <p className="text-slate-medium font-questa">
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

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-ivry text-slate">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-questa font-medium text-slate mb-2">
                          First Name *
                        </label>
                        <Input id="firstName" type="text" required />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-questa font-medium text-slate mb-2">
                          Last Name *
                        </label>
                        <Input id="lastName" type="text" required />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-questa font-medium text-slate mb-2">
                        Email Address *
                      </label>
                      <Input id="email" type="email" required />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-questa font-medium text-slate mb-2">
                        Phone Number
                      </label>
                      <Input id="phone" type="tel" />
                    </div>

                    <div>
                      <label htmlFor="childAge" className="block text-sm font-questa font-medium text-slate mb-2">
                        Child's Age/Grade Level
                      </label>
                      <Input id="childAge" type="text" placeholder="e.g., 5 years old, Kindergarten, 2nd grade" />
                    </div>

                    <div>
                      <label htmlFor="interest" className="block text-sm font-questa font-medium text-slate mb-2">
                        I'm interested in:
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate focus:border-slate font-questa">
                        <option value="">Please select...</option>
                        <option value="tour">Scheduling a tour</option>
                        <option value="admissions">Admissions information</option>
                        <option value="tuition">Tuition and financial assistance</option>
                        <option value="programs">Academic programs</option>
                        <option value="aftercare">Aftercare program</option>
                        <option value="other">Other questions</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-questa font-medium text-slate mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your questions or what you'd like to know about Spanish Horizons Academy..."
                      />
                    </div>

                    <Button type="submit" className="w-full bg-amber hover:bg-golden hover:text-slate font-questa">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-slate-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-ivry font-bold text-white mb-4">Visit Our Campus</h2>
            <p className="text-lg text-white/50 font-questa">Located in the heart of Hillsboro, Oregon</p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
                <img 
                  src={campusImage} 
                  alt="Spanish Horizons Academy Campus" 
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    changingImage === 'campus' ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="h-16 w-16 mx-auto mb-4" />
                    <p className="font-questa font-medium">Visit Our Campus</p>
                    <p className="text-sm mt-2 font-questa">770 NE Rogahn Street, Hillsboro, OR 97124</p>
                    <Button className="mt-4 bg-white text-slate hover:bg-gray-100 font-questa" variant="outline">
                      <a
                        href="https://maps.google.com/?q=770+NE+Rogahn+Street+Hillsboro+OR+97124"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-ivry font-bold text-slate mb-4">Frequently Requested Information</h2>
            <p className="text-lg text-slate-medium font-questa">Quick access to the information families need most</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-ivry font-semibold mb-3 text-slate">2025-2026 Calendar</h3>
                <p className="text-slate-medium text-sm mb-4 font-questa">School closure dates and important events</p>
                <Button size="sm" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa">
                  <a href="/calendar">View Calendar</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-ivry font-semibold mb-3 text-slate">Tuition Information</h3>
                <p className="text-slate-medium text-sm mb-4 font-questa">Pricing and financial assistance options</p>
                <Button size="sm" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa">
                  <a href="/tuition">View Tuition</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-ivry font-semibold mb-3 text-slate">Admissions Process</h3>
                <p className="text-slate-medium text-sm mb-4 font-questa">Application timeline and requirements</p>
                <Button size="sm" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa">
                  <a href="/admissions">Learn More</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-ivry font-semibold mb-3 text-slate">Academic Programs</h3>
                <p className="text-slate-medium text-sm mb-4 font-questa">Spanish immersion and expeditionary learning</p>
                <Button size="sm" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa">
                  <a href="/programs">Explore Programs</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-slate text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-ivry font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto font-questa">
            Take the next step in your child's educational journey. We're excited to meet your family and share more
            about our Spanish immersion program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa">
              <a href="/admissions">Schedule a Tour</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white bg-transparent font-questa">
              <a href="tel:5039169758">Call Us Today</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
