import { Button } from "@/components/ui/button"

export default function CocinartePrivateEvents() {
  return (
    <section id="private-events" className="py-20 bg-gradient-to-br from-green-100 via-teal-100 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            🍽️ Private Events
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Host your own cooking event! Perfect for team building, celebrations, or special occasions.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-8">Request Private Event</h3>
          <form className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Event Type</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
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
              <input type="number" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="How many people?" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Date</label>
              <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Time</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Select time</option>
                <option>Morning (9 AM - 12 PM)</option>
                <option>Afternoon (1 PM - 4 PM)</option>
                <option>Evening (5 PM - 8 PM)</option>
                <option>Custom time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Name</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
              <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Event Details</label>
              <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Tell us about your event, any specific cuisine preferences, dietary restrictions, or special requirements..."></textarea>
            </div>
            <div className="md:col-span-2 text-center">
              <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                Submit Event Request
              </Button>
              <p className="text-sm text-slate-500 mt-4">We'll contact you within 24 hours with custom pricing and availability!</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
