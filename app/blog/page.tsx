"use client"

import Link from "next/link"
import Image from "next/image"
import { BookOpen, ArrowRight, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllBlogPosts } from "@/lib/blog/posts"

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate-medium rounded-full text-white text-sm font-questa font-medium mt-6 md:mt-8 mb-4 md:mb-6">
              <BookOpen className="h-4 w-4 mr-2" />
              Insights for Parents
            </div>
            <h1 className="text-3xl md:text-6xl font-ivry font-bold text-white mb-4 md:mb-6">
              Blog
            </h1>
            <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto font-questa">
              Expert guidance on bilingual education, kindergarten readiness, and raising confident learners — from the team at Spanish Horizons Academy.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <article className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="relative h-48 md:h-72 overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 md:top-4 md:left-4">
                      <span className="inline-flex items-center px-3 py-1 bg-amber text-white text-xs font-questa font-semibold rounded-full">
                        <Tag className="h-3 w-3 mr-1" />
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 font-questa mb-2 md:mb-3">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-ivry font-bold text-slate mb-2 md:mb-3 group-hover:text-amber transition-colors duration-200">
                      {post.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 font-questa leading-relaxed mb-3 md:mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center text-amber font-questa font-semibold text-sm md:text-base group-hover:gap-2 transition-all duration-200 mt-auto">
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-ivry font-bold text-white mb-4 md:mb-6">
              See Our Approach in Action
            </h2>
            <p className="text-base md:text-xl text-white/90 mb-8 md:mb-10 font-questa">
              Visit Spanish Horizons Academy and experience bilingual, expeditionary learning firsthand. Schedule a tour of our Hillsboro campus today.
            </p>
            <Button
              asChild
              className="bg-amber hover:bg-golden hover:text-slate text-white px-8 py-3 rounded-xl font-questa font-semibold text-lg"
            >
              <Link href="/contact">Schedule a Tour</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
