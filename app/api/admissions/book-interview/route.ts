import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import nodemailer from 'nodemailer'

// POST - Book an interview slot
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { applicationId, slotId } = body

    if (!applicationId || !slotId) {
      return NextResponse.json({ error: 'Application ID and slot ID are required' }, { status: 400 })
    }

    // MOCK MODE - Return success
    return NextResponse.json({
      success: true,
      message: 'Interview booked successfully',
      interview_date: '2024-02-10T10:00:00Z'
    })

    /* UNCOMMENT WHEN CONNECTING TO SUPABASE
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify the application belongs to the user
    const { data: application, error: appError } = await supabase
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .eq('user_id', user.id)
      .single()

    if (appError || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // Check if slot is still available
    const { data: slot, error: slotError } = await supabase
      .from('interview_availability')
      .select('*')
      .eq('id', slotId)
      .eq('is_booked', false)
      .single()

    if (slotError || !slot) {
      return NextResponse.json({ error: 'This time slot is no longer available' }, { status: 400 })
    }

    // Book the slot
    const interviewDate = new Date(`${slot.date}T${slot.start_time}:00`)

    const { error: bookError } = await supabase
      .from('interview_availability')
      .update({
        is_booked: true,
        booked_by_application_id: applicationId
      })
      .eq('id', slotId)

    if (bookError) {
      console.error('Booking error:', bookError)
      return NextResponse.json({ error: 'Failed to book interview' }, { status: 500 })
    }

    // Update application status
    const { error: updateError } = await supabase
      .from('applications')
      .update({
        status: 'interview_scheduled',
        interview_date: interviewDate.toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', applicationId)

    if (updateError) {
      console.error('Update error:', updateError)
    }

    // Send confirmation emails
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // Email to parent
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: application.parent_email,
      subject: 'Interview Confirmed - Spanish Horizons Academy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #000638;">Interview Confirmed!</h1>
          <p>Dear ${application.parent_name},</p>
          <p>Your interview for <strong>${application.child_full_name}</strong> has been confirmed.</p>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Date:</strong> ${interviewDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p style="margin: 10px 0 0;"><strong>Time:</strong> ${slot.start_time} - ${slot.end_time}</p>
          </div>
          <p>We look forward to meeting you!</p>
        </div>
      `
    })

    // Email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Interview Booked - ${application.child_full_name}`,
      html: `
        <p>An interview has been booked:</p>
        <p><strong>Child:</strong> ${application.child_full_name}</p>
        <p><strong>Parent:</strong> ${application.parent_name} (${application.parent_email})</p>
        <p><strong>Date:</strong> ${interviewDate.toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${slot.start_time} - ${slot.end_time}</p>
      `
    })

    return NextResponse.json({
      success: true,
      message: 'Interview booked successfully',
      interview_date: interviewDate.toISOString()
    })
    */
  } catch (error) {
    console.error('Error booking interview:', error)
    return NextResponse.json({ error: 'Failed to book interview' }, { status: 500 })
  }
}
