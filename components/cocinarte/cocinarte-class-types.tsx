import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Heart, Sparkles } from "lucide-react"
import Image from "next/image"

export default function CocinarteClassTypes() {
  return (
    <section id="classes" className="py-20 relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/cocinarte/cocinarte3.jpeg"
          alt="Cooking class background"
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
              src="/cocinarte/floating_elements/COCINARTE_frutas.svg"
              alt="Fruits"
              width={90}
              height={90}
              className="opacity-70 animate-float-slow"
            />
            <h2 className="text-4xl lg:text-5xl font-bold text-slate">
              Our Class Types
            </h2>
            <Image
              src="/cocinarte/floating_elements/COCINARTE_niคo1.svg"
              alt="Child cooking"
              width={80}
              height={80}
              className="opacity-70 animate-float-medium"
            />
          </div>
          <p className="text-xl text-slate-medium max-w-3xl mx-auto">
            We offer different class formats to suit every family's needs and schedule.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-100 to-amber-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-amber" />
              </div>
              <CardTitle className="text-2xl text-slate">Mini Chefcitos</CardTitle>
              <CardDescription className="text-amber font-semibold text-lg">Kids Drop-off Classes</CardDescription>
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

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-100 to-amber-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber" />
              </div>
              <CardTitle className="text-2xl text-slate">Chefcitos Together</CardTitle>
              <CardDescription className="text-golden font-semibold text-lg">Family Classes</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-medium mb-4 text-lg">
                Parents or caregivers must participate in the cooking experience together with their child. 
                Great for younger children and family bonding.
              </p>
              <div className="space-y-2 text-sm text-slate-medium">
                <p>• Family participation</p>
                <p>• Younger children welcome - 3 and above</p>
                <p>• Shared learning experience</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-100 to-amber-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-amber" />
              </div>
              <CardTitle className="text-2xl text-slate">Cocina Creativa</CardTitle>
              <CardDescription className="text-amber font-semibold text-lg">Teens & Adults</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-medium mb-4 text-lg">
                Beginner, intermediate, and advanced workshops designed for teens and adults. 
                Perfect for birthday parties, private events, and special occasions.
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
