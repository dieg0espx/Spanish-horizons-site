import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Utensils, Users } from "lucide-react"

export default function CocinarteAbout() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
            What is Cocinarte?
          </h2>
          <p className="text-xl text-slate-medium max-w-3xl mx-auto">
            A cooking program designed for kids and families to explore Latin flavors while learning 
            hands-on cooking skills. Each class is fun, interactive, and age-appropriate — no prior 
            cooking experience needed!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-amber-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate">Hands-On Learning</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-slate-medium text-lg font-questa">
                Interactive cooking experiences where kids learn by doing, building confidence 
                and skills in the kitchen.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate">Latin Flavors</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-slate-medium text-lg font-questa">
                Explore authentic Latin American cuisine and discover new flavors, ingredients, 
                and cooking techniques.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-golden-50 to-golden-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-golden-50 to-golden-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate">Family Fun</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-slate-medium text-lg font-questa">
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
