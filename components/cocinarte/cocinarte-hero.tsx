import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Calendar } from "lucide-react"

export default function CocinarteHero() {
  return (
    <section className="py-20 md:py-20 py-12 bg-cocinarte-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-cocinarte-blue text-cocinarte-navy border-cocinarte-blue px-4 py-2 text-sm">
                <ChefHat className="w-4 h-4 mr-2" />
                Latin Flavors, Hands-On Learning
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-slate">
                Welcome to Cocinarte!
              </h1>
              <p className="text-xl lg:text-2xl text-slate-medium">
                Cooking Adventures for Kids & Families
              </p>
            </div>
            <p className="text-lg text-slate-medium leading-relaxed">
              A cooking program designed for kids and families to explore Latin flavors while learning 
              hands on cooking skills. Each class is fun, interactive, and age-appropriate, no prior 
              cooking experience needed!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-amber hover:bg-golden text-slate px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="#calendar" className="flex items-center">
                  <Calendar className="mr-2 w-5 h-5" />
                  View Classes & Book Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate text-slate hover:bg-slate-light hover:text-white px-8 py-4 text-lg rounded-xl transition-all duration-200">
                <Link href="#faq">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/cocinarte/cocinarteLogo.png"
              alt="Cocinarte - Cooking Adventures for Kids & Families"
              width={500}
              height={500}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
