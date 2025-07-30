import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Spanish Horizons Academy",
  description: "Get in touch with Spanish Horizons Academy. Contact us for information about our K-5 Spanish immersion program in Hillsboro, Oregon.",
  keywords: [
    "contact Spanish Horizons Academy",
    "Spanish immersion school contact",
    "Hillsboro Spanish school",
    "school information",
    "Spanish Horizons Academy phone",
    "Spanish Horizons Academy email",
    "school location",
    "Spanish immersion inquiries"
  ],
  openGraph: {
    title: "Contact Us - Spanish Horizons Academy",
    description: "Get in touch with Spanish Horizons Academy. Contact us for information about our K-5 Spanish immersion program in Hillsboro, Oregon.",
    url: 'https://spanishhorizonsacademy.com/contact',
    siteName: 'Spanish Horizons Academy',
    images: [
      {
        url: '/branding/logo.png',
        width: 1200,
        height: 630,
        alt: 'Spanish Horizons Academy Contact',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Us - Spanish Horizons Academy",
    description: "Get in touch with Spanish Horizons Academy. Contact us for information about our K-5 Spanish immersion program in Hillsboro, Oregon.",
    images: ['/branding/logo.png'],
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 