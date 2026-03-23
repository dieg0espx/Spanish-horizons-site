"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getBlogPost, getAllBlogPosts } from "@/lib/blog/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const otherPosts = getAllBlogPosts().filter((p) => p.slug !== slug)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <section className="relative flex flex-col justify-end min-h-[380px] md:h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate/95 via-slate/50 to-slate/20 md:from-slate/90 md:via-slate/40 md:to-transparent" />
        <div className="relative mt-auto pb-6 pt-24 md:pb-12 md:pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-white/80 hover:text-white font-questa text-sm mb-4 md:mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-white/80 font-questa mb-3 md:mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-amber text-white text-xs font-semibold rounded-full">
                <Tag className="h-3 w-3 mr-1" />
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-2xl md:text-5xl font-ivry font-bold text-white leading-tight">
              {post.title}
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
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>

          {/* CTA */}
          <div className="mt-10 md:mt-16 bg-slate rounded-2xl p-6 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-ivry font-bold text-white mb-3 md:mb-4">
              Ready to Take the Next Step?
            </h2>
            <p className="text-white/90 font-questa text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
              Schedule a tour of our Hillsboro campus and see how our students are building the skills that prepare them for a lifetime of learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-amber hover:bg-golden hover:text-slate text-white px-8 py-3 rounded-xl font-questa font-semibold text-lg"
              >
                <Link href="/contact">Schedule a Tour</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate px-8 py-3 rounded-xl font-questa font-semibold text-lg"
              >
                <Link href="/programs">Explore Our Curriculum</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="py-10 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-ivry font-bold text-slate mb-6 md:mb-10 text-center">
              More From Our Blog
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto">
              {otherPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="relative h-40 md:h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500 font-questa mb-2">
                        <span>{relatedPost.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                          {relatedPost.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-ivry font-bold text-slate group-hover:text-amber transition-colors duration-200">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
