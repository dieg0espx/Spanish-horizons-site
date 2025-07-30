import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Programs - Spanish Horizons Academy",
  description: "Explore our K-5 Spanish immersion programs featuring hands-on learning, cultural activities, and bilingual development at Spanish Horizons Academy.",
  keywords: [
    "Spanish immersion programs",
    "K-5 Spanish curriculum",
    "bilingual education programs",
    "Spanish language learning",
    "elementary Spanish immersion",
    "cultural activities",
    "hands-on learning",
    "Spanish Horizons Academy programs"
  ],
  openGraph: {
    title: "Programs - Spanish Horizons Academy",
    description: "Explore our K-5 Spanish immersion programs featuring hands-on learning, cultural activities, and bilingual development at Spanish Horizons Academy.",
    url: 'https://spanishhorizonsacademy.com/programs',
    siteName: 'Spanish Horizons Academy',
    images: [
      {
        url: '/branding/logo.png',
        width: 1200,
        height: 630,
        alt: 'Spanish Horizons Academy Programs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Programs - Spanish Horizons Academy",
    description: "Explore our K-5 Spanish immersion programs featuring hands-on learning, cultural activities, and bilingual development at Spanish Horizons Academy.",
    images: ['/branding/logo.png'],
  },
  alternates: {
    canonical: '/programs',
  },
}

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 