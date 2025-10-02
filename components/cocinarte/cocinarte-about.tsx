import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Utensils, Users } from "lucide-react"
import Image from "next/image"

export default function CocinarteAbout() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4">
            <Image
              src="/cocinarte/floating_elements/COCINARTE_cuchara.svg"
              alt="Spoon"
              width={120}
              height={120}
              className="hidden sm:block w-16 h-16 sm:w-20 sm:h-20 lg:w-[120px] lg:h-[120px] opacity-70 animate-float-slow"
            />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate">
              What is Cocinarte?
            </h2>
            <Image
              src="/cocinarte/floating_elements/COCINARTE_cuchillo.svg"
              alt="Knife"
              width={110}
              height={110}
              className="hidden sm:block w-14 h-14 sm:w-18 sm:h-18 lg:w-[110px] lg:h-[110px] opacity-70 animate-float-medium"
            />
          </div>
          <p className="text-lg sm:text-xl text-slate-medium max-w-3xl mx-auto px-4">
            A cooking program designed for kids and families to explore Latin flavors while learning 
            hands-on cooking skills. Each class is fun, interactive, and age-appropriate — no prior 
            cooking experience needed!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-cocinarte-blue">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-cocinarte-blue rounded-full flex items-center justify-center mx-auto mb-3">
                <ChefHat className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-cocinarte-navy" />
              </div>
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-slate font-bold">Hands-On Learning</CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <CardDescription className="text-slate-medium text-sm sm:text-base lg:text-lg leading-relaxed">
                Interactive cooking experiences where kids learn by doing, building confidence 
                and skills in the kitchen.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-cocinarte-blue">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-cocinarte-blue rounded-full flex items-center justify-center mx-auto mb-3">
                <Utensils className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-cocinarte-navy" />
              </div>
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-slate font-bold">Latin Flavors</CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <CardDescription className="text-slate-medium text-sm sm:text-base lg:text-lg leading-relaxed">
                Explore authentic Latin American cuisine and discover new flavors, ingredients, 
                and cooking techniques.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-cocinarte-blue sm:col-span-2 lg:col-span-1">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-cocinarte-blue rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-cocinarte-navy" />
              </div>
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-slate font-bold">Family Fun</CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <CardDescription className="text-slate-medium text-sm sm:text-base lg:text-lg leading-relaxed">
                Perfect for kids and families to cook together, creating lasting memories 
                and bonding experiences.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
