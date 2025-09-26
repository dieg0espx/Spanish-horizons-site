import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Utensils, Users } from "lucide-react"
import Image from "next/image"

export default function CocinarteAbout() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-4">
            <Image
              src="/cocinarte/floating_elements/COCINARTE_cuchara.svg"
              alt="Spoon"
              width={80}
              height={80}
              className="opacity-70 animate-float-slow"
            />
            <h2 className="text-4xl lg:text-5xl font-bold text-slate">
              What is Cocinarte?
            </h2>
            <Image
              src="/cocinarte/floating_elements/COCINARTE_cuchillo.svg"
              alt="Knife"
              width={70}
              height={70}
              className="opacity-70 animate-float-medium"
            />
          </div>
          <p className="text-xl text-slate-medium max-w-3xl mx-auto">
            A cooking program designed for kids and families to explore Latin flavors while learning 
            hands-on cooking skills. Each class is fun, interactive, and age-appropriate — no prior 
            cooking experience needed!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-cocinarte-blue">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-cocinarte-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-cocinarte-navy" />
              </div>
              <CardTitle className="text-2xl text-slate font-bold">Hands-On Learning</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-slate-medium text-lg">
                Interactive cooking experiences where kids learn by doing, building confidence 
                and skills in the kitchen.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-cocinarte-blue">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-cocinarte-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-cocinarte-navy" />
              </div>
              <CardTitle className="text-2xl text-slate font-bold">Latin Flavors</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-slate-medium text-lg">
                Explore authentic Latin American cuisine and discover new flavors, ingredients, 
                and cooking techniques.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-cocinarte-blue">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-cocinarte-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-cocinarte-navy" />
              </div>
              <CardTitle className="text-2xl text-slate font-bold">Family Fun</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-slate-medium text-lg">
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
