import jsPDF from 'jspdf'
import { Invoice } from '@/lib/types/invoice'

// Brand constants
const SLATE_HEADER: [number, number, number] = [0, 6, 56] // #000638
const AMBER_ACCENT: [number, number, number] = [255, 140, 0] // #FF8C00
const COMPANY_NAME = 'Spanish Horizons Academy'
const CONTACT_EMAIL = 'infospanishhorizons@casitaazulpdx.com'
const CONTACT_PHONE = '(503) 916-9758'

// Shared helpers scoped per-document
function createHelpers(doc: jsPDF) {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15

  const checkPageBreak = (yPos: number, needed: number): number => {
    if (yPos + needed > pageHeight - 25) {
      doc.addPage()
      return 20
    }
    return yPos
  }

  const addWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number = 5
  ): number => {
    const lines = doc.splitTextToSize(text, maxWidth)
    lines.forEach((line: string) => {
      y = checkPageBreak(y, lineHeight)
      doc.text(line, x, y)
      y += lineHeight
    })
    return y
  }

  const addSection = (title: string, yPos: number): number => {
    yPos = checkPageBreak(yPos, 18)
    doc.setFillColor(...AMBER_ACCENT)
    doc.rect(margin, yPos, pageWidth - margin * 2, 8, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(title, margin + 3, yPos + 5.5)
    doc.setTextColor(0, 0, 0)
    doc.setFont('helvetica', 'normal')
    return yPos + 14
  }

  const addField = (
    label: string,
    value: string | null | undefined,
    yPos: number
  ): number => {
    if (!value) return yPos
    yPos = checkPageBreak(yPos, 12)
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.text(label, margin, yPos)
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    yPos = addWrappedText(value, margin, yPos + 5, pageWidth - margin * 2)
    return yPos + 3
  }

  const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`
  }

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const addFooterToAllPages = (extraLine?: string) => {
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      const footerY = pageHeight - 15

      // Divider line
      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.3)
      doc.line(margin, footerY, pageWidth - margin, footerY)

      doc.setFontSize(8)
      doc.setTextColor(120, 120, 120)

      if (extraLine) {
        doc.setFont('helvetica', 'bold')
        doc.text(extraLine, pageWidth / 2, footerY + 4, { align: 'center' })
        doc.setFont('helvetica', 'normal')
      }

      const contactY = extraLine ? footerY + 8 : footerY + 5
      doc.text(
        `${COMPANY_NAME}  |  ${CONTACT_EMAIL}  |  ${CONTACT_PHONE}`,
        pageWidth / 2,
        contactY,
        { align: 'center' }
      )

      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        contactY + 4,
        { align: 'center' }
      )
    }
  }

  return {
    pageWidth,
    pageHeight,
    margin,
    checkPageBreak,
    addWrappedText,
    addSection,
    addField,
    formatCurrency,
    formatDate,
    addFooterToAllPages,
  }
}

// ---------------------------------------------------------------------------
// Line items table (shared between invoice and receipt)
// ---------------------------------------------------------------------------
function drawLineItemsTable(
  doc: jsPDF,
  invoice: Invoice,
  startY: number,
  helpers: ReturnType<typeof createHelpers>
): number {
  const { pageWidth, margin, checkPageBreak, formatCurrency } = helpers

  const colX = {
    description: margin,
    qty: pageWidth - margin - 80,
    unitPrice: pageWidth - margin - 50,
    amount: pageWidth - margin - 20,
  }

  let yPos = startY

  // Table header
  yPos = checkPageBreak(yPos, 12)
  doc.setFillColor(240, 240, 240)
  doc.rect(margin, yPos - 4, pageWidth - margin * 2, 8, 'F')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(60, 60, 60)
  doc.text('Description', colX.description + 2, yPos)
  doc.text('Qty', colX.qty, yPos, { align: 'right' })
  doc.text('Unit Price', colX.unitPrice, yPos, { align: 'right' })
  doc.text('Amount', colX.amount, yPos, { align: 'right' })
  yPos += 8

  // Table rows
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(9)

  invoice.line_items.forEach((item, index) => {
    yPos = checkPageBreak(yPos, 10)

    // Alternating row background
    if (index % 2 === 1) {
      doc.setFillColor(249, 249, 249)
      doc.rect(margin, yPos - 4, pageWidth - margin * 2, 8, 'F')
    }

    // Description may need wrapping
    const descLines = doc.splitTextToSize(
      item.description,
      colX.qty - colX.description - 15
    )
    doc.text(descLines[0], colX.description + 2, yPos)
    doc.text(String(item.quantity), colX.qty, yPos, { align: 'right' })
    doc.text(formatCurrency(item.unit_price), colX.unitPrice, yPos, {
      align: 'right',
    })
    doc.text(formatCurrency(item.amount), colX.amount, yPos, {
      align: 'right',
    })

    // If description wrapped to multiple lines, print the rest
    if (descLines.length > 1) {
      for (let l = 1; l < descLines.length; l++) {
        yPos += 5
        yPos = checkPageBreak(yPos, 5)
        doc.text(descLines[l], colX.description + 2, yPos)
      }
    }

    yPos += 8
  })

  // Separator line
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  doc.line(margin, yPos - 3, pageWidth - margin, yPos - 3)

  return yPos
}

// ---------------------------------------------------------------------------
// Totals block (shared between invoice and receipt)
// ---------------------------------------------------------------------------
function drawTotals(
  doc: jsPDF,
  invoice: Invoice,
  startY: number,
  helpers: ReturnType<typeof createHelpers>,
  showPaidStamp: boolean
): number {
  const { pageWidth, margin, checkPageBreak, formatCurrency } = helpers

  let yPos = checkPageBreak(startY, 35)

  const labelX = pageWidth - margin - 65
  const valueX = pageWidth - margin - 5

  // Subtotal
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 80)
  doc.text('Subtotal:', labelX, yPos, { align: 'right' })
  doc.setTextColor(0, 0, 0)
  doc.text(formatCurrency(invoice.subtotal), valueX, yPos, { align: 'right' })
  yPos += 7

  // Tax
  if (invoice.tax_rate > 0) {
    doc.setTextColor(80, 80, 80)
    doc.text(`Tax (${invoice.tax_rate}%):`, labelX, yPos, { align: 'right' })
    doc.setTextColor(0, 0, 0)
    doc.text(formatCurrency(invoice.tax_amount), valueX, yPos, {
      align: 'right',
    })
    yPos += 7
  }

  // Total line
  doc.setDrawColor(0, 6, 56)
  doc.setLineWidth(0.5)
  doc.line(labelX - 20, yPos - 3, valueX, yPos - 3)

  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...SLATE_HEADER)
  doc.text('Total:', labelX, yPos + 3, { align: 'right' })
  doc.text(formatCurrency(invoice.total_amount), valueX, yPos + 3, {
    align: 'right',
  })

  if (showPaidStamp) {
    // Green "PAID" stamp near the total
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(34, 139, 34)
    doc.text('PAID', margin + 10, yPos + 5)
  }

  yPos += 14
  return yPos
}

// ===========================================================================
// Generate Invoice PDF
// ===========================================================================
export function generateInvoicePdf(invoice: Invoice): jsPDF {
  const doc = new jsPDF('p', 'mm', 'a4')
  const h = createHelpers(doc)
  const { pageWidth, margin, formatDate, formatCurrency } = h
  let yPos: number

  // ---- HEADER ----
  doc.setFillColor(...SLATE_HEADER)
  doc.rect(0, 0, pageWidth, 38, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text(COMPANY_NAME, margin, 16)

  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text('INVOICE', pageWidth - margin, 16, { align: 'right' })

  // Amber accent strip
  doc.setFillColor(...AMBER_ACCENT)
  doc.rect(0, 38, pageWidth, 2, 'F')

  // ---- INVOICE META ----
  yPos = 50

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Invoice Number:', margin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.text(invoice.invoice_number, margin + 38, yPos)

  doc.setFont('helvetica', 'bold')
  doc.text('Invoice Date:', pageWidth / 2, yPos)
  doc.setFont('helvetica', 'normal')
  doc.text(formatDate(invoice.invoice_date), pageWidth / 2 + 32, yPos)
  yPos += 7

  doc.setFont('helvetica', 'bold')
  doc.text('Due Date:', margin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.text(formatDate(invoice.due_date), margin + 38, yPos)

  doc.setFont('helvetica', 'bold')
  doc.text('Status:', pageWidth / 2, yPos)
  doc.setFont('helvetica', 'normal')

  const statusText = invoice.payment_status.charAt(0).toUpperCase() + invoice.payment_status.slice(1)
  if (invoice.payment_status === 'paid') {
    doc.setTextColor(34, 139, 34)
  } else if (invoice.payment_status === 'overdue') {
    doc.setTextColor(200, 0, 0)
  } else {
    doc.setTextColor(180, 130, 0)
  }
  doc.text(statusText, pageWidth / 2 + 32, yPos)
  doc.setTextColor(0, 0, 0)
  yPos += 12

  // ---- BILL TO ----
  yPos = h.addSection('Bill To', yPos)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text(invoice.recipient_name, margin, yPos)
  yPos += 5

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(60, 60, 60)

  if (invoice.recipient_company) {
    doc.text(invoice.recipient_company, margin, yPos)
    yPos += 5
  }

  doc.text(invoice.recipient_email, margin, yPos)
  yPos += 5

  if (invoice.recipient_phone) {
    doc.text(invoice.recipient_phone, margin, yPos)
    yPos += 5
  }

  if (invoice.recipient_address) {
    yPos = h.addWrappedText(invoice.recipient_address, margin, yPos, pageWidth - margin * 2)
  }

  doc.setTextColor(0, 0, 0)
  yPos += 6

  // ---- LINE ITEMS ----
  yPos = h.addSection('Line Items', yPos)
  yPos = drawLineItemsTable(doc, invoice, yPos, h)

  // ---- TOTALS ----
  yPos += 4
  yPos = drawTotals(doc, invoice, yPos, h, false)

  // ---- NOTES ----
  if (invoice.notes) {
    yPos += 4
    yPos = h.addSection('Notes', yPos)
    doc.setFontSize(9)
    doc.setTextColor(60, 60, 60)
    yPos = h.addWrappedText(invoice.notes, margin, yPos, pageWidth - margin * 2)
    doc.setTextColor(0, 0, 0)
    yPos += 4
  }

  // ---- TERMS ----
  if (invoice.terms) {
    yPos += 2
    yPos = h.addSection('Terms & Conditions', yPos)
    doc.setFontSize(9)
    doc.setTextColor(60, 60, 60)
    yPos = h.addWrappedText(invoice.terms, margin, yPos, pageWidth - margin * 2)
    doc.setTextColor(0, 0, 0)
  }

  // ---- FOOTER ----
  h.addFooterToAllPages()

  return doc
}

// ===========================================================================
// Generate Receipt PDF
// ===========================================================================
export function generateReceiptPdf(
  invoice: Invoice,
  stripePaymentIntentId: string
): jsPDF {
  const doc = new jsPDF('p', 'mm', 'a4')
  const h = createHelpers(doc)
  const { pageWidth, margin, formatDate } = h
  let yPos: number

  // ---- HEADER ----
  doc.setFillColor(...SLATE_HEADER)
  doc.rect(0, 0, pageWidth, 38, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text(COMPANY_NAME, margin, 16)

  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text('PAYMENT RECEIPT', pageWidth - margin, 16, { align: 'right' })

  // Amber accent strip
  doc.setFillColor(...AMBER_ACCENT)
  doc.rect(0, 38, pageWidth, 2, 'F')

  // ---- PAID BANNER ----
  yPos = 50

  // Green "PAID" badge
  doc.setFillColor(34, 139, 34)
  doc.roundedRect(margin, yPos - 6, 50, 14, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('PAID', margin + 25, yPos + 3, { align: 'center' })

  // Checkmark circle
  doc.setFillColor(34, 139, 34)
  doc.circle(margin + 58, yPos + 1, 5, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  // Unicode checkmark
  doc.text('\u2713', margin + 55.8, yPos + 3.5)

  doc.setTextColor(0, 0, 0)
  yPos += 16

  // ---- RECEIPT META ----
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Invoice Number:', margin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.text(invoice.invoice_number, margin + 38, yPos)

  doc.setFont('helvetica', 'bold')
  doc.text('Payment Date:', pageWidth / 2, yPos)
  doc.setFont('helvetica', 'normal')
  const paymentDate = invoice.paid_at
    ? formatDate(invoice.paid_at)
    : formatDate(new Date().toISOString())
  doc.text(paymentDate, pageWidth / 2 + 32, yPos)
  yPos += 7

  doc.setFont('helvetica', 'bold')
  doc.text('Invoice Date:', margin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.text(formatDate(invoice.invoice_date), margin + 38, yPos)
  yPos += 12

  // ---- BILL TO ----
  yPos = h.addSection('Bill To', yPos)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text(invoice.recipient_name, margin, yPos)
  yPos += 5

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(60, 60, 60)

  if (invoice.recipient_company) {
    doc.text(invoice.recipient_company, margin, yPos)
    yPos += 5
  }

  doc.text(invoice.recipient_email, margin, yPos)
  yPos += 5

  if (invoice.recipient_phone) {
    doc.text(invoice.recipient_phone, margin, yPos)
    yPos += 5
  }

  if (invoice.recipient_address) {
    yPos = h.addWrappedText(invoice.recipient_address, margin, yPos, pageWidth - margin * 2)
  }

  doc.setTextColor(0, 0, 0)
  yPos += 6

  // ---- LINE ITEMS ----
  yPos = h.addSection('Line Items', yPos)
  yPos = drawLineItemsTable(doc, invoice, yPos, h)

  // ---- TOTALS ----
  yPos += 4
  yPos = drawTotals(doc, invoice, yPos, h, true)

  // ---- PAYMENT DETAILS ----
  yPos += 4
  yPos = h.addSection('Payment Details', yPos)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(60, 60, 60)
  doc.text('Transaction ID:', margin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  doc.text(stripePaymentIntentId, margin + 38, yPos)
  yPos += 7

  doc.setFont('helvetica', 'bold')
  doc.setTextColor(60, 60, 60)
  doc.text('Payment Method:', margin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  doc.text('Credit Card (Stripe)', margin + 38, yPos)
  yPos += 7

  doc.setFont('helvetica', 'bold')
  doc.setTextColor(60, 60, 60)
  doc.text('Amount Paid:', margin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(34, 139, 34)
  doc.text(h.formatCurrency(invoice.total_amount), margin + 38, yPos)
  doc.setTextColor(0, 0, 0)

  // ---- FOOTER ----
  h.addFooterToAllPages('Thank you for your payment!')

  return doc
}
