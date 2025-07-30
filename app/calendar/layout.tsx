import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "School Calendar - Spanish Horizons Academy",
  description: "View Spanish Horizons Academy's academic calendar, important dates, holidays, and events for our K-5 Spanish immersion program.",
  keywords: [
    "Spanish immersion school calendar",
    "academic calendar",
    "school holidays",
    "Spanish Horizons Academy events",
    "school year schedule",
    "important dates",
    "school calendar 2024",
    "Spanish immersion events"
  ],
  openGraph: {
    title: "School Calendar - Spanish Horizons Academy",
    description: "View Spanish Horizons Academy's academic calendar, important dates, holidays, and events for our K-5 Spanish immersion program.",
    url: 'https://spanishhorizonsacademy.com/calendar',
    siteName: 'Spanish Horizons Academy',
    images: [
      {
        url: '/branding/logo.png',
        width: 1200,
        height: 630,
        alt: 'Spanish Horizons Academy Calendar',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "School Calendar - Spanish Horizons Academy",
    description: "View Spanish Horizons Academy's academic calendar, important dates, holidays, and events for our K-5 Spanish immersion program.",
    images: ['/branding/logo.png'],
  },
  alternates: {
    canonical: '/calendar',
  },
}

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 