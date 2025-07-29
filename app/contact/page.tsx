import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
              <MessageCircle className="h-4 w-4 mr-2" />
              Get In Touch
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-start">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-blue-600 transition-colors duration-300">
                        <MapPin className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-3">School Address</h3>
                        <p className="text-gray-700 leading-relaxed">
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
                      <Phone className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                        <p className="text-gray-700">
                          <a href="tel:5039169758" className="hover:text-green-600 transition-colors">
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
                      <Mail className="h-6 w-6 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <p className="text-gray-700">
                          <a
                            href="mailto:infospanishhorizons@casitaazulpdx.org"
                            className="hover:text-purple-600 transition-colors"
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
                      <Clock className="h-6 w-6 text-orange-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                        <p className="text-gray-700">
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
                      <Instagram className="h-6 w-6 text-pink-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Follow Us</h3>
                        <p className="text-gray-700">
                          <a
                            href="https://instagram.com/spanishhorizonsacademy"
                            className="hover:text-pink-600 transition-colors"
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
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <Input id="firstName" type="text" required />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <Input id="lastName" type="text" required />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input id="email" type="email" required />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input id="phone" type="tel" />
                    </div>

                    <div>
                      <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-2">
                        Child's Age/Grade Level
                      </label>
                      <Input id="childAge" type="text" placeholder="e.g., 5 years old, Kindergarten, 2nd grade" />
                    </div>

                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                        I'm interested in:
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your questions or what you'd like to know about Spanish Horizons Academy..."
                      />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Campus</h2>
            <p className="text-lg text-gray-600">Located in the heart of Hillsboro, Oregon</p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500">770 NE Rogahn Street, Hillsboro, OR 97124</p>
                  <Button className="mt-4 bg-transparent" variant="outline">
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
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Requested Information</h2>
            <p className="text-lg text-gray-600">Quick access to the information families need most</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">2025-2026 Calendar</h3>
                <p className="text-gray-600 text-sm mb-4">School closure dates and important events</p>
                <Button variant="outline" size="sm">
                  <a href="/calendar">View Calendar</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Tuition Information</h3>
                <p className="text-gray-600 text-sm mb-4">Pricing and financial assistance options</p>
                <Button variant="outline" size="sm">
                  <a href="/tuition">View Tuition</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Admissions Process</h3>
                <p className="text-gray-600 text-sm mb-4">Application timeline and requirements</p>
                <Button variant="outline" size="sm">
                  <a href="/admissions">Learn More</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Academic Programs</h3>
                <p className="text-gray-600 text-sm mb-4">Spanish immersion and expeditionary learning</p>
                <Button variant="outline" size="sm">
                  <a href="/programs">Explore Programs</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the next step in your child's educational journey. We're excited to meet your family and share more
            about our Spanish immersion program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <a href="/admissions">Schedule a Tour</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 bg-transparent">
              <a href="tel:5039169758">Call Us Today</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
