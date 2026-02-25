import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin, getAdminUsers, addAdminUser, removeAdminUser } from '@/lib/admin'

// GET - List all admin users
export async function GET() {
  try {
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user || !user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!(await isAdmin(user.email))) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const admins = await getAdminUsers()

    return NextResponse.json({ admins })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch admin users' }, { status: 500 })
  }
}

// POST - Add a new admin user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user || !user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!(await isAdmin(user.email))) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const admin = await addAdminUser(email, user.email)

    if (!admin) {
      return NextResponse.json({ error: 'Failed to add admin user. Email may already exist.' }, { status: 400 })
    }

    return NextResponse.json({ admin })
  } catch {
    return NextResponse.json({ error: 'Failed to add admin user' }, { status: 500 })
  }
}

// DELETE - Remove an admin user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Admin user ID is required' }, { status: 400 })
    }

    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user || !user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!(await isAdmin(user.email))) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    // Prevent self-removal: check if the admin being removed is the current user
    const admins = await getAdminUsers()
    const targetAdmin = admins.find(a => a.id === id)

    if (targetAdmin && targetAdmin.email === user.email.toLowerCase()) {
      return NextResponse.json({ error: 'Cannot remove yourself as admin' }, { status: 400 })
    }

    const success = await removeAdminUser(id)

    if (!success) {
      return NextResponse.json({ error: 'Failed to remove admin user' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to remove admin user' }, { status: 500 })
  }
}
