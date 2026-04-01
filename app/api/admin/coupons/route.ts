import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin'
import { sendEmail } from '@/lib/resend'
import { APPLICATION_FEE } from '@/lib/constants'

async function verifyAdmin() {
  const supabase = await createClient()
  if (!supabase) return null

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user?.email) return null

  const admin = await isAdmin(user.email)
  if (!admin) return null

  return user
}

export async function GET() {
  try {
    const user = await verifyAdmin()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const adminClient = createAdminClient()
    if (!adminClient) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { data: coupons, error } = await adminClient
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 })
    }

    return NextResponse.json({ coupons: coupons || [] })
  } catch (error) {
    console.error('Error fetching coupons:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAdmin()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const adminClient = createAdminClient()
    if (!adminClient) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { action, ...body } = await request.json()

    // Send coupon email action
    if (action === 'send_email') {
      const { id } = body

      if (!id) {
        return NextResponse.json({ error: 'Coupon ID is required' }, { status: 400 })
      }

      const { data: coupon, error: fetchError } = await adminClient
        .from('coupons')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError || !coupon) {
        return NextResponse.json({ error: 'Coupon not found' }, { status: 404 })
      }

      if (!coupon.recipient_email) {
        return NextResponse.json({ error: 'No recipient email set for this coupon' }, { status: 400 })
      }

      // Calculate discount for email
      let discountText: string
      if (coupon.discount_type === 'percentage') {
        const discountAmount = Math.round((APPLICATION_FEE * coupon.discount_value / 100) * 100) / 100
        const finalAmount = Math.max(0, APPLICATION_FEE - discountAmount)
        discountText = `${coupon.discount_value}% off (you pay $${finalAmount.toFixed(2)} instead of $${APPLICATION_FEE.toFixed(2)})`
      } else {
        const finalAmount = Math.max(0, APPLICATION_FEE - coupon.discount_value)
        if (finalAmount === 0) {
          discountText = `$${coupon.discount_value.toFixed(2)} off — your application fee is fully covered!`
        } else {
          discountText = `$${coupon.discount_value.toFixed(2)} off (you pay $${finalAmount.toFixed(2)} instead of $${APPLICATION_FEE.toFixed(2)})`
        }
      }

      const recipientName = coupon.recipient_name || 'Family'
      const childName = coupon.child_name || 'your child'
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'

      await sendEmail({
        to: coupon.recipient_email,
        subject: `Your Application Coupon Code - Spanish Horizons Academy`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Your Application Coupon</h1>
              <p style="color: #FFD700; margin: 10px 0 0 0;">Spanish Horizons Academy</p>
            </div>

            <div style="padding: 30px; background-color: #f9fafb;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${recipientName},</p>

              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                We're excited to share a special coupon code for ${childName}'s application to Spanish Horizons Academy!
              </p>

              <div style="background-color: #FFF8E7; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px dashed #FF8C00; text-align: center;">
                <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Coupon Code</p>
                <p style="color: #000638; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 3px;">${coupon.code}</p>
                <p style="color: #374151; margin: 12px 0 0 0; font-size: 15px;">${discountText}</p>
              </div>

              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                <strong>How to use your coupon:</strong>
              </p>
              <ol style="color: #374151; font-size: 16px; line-height: 1.8;">
                <li>Visit our <a href="${siteUrl}/admissions/application" style="color: #FF8C00;">admissions application page</a></li>
                <li>Complete the application form</li>
                <li>On the payment step, enter your coupon code: <strong>${coupon.code}</strong></li>
                <li>The discount will be applied automatically</li>
              </ol>

              ${coupon.expires_at ? `<p style="color: #6b7280; font-size: 14px; margin-top: 20px;">This coupon expires on ${new Date(coupon.expires_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>` : ''}

              <div style="margin-top: 30px; text-align: center;">
                <a href="${siteUrl}/admissions/application" style="display: inline-block; background-color: #FF8C00; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                  Start Your Application
                </a>
              </div>

              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 30px;">
                If you have any questions, please contact us at <a href="mailto:infospanishhorizons@casitaazulpdx.com" style="color: #FF8C00;">infospanishhorizons@casitaazulpdx.com</a>.
              </p>

              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 20px;">
                Warm regards,<br>
                <strong>Spanish Horizons Academy Admissions Team</strong>
              </p>
            </div>

            <div style="background-color: #000638; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                770 NE Rogahn Street, Hillsboro, OR 97124<br>
                <a href="mailto:infospanishhorizons@casitaazulpdx.com" style="color: #FFD700;">infospanishhorizons@casitaazulpdx.com</a>
              </p>
            </div>
          </div>
        `,
        text: `
Your Application Coupon - Spanish Horizons Academy

Dear ${recipientName},

We're excited to share a special coupon code for ${childName}'s application!

Your Coupon Code: ${coupon.code}
${discountText}

How to use:
1. Visit ${siteUrl}/admissions/application
2. Complete the application form
3. Enter coupon code ${coupon.code} on the payment step

${coupon.expires_at ? `This coupon expires on ${new Date(coupon.expires_at).toLocaleDateString()}.` : ''}

Questions? Contact us at infospanishhorizons@casitaazulpdx.com

Warm regards,
Spanish Horizons Academy Admissions Team
        `
      })

      // Mark coupon as email sent
      await adminClient
        .from('coupons')
        .update({ email_sent: true, email_sent_at: new Date().toISOString() })
        .eq('id', id)

      return NextResponse.json({ success: true, message: `Coupon sent to ${coupon.recipient_email}` })
    }

    // Create coupon (default action)
    const { code, discountType, discountValue, maxUses, expiresAt, recipientEmail, recipientName, childName } = body

    if (!code || !discountType || discountValue === undefined || discountValue === null) {
      return NextResponse.json({ error: 'Code, discount type, and discount value are required' }, { status: 400 })
    }

    if (discountType === 'percentage' && (discountValue < 0 || discountValue > 100)) {
      return NextResponse.json({ error: 'Percentage must be between 0 and 100' }, { status: 400 })
    }

    if (discountType === 'fixed' && discountValue < 0) {
      return NextResponse.json({ error: 'Discount value must be positive' }, { status: 400 })
    }

    const normalizedCode = code.trim().toUpperCase()

    const { data: existing } = await adminClient
      .from('coupons')
      .select('id')
      .eq('code', normalizedCode)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'A coupon with this code already exists' }, { status: 400 })
    }

    const { data: coupon, error } = await adminClient
      .from('coupons')
      .insert({
        code: normalizedCode,
        discount_type: discountType,
        discount_value: discountValue,
        max_uses: maxUses || 1,
        expires_at: expiresAt || null,
        recipient_email: recipientEmail || null,
        recipient_name: recipientName || null,
        child_name: childName || null,
        created_by: user.email,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating coupon:', error)
      return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 })
    }

    return NextResponse.json({ coupon }, { status: 201 })
  } catch (error) {
    console.error('Error creating coupon:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await verifyAdmin()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const adminClient = createAdminClient()
    if (!adminClient) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { id, is_active } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Coupon ID is required' }, { status: 400 })
    }

    const { error } = await adminClient
      .from('coupons')
      .update({ is_active })
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: 'Failed to update coupon' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating coupon:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await verifyAdmin()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const adminClient = createAdminClient()
    if (!adminClient) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Coupon ID is required' }, { status: 400 })
    }

    const { error } = await adminClient
      .from('coupons')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting coupon:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
