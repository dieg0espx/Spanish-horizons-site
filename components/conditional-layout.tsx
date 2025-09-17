"use client"

import { usePathname } from "next/navigation"
import ModernHeader from "@/components/modern-header"
import Footer from "@/components/footer"
import StickyApplyButton from "@/components/sticky-apply-button"
import FloatingCTA from "@/components/floating-cta"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Check if we're on a Cocinarte page
  const isCocinartePage = pathname?.startsWith('/cocinarte')
  
  if (isCocinartePage) {
    // For Cocinarte pages, only render the children (no header/footer)
    return <>{children}</>
  }
  
  // For all other pages, render with header and footer
  return (
    <div style={{ marginTop: "70px" }}>
      <ModernHeader />
      {children}
      <Footer />
      <FloatingCTA />
    </div>
  )
}
