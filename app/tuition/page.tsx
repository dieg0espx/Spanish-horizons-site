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
      <section className="bg-blue-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
              <DollarSign className="h-4 w-4 mr-2" />
              Transparent Pricing
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Tuition & Enrollment</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Transparent pricing for our K-5 Spanish immersion program. Multiple payment options and financial
              assistance available to support diverse families.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2025-2026 Tuition Structure</h2>
            <p className="text-lg text-gray-600">Flexible payment options to meet your family's needs</p>
          </div>

          <Card className="max-w-6xl mx-auto shadow-2xl border-0 bg-white">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-center text-3xl font-bold text-gray-900">Annual Tuition Rates</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-900">Payment Option</th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-900">Kindergarten</th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-900">Grades 1–5</th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-900">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tuitionData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-900">{row.paymentOption}</td>
                        <td className="py-4 px-4 text-center text-blue-700 font-semibold">{row.kindergarten}</td>
                        <td className="py-4 px-4 text-center text-blue-700 font-semibold">{row.grades1to5}</td>
                        <td className="py-4 px-4 text-center text-gray-600 text-sm">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-800">Enrollment Fee</h4>
                </div>
                <p className="text-blue-700">
                  <strong>$295</strong> enrollment fee required for all grades (Kindergarten through Grade 5)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Costs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-lg text-gray-600">Optional programs to enhance your child's experience</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Meal Plan */}
            <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                <CardTitle className="flex items-center text-orange-800">
                  <Utensils className="h-6 w-6 text-orange-600 mr-3" />
                  Nutritious Meal Plan
                  <Badge className="ml-auto bg-orange-200 text-orange-800 text-xs">Optional</Badge>
                </CardTitle>
                <p className="text-sm text-orange-700 mt-2">Fresh, culturally-inspired meals prepared daily</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-orange-600 mb-1">$125</div>
                  <div className="text-sm text-gray-600 mb-4">per month</div>
                  <div className="bg-orange-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-orange-800">Includes: Breakfast • Lunch • 2 Snacks</p>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Freshly prepared by our in-house chef daily</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Authentic Latin American cuisine and flavors</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Nutritionally balanced with organic ingredients</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Allergies and dietary restrictions accommodated</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Cultural learning through food experiences</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-orange-100">
                  <p className="text-xs text-orange-600 text-center">
                    🍽️ Meals are prepared fresh each morning and served family-style
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Aftercare Program */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 text-purple-600 mr-2" />
                  Aftercare Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-gray-700 mb-4">
                    <strong>Hours:</strong> 3:15 p.m. – 5:30 p.m.
                    <br />
                    <strong>Environment:</strong> Bilingual programming continues
                  </p>
                </div>

                <div className="space-y-4">
                  {aftercarePricing.map((plan, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-purple-800">{plan.plan}</div>
                        <div className="text-sm text-purple-600">{plan.description}</div>
                      </div>
                      <div className="font-bold text-purple-700">{plan.price}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Assistance</h2>
            <p className="text-lg text-gray-600">
              We believe in making quality bilingual education accessible to all families
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Need-Based Scholarships</h3>
                <p className="text-gray-600">
                  Financial assistance available based on family income and demonstrated need. Apply during the
                  admissions process.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Equity-Based Assistance</h3>
                <p className="text-gray-600">
                  Scholarships designed to support diverse families and ensure our community reflects the broader
                  population we serve.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Calculator className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Sibling Discount</h3>
                <p className="text-gray-600">
                  <strong>10% off tuition</strong> for second child (applies to tuition only, not additional fees).
                  Available for aftercare as well.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-4xl mx-auto mt-12 bg-blue-50">
            <CardContent className="p-8 text-center">
              <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Questions About Financial Assistance?</h3>
              <p className="text-blue-700 mb-6">
                Our admissions team is here to help you understand your options and find the best financial solution for
                your family. All conversations are confidential.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <a href="/contact">Contact Admissions</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Important Tuition Information</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Payment Schedule:</strong> Monthly payments are due on the 1st of each month from September
                    through June (10 payments total).
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Enrollment Fee:</strong> One-time $295 enrollment fee is due upon acceptance and is
                    non-refundable.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Sibling Discount:</strong> 10% discount applies to tuition only (not enrollment fees, meal
                    plans, or aftercare).
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>
                    <strong>Aftercare Assistance:</strong> Tuition assistance is available for aftercare programs for
                    qualifying families.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
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
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Invest in Your Child's Future?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our community of families committed to bilingual, culturally rich education. Contact us to discuss
            enrollment and financial options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <a href="/admissions">Start Application</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 bg-transparent">
              <a href="/contact">Schedule a Tour</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
