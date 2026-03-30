"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import Script from "next/script"

const pageContent = `If you are searching for Spanish classes for kids in the Portland metro area, you are already giving your child a head start. Learning a second language early is one of the most valuable gifts a parent can offer -- and choosing the right program makes all the difference in whether that language actually sticks.

Research consistently shows that children who begin language learning before age 10 develop stronger fluency, better pronunciation, and deeper cultural understanding than those who start later. The brain is wired for language acquisition during these early years, and the window does not stay open forever. For families in Hillsboro, Beaverton, Portland, and surrounding communities, the question is not whether your child should learn Spanish -- it is how to find a program that delivers real, lasting results.

This guide covers why early Spanish instruction matters, the types of programs available in the Portland area, what to look for in a quality bilingual education program, and why full language immersion for children consistently outperforms every other approach.


## Why Start Spanish Classes Early?

The science is clear: young children are language learning machines. Between birth and age 10, the brain forms neural connections for language at a pace that slows dramatically after puberty. Children in this window can absorb new sounds, grammar patterns, and vocabulary with a naturalness that older learners simply cannot replicate.

Beyond fluency, early Spanish instruction for kids builds cognitive advantages that extend well beyond the language itself:

- **Stronger executive function.** Bilingual children develop better attention control, task-switching ability, and working memory -- skills that support learning in every subject.
- **Improved problem-solving and creativity.** Managing two languages trains the brain to think flexibly and approach problems from multiple angles.
- **Academic performance.** Studies show that students in bilingual education programs often outperform their monolingual peers on standardized tests, including in English and math.
- **Career readiness.** Spanish is the second most spoken language in the United States, with over 41 million native speakers. Bilingual professionals have access to broader career opportunities in healthcare, education, business, law, and public service.

Starting early is not just beneficial -- it is strategic.


## Types of Spanish Classes for Kids in the Portland Area

Families in the Portland metro area have several options for introducing their children to Spanish. Understanding the differences helps you choose the right fit.

- **After-school Spanish classes.** These programs typically meet once or twice a week for one to two hours per session. They introduce vocabulary and basic phrases but offer limited exposure -- roughly 2-4 hours per week.
- **Weekend language programs.** Similar to after-school options, weekend classes provide structured instruction but with minimal weekly contact hours. Children enjoy the experience, but deep fluency is difficult to achieve at this pace.
- **Summer Spanish camps.** Seasonal immersion camps offer concentrated exposure over a few weeks. They are excellent for sparking interest and building confidence, but the gains can fade without ongoing reinforcement.
- **Full Spanish immersion schools.** In an immersive language learning environment, children receive the majority of their academic instruction in Spanish -- typically 5-6 hours per day, five days a week. This is the gold standard for language acquisition, and decades of research confirm it produces the strongest outcomes in both fluency and academic achievement.

The difference comes down to hours of exposure. A child in an after-school program might accumulate 80-100 hours of Spanish per year. A child in a full immersion elementary Spanish program receives over 1,000 hours annually. That gap in exposure translates directly into a gap in outcomes.


## What Makes Spanish Horizons Academy Different

Spanish Horizons Academy is a K-5 Spanish immersion school in Hillsboro, Oregon, built on the belief that every child can become bilingual when given the right environment. The school serves families across Hillsboro, Beaverton, Portland, and the wider Portland metro area.

Here is what sets the program apart:

- **80/20 immersion model.** Students receive approximately 80% of their daily instruction in Spanish and 20% in English Language Arts. This balance ensures strong Spanish acquisition while maintaining grade-level English literacy skills. Children are surrounded by Spanish throughout the day -- not just during a single class period.
- **No prior Spanish required.** The program is designed for children with no previous Spanish experience. Students naturally acquire the language through daily hands-on language learning, classroom interaction, and academic content delivered in Spanish.
- **Small class sizes.** Each grade has just 12-16 students, allowing teachers to provide individualized attention and ensuring every child is actively engaged.
- **Expeditionary Learning methodology.** Instruction follows a project-based, hands-on approach. Students do not memorize vocabulary lists -- they use Spanish to investigate real-world topics, solve problems, and create meaningful work.
- **Cultural enrichment for children.** Language learning at Spanish Horizons goes beyond grammar and vocabulary. Students experience Spanish-speaking cultures through cooking, music, art, dance, and outdoor learning expeditions. This cultural integration builds genuine connection to the language and the communities that speak it.
- **Experienced leadership.** The school was founded by Laura Paz-Whitmore as part of the Casita Azul family of schools, bringing years of expertise in immersive language learning and bilingual education to the Hillsboro community.

Spanish Horizons Academy is not a supplement to your child's education -- it is a complete elementary school experience delivered through the lens of Spanish immersion.


## What Parents Should Look For in a Kids' Spanish Program

Not all Spanish programs deliver the same results. Whether you are evaluating an after-school Spanish class, a weekend program, or a full immersion school, here are the factors that matter most:

- **Teacher qualifications and native-speaker instruction.** Children learn pronunciation, rhythm, and natural expression best from fluent or native speakers with training in language pedagogy.
- **Total hours of language exposure per week.** More contact hours produce better outcomes. Ask how many hours per week your child will actually hear and use Spanish.
- **Curriculum structure.** Programs built on immersion -- where Spanish is the medium of instruction, not just the subject -- produce deeper fluency than translation-based approaches.
- **Class size and student-to-teacher ratio.** Smaller classes mean more speaking opportunities for each child and more personalized feedback from teachers.
- **Cultural integration.** The best programs teach language in context, weaving in the history, art, food, music, and traditions of Spanish-speaking cultures.
- **Parent communication and progress updates.** Look for programs that keep families informed about their child's development and provide clear benchmarks for language growth.

Ask specific questions, visit classrooms, and trust your instincts. The right program will feel both rigorous and joyful.`

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "At what age should my child start learning Spanish?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Research shows the earlier the better -- ages 0-7 are the optimal window for language acquisition, when the brain is most receptive to new sounds and grammar patterns. Spanish Horizons Academy accepts students starting in Kindergarten at age 5, placing them right in the heart of this critical learning period."
      }
    },
    {
      "@type": "Question",
      "name": "Does my child need to know Spanish before enrolling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Spanish Horizons Academy's 80/20 immersion model is specifically designed for children with no prior Spanish experience. Children naturally acquire the language through daily immersion -- hearing it, using it, and thinking in it throughout the school day. Within months, most students are communicating comfortably in Spanish."
      }
    },
    {
      "@type": "Question",
      "name": "How many hours of Spanish instruction do kids receive?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At Spanish Horizons Academy, students receive approximately 80% of their instruction in Spanish -- roughly 5-6 hours per day, five days a week. That adds up to over 1,000 hours of Spanish exposure per year, compared to just 80-100 hours in a typical after-school Spanish class."
      }
    },
    {
      "@type": "Question",
      "name": "What areas do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spanish Horizons Academy is located at 770 NE Rogahn Street in Hillsboro, Oregon. We serve families from Hillsboro, Beaverton, Portland, and communities throughout the greater Portland metro area."
      }
    }
  ]
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Spanish Horizons Academy",
  "description": "K-5 Spanish immersion school offering small classes of 12-16 students with an 80/20 immersion model. No prior Spanish needed.",
  "url": "https://spanishhorizonsacademy.com/spanish-classes-for-kids",
  "telephone": "+1-503-916-9758",
  "email": "infospanishhorizons@casitaazulpdx.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "770 NE Rogahn Street",
    "addressLocality": "Hillsboro",
    "addressRegion": "OR",
    "postalCode": "97124",
    "addressCountry": "US"
  },
  "openingHours": "Mo-Fr 08:00-16:00",
  "areaServed": [
    { "@type": "City", "name": "Hillsboro" },
    { "@type": "City", "name": "Beaverton" },
    { "@type": "City", "name": "Portland" }
  ],
  "serviceType": "Spanish Immersion Education",
  "priceRange": "$$"
}

