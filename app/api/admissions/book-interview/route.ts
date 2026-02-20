import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import nodemailer from 'nodemailer'

// POST - Book an interview slot
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { applicationId, slotId } = body

    console.log('Booking interview - Application:', applicationId, 'Slot:', slotId)

    if (!applicationId || !slotId) {
      return NextResponse.json({ error: 'Application ID and slot ID are required' }, { status: 400 })
    }

    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Use admin client to bypass RLS
    const adminClient = createAdminClient()

    if (!adminClient) {
      return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 })
    }

    // Verify the application belongs to the user
    const { data: application, error: appError } = await adminClient
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .eq('user_id', user.id)
      .single()

    if (appError || !application) {
      console.error('Application fetch error:', appError)
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // Check if application is in the correct status
    if (application.status !== 'interview_pending') {
      return NextResponse.json({ error: 'Application is not eligible for interview booking' }, { status: 400 })
    }

    // Check if slot is still available
    const { data: slot, error: slotError } = await adminClient
      .from('interview_availability')
      .select('*')
      .eq('id', slotId)
      .eq('is_booked', false)
      .single()

    if (slotError || !slot) {
      console.error('Slot fetch error:', slotError)
      return NextResponse.json({ error: 'This time slot is no longer available. Please select another time.' }, { status: 400 })
    }

    console.log('Found slot:', slot)

    // Book the slot
    const interviewDate = new Date(`${slot.date}T${slot.start_time}:00`)

    const { data: updatedSlot, error: bookError } = await adminClient
      .from('interview_availability')
      .update({
        is_booked: true,
        booked_by_application_id: applicationId
      })
      .eq('id', slotId)
      .select()
      .single()

    if (bookError) {
      console.error('Booking error:', bookError)
      return NextResponse.json({ error: 'Failed to book interview slot' }, { status: 500 })
    }

    console.log('Slot booked:', updatedSlot)

    // Update application status
    const { data: updatedApplication, error: updateError } = await adminClient
      .from('applications')
      .update({
        status: 'interview_scheduled',
        interview_date: interviewDate.toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', applicationId)
      .select()
      .single()

    if (updateError) {
      console.error('Application update error:', updateError)
      // Rollback the slot booking
      await adminClient
        .from('interview_availability')
        .update({
          is_booked: false,
          booked_by_application_id: null
        })
        .eq('id', slotId)
      return NextResponse.json({ error: 'Failed to update application status' }, { status: 500 })
    }

    console.log('Application updated:', updatedApplication)

    // Send confirmation emails
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      })

      // Email to user (registered email)
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: application.user_email,
        subject: 'Interview Confirmed - Spanish Horizons Academy',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Interview Confirmed!</h1>
              <p style="color: #FFD700; margin: 10px 0 0 0;">Spanish Horizons Academy</p>
            </div>

            <div style="padding: 30px; background-color: #f9fafb;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${application.parent_name},</p>

              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Your interview for <strong>${application.child_full_name}</strong> has been confirmed!
              </p>

              <div style="background-color: #EBF5FF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3B82F6;">
                <p style="color: #000638; margin: 0; font-weight: 600; font-size: 18px;">
                  Interview Details
                </p>
                <p style="color: #374151; margin: 15px 0 0 0; font-size: 16px;">
                  <strong>Date:</strong> ${interviewDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p style="color: #374151; margin: 10px 0 0 0; font-size: 16px;">
                  <strong>Time:</strong> ${slot.start_time} - ${slot.end_time}
                </p>
              </div>

              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                If you need to reschedule or cancel, please log into your <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard" style="color: #FF8C00;">Family Portal</a>.
              </p>

              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 30px;">
                We look forward to meeting you!<br>
                <strong>Spanish Horizons Academy Admissions Team</strong>
              </p>
            </div>

            <div style="background-color: #000638; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                770 NE Rogahn Street, Hillsboro, OR 97124<br>
                <a href="mailto:infospanishhorizons@casitaazulpdx.com" style="color: #FFD700;">infospanishhorizons@casitaazulpdx.com</a>
              </p>
            </div>
          </div>
        `
      })

      // Email to admin
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.CONTACT_EMAIL,
        subject: `Interview Booked - ${application.child_full_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #000638;">New Interview Booked</h2>
            <p><strong>Child:</strong> ${application.child_full_name}</p>
            <p><strong>Parent:</strong> ${application.parent_name}</p>
            <p><strong>Email:</strong> ${application.user_email}</p>
            <p><strong>Phone:</strong> ${application.parent_phone}</p>
            <hr style="margin: 20px 0;">
            <p><strong>Date:</strong> ${interviewDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${slot.start_time} - ${slot.end_time}</p>
          </div>
        `
      })
    } catch (emailError) {
      console.error('Failed to send confirmation emails:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Interview booked successfully',
      interview_date: interviewDate.toISOString(),
      application: updatedApplication,
      slot: updatedSlot
    })
  } catch (error) {
    console.error('Error booking interview:', error)
    return NextResponse.json({ error: 'Failed to book interview' }, { status: 500 })
  }
}
