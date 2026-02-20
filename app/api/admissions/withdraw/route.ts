import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST - Withdraw an application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { applicationId } = body

    if (!applicationId) {
      return NextResponse.json({ error: 'Application ID is required' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify the application belongs to the user
    const { data: application, error: appError } = await supabase
      .from('applications')
      .select('id, user_id, status')
      .eq('id', applicationId)
      .eq('user_id', user.id)
      .single()

    if (appError || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // Check if application can be withdrawn (not already in final state)
    const finalStates = ['admitted', 'rejected', 'declined', 'withdrawn']
    if (finalStates.includes(application.status)) {
      return NextResponse.json({ error: 'This application cannot be withdrawn' }, { status: 400 })
    }

    // Update application status to withdrawn
    const { data: updatedApplication, error: updateError } = await supabase
      .from('applications')
      .update({
        status: 'withdrawn',
        updated_at: new Date().toISOString()
      })
      .eq('id', applicationId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) {
      console.error('Database error:', updateError)
      return NextResponse.json({ error: 'Failed to withdraw application' }, { status: 500 })
    }

    // If application had a booked interview slot, release it
    const { error: slotError } = await supabase
      .from('interview_availability')
      .update({
        is_booked: false,
        booked_by_application_id: null
      })
      .eq('booked_by_application_id', applicationId)

    if (slotError) {
      console.error('Error releasing interview slot:', slotError)
      // Don't fail the request if slot release fails
    }

    return NextResponse.json({
      success: true,
      message: 'Application withdrawn successfully',
      application: updatedApplication
    })
  } catch (error) {
    console.error('Error withdrawing application:', error)
    return NextResponse.json({ error: 'Failed to withdraw application' }, { status: 500 })
  }
}
