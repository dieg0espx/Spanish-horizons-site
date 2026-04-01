import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { APPLICATION_FEE } from '@/lib/constants'

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

    const { code } = await request.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { valid: false, error: 'Please enter a coupon code' },
        { status: 400 }
      )
    }

    const adminClient = createAdminClient()
    if (!adminClient) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const normalizedCode = code.trim().toUpperCase()

    const { data: coupon, error: dbError } = await adminClient
      .from('coupons')
      .select('*')
      .eq('code', normalizedCode)
      .single()

    if (dbError || !coupon) {
      return NextResponse.json(
        { valid: false, error: 'Invalid coupon code' },
        { status: 200 }
      )
    }

    if (!coupon.is_active) {
      return NextResponse.json(
        { valid: false, error: 'This coupon is no longer active' },
        { status: 200 }
      )
    }

    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return NextResponse.json(
        { valid: false, error: 'This coupon has expired' },
        { status: 200 }
      )
    }

    if (coupon.max_uses !== null && coupon.current_uses >= coupon.max_uses) {
      return NextResponse.json(
        { valid: false, error: 'This coupon has reached its usage limit' },
        { status: 200 }
      )
    }

    let discountAmount: number
    if (coupon.discount_type === 'percentage') {
      discountAmount = Math.round((APPLICATION_FEE * coupon.discount_value / 100) * 100) / 100
    } else {
      discountAmount = Math.min(coupon.discount_value, APPLICATION_FEE)
    }

    const finalAmount = Math.max(0, APPLICATION_FEE - discountAmount)

    return NextResponse.json({
      valid: true,
      discountType: coupon.discount_type,
      discountValue: coupon.discount_value,
      discountAmount,
      finalAmount,
    })

  } catch (error) {
    console.error('Error validating coupon:', error)
    return NextResponse.json(
      { error: 'Failed to validate coupon' },
      { status: 500 }
    )
  }
}
