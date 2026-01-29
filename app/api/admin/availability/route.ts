import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// List of admin emails
const ADMIN_EMAILS = [
  'infospanishhorizons@casitaazulpdx.com',
  'aletxa@comcreate.org',
]

// MOCK DATA - DELETE WHEN CONNECTING TO SUPABASE
// Mock application names for booked slots
const MOCK_APPLICATION_NAMES: { [key: string]: string } = {
  'mock-1': 'Sofia Martinez',
  'mock-2': 'Lucas Martinez',
  'mock-3': 'Emma Johnson',
  'mock-4': 'Oliver Wilson',
  'mock-5': 'Mia Rodriguez'
}

let MOCK_AVAILABILITY: {
  id: string
  date: string
  start_time: string
  end_time: string
  is_booked: boolean
  booked_by_application_id: string | null
  booked_child_name?: string | null
  created_at: string
}[] = [
  // February 2026
  {
    id: 'slot-1',
    date: '2026-02-02',
    start_time: '09:00',
    end_time: '09:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-2',
    date: '2026-02-02',
    start_time: '09:30',
    end_time: '10:00',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-3',
    date: '2026-02-02',
    start_time: '10:00',
    end_time: '10:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-4',
    date: '2026-02-02',
    start_time: '10:30',
    end_time: '11:00',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-5',
    date: '2026-02-02',
    start_time: '14:00',
    end_time: '14:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-6',
    date: '2026-02-02',
    start_time: '14:30',
    end_time: '15:00',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-7',
    date: '2026-02-03',
    start_time: '09:00',
    end_time: '09:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-8',
    date: '2026-02-03',
    start_time: '09:30',
    end_time: '10:00',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-9',
    date: '2026-02-03',
    start_time: '11:00',
    end_time: '11:30',
    is_booked: true,
    booked_by_application_id: 'mock-1',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-10',
    date: '2026-02-04',
    start_time: '10:00',
    end_time: '10:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-11',
    date: '2026-02-04',
    start_time: '10:30',
    end_time: '11:00',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-12',
    date: '2026-02-04',
    start_time: '11:00',
    end_time: '11:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-13',
    date: '2026-02-05',
    start_time: '09:00',
    end_time: '09:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-14',
    date: '2026-02-05',
    start_time: '14:00',
    end_time: '14:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-15',
    date: '2026-02-05',
    start_time: '15:00',
    end_time: '15:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-16',
    date: '2026-02-06',
    start_time: '09:00',
    end_time: '09:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-17',
    date: '2026-02-06',
    start_time: '09:30',
    end_time: '10:00',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-18',
    date: '2026-02-06',
    start_time: '10:00',
    end_time: '10:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  // Week 2
  {
    id: 'slot-19',
    date: '2026-02-09',
    start_time: '09:00',
    end_time: '09:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-20',
    date: '2026-02-09',
    start_time: '10:00',
    end_time: '10:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-21',
    date: '2026-02-09',
    start_time: '11:00',
    end_time: '11:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-22',
    date: '2026-02-10',
    start_time: '09:00',
    end_time: '09:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-23',
    date: '2026-02-10',
    start_time: '14:00',
    end_time: '14:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-24',
    date: '2026-02-10',
    start_time: '15:00',
    end_time: '15:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-25',
    date: '2026-02-11',
    start_time: '09:00',
    end_time: '09:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-26',
    date: '2026-02-11',
    start_time: '09:30',
    end_time: '10:00',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-27',
    date: '2026-02-12',
    start_time: '10:00',
    end_time: '10:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-28',
    date: '2026-02-12',
    start_time: '11:00',
    end_time: '11:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-29',
    date: '2026-02-13',
    start_time: '09:00',
    end_time: '09:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'slot-30',
    date: '2026-02-13',
    start_time: '14:00',
    end_time: '14:30',
    is_booked: false,
    booked_by_application_id: null,
    created_at: '2024-01-15T10:00:00Z'
  },
]
// END MOCK DATA

// GET - Fetch all availability slots
export async function GET(request: NextRequest) {
  try {
    // MOCK MODE - Return mock data with child names
    const slotsWithNames = MOCK_AVAILABILITY.map(slot => ({
      ...slot,
      booked_child_name: slot.booked_by_application_id
        ? MOCK_APPLICATION_NAMES[slot.booked_by_application_id] || null
        : null
    }))
    return NextResponse.json({ slots: slotsWithNames })

    /* UNCOMMENT WHEN CONNECTING TO SUPABASE
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: slots, error } = await supabase
      .from('interview_availability')
      .select('*')
      .order('date', { ascending: true })
      .order('start_time', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
    }

    return NextResponse.json({ slots })
    */
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

    // MOCK MODE - Add to mock data
    const newSlot = {
      id: `slot-${Date.now()}`,
      date,
      start_time,
      end_time,
      is_booked: false,
      booked_by_application_id: null,
      created_at: new Date().toISOString()
    }
    MOCK_AVAILABILITY.push(newSlot)
    return NextResponse.json({ slot: newSlot })

    /* UNCOMMENT WHEN CONNECTING TO SUPABASE
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!ADMIN_EMAILS.includes(user.email || '')) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const { data: slot, error } = await supabase
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
    */
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

    // MOCK MODE - Remove from mock data
    const index = MOCK_AVAILABILITY.findIndex(s => s.id === slotId)
    if (index === -1) {
      return NextResponse.json({ error: 'Slot not found' }, { status: 404 })
    }
    MOCK_AVAILABILITY.splice(index, 1)
    return NextResponse.json({ success: true })

    /* UNCOMMENT WHEN CONNECTING TO SUPABASE
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!ADMIN_EMAILS.includes(user.email || '')) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const { error } = await supabase
      .from('interview_availability')
      .delete()
      .eq('id', slotId)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to delete availability' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
    */
  } catch (error) {
    console.error('Error deleting availability:', error)
    return NextResponse.json({ error: 'Failed to delete availability' }, { status: 500 })
  }
}
