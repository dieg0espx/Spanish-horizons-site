import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admissions - Spanish Horizons Academy",
  description: "Apply to Spanish Horizons Academy's K-5 Spanish immersion program. Learn about our admissions process, requirements, and how to schedule a tour.",
  keywords: [
    "Spanish immersion admissions",
    "apply to Spanish school",
    "K-5 admissions",
    "Spanish Horizons Academy enrollment",
    "school tour",
    "admissions process",
    "Hillsboro Spanish school enrollment",
    "bilingual school application"
  ],
  openGraph: {
    title: "Admissions - Spanish Horizons Academy",
    description: "Apply to Spanish Horizons Academy's K-5 Spanish immersion program. Learn about our admissions process, requirements, and how to schedule a tour.",
    url: 'https://spanishhorizonsacademy.com/admissions',
    siteName: 'Spanish Horizons Academy',
    images: [
      {
        url: '/branding/logo.png',
        width: 1200,
        height: 630,
        alt: 'Spanish Horizons Academy Admissions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Admissions - Spanish Horizons Academy",
    description: "Apply to Spanish Horizons Academy's K-5 Spanish immersion program. Learn about our admissions process, requirements, and how to schedule a tour.",
    images: ['/branding/logo.png'],
  },
  alternates: {
    canonical: '/admissions',
  },
}

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 