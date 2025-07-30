import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - Spanish Horizons Academy",
  description: "Frequently asked questions about Spanish Horizons Academy's K-5 Spanish immersion program, admissions, curriculum, and bilingual education.",
  keywords: [
    "Spanish immersion FAQ",
    "frequently asked questions",
    "Spanish Horizons Academy questions",
    "bilingual education FAQ",
    "Spanish school questions",
    "immersion program FAQ",
    "school information",
    "Spanish immersion answers"
  ],
  openGraph: {
    title: "FAQ - Spanish Horizons Academy",
    description: "Frequently asked questions about Spanish Horizons Academy's K-5 Spanish immersion program, admissions, curriculum, and bilingual education.",
    url: 'https://spanishhorizonsacademy.com/faq',
    siteName: 'Spanish Horizons Academy',
    images: [
      {
        url: '/branding/logo.png',
        width: 1200,
        height: 630,
        alt: 'Spanish Horizons Academy FAQ',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "FAQ - Spanish Horizons Academy",
    description: "Frequently asked questions about Spanish Horizons Academy's K-5 Spanish immersion program, admissions, curriculum, and bilingual education.",
    images: ['/branding/logo.png'],
  },
  alternates: {
    canonical: '/faq',
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 