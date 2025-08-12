import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Camp Alegria | Spanish Horizons",
  description: "Experience Camp Alegria, our exciting summer program that combines Spanish language learning with fun activities, outdoor adventures, and cultural experiences.",
  keywords: ["Camp Alegria", "summer camp", "Spanish immersion", "summer program", "Spanish Horizons", "Hillsboro"],
}

export default function CampAlegriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {children}
    </div>
  )
}
