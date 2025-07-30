import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tuition & Fees - Spanish Horizons Academy",
  description: "Learn about Spanish Horizons Academy's tuition rates, fees, and payment options for our K-5 Spanish immersion program in Hillsboro, Oregon.",
  keywords: [
    "Spanish immersion tuition",
    "school fees",
    "Spanish Horizons Academy cost",
    "K-5 tuition rates",
    "bilingual school fees",
    "payment options",
    "school affordability",
    "Spanish immersion pricing"
  ],
  openGraph: {
    title: "Tuition & Fees - Spanish Horizons Academy",
    description: "Learn about Spanish Horizons Academy's tuition rates, fees, and payment options for our K-5 Spanish immersion program in Hillsboro, Oregon.",
    url: 'https://spanishhorizonsacademy.com/tuition',
    siteName: 'Spanish Horizons Academy',
    images: [
      {
        url: '/branding/logo.png',
        width: 1200,
        height: 630,
        alt: 'Spanish Horizons Academy Tuition',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tuition & Fees - Spanish Horizons Academy",
    description: "Learn about Spanish Horizons Academy's tuition rates, fees, and payment options for our K-5 Spanish immersion program in Hillsboro, Oregon.",
    images: ['/branding/logo.png'],
  },
  alternates: {
    canonical: '/tuition',
  },
}

export default function TuitionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 