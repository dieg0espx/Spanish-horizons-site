"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Home, FileText, Loader2 } from "lucide-react"
import Link from "next/link"
import jsPDF from "jspdf"

function ApplicationSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const applicationId = searchParams.get('id') || ''
  const amountPaid = parseFloat(searchParams.get('amount') || '0')
  const applicationFee = parseFloat(searchParams.get('fee') || '120')
  const discount = parseFloat(searchParams.get('discount') || '0')
  const coupon = searchParams.get('coupon') || ''
  const paymentStatus = searchParams.get('status') || 'paid'
  const childName = searchParams.get('child') || ''
  const parentName = searchParams.get('parent') || ''

  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (!applicationId) {
      router.push('/dashboard')
    }
  }, [applicationId, router])

  const handleDownloadReceipt = () => {
    setDownloading(true)
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 15
      const receiptDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

      // Header
      doc.setFillColor(0, 6, 56)
      doc.rect(0, 0, pageWidth, 40, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(20)
      doc.setFont('helvetica', 'bold')
      doc.text('Payment Receipt', margin, 22)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(255, 215, 0)
      doc.text('Spanish Horizons Academy', margin, 32)

      // Receipt info
      let y = 55
      doc.setTextColor(100, 100, 100)
      doc.setFontSize(9)
      doc.text('Receipt Number', margin, y)
      doc.text('Date', pageWidth - margin - 40, y)
      y += 5
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text(`RCP-${applicationId.substring(0, 8).toUpperCase()}`, margin, y)
      doc.text(receiptDate, pageWidth - margin - 40, y)
      doc.setFont('helvetica', 'normal')

      // Bill to
      y += 15
      doc.setFillColor(255, 140, 0)
      doc.rect(margin, y, pageWidth - margin * 2, 8, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text('Bill To', margin + 3, y + 5.5)
      doc.setTextColor(0, 0, 0)
      doc.setFont('helvetica', 'normal')
      y += 14
      doc.setFontSize(10)
      doc.text(parentName || 'Parent/Guardian', margin, y)

      // Application for
      y += 10
      doc.setTextColor(100, 100, 100)
      doc.setFontSize(9)
      doc.text('Application for:', margin, y)
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      doc.text(childName || 'Student', margin + 30, y)

      // Line items table
      y += 15
      doc.setFillColor(245, 245, 245)
      doc.rect(margin, y, pageWidth - margin * 2, 8, 'F')
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(80, 80, 80)
      doc.text('Description', margin + 3, y + 5.5)
      doc.text('Amount', pageWidth - margin - 3, y + 5.5, { align: 'right' })
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(0, 0, 0)

      y += 14
      doc.setFontSize(10)
      doc.text('Kindergarten Application Fee — Fall 2026', margin + 3, y)
      doc.text(`$${applicationFee.toFixed(2)}`, pageWidth - margin - 3, y, { align: 'right' })

      if (discount > 0 && coupon) {
        y += 8
        doc.setTextColor(0, 128, 0)
        doc.text(`Coupon Discount (${coupon})`, margin + 3, y)
        doc.text(`-$${discount.toFixed(2)}`, pageWidth - margin - 3, y, { align: 'right' })
        doc.setTextColor(0, 0, 0)
      }

      // Total
      y += 12
      doc.setDrawColor(200, 200, 200)
      doc.line(margin, y, pageWidth - margin, y)
      y += 8
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Total Paid', margin + 3, y)
      doc.text(`$${amountPaid.toFixed(2)}`, pageWidth - margin - 3, y, { align: 'right' })

      // Payment method
      y += 12
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.text(`Payment Method: ${paymentStatus === 'waived' ? 'Coupon (Fee Waived)' : 'Credit Card (Stripe)'}`, margin, y)

      // Status badge
      y += 12
      doc.setFillColor(0, 128, 0)
      doc.roundedRect(margin, y, 30, 8, 2, 2, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.text('PAID', margin + 15, y + 5.5, { align: 'center' })

      // Footer
      const footerY = doc.internal.pageSize.getHeight() - 20
      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.3)
      doc.line(margin, footerY, pageWidth - margin, footerY)
      doc.setFontSize(8)
      doc.setTextColor(120, 120, 120)
      doc.setFont('helvetica', 'normal')
      doc.text(
        'Spanish Horizons Academy  |  infospanishhorizons@casitaazulpdx.com  |  (503) 916-9758',
        pageWidth / 2,
        footerY + 5,
        { align: 'center' }
      )
      doc.text(
        '770 NE Rogahn Street, Hillsboro, OR 97124',
        pageWidth / 2,
        footerY + 9,
        { align: 'center' }
      )

      doc.save(`Receipt-${applicationId.substring(0, 8).toUpperCase()}.pdf`)
    } finally {
      setDownloading(false)
    }
  }

  if (!applicationId) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-ivry font-bold text-white mb-4">
            Application Submitted!
          </h1>
          <p className="text-lg text-white/70 font-questa">
            Thank you for applying to Spanish Horizons Academy
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Payment Receipt Card */}
          <Card className="border-green-200 border-2">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-xl font-ivry text-slate flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Payment Confirmed
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-questa text-slate-medium text-sm">Application Fee</span>
                  <span className="font-questa text-slate">${applicationFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center mb-2 text-green-600">
                    <span className="font-questa text-sm">Coupon Discount {coupon && `(${coupon})`}</span>
                    <span className="font-questa">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2 flex justify-between items-center">
                  <span className="font-questa font-bold text-slate text-lg">Total Paid</span>
                  <span className="font-questa font-bold text-slate text-lg">${amountPaid.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div>
                  <p className="text-xs text-slate-medium font-questa">Receipt Number</p>
                  <p className="font-mono font-semibold text-slate text-sm">RCP-{applicationId.substring(0, 8).toUpperCase()}</p>
                </div>
                <Button
                  onClick={handleDownloadReceipt}
                  disabled={downloading}
                  className="bg-slate hover:bg-slate-medium text-white rounded-xl"
                >
                  {downloading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Download Receipt PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Application Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-ivry text-slate flex items-center gap-3">
                <FileText className="h-6 w-6 text-amber" />
                Application Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-medium font-questa">Application ID</p>
                  <p className="font-mono text-sm text-slate">{applicationId.substring(0, 8).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-medium font-questa">Status</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white bg-amber">
                    Submitted
                  </span>
                </div>
                {childName && (
                  <div>
                    <p className="text-xs text-slate-medium font-questa">Student</p>
                    <p className="font-questa font-semibold text-slate">{childName}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-slate-medium font-questa">Program</p>
                  <p className="font-questa text-slate">Kindergarten — Fall 2026</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card className="bg-slate/5">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-ivry text-slate flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-golden" />
                What Happens Next
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-golden mt-0.5 flex-shrink-0" />
                  <span className="text-slate-medium font-questa text-sm">A confirmation email with your payment receipt has been sent to your email</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-golden mt-0.5 flex-shrink-0" />
                  <span className="text-slate-medium font-questa text-sm">Applications are reviewed on a rolling basis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-golden mt-0.5 flex-shrink-0" />
                  <span className="text-slate-medium font-questa text-sm">You may be contacted to schedule a family interview</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-golden mt-0.5 flex-shrink-0" />
                  <span className="text-slate-medium font-questa text-sm">Track your application status anytime in your Family Portal</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full bg-amber hover:bg-golden hover:text-slate font-questa text-base py-5 rounded-xl">
                <FileText className="h-5 w-5 mr-2" />
                Go to Family Portal
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full font-questa text-base py-5 rounded-xl">
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ApplicationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber" />
      </div>
    }>
      <ApplicationSuccessContent />
    </Suspense>
  )
}
