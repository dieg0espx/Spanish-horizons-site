import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cocinarte - Cooking Adventures for Kids & Families",
  description: "A cooking program designed for kids and families to explore Latin flavors while learning hands-on cooking skills. Fun, interactive, and age-appropriate classes.",
  keywords: [
    "cooking classes for kids",
    "Latin American cuisine",
    "family cooking",
    "kids cooking program",
    "hands-on learning",
    "Spanish cooking",
    "Cocinarte",
    "Hillsboro Oregon",
    "cooking education",
    "family activities"
  ],
  authors: [{ name: "Cocinarte" }],
  creator: "Cocinarte",
  publisher: "Cocinarte",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cocinarte.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Cocinarte - Cooking Adventures for Kids & Families",
    description: "A cooking program designed for kids and families to explore Latin flavors while learning hands-on cooking skills. Fun, interactive, and age-appropriate classes.",
    url: 'https://cocinarte.com',
    siteName: 'Cocinarte',
    images: [
      {
        url: '/cocinarte/cocinarteLogo.png',
        width: 1200,
        height: 630,
        alt: 'Cocinarte - Cooking Adventures for Kids & Families',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cocinarte - Cooking Adventures for Kids & Families",
    description: "A cooking program designed for kids and families to explore Latin flavors while learning hands-on cooking skills. Fun, interactive, and age-appropriate classes.",
    images: ['/cocinarte/cocinarteLogo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function CocinarteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  )
}
