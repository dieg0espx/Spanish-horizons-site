"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    role: "Parent of Sofia (Grade 2)",
    content:
      "The Spanish immersion program has been incredible for Sofia. She comes home excited about what she learned and speaks Spanish naturally with her siblings.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Chen",
    role: "Parent of Lucas (Kindergarten)",
    content:
      "We love the expeditionary learning approach. Lucas is learning about different cultures through cooking and art, which makes it so much more meaningful.",
    rating: 5,
  },
  {
    id: 3,
    name: "Jennifer Thompson",
    role: "Parent of Emma (Grade 1)",
    content:
      "The teachers truly care about each child as an individual. Emma has grown so much in confidence and her Spanish skills are amazing for her age.",
    rating: 5,
  },
  {
    id: 4,
    name: "Carlos Mendoza",
    role: "Parent of Diego (Grade 3)",
    content:
      "As a Spanish-speaking family, we appreciate how the school honors our culture while helping Diego excel academically in both languages.",
    rating: 5,
  },
  {
    id: 5,
    name: "Sarah Johnson",
    role: "Parent of Mia (Grade 2)",
    content:
      "The small class sizes and personalized attention have made such a difference. Mia loves going to school every day and is thriving.",
    rating: 5,
  },
]

export default function TestimonialsCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        }
      }
    ]
  }

  return (
    <div className="mx-auto px-4 sm:px-6 ">
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-2 sm:p-5">
            <Card className="shadow-lg border-0 bg-white h-full">
              <CardContent className="p-4 sm:p-6 h-full flex flex-col">
                <div className="flex flex-col h-full text-center">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-4 sm:w-4 text-golden fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-md text-slate-medium italic leading-relaxed flex-grow h-[150px] font-questa">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="mt-auto pt-3">
                    <p className="font-ivry font-bold text-slate text-sm sm:text-sm mb-1">{testimonial.name}</p>
                    <p className="text-slate-medium text-sm font-questa font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  )
}
