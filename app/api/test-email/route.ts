import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/resend'

export async function GET() {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'RESEND_API_KEY is not configured' },
      { status: 500 }
    )
  }

  const to = process.env.CONTACT_EMAIL || 'delivered@resend.dev'

  try {
    const data = await sendEmail({
      to,
      subject: 'Test Email - Spanish Horizons Academy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Test Email</h1>
            <p style="color: #FFD700; margin: 10px 0 0 0;">Spanish Horizons Academy</p>
          </div>
          <div style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
            <p style="color: #374151; font-size: 16px;">This is a test email sent via Resend.</p>
            <p style="color: #6b7280; font-size: 14px;">Sent at: ${new Date().toISOString()}</p>
          </div>
        </div>
      `,
      text: `Test Email - Spanish Horizons Academy\n\nThis is a test email sent via Resend.\nSent at: ${new Date().toISOString()}`
    })

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${to}`,
      data
    })
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send test email' },
      { status: 500 }
    )
  }
}
