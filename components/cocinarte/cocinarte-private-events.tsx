"use client"

import { Button } from "@/components/ui/button"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"

export default function CocinartePrivateEvents() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <section id="private-events" className="py-20 bg-gradient-to-br from-cocinarte-blue/10 via-cocinarte-yellow/10 to-cocinarte-orange/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
            Private Events
          </h2>
          <p className="text-xl text-slate-medium max-w-3xl mx-auto">
            Host your own cooking event! Perfect for team building, celebrations, or special occasions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-cocinarte-white rounded-2xl shadow-lg p-8 flex flex-col">
            <form className="space-y-6 flex-1">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Event Type</label>
                <select className="w-full px-4 py-3 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10">
                  <option>Select event type</option>
                  <option>Team Building</option>
                  <option>Corporate Event</option>
                  <option>Family Reunion</option>
                  <option>Anniversary Celebration</option>
                  <option>Holiday Party</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Guests</label>
                <input type="number" className="w-full px-4 py-3 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10" placeholder="How many people?" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Date</label>
                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select a date"
                    className="w-full px-4 py-3 pr-12 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10"
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
                <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Time</label>
                <select className="w-full px-4 py-3 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10">
                  <option>Select time</option>
                  <option>Morning (9 AM - 12 PM)</option>
                  <option>Afternoon (1 PM - 4 PM)</option>
                  <option>Evening (5 PM - 8 PM)</option>
                  <option>Custom time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Name</label>
                <input type="text" className="w-full px-4 py-3 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10" placeholder="(503) 123-4567" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Event Details</label>
                <textarea rows={4} className="w-full px-4 py-3 border-2 border-cocinarte-blue/30 rounded-xl focus:ring-2 focus:ring-cocinarte-orange focus:border-cocinarte-orange transition-all duration-200 text-sm bg-cocinarte-blue/5 hover:bg-cocinarte-blue/10 resize-none" placeholder="Tell us about your event, any specific cuisine preferences, dietary restrictions, or special requirements..."></textarea>
              </div>
              <div className="text-center">
                <Button className="bg-cocinarte-orange hover:bg-amber text-cocinarte-white font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                  Submit Event Request
                </Button>
                <p className="text-sm text-slate-medium mt-4">We'll contact you within 24 hours with custom pricing and availability!</p>
              </div>
            </form>
          </div>

          {/* Slideshow Section */}
          <div className="bg-cocinarte-white rounded-2xl shadow-lg p-8 flex flex-col">
            <div className="relative flex-1">
              <div className="aspect-video bg-gradient-to-br from-cocinarte-blue/20 to-cocinarte-orange/20 rounded-xl flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cocinarte-navy/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-cocinarte-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-medium font-medium">Team Building Event</p>
                  <p className="text-sm text-slate-medium">Corporate cooking workshop</p>
                </div>
              </div>
              
              <div className="aspect-video bg-gradient-to-br from-cocinarte-yellow/20 to-cocinarte-red/20 rounded-xl flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cocinarte-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-cocinarte-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-medium font-medium">Family Celebration</p>
                  <p className="text-sm text-slate-medium">Birthday party cooking class</p>
                </div>
              </div>
              
              <div className="aspect-video bg-gradient-to-br from-cocinarte-red/20 to-cocinarte-navy/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cocinarte-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-cocinarte-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-slate-medium font-medium">Holiday Party</p>
                  <p className="text-sm text-slate-medium">Festive cooking celebration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
