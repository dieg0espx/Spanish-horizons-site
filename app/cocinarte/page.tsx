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
import Image from "next/image"

export default function CocinartePage() {
  return (
    <>
      <div className="min-h-screen bg-white font-coming-soon relative overflow-hidden" style={{ fontFamily: 'Coming Soon, cursive' }} data-page="cocinarte">
        {/* Floating elements around the entire page */}
        <Image
          src="/cocinarte/floating_elements/COCINARTE_cupcakes.png"
          alt="Cupcakes"
          width={60}
          height={60}
          className="absolute top-20 left-8 opacity-30 animate-float-slow pointer-events-none"
        />
        <Image
          src="/cocinarte/floating_elements/COCINARTE_frutas.png"
          alt="Fruits"
          width={50}
          height={50}
          className="absolute top-32 right-12 opacity-25 animate-float-medium pointer-events-none"
        />
        <Image
          src="/cocinarte/floating_elements/COCINARTE_cuchara.png"
          alt="Spoon"
          width={45}
          height={45}
          className="absolute top-64 left-16 opacity-20 animate-float-slow pointer-events-none"
        />
        <Image
          src="/cocinarte/floating_elements/COCINARTE_tenedor.png"
          alt="Fork"
          width={40}
          height={40}
          className="absolute top-80 right-20 opacity-25 animate-float-medium pointer-events-none"
        />
        <Image
          src="/cocinarte/floating_elements/COCINARTE_plato.png"
          alt="Plate"
          width={55}
          height={55}
          className="absolute top-96 left-12 opacity-20 animate-float-slow pointer-events-none"
        />
        <Image
          src="/cocinarte/floating_elements/COCINARTE_olla .png"
          alt="Pot"
          width={65}
          height={65}
          className="absolute top-[500px] right-8 opacity-30 animate-float-medium pointer-events-none"
        />
        <Image
          src="/cocinarte/floating_elements/COCINARTE_utensilios.png"
          alt="Utensils"
          width={50}
          height={50}
          className="absolute top-[600px] left-20 opacity-25 animate-float-slow pointer-events-none"
        />
        <Image
          src="/cocinarte/floating_elements/COCINARTE_tetera.png"
          alt="Teapot"
          width={60}
          height={60}
          className="absolute top-[700px] right-16 opacity-20 animate-float-medium pointer-events-none"
        />
        <Image
          src="/cocinarte/floating_elements/COCINARTE_comida.png"
          alt="Food"
          width={70}
          height={70}
          className="absolute top-[800px] left-8 opacity-25 animate-float-slow pointer-events-none"
        />
        <Image
          src="/cocinarte/floating_elements/COCINARTE_tabla corte.png"
          alt="Cutting Board"
          width={55}
          height={55}
          className="absolute top-[900px] right-12 opacity-20 animate-float-medium pointer-events-none"
        />

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
    </>
  )
}
