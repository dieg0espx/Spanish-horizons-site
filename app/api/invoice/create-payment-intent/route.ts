import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/server'

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
    const stripe = getStripe()
    const { invoice_id, amount } = await request.json()

    if (!invoice_id || !amount) {
      return NextResponse.json(
        { error: 'Invoice ID and amount are required' },
        { status: 400 }
      )
    }

    // Fetch invoice from database using admin client (public payment page, no user auth)
    const adminClient = createAdminClient()
    if (!adminClient) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { data: invoice, error: fetchError } = await adminClient
      .from('invoices')
      .select('recipient_email, recipient_name, invoice_number')
      .eq('id', invoice_id)
      .single()

    if (fetchError || !invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    // Convert amount to cents for Stripe
    const amountInCents = Math.round(amount * 100)

    // Create payment intent with customer email
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      receipt_email: invoice.recipient_email,
      metadata: {
        invoice_id: invoice_id,
        invoice_number: invoice.invoice_number,
        customer_name: invoice.recipient_name,
        type: 'invoice_payment'
      },
      description: `Invoice payment for ${invoice.invoice_number}`,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })

  } catch (error: any) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
