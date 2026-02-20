import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { applicationId } = body

    if (!applicationId) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Use admin client to bypass RLS
    const adminClient = createAdminClient()

    if (!adminClient) {
      return NextResponse.json(
        { error: 'Admin client not configured' },
        { status: 500 }
      )
    }

    // Get the application and verify ownership
    const { data: application, error: fetchError } = await adminClient
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    // Check if the application has an interview scheduled
    if (application.status !== 'interview_scheduled') {
      return NextResponse.json(
        { error: 'No interview scheduled for this application' },
        { status: 400 }
      )
    }

    // Find and free up the booked slot
    const { data: bookedSlot } = await adminClient
      .from('interview_availability')
      .select('*')
      .eq('booked_by_application_id', applicationId)
      .single()

    if (bookedSlot) {
      // Free up the slot
      await adminClient
        .from('interview_availability')
        .update({
          is_booked: false,
          booked_by_application_id: null
        })
        .eq('id', bookedSlot.id)
    }

    // Update application status back to interview_pending so they can rebook
    const { data: updatedApplication, error: updateError } = await adminClient
      .from('applications')
      .update({
        status: 'interview_pending',
        interview_date: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', applicationId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating application:', updateError)
      return NextResponse.json(
        { error: 'Failed to cancel interview' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      application: updatedApplication
    })

  } catch (error) {
    console.error('Error canceling interview:', error)
    return NextResponse.json(
      { error: 'Failed to cancel interview' },
      { status: 500 }
    )
  }
}
