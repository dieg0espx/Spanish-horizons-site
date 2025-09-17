import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Heart, Sparkles } from "lucide-react"

export default function CocinarteClassTypes() {
  return (
    <section id="classes" className="py-20 bg-gradient-to-br from-amber-50 to-golden-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
            Our Class Types
          </h2>
          <p className="text-xl text-slate-medium max-w-3xl mx-auto">
            We offer different class formats to suit every family's needs and schedule.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-amber-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate">Mini Chef Classes</CardTitle>
              <CardDescription className="text-amber font-semibold text-lg">Ages 7-12</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-medium mb-4 text-lg">
                Kids are dropped off and guided by our instructors. Perfect for building 
                independence and cooking confidence.
              </p>
              <div className="space-y-2 text-sm text-slate-medium">
                <p>• 1.5-2 hours per class</p>
                <p>• Age-appropriate tools</p>
                <p>• Close supervision</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-golden-50 to-golden-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate">Mom & Me Classes</CardTitle>
              <CardDescription className="text-golden font-semibold text-lg">All Ages with Adult</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-medium mb-4 text-lg">
                Parents participate in the cooking experience together with their child. 
                Great for younger children and family bonding.
              </p>
              <div className="space-y-2 text-sm text-slate-medium">
                <p>• Family participation</p>
                <p>• Younger children welcome</p>
                <p>• Shared learning experience</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-golden-50 to-golden-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-slate rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate">Specialty Workshops</CardTitle>
              <CardDescription className="text-amber font-semibold text-lg">Teens & Adults</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-medium mb-4 text-lg">
                Advanced workshops for teens and adults. Perfect for birthday parties, 
                private events, and special occasions.
              </p>
              <div className="space-y-2 text-sm text-slate-medium">
                <p>• Custom options available</p>
                <p>• Private group classes</p>
                <p>• Birthday party packages</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
