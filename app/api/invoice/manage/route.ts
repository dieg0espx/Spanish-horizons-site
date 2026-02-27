import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin'

export async function GET() {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    }
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !(await isAdmin(user.email || ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const adminClient = createAdminClient()
    if (!adminClient) {
      return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 })
    }

    const { data, error } = await adminClient
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ invoices: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    }
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !(await isAdmin(user.email || ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const adminClient = createAdminClient()
    if (!adminClient) {
      return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 })
    }

    const body = await request.json()

    // Generate invoice number
    const { data: invoiceNumber, error: rpcError } = await adminClient
      .rpc('generate_invoice_number')

    if (rpcError) {
      return NextResponse.json({ error: 'Failed to generate invoice number' }, { status: 500 })
    }

    // Calculate amounts
    const line_items = body.line_items || []
    const subtotal = line_items.reduce((sum: number, item: any) => sum + item.amount, 0)
    const tax_rate = body.tax_rate ?? 0
    const tax_amount = subtotal * tax_rate / 100
    const total_amount = subtotal + tax_amount

    const invoice = {
      invoice_number: invoiceNumber,
      recipient_name: body.recipient_name,
      recipient_email: body.recipient_email,
      recipient_phone: body.recipient_phone || null,
      recipient_address: body.recipient_address || null,
      recipient_company: body.recipient_company || null,
      due_date: body.due_date,
      invoice_date: body.invoice_date || new Date().toISOString().split('T')[0],
      line_items,
      subtotal,
      tax_rate,
      tax_amount,
      total_amount,
      notes: body.notes || null,
      terms: body.terms || null,
      payment_status: 'pending',
      email_sent: false,
      created_by: user.id,
    }

    const { data, error } = await adminClient
      .from('invoices')
      .insert([invoice])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ invoice: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
    }
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !(await isAdmin(user.email || ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const adminClient = createAdminClient()
    if (!adminClient) {
      return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 })
    }

    const { error } = await adminClient
      .from('invoices')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
