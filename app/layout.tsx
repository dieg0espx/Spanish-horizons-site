import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ModernHeader from "@/components/modern-header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Spanish Horizons Academy - K-5 Spanish Immersion School",
  description: "A Spanish Immersion Expeditionary School in Hillsboro, Oregon. Where culture meets curiosity through hands-on, project-based learning.",
  keywords: [
    "Spanish immersion school",
    "bilingual education",
    "K-5 Spanish immersion",
    "Hillsboro Oregon",
    "Spanish language school",
    "elementary school",
    "bilingual children",
    "Spanish culture",
    "immersion education",
    "Spanish Horizons Academy"
  ],
  authors: [{ name: "Spanish Horizons Academy" }],
  creator: "Spanish Horizons Academy",
  publisher: "Spanish Horizons Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://spanishhorizonsacademy.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Spanish Horizons Academy - K-5 Spanish Immersion School",
    description: "A Spanish Immersion Expeditionary School in Hillsboro, Oregon. Where culture meets curiosity through hands-on, project-based learning.",
    url: 'https://spanishhorizonsacademy.com',
    siteName: 'Spanish Horizons Academy',
    images: [
      {
        url: '/branding/logo.png',
        width: 1200,
        height: 630,
        alt: 'Spanish Horizons Academy Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Spanish Horizons Academy - K-5 Spanish Immersion School",
    description: "A Spanish Immersion Expeditionary School in Hillsboro, Oregon. Where culture meets curiosity through hands-on, project-based learning.",
    images: ['/branding/logo.png'],
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'education',
  classification: 'Spanish Immersion School',
  other: {
    'msapplication-TileColor': '#1e293b',
    'theme-color': '#1e293b',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon Links */}
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        
        {/* Additional favicon sizes */}
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon/web-app-manifest-512x512.png" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#1e293b" />
        <meta name="msapplication-TileImage" content="/favicon/favicon-96x96.png" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#1e293b" />
        
        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Spanish Horizons Academy",
              "description": "A Spanish Immersion Expeditionary School in Hillsboro, Oregon. Where culture meets curiosity through hands-on, project-based learning.",
              "url": "https://spanishhorizonsacademy.com",
              "logo": "https://spanishhorizonsacademy.com/branding/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "770 NE Rogahn Street",
                "addressLocality": "Hillsboro",
                "addressRegion": "OR",
                "postalCode": "97124",
                "addressCountry": "US"
              },
              "telephone": "+1-503-916-9758",
              "email": "infospanishhorizons@casitaazulpdx.com",
              "openingHours": "Mo-Fr 08:00-16:00",
              "sameAs": [
                "https://instagram.com/spanishhorizonsacademy",
                "https://casitaazulpdx.com"
              ],
              "areaServed": {
                "@type": "City",
                "name": "Hillsboro"
              },
              "serviceType": "Spanish Immersion Education",
              "educationalLevel": "Elementary School",
              "gradeRange": "K-5"
            })
          }}
        />
      </head>
      <body className="font-questa" style={{ marginTop: "100px" }}>
        <ModernHeader />
        {children}
        <Footer />
      </body>
    </html>
  )
}
