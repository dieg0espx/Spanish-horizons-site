import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CocinarteCTA() {
  return (
    <section id="register" className="py-20 bg-slate text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Ready to Start Your Cooking Adventure?
          </h2>
          <p className="text-xl text-white">
            Join Cocinarte and give your child the gift of culinary exploration, cultural learning, 
            and hands-on cooking skills in a fun, safe environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-golden hover:bg-amber text-slate font-medium px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <Link href="#contact" className="flex items-center">
                Register Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-cocinarte-white text-white hover:bg-cocinarte-white hover:text-slate-medium font-medium px-8 py-4 text-lg rounded-xl transition-all duration-200">
              <Link href="#faq">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
