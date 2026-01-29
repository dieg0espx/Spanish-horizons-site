import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'You must be logged in to submit an application' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      // Section 1: Student Information
      childFullName,
      preferredName,
      dateOfBirth,
      primaryLanguages,
      attendedPreschool,
      currentSchool,

      // Section 2: Parent/Guardian Information
      parentName,
      relationshipToChild,
      parentEmail,
      parentPhone,
      homeAddress,
      preferredCommunication,
      secondParentName,
      secondParentEmail,
      secondParentPhone,

      // Section 3: Previous Enrollment Information
      previousEnrollment,
      previousEnrollmentDetails,

      // Section 4: Family & Educational Background
      languagesAtHome,
      interestInAcademy,
      hopingFor,

      // Section 5: Interest & Intent
      seekingFullTime,
      excitedAbout,
      valuesImportant,

      // Section 6: Looking Ahead
      interestedInContinuing,
      receiveUpdates,

      // Section 7: How Did You Find Us?
      howDidYouFind,
      howDidYouFindOther,

      // Section 8: Anything Else
      anythingElse,

      // Section 9: Acknowledgments
      ackNotGuarantee,
      ackKindergartenOnly,
      ackFall2026,
      ackConsiderationOnly,
      ackReviewBased,
    } = body

    // Validate required fields
    if (!childFullName || !dateOfBirth || !primaryLanguages || !attendedPreschool) {
      return NextResponse.json(
        { error: 'Missing required student information fields' },
        { status: 400 }
      )
    }

    if (!parentName || !relationshipToChild || !parentEmail || !parentPhone || !homeAddress || !preferredCommunication) {
      return NextResponse.json(
        { error: 'Missing required parent/guardian information fields' },
        { status: 400 }
      )
    }

    if (!languagesAtHome || !interestInAcademy || !hopingFor) {
      return NextResponse.json(
        { error: 'Missing required family & educational background fields' },
        { status: 400 }
      )
    }

    if (!seekingFullTime || !excitedAbout || !valuesImportant) {
      return NextResponse.json(
        { error: 'Missing required interest & intent fields' },
        { status: 400 }
      )
    }

    if (!ackNotGuarantee || !ackKindergartenOnly || !ackFall2026 || !ackConsiderationOnly || !ackReviewBased) {
      return NextResponse.json(
        { error: 'All acknowledgments must be accepted' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(parentEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if user already has an application for this child (same name and DOB)
    const { data: existingApp } = await supabase
      .from('applications')
      .select('id')
      .eq('user_id', user.id)
      .eq('child_full_name', childFullName)
      .eq('date_of_birth', dateOfBirth)
      .single()

    if (existingApp) {
      return NextResponse.json(
        { error: 'You have already submitted an application for this child. Please check your dashboard for status updates.' },
        { status: 400 }
      )
    }

    // Save application to database
    const applicationData = {
      user_id: user.id,
      user_email: user.email,
      status: 'submitted',

      // Section 1: Student Information
      child_full_name: childFullName,
      preferred_name: preferredName || null,
      date_of_birth: dateOfBirth,
      primary_languages: primaryLanguages,
      attended_preschool: attendedPreschool,
      current_school: currentSchool || null,

      // Section 2: Parent/Guardian Information
      parent_name: parentName,
      relationship_to_child: relationshipToChild,
      parent_email: parentEmail,
      parent_phone: parentPhone,
      home_address: homeAddress,
      preferred_communication: preferredCommunication,
      second_parent_name: secondParentName || null,
      second_parent_email: secondParentEmail || null,
      second_parent_phone: secondParentPhone || null,

      // Section 3: Previous Enrollment Information
      previous_enrollment: previousEnrollment || [],
      previous_enrollment_details: previousEnrollmentDetails || null,

      // Section 4: Family & Educational Background
      languages_at_home: languagesAtHome,
      interest_in_academy: interestInAcademy,
      hoping_for: hopingFor,

      // Section 5: Interest & Intent
      seeking_full_time: seekingFullTime,
      excited_about: excitedAbout,
      values_important: valuesImportant,

      // Section 6: Looking Ahead
      interested_in_continuing: interestedInContinuing || false,
      receive_updates: receiveUpdates || false,

      // Section 7: How Did You Find Us?
      how_did_you_find: howDidYouFind || [],
      how_did_you_find_other: howDidYouFindOther || null,

      // Section 8: Anything Else
      anything_else: anythingElse || null,

      // Metadata
      submitted_at: new Date().toISOString(),
    }

    const { data: savedApplication, error: dbError } = await supabase
      .from('applications')
      .insert(applicationData)
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save application to database' },
        { status: 500 }
      )
    }

    // Format arrays for display in emails
    const previousEnrollmentText = Array.isArray(previousEnrollment) && previousEnrollment.length > 0
      ? previousEnrollment.map((item: string) => {
          switch (item) {
            case 'casita-azul': return 'Casita Azul Spanish Immersion Program'
            case 'amanecer': return 'Amanecer Academy'
            case 'none': return 'No previous enrollment in network'
            default: return item
          }
        }).join(', ')
      : 'Not specified'

    const howDidYouFindText = Array.isArray(howDidYouFind) && howDidYouFind.length > 0
      ? howDidYouFind.map((item: string) => {
          switch (item) {
            case 'casita-amanecer': return 'Casita Azul or Amanecer Academy'
            case 'word-of-mouth': return 'Word of mouth'
            case 'social-media': return 'Social media'
            case 'online-search': return 'Online search'
            case 'community-event': return 'Community event'
            case 'other': return `Other: ${howDidYouFindOther || 'Not specified'}`
            default: return item
          }
        }).join(', ')
      : 'Not specified'

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // Email content for admin
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      replyTo: parentEmail,
      subject: `New Admissions Application: ${childFullName} - Kindergarten Fall 2026`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Admissions Application</h1>
            <p style="color: #FFD700; margin: 10px 0 0 0; font-size: 16px;">Spanish Horizons Academy - Kindergarten Fall 2026</p>
            <p style="color: #FF8C00; margin: 10px 0 0 0; font-size: 14px;">Application ID: ${savedApplication.id}</p>
          </div>

          <!-- Section 1: Student Information -->
          <div style="background-color: #f9fafb; padding: 25px; border-left: 4px solid #FFD700; margin-top: 20px;">
            <h2 style="color: #000638; margin-top: 0; font-size: 20px;">Section 1: Student Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 40%;"><strong>Child's Full Legal Name:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${childFullName}</td>
              </tr>
              ${preferredName ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Preferred Name:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${preferredName}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Date of Birth:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${dateOfBirth}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Primary Language(s):</strong></td>
                <td style="padding: 8px 0; color: #374151;">${primaryLanguages}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Previous Preschool/Kindergarten:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${attendedPreschool === 'yes' ? 'Yes' : 'No'}</td>
              </tr>
              ${currentSchool ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Current School/Childcare:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${currentSchool}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <!-- Section 2: Parent/Guardian Information -->
          <div style="background-color: #ffffff; padding: 25px; border-left: 4px solid #FF8C00; margin-top: 15px; border: 1px solid #e5e7eb;">
            <h2 style="color: #000638; margin-top: 0; font-size: 20px;">Section 2: Parent/Guardian Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 40%;"><strong>Parent/Guardian Name:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${parentName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Relationship to Child:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${relationshipToChild}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #374151;"><a href="mailto:${parentEmail}" style="color: #2563eb;">${parentEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #374151;"><a href="tel:${parentPhone}" style="color: #2563eb;">${parentPhone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Home Address:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${homeAddress.replace(/\n/g, '<br>')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Preferred Communication:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${preferredCommunication.charAt(0).toUpperCase() + preferredCommunication.slice(1)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Portal Account:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${user.email}</td>
              </tr>
            </table>

            ${secondParentName || secondParentEmail || secondParentPhone ? `
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px dashed #e5e7eb;">
              <h3 style="color: #6b7280; margin-top: 0; font-size: 16px;">Second Parent/Guardian</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${secondParentName ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; width: 40%;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0; color: #374151;">${secondParentName}</td>
                </tr>
                ` : ''}
                ${secondParentEmail ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0; color: #374151;"><a href="mailto:${secondParentEmail}" style="color: #2563eb;">${secondParentEmail}</a></td>
                </tr>
                ` : ''}
                ${secondParentPhone ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Phone:</strong></td>
                  <td style="padding: 8px 0; color: #374151;"><a href="tel:${secondParentPhone}" style="color: #2563eb;">${secondParentPhone}</a></td>
                </tr>
                ` : ''}
              </table>
            </div>
            ` : ''}
          </div>

          <!-- Remaining sections abbreviated for email -->
          <div style="background-color: #f9fafb; padding: 25px; border-left: 4px solid #000638; margin-top: 15px;">
            <h2 style="color: #000638; margin-top: 0; font-size: 20px;">Application Summary</h2>
            <p style="color: #374151;"><strong>Languages at Home:</strong> ${languagesAtHome}</p>
            <p style="color: #374151;"><strong>Seeking Full-Time:</strong> ${seekingFullTime === 'yes' ? 'Yes' : seekingFullTime === 'no' ? 'No' : 'Unsure'}</p>
            <p style="color: #374151;"><strong>Previous Enrollment:</strong> ${previousEnrollmentText}</p>
            <p style="color: #374151;"><strong>How They Found Us:</strong> ${howDidYouFindText}</p>
          </div>

          <div style="background-color: #000638; padding: 25px; margin-top: 15px; border-radius: 0 0 8px 8px;">
            <p style="color: #10b981; margin: 5px 0;">✓ All acknowledgments confirmed</p>
            <p style="color: white; margin-top: 15px; font-size: 14px;">View full application details in the admin dashboard.</p>
          </div>

          <div style="margin-top: 25px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This application was submitted on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      `,
      text: `
NEW ADMISSIONS APPLICATION
Spanish Horizons Academy - Kindergarten Fall 2026
Application ID: ${savedApplication.id}
==========================================

Child's Name: ${childFullName}
Parent Name: ${parentName}
Email: ${parentEmail}
Phone: ${parentPhone}
Portal Account: ${user.email}

==========================================
Submitted: ${new Date().toLocaleString()}
View full details in admin dashboard.
      `
    }

    // Send email to admin
    await transporter.sendMail(mailOptions)
    console.log('Admissions application email sent to admin')

    // Send confirmation email to parent
    const confirmationMailOptions = {
      from: process.env.SMTP_FROM,
      to: parentEmail,
      subject: `Application Received - Spanish Horizons Academy`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Your Application</h1>
            <p style="color: #FFD700; margin: 10px 0 0 0;">Spanish Horizons Academy</p>
          </div>

          <div style="padding: 30px; background-color: #f9fafb;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${parentName},</p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Thank you for submitting an application for <strong>${childFullName}</strong> to Spanish Horizons Academy's Kindergarten program for Fall 2026.
            </p>

            <div style="background-color: #FFF8E7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF8C00;">
              <p style="color: #000638; margin: 0; font-weight: 600;">
                Your Application Status: <span style="color: #FF8C00;">Submitted</span>
              </p>
              <p style="color: #374151; margin: 10px 0 0 0; font-size: 14px;">
                Application ID: ${savedApplication.id}
              </p>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              You can track your application status anytime by logging into your Family Portal at <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard" style="color: #FF8C00;">spanishhorizonsacademy.com/dashboard</a>.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              <strong>What happens next:</strong>
            </p>

            <ul style="color: #374151; font-size: 16px; line-height: 1.8;">
              <li>Applications are reviewed on a rolling basis</li>
              <li>You may be contacted to schedule an interview</li>
              <li>If accepted, you will receive enrollment details and next steps</li>
            </ul>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              If you have any questions, please contact us at <a href="mailto:infospanishhorizons@casitaazulpdx.com" style="color: #FF8C00;">infospanishhorizons@casitaazulpdx.com</a>.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 30px;">
              Warm regards,<br>
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
      `,
      text: `
Thank You for Your Application
Spanish Horizons Academy
==============================

Dear ${parentName},

Thank you for submitting an application for ${childFullName} to Spanish Horizons Academy's Kindergarten program for Fall 2026.

Your Application Status: Submitted
Application ID: ${savedApplication.id}

You can track your application status at: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard

What happens next:
- Applications are reviewed on a rolling basis
- You may be contacted to schedule an interview
- If accepted, you will receive enrollment details and next steps

Questions? Contact us at infospanishhorizons@casitaazulpdx.com

Warm regards,
Spanish Horizons Academy Admissions Team
      `
    }

    await transporter.sendMail(confirmationMailOptions)
    console.log('Confirmation email sent to applicant:', parentEmail)

    return NextResponse.json(
      {
        message: 'Application submitted successfully',
        applicationId: savedApplication.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing admissions application:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}

// GET endpoint to fetch user's applications (supports multiple children)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: applications, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user.id)
      .order('submitted_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      )
    }

    return NextResponse.json({ applications: applications || [] })

  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}
