import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Spanish Horizons Academy",
  description: "Learn about Spanish Horizons Academy's mission, values, and commitment to Spanish immersion education in Hillsboro, Oregon.",
  keywords: [
    "about Spanish Horizons Academy",
    "Spanish immersion school mission",
    "bilingual education values",
    "Hillsboro Spanish school",
    "Spanish immersion philosophy",
    "educational approach",
    "school culture",
    "Spanish Horizons Academy story"
  ],
  openGraph: {
    title: "About Us - Spanish Horizons Academy",
    description: "Learn about Spanish Horizons Academy's mission, values, and commitment to Spanish immersion education in Hillsboro, Oregon.",
    url: 'https://spanishhorizonsacademy.com/about',
    siteName: 'Spanish Horizons Academy',
    images: [
      {
        url: '/branding/logo.png',
        width: 1200,
        height: 630,
        alt: 'Spanish Horizons Academy About Us',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "About Us - Spanish Horizons Academy",
    description: "Learn about Spanish Horizons Academy's mission, values, and commitment to Spanish immersion education in Hillsboro, Oregon.",
    images: ['/branding/logo.png'],
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 