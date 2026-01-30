import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // Send notification email to admin only
    // (User receives confirmation email from Supabase)
    const adminMailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: 'New User Registration - Spanish Horizons Academy',
      html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #000638 0%, #1a1f5c 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #FFD700; margin: 0; font-size: 24px;">New User Registration</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">Spanish Horizons Academy</p>
          </div>

          <div style="background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #FF8C00;">
              <h3 style="color: #000638; margin-top: 0;">Registration Details</h3>
              <p style="color: #374151;"><strong>Email:</strong> ${email}</p>
              <p style="color: #374151;"><strong>Date:</strong> ${new Date().toLocaleString('en-US', {
                timeZone: 'America/Los_Angeles',
                dateStyle: 'full',
                timeStyle: 'short'
              })}</p>
            </div>

            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              A new user has registered on the Spanish Horizons Academy website. They will need to confirm their email address before they can sign in.
            </p>
          </div>

          <div style="background-color: #000638; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: #ffffff; margin: 0; font-size: 12px; opacity: 0.8;">
              Spanish Horizons Academy | 770 NE Rogahn Street, Hillsboro, OR 97124
            </p>
          </div>
        </div>
      `,
      text: `
New User Registration - Spanish Horizons Academy

Registration Details:
Email: ${email}
Date: ${new Date().toLocaleString('en-US', {
  timeZone: 'America/Los_Angeles',
  dateStyle: 'full',
  timeStyle: 'short'
})}

A new user has registered on the Spanish Horizons Academy website. They will need to confirm their email address before they can sign in.

Spanish Horizons Academy | 770 NE Rogahn Street, Hillsboro, OR 97124
      `
    }

    // Send admin notification only
    await transporter.sendMail(adminMailOptions)

    console.log('Registration notification emails sent successfully')

    return NextResponse.json(
      { message: 'Registration notification sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending registration notification:', error)
    return NextResponse.json(
      { error: 'Failed to send registration notification' },
      { status: 500 }
    )
  }
}
