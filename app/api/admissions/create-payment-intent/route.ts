import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { APPLICATION_FEE } from '@/lib/constants'

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-11-20.acacia' as any
  })
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      )
    }

    const { couponCode } = await request.json()

    // Server-side coupon validation to prevent tampering
    let finalAmount = APPLICATION_FEE
    let discountAmount = 0
    let validatedCouponCode: string | null = null

    if (couponCode) {
      const adminClient = createAdminClient()
      if (!adminClient) {
        return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
      }

      const normalizedCode = couponCode.trim().toUpperCase()
      const { data: coupon } = await adminClient
        .from('coupons')
        .select('*')
        .eq('code', normalizedCode)
        .single()

      if (coupon && coupon.is_active) {
        const notExpired = !coupon.expires_at || new Date(coupon.expires_at) >= new Date()
        const hasUses = coupon.max_uses === null || coupon.current_uses < coupon.max_uses

        if (notExpired && hasUses) {
          if (coupon.discount_type === 'percentage') {
            discountAmount = Math.round((APPLICATION_FEE * coupon.discount_value / 100) * 100) / 100
          } else {
            discountAmount = Math.min(coupon.discount_value, APPLICATION_FEE)
          }
          finalAmount = Math.max(0, APPLICATION_FEE - discountAmount)
          validatedCouponCode = normalizedCode
        }
      }
    }

    // If fully covered by coupon, no Stripe needed
    if (finalAmount === 0) {
      return NextResponse.json({
        waived: true,
        couponCode: validatedCouponCode,
        discountAmount,
        finalAmount: 0,
      })
    }

    const stripe = getStripe()
    const amountInCents = Math.round(finalAmount * 100)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      receipt_email: user.email,
      metadata: {
        type: 'application_fee',
        user_id: user.id,
        coupon_code: validatedCouponCode || '',
        discount_amount: discountAmount.toString(),
      },
      description: `Spanish Horizons Academy - Application Fee`,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      couponCode: validatedCouponCode,
      discountAmount,
      finalAmount,
    })

  } catch (error: any) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
