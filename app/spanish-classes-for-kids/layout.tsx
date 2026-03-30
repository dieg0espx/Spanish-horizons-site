import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Spanish Classes for Kids in Hillsboro & Portland | Spanish Horizons",
  description: "Looking for Spanish classes for kids in Hillsboro or Portland? Spanish Horizons Academy offers K-5 Spanish immersion with small classes of 12-16 students. No prior Spanish needed. Schedule a tour today!",
  keywords: [
    "Spanish classes for kids",
    "Spanish classes for kids Portland",
    "Spanish classes for kids Hillsboro",
    "kids Spanish classes",
    "Spanish immersion kids",
    "bilingual education Portland",
    "Spanish language classes children",
    "K-5 Spanish immersion",
    "Spanish Horizons Academy"
  ],
  openGraph: {
    title: "Spanish Classes for Kids in Hillsboro & Portland | Spanish Horizons",
    description: "Looking for Spanish classes for kids in Hillsboro or Portland? Spanish Horizons Academy offers K-5 Spanish immersion with small classes of 12-16 students. No prior Spanish needed.",
    url: 'https://spanishhorizonsacademy.com/spanish-classes-for-kids',
    siteName: 'Spanish Horizons Academy',
    images: [
      {
        url: 'https://res.cloudinary.com/dku1gnuat/image/upload/v1774860529/Spanish_Horizons_Academy_Blog_1_Spanish_Classes_for_Kids_xifbgb.webp',
        width: 1200,
        height: 630,
        alt: 'Spanish Classes for Kids at Spanish Horizons Academy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Spanish Classes for Kids in Hillsboro & Portland | Spanish Horizons",
    description: "Looking for Spanish classes for kids in Hillsboro or Portland? Spanish Horizons Academy offers K-5 Spanish immersion with small classes of 12-16 students. No prior Spanish needed.",
    images: ['https://res.cloudinary.com/dku1gnuat/image/upload/v1774860529/Spanish_Horizons_Academy_Blog_1_Spanish_Classes_for_Kids_xifbgb.webp'],
  },
  alternates: {
    canonical: '/spanish-classes-for-kids',
  },
}

export default function SpanishClassesForKidsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
