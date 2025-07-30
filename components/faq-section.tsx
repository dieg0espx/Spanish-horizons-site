"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "Do families need to speak Spanish to enroll?",
    answer:
      "No! No Spanish language experience is required for families. Our 80/20 immersion model is designed to support all learners, regardless of their family's Spanish proficiency. Many of our most successful students come from English-speaking families.",
  },
  {
    id: 2,
    question: "What is the 80/20 Spanish immersion model?",
    answer:
      "In our 80/20 model, 80% of instruction is delivered in Spanish (including math, science, social studies, and arts), while 20% focuses on English Language Arts. This approach ensures students develop strong bilingual skills while maintaining excellent English literacy.",
  },
  {
    id: 3,
    question: "How does Expeditionary Learning work?",
    answer:
      "Expeditionary Learning is our project-based approach where students explore real-world topics through multi-week investigations. For example, students might study Latin American countries through cooking traditional foods, learning cultural dances, exploring ecosystems, and creating art projects.",
  },
  {
    id: 4,
    question: "What are the class sizes?",
    answer:
      "We maintain small class sizes of 12-16 students per grade with one classroom per grade level (K-5). This ensures personalized attention and allows teachers to meet each child's individual needs.",
  },
  {
    id: 5,
    question: "Is financial assistance available?",
    answer:
      "Yes! We offer need-based and equity-based scholarships to support diverse families. We also provide a 10% sibling discount on tuition. Financial assistance is available for both tuition and aftercare programs.",
  },
  {
    id: 6,
    question: "What is included in the meal plan?",
    answer:
      "Our optional meal plan ($125/month) includes breakfast, lunch, and two snacks daily. All meals are prepared fresh by our in-house chef and inspired by Latin American cuisine, providing nutritious and culturally rich dining experiences.",
  },
  {
    id: 7,
    question: "How does the aftercare program work?",
    answer:
      "Aftercare runs from 3:15-5:30 PM with bilingual programming that continues the immersive experience. We offer 5-day ($550/month) and 3-day ($450/month) options, plus drop-in availability. The program includes snacks, homework help for grades 2+, and cultural activities.",
  },
  {
    id: 8,
    question: "When does the application process begin?",
    answer:
      "Applications open November 1, 2024, with a priority deadline of January 31, 2025. Family interviews are conducted February-March, and school begins September 2, 2025. We encourage early application for the best chance of enrollment.",
  },
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.id} className="shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              <button
                className="w-full p-6 text-left hover:bg-slate-light transition-colors duration-200 flex items-center justify-between"
                onClick={() => toggleItem(faq.id)}
              >
                <h3 className="text-lg font-ivry font-semibold text-slate pr-4">{faq.question}</h3>
                {openItems.includes(faq.id) ? (
                  <ChevronUp className="h-5 w-5 text-slate flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-medium flex-shrink-0" />
                )}
              </button>
              {openItems.includes(faq.id) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-slate-medium leading-relaxed font-questa">{faq.answer}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
