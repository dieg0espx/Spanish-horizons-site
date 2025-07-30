import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, Utensils, Heart, Calculator, HelpCircle, ChevronRight } from "lucide-react"

export default function TuitionPage() {
  const tuitionData = [
    {
      paymentOption: "Monthly (10 months)",
      kindergarten: "$1,561",
      grades1to5: "$1,752",
      description: "September through June",
    },
    {
      paymentOption: "60/40 Split",
      kindergarten: "$8,933 + $5,955",
      grades1to5: "$9,655 + $6,436",
      description: "Two payments per year",
    },
    {
      paymentOption: "Annual (3% discount)",
      kindergarten: "$14,443.49",
      grades1to5: "$15,609.24",
      description: "Full year paid in advance",
    },
  ]

  const aftercarePricing = [
    {
      plan: "5 Days/Week",
      price: "$550/month",
      description: "Monday through Friday coverage",
    },
    {
      plan: "3 Days/Week",
      price: "$450/month",
      description: "Flexible three-day schedule",
    },
    {
      plan: "Drop-In",
      price: "Prorated daily rate",
      description: "Space permitting basis",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate-light rounded-full text-white text-sm font-questa font-medium mb-6">
              <DollarSign className="h-4 w-4 mr-2" />
              Transparent Pricing
            </div>
            <h1 className="text-5xl md:text-6xl font-ivry font-bold text-white mb-6">Tuition & Enrollment</h1>
            <p className="text-xl text-white max-w-3xl mx-auto mb-8 font-questa">
              Transparent pricing for our K-5 Spanish immersion program. Multiple payment options and financial
              assistance available to support diverse families.
            </p>
            <Button
              size="lg"
              className="bg-amber hover:bg-golden hover:text-slate text-white px-8 py-4 rounded-xl font-questa font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <a href="/admissions" className="flex items-center">
                Apply Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 2025-2026 Tuition Structure */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-ivry font-bold text-slate mb-4">2025-2026 Tuition Structure</h2>
            <p className="text-lg text-slate-medium font-questa">Flexible payment options to meet your family's needs</p>
          </div>

          <Card className="max-w-6xl mx-auto shadow-2xl border-0 bg-white">
            <CardHeader className="bg-slate-light border-b border-slate-light">
              <CardTitle className="text-center text-3xl font-ivry font-bold text-white">Annual Tuition Rates</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-questa font-semibold text-slate">Payment Option</th>
                      <th className="text-center py-4 px-4 font-questa font-semibold text-slate">Kindergarten</th>
                      <th className="text-center py-4 px-4 font-questa font-semibold text-slate">Grades 1–5</th>
                      <th className="text-center py-4 px-4 font-questa font-semibold text-slate">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tuitionData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-slate-light hover:text-white">
                        <td className="py-4 px-4 font-questa font-medium ">{row.paymentOption}</td>
                        <td className="py-4 px-4 text-center  font-questa font-semibold">{row.kindergarten}</td>
                        <td className="py-4 px-4 text-center  font-questa font-semibold">{row.grades1to5}</td>
                        <td className="py-4 px-4 text-center text-sm font-questa">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-slate-light rounded-lg">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 text-slate mr-2" />
                  <h4 className="font-questa font-semibold text-white">Enrollment Fee</h4>
                </div>
                <p className="text-white/50 font-questa">
                  <strong>$295</strong> enrollment fee required for all grades (Kindergarten through Grade 5)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Costs */}
      <section className="py-16 bg-slate-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-ivry font-bold text-white mb-4">Additional Services</h2>
            <p className="text-lg text-white/50 font-questa">Optional programs to enhance your child's experience</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Meal Plan */}
            <Card className="border-2 border-amber-light hover:border-amber transition-colors">
              <CardHeader className="bg-gradient-to-r from-amber-light to-amber-light">
                <CardTitle className="flex items-center text-white">
                  <Utensils className="h-6 w-6 text-white mr-3" />
                  Nutritious Meal Plan
                  <Badge className="ml-auto bg-amber text-white text-xs font-questa">Optional</Badge>
                </CardTitle>
                <p className="text-sm text-white mt-2 font-questa">Fresh, culturally-inspired meals prepared daily</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-ivry font-bold text-amber mb-1">$125</div>
                  <div className="text-sm text-slate-medium mb-4 font-questa">per month</div>
                  <div className="bg-amber-light rounded-lg p-3 mb-4">
                    <p className="text-sm font-questa font-medium text-white">Includes: Breakfast • Lunch • 2 Snacks</p>
                  </div>
                </div>

                <div className="space-y-4 text-slate-medium font-questa">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Freshly prepared by our in-house chef daily</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Authentic Latin American cuisine and flavors</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Nutritionally balanced with organic ingredients</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Allergies and dietary restrictions accommodated</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Cultural learning through food experiences</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-light">
                  <p className="text-xs text-amber text-center font-questa">
                    🍽️ Meals are prepared fresh each morning and served family-style
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Aftercare Program */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center font-ivry text-slate">
                  <Users className="h-6 w-6 text-golden mr-2" />
                  Aftercare Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-slate-medium mb-4 font-questa">
                    <strong>Hours:</strong> 3:15 p.m. – 5:30 p.m.
                    <br />
                    <strong>Environment:</strong> Bilingual programming continues
                  </p>
                </div>

                <div className="space-y-4">
                  {aftercarePricing.map((plan, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-golden-light rounded-lg">
                      <div>
                        <div className="font-questa font-semibold text-slate">{plan.plan}</div>
                        <div className="text-sm text-slate-medium font-questa">{plan.description}</div>
                      </div>
                      <div className="font-questa font-bold text-golden">{plan.price}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-slate-light rounded-lg">
                  <p className="text-sm text-white font-questa">
                    <strong>Includes:</strong> Snacks, cultural activities, homework help (Grades 2+), outdoor play, and
                    mindfulness activities
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Assistance */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-ivry font-bold text-slate mb-4">Financial Assistance</h2>
            <p className="text-lg text-slate-medium font-questa">
              We believe in making quality bilingual education accessible to all families
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-amber mx-auto mb-4" />
                <h3 className="text-xl font-ivry font-semibold mb-3 text-slate">Need-Based Scholarships</h3>
                <p className="text-slate-medium font-questa">
                  Financial assistance available based on family income and demonstrated need. Apply during the
                  admissions process.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-slate mx-auto mb-4" />
                <h3 className="text-xl font-ivry font-semibold mb-3 text-slate">Equity-Based Assistance</h3>
                <p className="text-slate-medium font-questa">
                  Scholarships designed to support diverse families and ensure our community reflects the broader
                  population we serve.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Calculator className="h-12 w-12 text-golden mx-auto mb-4" />
                <h3 className="text-xl font-ivry font-semibold mb-3 text-slate">Sibling Discount</h3>
                <p className="text-slate-medium font-questa">
                  <strong>10% off tuition</strong> for second child (applies to tuition only, not additional fees).
                  Available for aftercare as well.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-4xl mx-auto mt-12 bg-slate-light">
            <CardContent className="p-8 text-center">
              <HelpCircle className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-ivry font-semibold text-white mb-4">Questions About Financial Assistance?</h3>
              <p className="text-white/50 mb-6 font-questa">
                Our admissions team is here to help you understand your options and find the best financial solution for
                your family. All conversations are confidential.
              </p>
              <Button className="bg-amber hover:bg-golden hover:text-slate text-white font-questa">
                <a href="/contact">Contact Admissions</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-slate-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-ivry text-slate">Important Tuition Information</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4 text-slate-medium font-questa">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-slate rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Payment Schedule:</strong> Monthly payments are due on the 1st of each month from September
                    through June (10 payments total).
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-slate rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Enrollment Fee:</strong> One-time $295 enrollment fee is due upon acceptance and is
                    non-refundable.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-slate rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Sibling Discount:</strong> 10% discount applies to tuition only (not enrollment fees, meal
                    plans, or aftercare).
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-slate rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Aftercare Assistance:</strong> Tuition assistance is available for aftercare programs for
                    qualifying families.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-slate rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Payment Methods:</strong> We accept check, ACH transfer, and credit card payments. A small
                    processing fee may apply to credit card transactions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-slate text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-ivry font-bold mb-4">Ready to Invest in Your Child's Future?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto font-questa">
            Join our community of families committed to bilingual, culturally rich education. Contact us to discuss
            enrollment and financial options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber hover:bg-golden hover:text-slate text-white font-questa">
              <a href="/admissions">Start Application</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white bg-transparent font-questa">
              <a href="/contact">Schedule a Tour</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
