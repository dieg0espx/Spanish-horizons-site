import CocinarteHeader from "@/components/cocinarte/cocinarte-header"
import CocinarteFooter from "@/components/cocinarte/cocinarte-footer"
import CocinarteHero from "@/components/cocinarte/cocinarte-hero"
import CocinarteCalendar from "@/components/cocinarte/cocinarte-calendar"
import CocinarteAbout from "@/components/cocinarte/cocinarte-about"
import CocinarteClassTypes from "@/components/cocinarte/cocinarte-class-types"
import CocinarteSafety from "@/components/cocinarte/cocinarte-safety"
import CocinarteBirthday from "@/components/cocinarte/cocinarte-birthday"
import CocinartePrivateEvents from "@/components/cocinarte/cocinarte-private-events"
import CocinarteFAQ from "@/components/cocinarte/cocinarte-faq"
import CocinarteContact from "@/components/cocinarte/cocinarte-contact"
import CocinarteCTA from "@/components/cocinarte/cocinarte-cta"

export default function CocinartePage() {
  return (
    <div className="min-h-screen bg-white">
      <CocinarteHeader />
      <CocinarteHero />
      <CocinarteAbout />
      <CocinarteCalendar />
      <CocinarteClassTypes />
      <CocinarteSafety />
      <CocinarteBirthday />
      <CocinartePrivateEvents />
      <CocinarteFAQ />
      <CocinarteContact />
      <CocinarteCTA />
      <CocinarteFooter />
    </div>
  )
}
