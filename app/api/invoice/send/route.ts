import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin'
import nodemailer from 'nodemailer'

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { invoice_id, custom_email } = await request.json()

    if (!invoice_id) {
      return NextResponse.json(
        { error: 'Invoice ID is required' },
        { status: 400 }
      )
    }

    // Auth check
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    }
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !(await isAdmin(user.email || ''))) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    // Get invoice from database using admin client
    const adminClient = createAdminClient()
    if (!adminClient) {
      return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 })
    }

    const { data: invoice, error: fetchError } = await adminClient
      .from('invoices')
      .select('*')
      .eq('id', invoice_id)
      .single()

    if (fetchError || !invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    // Format amounts
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)
    }

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    // Generate line items HTML
    const lineItemsHtml = invoice.line_items.map((item: any) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; text-align: left;">${item.description}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right;">${formatCurrency(item.unit_price)}</td>
        <td style="padding: 12px; text-align: right; font-weight: 600;">${formatCurrency(item.amount)}</td>
      </tr>
    `).join('')

    // Create payment link
    const paymentUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invoice/${invoice.id}/pay`

    // Use custom email if provided, otherwise use invoice recipient email
    const emailTo = custom_email || invoice.recipient_email

    // Send email using Nodemailer
    try {
      await transporter.sendMail({
        from: `"Spanish Horizons Academy" <${process.env.SMTP_FROM}>`,
        to: emailTo,
        subject: `Invoice ${invoice.invoice_number} from Spanish Horizons Academy`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invoice ${invoice.invoice_number}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">

          <!-- Header -->
          <div style="background-color: #000638; color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Spanish Horizons Academy</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Invoice</p>
          </div>

          <!-- Content -->
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">

            <!-- Invoice Details -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #000638; margin: 0 0 15px 0; font-size: 24px; font-weight: bold;">Invoice ${invoice.invoice_number}</h2>
              <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px;">
                <tr>
                  <td style="padding: 15px; width: 50%;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">Invoice Date</p>
                    <p style="margin: 5px 0 0 0; font-weight: 600; color: #000638;">${formatDate(invoice.invoice_date)}</p>
                  </td>
                  <td style="padding: 15px; width: 50%;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">Due Date</p>
                    <p style="margin: 5px 0 0 0; font-weight: 600; color: #EF4444;">${formatDate(invoice.due_date)}</p>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Recipient Info -->
            <div style="margin-bottom: 30px; padding: 15px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #FF8C00;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Bill To:</p>
              <p style="margin: 0; font-weight: 600; font-size: 16px; color: #000638;">${invoice.recipient_name}</p>
              ${invoice.recipient_company ? `<p style="margin: 5px 0 0 0; color: #4b5563;">${invoice.recipient_company}</p>` : ''}
              <p style="margin: 5px 0 0 0; color: #4b5563;">${invoice.recipient_email}</p>
              ${invoice.recipient_phone ? `<p style="margin: 5px 0 0 0; color: #4b5563;">${invoice.recipient_phone}</p>` : ''}
              ${invoice.recipient_address ? `<p style="margin: 5px 0 0 0; color: #4b5563;">${invoice.recipient_address}</p>` : ''}
            </div>

            <!-- Line Items -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background-color: #000638; color: white;">
                  <th style="padding: 12px; text-align: left; font-weight: 600;">Description</th>
                  <th style="padding: 12px; text-align: center; font-weight: 600;">Qty</th>
                  <th style="padding: 12px; text-align: right; font-weight: 600;">Price</th>
                  <th style="padding: 12px; text-align: right; font-weight: 600;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${lineItemsHtml}
              </tbody>
            </table>

            <!-- Totals -->
            <table style="width: 100%; margin-top: 30px; padding: 0; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; border-collapse: collapse;">
              <tr>
                <td style="padding: 14px 20px; color: #6b7280; font-size: 15px;">Subtotal</td>
                <td style="padding: 14px 20px; text-align: right; font-weight: 600; color: #000638; font-size: 15px;">${formatCurrency(invoice.subtotal)}</td>
              </tr>
              ${invoice.tax_rate > 0 ? `
              <tr>
                <td style="padding: 14px 20px; color: #6b7280; font-size: 15px; border-top: 1px solid #e5e7eb;">Tax (${invoice.tax_rate}%)</td>
                <td style="padding: 14px 20px; text-align: right; font-weight: 600; color: #000638; font-size: 15px; border-top: 1px solid #e5e7eb;">${formatCurrency(invoice.tax_amount)}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 16px 20px; font-size: 18px; font-weight: 700; color: #000638; border-top: 2px solid #000638;">Total</td>
                <td style="padding: 16px 20px; text-align: right; font-size: 22px; font-weight: 700; color: #EF4444; border-top: 2px solid #000638;">${formatCurrency(invoice.total_amount)}</td>
              </tr>
            </table>

            <!-- Payment Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="${paymentUrl}" style="display: inline-block; background-color: #FF8C00; color: white; padding: 16px 48px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px;">
                Pay Invoice Now
              </a>
              <p style="margin: 15px 0 0 0; font-size: 14px; color: #6b7280;">
                Or copy this link: <a href="${paymentUrl}" style="color: #FF8C00; text-decoration: underline;">${paymentUrl}</a>
              </p>
            </div>

            <!-- Notes -->
            ${invoice.notes ? `
              <div style="margin-top: 30px; padding: 15px; background-color: #FFF7ED; border-left: 4px solid #FF8C00; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; font-weight: 600; color: #000638;">Notes:</p>
                <p style="margin: 0; color: #1f2937; line-height: 1.5;">${invoice.notes}</p>
              </div>
            ` : ''}

            <!-- Terms -->
            ${invoice.terms ? `
              <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 4px; border: 1px solid #e5e7eb;">
                <p style="margin: 0 0 10px 0; font-weight: 600; font-size: 14px; color: #000638;">Payment Terms:</p>
                <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.5;">${invoice.terms}</p>
              </div>
            ` : ''}

          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; font-size: 14px; background-color: transparent;">
            <p style="margin: 0; font-size: 16px; color: #1f2937;">Thank you for your business!</p>
            <p style="margin: 10px 0 0 0; font-weight: 600; font-size: 18px; color: #000638;">Spanish Horizons Academy</p>
            <p style="margin: 5px 0 0 0; color: #6b7280;">
              Questions? Contact us at <a href="mailto:infospanishhorizons@casitaazulpdx.com" style="color: #FF8C00; text-decoration: underline;">infospanishhorizons@casitaazulpdx.com</a>
            </p>
            <p style="margin: 5px 0 0 0; color: #6b7280;">
              Phone: <a href="tel:5039169758" style="color: #FF8C00; text-decoration: none;">(503) 916-9758</a>
            </p>
          </div>

        </body>
        </html>
      `,
      })
    } catch (emailError) {
      console.error('Email send error:', emailError)
      return NextResponse.json(
        { error: 'Failed to send email', details: emailError instanceof Error ? emailError.message : 'Unknown error' },
        { status: 500 }
      )
    }

    // Update invoice to mark as sent
    const { error: updateError } = await adminClient
      .from('invoices')
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString()
      })
      .eq('id', invoice_id)

    if (updateError) {
      console.error('Failed to update invoice:', updateError)
    }

    return NextResponse.json({
      success: true,
      message: 'Invoice email sent successfully'
    })

  } catch (error) {
    console.error('Error sending invoice:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
