import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
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

    // Format arrays for display
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

    // Email content
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

          <!-- Section 3: Previous Enrollment Information -->
          <div style="background-color: #f9fafb; padding: 25px; border-left: 4px solid #000638; margin-top: 15px;">
            <h2 style="color: #000638; margin-top: 0; font-size: 20px;">Section 3: Previous Enrollment Information</h2>
            <p style="color: #6b7280; margin-bottom: 10px;"><strong>Previous Enrollment:</strong></p>
            <p style="color: #374151; margin-top: 0;">${previousEnrollmentText}</p>
            ${previousEnrollmentDetails ? `
            <p style="color: #6b7280; margin-bottom: 10px;"><strong>Additional Details:</strong></p>
            <p style="color: #374151; margin-top: 0; white-space: pre-wrap;">${previousEnrollmentDetails}</p>
            ` : ''}
          </div>

          <!-- Section 4: Family & Educational Background -->
          <div style="background-color: #ffffff; padding: 25px; border-left: 4px solid #FFD700; margin-top: 15px; border: 1px solid #e5e7eb;">
            <h2 style="color: #000638; margin-top: 0; font-size: 20px;">Section 4: Family & Educational Background</h2>
            <p style="color: #6b7280; margin-bottom: 5px;"><strong>Languages Spoken at Home:</strong></p>
            <p style="color: #374151; margin-top: 0; margin-bottom: 20px;">${languagesAtHome}</p>

            <p style="color: #6b7280; margin-bottom: 5px;"><strong>What interests you most about Spanish Horizons Academy?</strong></p>
            <p style="color: #374151; margin-top: 0; margin-bottom: 20px; white-space: pre-wrap; background-color: #f9fafb; padding: 15px; border-radius: 4px;">${interestInAcademy}</p>

            <p style="color: #6b7280; margin-bottom: 5px;"><strong>What are you hoping for in your child's elementary school experience?</strong></p>
            <p style="color: #374151; margin-top: 0; white-space: pre-wrap; background-color: #f9fafb; padding: 15px; border-radius: 4px;">${hopingFor}</p>
          </div>

          <!-- Section 5: Interest & Intent -->
          <div style="background-color: #f9fafb; padding: 25px; border-left: 4px solid #FF8C00; margin-top: 15px;">
            <h2 style="color: #000638; margin-top: 0; font-size: 20px;">Section 5: Interest & Intent (Non-Binding)</h2>
            <p style="color: #6b7280; margin-bottom: 5px;"><strong>Seeking full-time Kindergarten enrollment?</strong></p>
            <p style="color: #374151; margin-top: 0; margin-bottom: 20px;">${seekingFullTime === 'yes' ? 'Yes' : seekingFullTime === 'no' ? 'No' : 'Unsure'}</p>

            <p style="color: #6b7280; margin-bottom: 5px;"><strong>What excites you most about a Spanish-forward, experiential learning model?</strong></p>
            <p style="color: #374151; margin-top: 0; margin-bottom: 20px; white-space: pre-wrap; background-color: #ffffff; padding: 15px; border-radius: 4px;">${excitedAbout}</p>

            <p style="color: #6b7280; margin-bottom: 5px;"><strong>What values matter most to you in a school community?</strong></p>
            <p style="color: #374151; margin-top: 0; white-space: pre-wrap; background-color: #ffffff; padding: 15px; border-radius: 4px;">${valuesImportant}</p>
          </div>

          <!-- Section 6: Looking Ahead -->
          <div style="background-color: #ffffff; padding: 25px; border-left: 4px solid #000638; margin-top: 15px; border: 1px solid #e5e7eb;">
            <h2 style="color: #000638; margin-top: 0; font-size: 20px;">Section 6: Looking Ahead</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Interested in continuing as additional grades open:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${interestedInContinuing ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Would like updates about future programs/events:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${receiveUpdates ? 'Yes' : 'No'}</td>
              </tr>
            </table>
          </div>

          <!-- Section 7: How Did You Find Us? -->
          <div style="background-color: #f9fafb; padding: 25px; border-left: 4px solid #FFD700; margin-top: 15px;">
            <h2 style="color: #000638; margin-top: 0; font-size: 20px;">Section 7: How Did You Find Us?</h2>
            <p style="color: #374151; margin: 0;">${howDidYouFindText}</p>
          </div>

          <!-- Section 8: Anything Else -->
          ${anythingElse ? `
          <div style="background-color: #ffffff; padding: 25px; border-left: 4px solid #FF8C00; margin-top: 15px; border: 1px solid #e5e7eb;">
            <h2 style="color: #000638; margin-top: 0; font-size: 20px;">Section 8: Additional Information</h2>
            <p style="color: #374151; margin: 0; white-space: pre-wrap;">${anythingElse}</p>
          </div>
          ` : ''}

          <!-- Section 9: Acknowledgments -->
          <div style="background-color: #000638; padding: 25px; margin-top: 15px; border-radius: 0 0 8px 8px;">
            <h2 style="color: white; margin-top: 0; font-size: 20px;">Section 9: Acknowledgments</h2>
            <p style="color: #10b981; margin: 5px 0;">✓ Understands application does not guarantee enrollment</p>
            <p style="color: #10b981; margin: 5px 0;">✓ Understands only Kindergarten applications are being accepted</p>
            <p style="color: #10b981; margin: 5px 0;">✓ Understands enrollment is for Fall 2026 (Hillsboro SD calendar)</p>
            <p style="color: #10b981; margin: 5px 0;">✓ Understands this is for consideration only, not registration/payment</p>
            <p style="color: #10b981; margin: 5px 0;">✓ Understands applications are reviewed based on alignment and space</p>
          </div>

          <div style="margin-top: 25px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This application was submitted on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">
              Reply directly to: <a href="mailto:${parentEmail}" style="color: #2563eb;">${parentEmail}</a>
            </p>
          </div>
        </div>
      `,
      text: `
NEW ADMISSIONS APPLICATION
Spanish Horizons Academy - Kindergarten Fall 2026
==========================================

SECTION 1: STUDENT INFORMATION
------------------------------
Child's Full Legal Name: ${childFullName}
${preferredName ? `Preferred Name: ${preferredName}` : ''}
Date of Birth: ${dateOfBirth}
Primary Language(s): ${primaryLanguages}
Previous Preschool/Kindergarten: ${attendedPreschool === 'yes' ? 'Yes' : 'No'}
${currentSchool ? `Current School/Childcare: ${currentSchool}` : ''}

SECTION 2: PARENT/GUARDIAN INFORMATION
--------------------------------------
Parent/Guardian Name: ${parentName}
Relationship to Child: ${relationshipToChild}
Email: ${parentEmail}
Phone: ${parentPhone}
Home Address: ${homeAddress}
Preferred Communication: ${preferredCommunication}
${secondParentName ? `
Second Parent/Guardian:
  Name: ${secondParentName}
  Email: ${secondParentEmail || 'Not provided'}
  Phone: ${secondParentPhone || 'Not provided'}` : ''}

SECTION 3: PREVIOUS ENROLLMENT INFORMATION
------------------------------------------
Previous Enrollment: ${previousEnrollmentText}
${previousEnrollmentDetails ? `Additional Details: ${previousEnrollmentDetails}` : ''}

SECTION 4: FAMILY & EDUCATIONAL BACKGROUND
------------------------------------------
Languages Spoken at Home: ${languagesAtHome}

What interests you most about Spanish Horizons Academy?
${interestInAcademy}

What are you hoping for in your child's elementary school experience?
${hopingFor}

SECTION 5: INTEREST & INTENT (NON-BINDING)
------------------------------------------
Seeking full-time Kindergarten enrollment? ${seekingFullTime === 'yes' ? 'Yes' : seekingFullTime === 'no' ? 'No' : 'Unsure'}

What excites you most about a Spanish-forward, experiential learning model?
${excitedAbout}

What values matter most to you in a school community?
${valuesImportant}

SECTION 6: LOOKING AHEAD
------------------------
Interested in continuing as additional grades open: ${interestedInContinuing ? 'Yes' : 'No'}
Would like updates about future programs/events: ${receiveUpdates ? 'Yes' : 'No'}

SECTION 7: HOW DID YOU FIND US?
-------------------------------
${howDidYouFindText}

${anythingElse ? `SECTION 8: ADDITIONAL INFORMATION
----------------------------------
${anythingElse}` : ''}

SECTION 9: ACKNOWLEDGMENTS
--------------------------
✓ All acknowledgments confirmed

==========================================
Submitted: ${new Date().toLocaleString()}
Reply to: ${parentEmail}
      `
    }

    // Send email
    const result = await transporter.sendMail(mailOptions)
    console.log('Admissions application email sent successfully:', result.messageId)

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

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              We have received your application and will review it carefully. Here's what you can expect:
            </p>

            <ul style="color: #374151; font-size: 16px; line-height: 1.8;">
              <li>Applications are reviewed on a rolling basis</li>
              <li>You may be contacted for a follow-up conversation, tour, or information session</li>
              <li>If accepted, you will receive details about enrollment timelines, tuition, and next steps</li>
            </ul>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              If you have any questions in the meantime, please don't hesitate to reach out to us at <a href="mailto:infospanishhorizons@casitaazulpdx.org" style="color: #2563eb;">infospanishhorizons@casitaazulpdx.org</a>.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              We look forward to learning more about your family and beginning this journey together.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 30px;">
              Warm regards,<br>
              <strong>Spanish Horizons Academy Admissions Team</strong>
            </p>
          </div>

          <div style="background-color: #000638; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              770 NE Rogahn Street, Hillsboro, OR 97124<br>
              <a href="mailto:infospanishhorizons@casitaazulpdx.org" style="color: #FFD700;">infospanishhorizons@casitaazulpdx.org</a>
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

We have received your application and will review it carefully. Here's what you can expect:

- Applications are reviewed on a rolling basis
- You may be contacted for a follow-up conversation, tour, or information session
- If accepted, you will receive details about enrollment timelines, tuition, and next steps

If you have any questions in the meantime, please don't hesitate to reach out to us at infospanishhorizons@casitaazulpdx.org.

We look forward to learning more about your family and beginning this journey together.

Warm regards,
Spanish Horizons Academy Admissions Team

==============================
770 NE Rogahn Street, Hillsboro, OR 97124
infospanishhorizons@casitaazulpdx.org
      `
    }

    // Send confirmation email
    await transporter.sendMail(confirmationMailOptions)
    console.log('Confirmation email sent to applicant:', parentEmail)

    return NextResponse.json(
      { message: 'Application submitted successfully' },
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
