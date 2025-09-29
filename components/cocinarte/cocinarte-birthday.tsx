"use client"

import { Button } from "@/components/ui/button"
import { Cake, PartyPopper, Star } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"
import Image from "next/image"

export default function CocinarteBirthday() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <section id="birthday-parties" className="py-20 relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/cocinarte/cocinarte11.jpeg"
          alt="Birthday party background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/80"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-4">
            <Image
              src="/cocinarte/floating_elements/COCINARTE_cupcakes.svg"
              alt="Cupcakes"
              width={90}
              height={90}
              className="opacity-70 animate-float-slow"
            />
            <h2 className="text-4xl lg:text-5xl font-bold text-slate">
              Birthday Party Packages
            </h2>
            <Image
              src="/cocinarte/floating_elements/COCINARTE_niคo2.svg"
              alt="Child cooking"
              width={80}
              height={80}
              className="opacity-70 animate-float-medium"
            />
          </div>
          <p className="text-xl text-slate-medium max-w-3xl mx-auto">
            Make your child's birthday unforgettable with our fun cooking party packages!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-cocinarte-yellow/50 to-cocinarte-yellow/50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <Cake className="w-12 h-12 text-cocinarte-yellow mx-auto mb-3" />
            <h3 className="font-semibold text-slate text-2xl mb-2">Mini Party</h3>
            <p className="text-lg text-slate-medium mb-3">Up to 8 kids</p>
            <p className="text-3xl font-bold text-cocinarte-yellow mb-4">$350</p>
            <ul className="text-sm text-slate-medium space-y-2">
                  <li>• 2-hour cooking session</li>
                  <li>• All ingredients included</li>
                  <li>• Birthday cake making</li>
                  <li>• Take-home treats</li>
                  <li>• Party decorations</li>
                </ul>
              </div>

          <div className="bg-gradient-to-br from-cocinarte-red/50 to-cocinarte-red/50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <PartyPopper className="w-12 h-12 text-cocinarte-red mx-auto mb-3" />
            <h3 className="font-semibold text-slate text-2xl mb-2">Deluxe Party</h3>
            <p className="text-lg text-slate-medium mb-3">Up to 12 kids</p>
            <p className="text-3xl font-bold text-cocinarte-red mb-4">$500</p>
            <ul className="text-sm text-slate-medium space-y-2">
                  <li>• 2.5-hour cooking session</li>
                  <li>• All ingredients included</li>
                  <li>• Custom birthday cake</li>
                  <li>• Take-home goodie bags</li>
                  <li>• Full party decorations</li>
                  <li>• Professional photos</li>
                </ul>
              </div>

          <div className="bg-gradient-to-br from-cocinarte-blue/50 to-cocinarte-blue/50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
            <Star className="w-12 h-12 text-cocinarte-navy mx-auto mb-3" />
            <h3 className="font-semibold text-slate text-2xl mb-2">Premium Party</h3>
            <p className="text-lg text-slate-medium mb-3">Up to 16 kids</p>
            <p className="text-3xl font-bold text-cocinarte-navy mb-4">$750</p>
            <ul className="text-sm text-slate-medium space-y-2">
                  <li>• 3-hour cooking session</li>
                  <li>• All ingredients included</li>
                  <li>• Custom themed cake</li>
                  <li>• Premium goodie bags</li>
                  <li>• Themed decorations</li>
                  <li>• Professional photos & video</li>
                  <li>• Party coordinator</li>
                </ul>
              </div>
        </div>

        {/* Birthday Party Request Form */}
        <div className="mt-16 bg-cocinarte-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-center text-slate mb-6">Request Your Party</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Preferred Date *
                </label>
                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select a date"
                    className="w-full px-4 py-3 pr-12 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10"
                    required
                    minDate={new Date()}
                    showPopperArrow={false}
                    popperClassName="react-datepicker-popper"
                    calendarClassName="react-datepicker-calendar"
                    dayClassName={(date) => 
                      date.getTime() === selectedDate?.getTime() 
                        ? 'react-datepicker__day--selected' 
                        : ''
                    }
                    wrapperClassName="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Number of Children *
                </label>
                <input 
                  type="number" 
                  min="1" 
                  max="20" 
                  required
                  className="w-full px-4 py-3 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10"
                  placeholder="How many children?"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Package Selection *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-cocinarte-yellow/10 cursor-pointer transition-colors">
                  <input 
                    type="radio" 
                    name="package" 
                    value="mini-party" 
                    className="mr-2 text-cocinarte-orange focus:ring-cocinarte-orange"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-slate text-sm">Mini Fiesta</div>
                    <div className="text-xs text-slate-medium">$350 • 8 kids • 1.5 hours</div>
                  </div>
                </label>
                
                <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-cocinarte-red/10 cursor-pointer transition-colors">
                  <input 
                    type="radio" 
                    name="package" 
                    value="deluxe-party" 
                    className="mr-2 text-cocinarte-orange focus:ring-cocinarte-orange"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-slate text-sm">Deluxe Fiesta</div>
                    <div className="text-xs text-slate-medium">$500 • 12 kids • 2.5 hours</div>
                  </div>
                </label>
                
                <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-cocinarte-navy/10 cursor-pointer transition-colors">
                  <input 
                    type="radio" 
                    name="package" 
                    value="premium-party" 
                    className="mr-2 text-cocinarte-orange focus:ring-cocinarte-orange"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-slate text-sm">Premium Fiesta</div>
                    <div className="text-xs text-slate-medium">$750 • 16 kids • 3 hours</div>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Parent/Guardian Name *
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number *
                </label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 py-3 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10"
                  placeholder="(503) 123-4567"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Birthday Child's Name & Age
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10"
                  placeholder="e.g., Maria, age 8"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Special Requests or Dietary Restrictions
              </label>
              <textarea 
                rows={2}
                className="w-full px-4 py-3 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10 resize-none"
                placeholder="Any allergies, special themes, or requests..."
              ></textarea>
            </div>
            
          <div className="text-center">
              <Button 
                type="submit"
                className="bg-cocinarte-orange hover:bg-amber text-cocinarte-white font-bold px-6 py-3 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Submit Party Request
              </Button>
              <p className="text-xs text-slate-medium mt-3">
                We'll contact you within 24 hours to confirm availability!
              </p>
          </div>
          </form>
        </div>
      </div>
    </section>
  )
}
