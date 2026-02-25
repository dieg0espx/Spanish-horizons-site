import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin'

export async function GET() {
  try {
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json({ isAdmin: false })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user || !user.email) {
      return NextResponse.json({ isAdmin: false })
    }

    const adminStatus = await isAdmin(user.email)

    return NextResponse.json({ isAdmin: adminStatus })
  } catch {
    return NextResponse.json({ isAdmin: false })
  }
}
