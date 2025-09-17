import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CocinarteFAQ() {
  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-medium max-w-3xl mx-auto">
            Everything you need to know about Cocinarte cooking classes for kids and families.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-slate">What ages can participate?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-medium text-lg">
                Most classes are designed for kids ages 7–12. We also offer "Mom & Me / Family" 
                classes where younger children can join alongside an adult, and specialty workshops 
                for teens or adults.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-slate">Do parents stay during class?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-medium text-lg">
                For our "Mini Chef" classes, kids are dropped off and guided by our instructors. 
                For "Mom & Me" sessions, parents participate in the cooking experience together with their child.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-slate">How long is each class?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-medium text-lg">
                Classes typically run 1.5 to 2 hours, depending on the theme. This includes time 
                to prepare, cook, and enjoy the food.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-slate">How do I register?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-medium text-lg">
                You can sign up directly through our website by selecting the class and date. 
                If a class is full, you'll see an option to join the waitlist.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-slate">Do you accommodate food allergies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-medium text-lg">
                Yes! Please let us know about any allergies or dietary restrictions at registration. 
                While we do our best to adapt recipes, please note that our kitchen handles common 
                allergens (wheat, dairy, eggs, nuts).
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-slate">Will my child eat what they make?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-medium text-lg">
                Yes! Part of the fun is enjoying the finished dish together. If there are leftovers, 
                kids can take them home to share.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-slate">Do you offer birthday parties?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-medium text-lg">
                Absolutely. Cocinarte hosts birthday party packages, private group classes, and 
                special workshops. Contact us for custom options.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-slate">How much does each class cost?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-medium text-lg">
                Pricing varies by class type, but most range from $60–$80 per child for Mini Chef 
                classes and $120–$150 per family for Mom/Dad & Me sessions. Prices include all 
                ingredients and supplies.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
