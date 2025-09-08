import FAQSection from "@/components/faq-section"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageCircle, Phone } from "lucide-react"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate rounded-full text-white text-sm font-questa font-medium mb-6">
              <HelpCircle className="h-4 w-4 mr-2" />
              Get Your Questions Answered
            </div>
            <h1 className="text-5xl md:text-6xl font-ivry font-bold text-white mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-white max-w-3xl mx-auto font-questa">
              Find answers to common questions about our K-5 Spanish immersion program, admissions process, and school
              community.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-ivry font-bold text-slate mb-6">Still Have Questions?</h2>
            <p className="text-xl text-slate-medium mb-12 font-questa">
              Our admissions team is here to help you understand our program and find the best fit for your family. All
              conversations are confidential and welcoming.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="w-16 h-16 bg-slate rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-slate" />
                </div>
                <h3 className="text-2xl font-ivry font-bold text-slate mb-4">Call Us</h3>
                <p className="text-slate-medium mb-6 font-questa">Speak directly with our admissions team during office hours</p>
                <Button className="bg-amber hover:bg-golden hover:text-slate text-white px-8 py-3 rounded-xl font-questa font-semibold">
                  <a href="tel:5039169758">(503) 916-9758</a>
                </Button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="w-16 h-16 bg-golden-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-golden" />
                </div>
                <h3 className="text-2xl font-ivry font-bold text-slate mb-4">Schedule a Tour</h3>
                <p className="text-slate-medium mb-6 font-questa">Experience our learning environment and meet our team in person</p>
                <Button className="bg-amber hover:bg-golden hover:text-slate text-white px-8 py-3 rounded-xl font-questa font-semibold">
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
