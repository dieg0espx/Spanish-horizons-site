import { Shield, CheckCircle, Utensils, AlertTriangle, Clock, Users, DollarSign, Heart } from "lucide-react"

export default function CocinarteSafety() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate">
                Safety & Learning Experience
              </h2>
              <p className="text-xl text-slate-medium">
                Safety is our top priority. We create a fun, educational environment where kids 
                can learn essential cooking skills while staying safe and having a great time.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-amber rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-slate mb-2">Safety First</h3>
                  <p className="text-slate-medium text-lg">Kids use age-appropriate tools with close instructor supervision</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-amber rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-slate mb-2">Kitchen Basics</h3>
                  <p className="text-slate-medium text-lg">Learn hand washing, safe chopping techniques, and careful heat use</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-amber rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Utensils className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-slate mb-2">Enjoy Your Creations</h3>
                  <p className="text-slate-medium text-lg">Part of the fun is enjoying the finished dish together, with leftovers to take home</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-amber rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-slate mb-2">Allergy Accommodations</h3>
                  <p className="text-slate-medium text-lg">We adapt recipes for allergies and dietary restrictions when possible</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-cocinarte-yellow/20 to-cocinarte-yellow/40 rounded-xl p-6 text-center">
                  <Clock className="w-12 h-12 text-cocinarte-yellow mx-auto mb-3" />
                  <h3 className="font-semibold text-slate text-xl">1.5-2 Hours</h3>
                  <p className="text-sm text-slate-medium">Per class session</p>
                </div>
                <div className="bg-gradient-to-br from-cocinarte-red/20 to-cocinarte-red/40 rounded-xl p-6 text-center">
                  <Users className="w-12 h-12 text-cocinarte-red mx-auto mb-3" />
                  <h3 className="font-semibold text-slate text-xl">Ages 7-12</h3>
                  <p className="text-sm text-slate-medium">Main program focus</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-cocinarte-blue rounded-xl p-6 text-center">
                  <DollarSign className="w-12 h-12 text-cocinarte-navy mx-auto mb-3" />
                  <h3 className="font-semibold text-slate text-xl">$60-80</h3>
                  <p className="text-sm text-slate-medium">Per child</p>
                </div>
                <div className="bg-gradient-to-br from-cocinarte-yellow/20 to-cocinarte-yellow/40 rounded-xl p-6 text-center">
                  <Heart className="w-12 h-12 text-cocinarte-yellow mx-auto mb-3" />
                  <h3 className="font-semibold text-slate text-xl">Family Fun</h3>
                  <p className="text-sm text-slate-medium">$120-150 per family</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
