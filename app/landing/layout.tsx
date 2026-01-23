import { Metadata } from "next"
import ConditionalLayout from "@/components/conditional-layout"

export const metadata: Metadata = {
  title: "Spanish Horizons Family of Programs | Spanish Immersion Education",
  description: "Discover our comprehensive Spanish immersion programs: Spanish Horizons Academy (K-5), Casita Azul (Preschool & Daycare), and Camp Alegría (Summer Camp). Bilingual education for all ages in Hillsboro, Oregon.",
  keywords: ["Spanish immersion", "bilingual education", "Spanish Horizons", "Casita Azul", "Camp Alegria", "Hillsboro Oregon", "K-5 education", "preschool", "daycare", "summer camp"],
  openGraph: {
    title: "Spanish Horizons Family of Programs | Spanish Immersion Education",
    description: "Discover our comprehensive Spanish immersion programs: Spanish Horizons Academy (K-5), Casita Azul (Preschool & Daycare), and Camp Alegría (Summer Camp). Bilingual education for all ages in Hillsboro, Oregon.",
    type: "website",
  },
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConditionalLayout showHeader={false}>
      {children}
    </ConditionalLayout>
  )
}
