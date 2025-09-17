import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CocinarteBirthday() {
  return (
    <section id="birthday-parties" className="py-20 bg-gradient-to-br from-pink-100 via-purple-100 to-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
            🎉 Birthday Party Packages
          </h2>
          <p className="text-xl text-slate-medium max-w-3xl mx-auto">
            Make your child's birthday unforgettable with our fun cooking party packages!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎂</span>
              </div>
              <CardTitle className="text-2xl text-slate">Mini Party</CardTitle>
              <CardDescription className="text-amber font-bold text-lg">Up to 8 kids</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <p className="text-3xl font-bold text-amber">$350</p>
                <ul className="text-slate-medium space-y-2">
                  <li>• 2-hour cooking session</li>
                  <li>• All ingredients included</li>
                  <li>• Birthday cake making</li>
                  <li>• Take-home treats</li>
                  <li>• Party decorations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-2 border-purple-400">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎈</span>
              </div>
              <CardTitle className="text-2xl text-slate">Deluxe Party</CardTitle>
              <CardDescription className="text-amber font-bold text-lg">Up to 12 kids</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <p className="text-3xl font-bold text-amber">$500</p>
                <ul className="text-slate-medium space-y-2">
                  <li>• 2.5-hour cooking session</li>
                  <li>• All ingredients included</li>
                  <li>• Custom birthday cake</li>
                  <li>• Take-home goodie bags</li>
                  <li>• Full party decorations</li>
                  <li>• Professional photos</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-golden-50 to-golden-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-slate rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <CardTitle className="text-2xl text-slate">Premium Party</CardTitle>
              <CardDescription className="text-slate-medium font-bold text-lg">Up to 16 kids</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <p className="text-3xl font-bold text-slate-medium">$750</p>
                <ul className="text-slate-medium space-y-2">
                  <li>• 3-hour cooking session</li>
                  <li>• All ingredients included</li>
                  <li>• Custom themed cake</li>
                  <li>• Premium goodie bags</li>
                  <li>• Themed decorations</li>
                  <li>• Professional photos & video</li>
                  <li>• Party coordinator</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Birthday Party Request Form */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-3xl font-bold text-center text-slate mb-8">Request Your Party</h3>
          <form className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-medium mb-2">Child's Name</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-medium mb-2">Preferred Date</label>
              <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-medium mb-2">Number of Children</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                <option>Select number</option>
                <option>4-8 kids (Mini Party)</option>
                <option>9-12 kids (Deluxe Party)</option>
                <option>13-16 kids (Premium Party)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-medium mb-2">Package Selection</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                <option>Select package</option>
                <option>Mini Party - $350</option>
                <option>Deluxe Party - $500</option>
                <option>Premium Party - $750</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-medium mb-2">Special Requests</label>
              <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Any dietary restrictions, theme preferences, or special requests..."></textarea>
            </div>
            <div className="md:col-span-2 text-center">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                Submit Request
              </Button>
              <p className="text-sm text-slate-medium mt-4">We'll call you within 24 hours to confirm availability!</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
