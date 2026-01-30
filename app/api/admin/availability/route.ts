import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'

// List of admin emails
const ADMIN_EMAILS = [
  'infospanishhorizons@casitaazulpdx.com',
  'aletxa@comcreate.org',
]

// GET - Fetch all availability slots
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Use admin client to fetch availability with joined data
    const adminClient = createAdminClient()

    if (!adminClient) {
      return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 })
    }

    // Fetch slots with application data for booked slots
    const { data: slots, error } = await adminClient
      .from('interview_availability')
      .select(`
        *,
        applications:booked_by_application_id (
          child_full_name
        )
      `)
      .order('date', { ascending: true })
      .order('start_time', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
    }

    // Transform the data to include booked_child_name
    const slotsWithNames = slots?.map(slot => ({
      ...slot,
      booked_child_name: slot.applications?.child_full_name || null,
      applications: undefined // Remove the nested applications object
    })) || []

    return NextResponse.json({ slots: slotsWithNames })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }
}

// POST - Add new availability slot (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, start_time, end_time } = body

    if (!date || !start_time || !end_time) {
      return NextResponse.json({ error: 'Date, start time, and end time are required' }, { status: 400 })
    }

    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!ADMIN_EMAILS.includes(user.email || '')) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    // Use admin client to insert
    const adminClient = createAdminClient()

    if (!adminClient) {
      return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 })
    }

    const { data: slot, error } = await adminClient
      .from('interview_availability')
      .insert({
        date,
        start_time,
        end_time,
        is_booked: false,
        created_by: user.id
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to add availability' }, { status: 500 })
    }

    return NextResponse.json({ slot })
  } catch (error) {
    console.error('Error adding availability:', error)
    return NextResponse.json({ error: 'Failed to add availability' }, { status: 500 })
  }
}

// DELETE - Remove availability slot (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slotId = searchParams.get('id')

    if (!slotId) {
      return NextResponse.json({ error: 'Slot ID is required' }, { status: 400 })
    }

    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!ADMIN_EMAILS.includes(user.email || '')) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    // Use admin client to delete
    const adminClient = createAdminClient()

    if (!adminClient) {
      return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 })
    }

    const { error } = await adminClient
      .from('interview_availability')
      .delete()
      .eq('id', slotId)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to delete availability' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting availability:', error)
    return NextResponse.json({ error: 'Failed to delete availability' }, { status: 500 })
  }
}