export default function SpanishClassesForKidsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Section */}
      <section className="relative flex flex-col justify-end min-h-[380px] md:h-[500px]">
        <Image
          src="https://res.cloudinary.com/dku1gnuat/image/upload/v1774860529/Spanish_Horizons_Academy_Blog_1_Spanish_Classes_for_Kids_xifbgb.webp"
          alt="Spanish classes for kids at Spanish Horizons Academy in Hillsboro, Oregon"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate/95 via-slate/50 to-slate/20 md:from-slate/90 md:via-slate/40 md:to-transparent" />
        <div className="relative mt-auto pb-6 pt-24 md:pb-12 md:pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl md:text-5xl font-ivry font-bold text-white leading-tight">
              Spanish Classes for Kids in Hillsboro & Portland, Oregon
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-base md:prose-lg max-w-none
            prose-headings:font-ivry prose-headings:font-bold prose-headings:text-slate
            prose-h2:text-xl prose-h2:md:text-3xl prose-h2:mt-8 prose-h2:md:mt-12 prose-h2:mb-4 prose-h2:md:mb-6
            prose-h3:text-lg prose-h3:md:text-2xl prose-h3:mt-6 prose-h3:md:mt-8 prose-h3:mb-3 prose-h3:md:mb-4
            prose-p:font-questa prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-[15px] prose-p:md:text-lg
            prose-li:font-questa prose-li:text-gray-700 prose-li:text-[15px] prose-li:md:text-lg
            prose-strong:text-slate
            prose-a:text-amber prose-a:no-underline hover:prose-a:underline
            prose-ul:my-4 prose-ul:md:my-6
          ">
            <ReactMarkdown>{pageContent}</ReactMarkdown>
          </article>

          {/* FAQ Section */}
          <div className="mt-10 md:mt-16">
            <h2 className="text-xl md:text-3xl font-ivry font-bold text-slate mb-6 md:mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-ivry font-bold text-slate mb-2">
                  At what age should my child start learning Spanish?
                </h3>
                <p className="font-questa text-gray-700 text-[15px] md:text-lg leading-relaxed">
                  Research shows the earlier the better — ages 0-7 are the optimal window for language acquisition, when the brain is most receptive to new sounds and grammar patterns. Spanish Horizons Academy accepts students starting in Kindergarten at age 5, placing them right in the heart of this critical learning period.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-ivry font-bold text-slate mb-2">
                  Does my child need to know Spanish before enrolling?
                </h3>
                <p className="font-questa text-gray-700 text-[15px] md:text-lg leading-relaxed">
                  No. Spanish Horizons Academy&apos;s 80/20 immersion model is specifically designed for children with no prior Spanish experience. Children naturally acquire the language through daily immersion — hearing it, using it, and thinking in it throughout the school day. Within months, most students are communicating comfortably in Spanish.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-ivry font-bold text-slate mb-2">
                  How many hours of Spanish instruction do kids receive?
                </h3>
                <p className="font-questa text-gray-700 text-[15px] md:text-lg leading-relaxed">
                  At Spanish Horizons Academy, students receive approximately 80% of their instruction in Spanish — roughly 5-6 hours per day, five days a week. That adds up to over 1,000 hours of Spanish exposure per year, compared to just 80-100 hours in a typical after-school Spanish class. This difference in contact hours is the single biggest factor in achieving true bilingual fluency.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-ivry font-bold text-slate mb-2">
                  What areas do you serve?
                </h3>
                <p className="font-questa text-gray-700 text-[15px] md:text-lg leading-relaxed">
                  Spanish Horizons Academy is located at 770 NE Rogahn Street in Hillsboro, Oregon. We serve families from Hillsboro, Beaverton, Portland, and communities throughout the greater Portland metro area.
                </p>
              </div>
            </div>
          </div>

          {/* Closing Section */}
          <div className="mt-10 md:mt-16">
            <h2 className="text-xl md:text-3xl font-ivry font-bold text-slate mb-4 md:mb-6">
              Give Your Child the Gift of Bilingual Fluency
            </h2>
            <div className="font-questa text-gray-700 text-[15px] md:text-lg leading-relaxed space-y-4">
              <p>
                If you want your child to truly become bilingual — not just learn a few phrases, but think, read, and communicate confidently in Spanish — immersion is the most effective path. The research is consistent, the results are proven, and the earlier you start, the stronger the foundation.
              </p>
              <p>
                Spanish Horizons Academy gives children in the Portland metro area access to a world-class Spanish immersion experience with small classes, dedicated teachers, and a curriculum that makes learning feel like an adventure.
              </p>
              <p>
                See it for yourself. Schedule a tour to visit our Spanish immersion classrooms in Hillsboro, meet our teachers, and watch bilingual learning in action.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 md:mt-16 bg-slate rounded-2xl p-6 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-ivry font-bold text-white mb-3 md:mb-4">
              Schedule a Tour at Spanish Horizons Academy
            </h2>
            <p className="text-white/90 font-questa text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
              Visit our Hillsboro campus and see how our students are building bilingual fluency through hands-on, immersive learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-amber hover:bg-golden hover:text-slate text-white px-8 py-3 rounded-xl font-questa font-semibold text-lg"
              >
                <Link href="/admissions">Schedule a Tour</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate px-8 py-3 rounded-xl font-questa font-semibold text-lg"
              >
                <Link href="/programs">Explore Our Program</Link>
              </Button>
            </div>
          </div>

          {/* Internal Links */}
          <div className="mt-8 md:mt-12 flex flex-wrap gap-3">
            <Link href="/programs" className="inline-flex items-center text-amber font-questa font-semibold text-sm hover:underline">
              K-5 Spanish Immersion Program <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
            <Link href="/admissions" className="inline-flex items-center text-amber font-questa font-semibold text-sm hover:underline">
              Schedule a Tour <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
            <Link href="/about" className="inline-flex items-center text-amber font-questa font-semibold text-sm hover:underline">
              Expeditionary Learning <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
            <Link href="/tuition" className="inline-flex items-center text-amber font-questa font-semibold text-sm hover:underline">
              Tuition and Enrollment <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
