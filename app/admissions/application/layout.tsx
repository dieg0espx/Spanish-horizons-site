import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admissions Application | Spanish Horizons Academy",
  description: "Apply to Spanish Horizons Academy's Kindergarten program for Fall 2026. Submit your application for consideration to join our Spanish immersion, experiential learning community.",
  keywords: ["Spanish Horizons Academy", "application", "kindergarten", "Spanish immersion", "Hillsboro", "admissions", "enrollment"],
}

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
