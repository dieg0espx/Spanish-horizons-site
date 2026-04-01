import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin'
import { sendEmail } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admin = await isAdmin(user.email)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { to, parentName, childName, subject, greeting, body, brightwheelLink, closingName } = await request.json()

    if (!to || !subject || !body) {
      return NextResponse.json({ error: 'Recipient, subject, and body are required' }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'

    // Build Brightwheel section if link provided
    const brightwheelSection = brightwheelLink ? `
      <div style="background-color: #FFF8E7; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #FF8C00;">
        <p style="color: #000638; margin: 0 0 8px 0; font-weight: 600; font-size: 16px;">
          Brightwheel Payment Portal
        </p>
        <p style="color: #374151; margin: 0 0 15px 0; font-size: 14px;">
          Use the link below to access your Brightwheel account for tuition payments and billing information.
        </p>
        <a href="${brightwheelLink}" style="display: inline-block; background-color: #FF8C00; color: white; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Open Brightwheel Portal
        </a>
      </div>
    ` : ''

    const brightwheelText = brightwheelLink ? `\n\nBrightwheel Payment Portal:\n${brightwheelLink}\n` : ''

    // Convert body line breaks to HTML paragraphs
    const bodyHtml = body
      .split('\n\n')
      .map((paragraph: string) => `<p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('')

    const greetingLine = greeting || `Dear ${parentName || 'Family'}`

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">${subject}</h1>
          <p style="color: #FFD700; margin: 10px 0 0 0;">Spanish Horizons Academy</p>
        </div>

        <div style="padding: 30px; background-color: #f9fafb;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">${greetingLine},</p>

          ${bodyHtml}

          ${brightwheelSection}

          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 24px 0 0 0;">
            If you have any questions, please don't hesitate to reach out at
            <a href="mailto:infospanishhorizons@casitaazulpdx.com" style="color: #FF8C00;">infospanishhorizons@casitaazulpdx.com</a>.
          </p>

          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 24px 0 0 0;">
            Warm regards,<br>
            <strong>${closingName || 'Spanish Horizons Academy Admissions Team'}</strong>
          </p>
        </div>

        <div style="background-color: #000638; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            770 NE Rogahn Street, Hillsboro, OR 97124<br>
            <a href="mailto:infospanishhorizons@casitaazulpdx.com" style="color: #FFD700;">infospanishhorizons@casitaazulpdx.com</a>
          </p>
        </div>
      </div>
    `

    const text = `${subject}\nSpanish Horizons Academy\n\n${greetingLine},\n\n${body}${brightwheelText}\n\nQuestions? Contact us at infospanishhorizons@casitaazulpdx.com\n\nWarm regards,\n${closingName || 'Spanish Horizons Academy Admissions Team'}\n\n770 NE Rogahn Street, Hillsboro, OR 97124`

    await sendEmail({
      to,
      subject,
      html,
      text,
      replyTo: process.env.CONTACT_EMAIL || 'infospanishhorizons@casitaazulpdx.com',
    })

    return NextResponse.json({ success: true, message: `Email sent to ${to}` })
  } catch (error: any) {
    console.error('Error sending custom email:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    )
  }
}
