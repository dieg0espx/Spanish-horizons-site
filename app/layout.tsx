import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ModernHeader from "@/components/modern-header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spanish Horizons Academy - K-5 Spanish Immersion School",
  description:
    "A Spanish Immersion Expeditionary School in Hillsboro, Oregon. Where culture meets curiosity through hands-on, project-based learning.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ marginTop: "100px" }}>
        <ModernHeader />
        {children}
        <Footer />
      </body>
    </html>
  )
}
