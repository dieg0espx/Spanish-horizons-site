import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import jsPDF from 'jspdf'
import { sendEmail } from '@/lib/resend'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { APPLICATION_FEE } from '@/lib/constants'

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-11-20.acacia' as any
  })
}

function generateReceiptPdf(data: {
  applicationId: string
  childName: string
  parentName: string
  parentEmail: string
  date: string
  applicationFee: number
  discountAmount: number
  couponCode: string | null
  totalPaid: number
  paymentMethod: string
}): Buffer {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 15

  // Header
  doc.setFillColor(0, 6, 56)
  doc.rect(0, 0, pageWidth, 40, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Payment Receipt', margin, 22)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(255, 215, 0)
  doc.text('Spanish Horizons Academy', margin, 32)

  // Receipt info
  let y = 55
  doc.setTextColor(100, 100, 100)
  doc.setFontSize(9)
  doc.text('Receipt Number', margin, y)
  doc.text('Date', pageWidth - margin - 40, y)
  y += 5
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text(`RCP-${data.applicationId.substring(0, 8).toUpperCase()}`, margin, y)
  doc.text(data.date, pageWidth - margin - 40, y)
  doc.setFont('helvetica', 'normal')

  // Bill to
  y += 15
  doc.setFillColor(255, 140, 0)
  doc.rect(margin, y, pageWidth - margin * 2, 8, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Bill To', margin + 3, y + 5.5)
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'normal')
  y += 14
  doc.setFontSize(10)
  doc.text(data.parentName, margin, y)
  y += 5
  doc.setTextColor(100, 100, 100)
  doc.setFontSize(9)
  doc.text(data.parentEmail, margin, y)

  // Application for
  y += 10
  doc.setTextColor(100, 100, 100)
  doc.text('Application for:', margin, y)
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(10)
  doc.text(data.childName, margin + 30, y)

  // Line items table
  y += 15
  doc.setFillColor(245, 245, 245)
  doc.rect(margin, y, pageWidth - margin * 2, 8, 'F')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(80, 80, 80)
  doc.text('Description', margin + 3, y + 5.5)
  doc.text('Amount', pageWidth - margin - 3, y + 5.5, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)

  y += 14
  doc.setFontSize(10)
  doc.text('Kindergarten Application Fee — Fall 2026', margin + 3, y)
  doc.text(`$${data.applicationFee.toFixed(2)}`, pageWidth - margin - 3, y, { align: 'right' })

  if (data.discountAmount > 0 && data.couponCode) {
    y += 8
    doc.setTextColor(0, 128, 0)
    doc.text(`Coupon Discount (${data.couponCode})`, margin + 3, y)
    doc.text(`-$${data.discountAmount.toFixed(2)}`, pageWidth - margin - 3, y, { align: 'right' })
    doc.setTextColor(0, 0, 0)
  }

  // Total
  y += 12
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, y, pageWidth - margin, y)
  y += 8
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Total Paid', margin + 3, y)
  doc.text(`$${data.totalPaid.toFixed(2)}`, pageWidth - margin - 3, y, { align: 'right' })

  // Payment method
  y += 12
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(100, 100, 100)
  doc.text(`Payment Method: ${data.paymentMethod}`, margin, y)

  // Status badge
  y += 12
  doc.setFillColor(0, 128, 0)
  doc.roundedRect(margin, y, 30, 8, 2, 2, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('PAID', margin + 15, y + 5.5, { align: 'center' })

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  doc.line(margin, footerY, pageWidth - margin, footerY)
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.setFont('helvetica', 'normal')
  doc.text(
    'Spanish Horizons Academy  |  infospanishhorizons@casitaazulpdx.com  |  (503) 916-9758',
    pageWidth / 2,
    footerY + 5,
    { align: 'center' }
  )
  doc.text(
    '770 NE Rogahn Street, Hillsboro, OR 97124',
    pageWidth / 2,
    footerY + 9,
    { align: 'center' }
  )

  return Buffer.from(doc.output('arraybuffer'))
}

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

      // Payment
      paymentIntentId,
      couponCode,
      paymentWaived,
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

    // Verify payment
    let paymentStatus = 'pending'
    let paymentAmount = APPLICATION_FEE
    let discountAmount = 0
    let validatedCouponCode: string | null = null
    let stripePaymentIntentId: string | null = null

    const adminClient = createAdminClient()

    if (couponCode && adminClient) {
      const normalizedCode = couponCode.trim().toUpperCase()
      const { data: coupon } = await adminClient
        .from('coupons')
        .select('*')
        .eq('code', normalizedCode)
        .single()

      if (coupon && coupon.is_active) {
        const notExpired = !coupon.expires_at || new Date(coupon.expires_at) >= new Date()
        const hasUses = coupon.max_uses === null || coupon.current_uses < coupon.max_uses

        if (notExpired && hasUses) {
          if (coupon.discount_type === 'percentage') {
            discountAmount = Math.round((APPLICATION_FEE * coupon.discount_value / 100) * 100) / 100
          } else {
            discountAmount = Math.min(coupon.discount_value, APPLICATION_FEE)
          }
          paymentAmount = Math.max(0, APPLICATION_FEE - discountAmount)
          validatedCouponCode = normalizedCode
        }
      }
    }

    if (paymentWaived && paymentAmount === 0) {
      // Coupon covers 100% — no Stripe payment needed
      paymentStatus = 'waived'
      stripePaymentIntentId = null
    } else if (paymentIntentId) {
      // Verify Stripe payment
      const stripe = getStripe()
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

      if (paymentIntent.status !== 'succeeded') {
        return NextResponse.json(
          { error: 'Payment has not been completed. Please complete payment before submitting.' },
          { status: 400 }
        )
      }

      paymentStatus = 'paid'
      stripePaymentIntentId = paymentIntentId
    } else {
      return NextResponse.json(
        { error: 'Payment is required to submit an application.' },
        { status: 400 }
      )
    }

    // Increment coupon usage
    if (validatedCouponCode && adminClient) {
      const { data: coupon } = await adminClient
        .from('coupons')
        .select('current_uses')
        .eq('code', validatedCouponCode)
        .single()
      if (coupon) {
        await adminClient
          .from('coupons')
          .update({ current_uses: coupon.current_uses + 1 })
          .eq('code', validatedCouponCode)
      }
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

      // Payment
      payment_status: paymentStatus,
      payment_amount: paymentAmount,
      coupon_code: validatedCouponCode,
      discount_amount: discountAmount,
      stripe_payment_intent_id: stripePaymentIntentId,
      paid_at: paymentStatus !== 'pending' ? new Date().toISOString() : null,

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

    // Email content for admin
    const mailOptions = {
      to: process.env.CONTACT_EMAIL || '',
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
    await sendEmail(mailOptions)
    console.log('Admissions application email sent to admin')

    // Generate receipt PDF
    const receiptDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const receiptPdf = generateReceiptPdf({
      applicationId: savedApplication.id,
      childName: childFullName,
      parentName,
      parentEmail,
      date: receiptDate,
      applicationFee: APPLICATION_FEE,
      discountAmount,
      couponCode: validatedCouponCode,
      totalPaid: paymentAmount,
      paymentMethod: paymentStatus === 'waived' ? 'Coupon (Fee Waived)' : 'Credit Card (Stripe)',
    })

    // Payment summary for email
    const paymentSummaryHtml = `
      <div style="background-color: #ECFDF5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10B981;">
        <p style="color: #065F46; margin: 0 0 8px 0; font-weight: 600; font-size: 16px;">
          Payment Confirmed
        </p>
        <table style="width: 100%; font-size: 14px; color: #374151;">
          <tr>
            <td style="padding: 4px 0;">Application Fee</td>
            <td style="padding: 4px 0; text-align: right;">$${APPLICATION_FEE.toFixed(2)}</td>
          </tr>
          ${discountAmount > 0 ? `
          <tr style="color: #059669;">
            <td style="padding: 4px 0;">Coupon Discount (${validatedCouponCode})</td>
            <td style="padding: 4px 0; text-align: right;">-$${discountAmount.toFixed(2)}</td>
          </tr>
          ` : ''}
          <tr style="border-top: 1px solid #D1FAE5;">
            <td style="padding: 8px 0 4px; font-weight: 600;">Total Paid</td>
            <td style="padding: 8px 0 4px; text-align: right; font-weight: 600;">$${paymentAmount.toFixed(2)}</td>
          </tr>
        </table>
        <p style="color: #6b7280; margin: 8px 0 0 0; font-size: 12px;">
          A payment receipt is attached to this email.
        </p>
      </div>
    `

    // Send confirmation email to parent with receipt attached
    const confirmationMailOptions = {
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

            ${paymentSummaryHtml}

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

Payment Confirmed:
- Application Fee: $${APPLICATION_FEE.toFixed(2)}${discountAmount > 0 ? `\n- Coupon Discount (${validatedCouponCode}): -$${discountAmount.toFixed(2)}` : ''}
- Total Paid: $${paymentAmount.toFixed(2)}

You can track your application status at: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard

What happens next:
- Applications are reviewed on a rolling basis
- You may be contacted to schedule an interview
- If accepted, you will receive enrollment details and next steps

Questions? Contact us at infospanishhorizons@casitaazulpdx.com

Warm regards,
Spanish Horizons Academy Admissions Team
      `,
      attachments: [
        {
          filename: `Receipt-${savedApplication.id.substring(0, 8).toUpperCase()}.pdf`,
          content: receiptPdf,
        }
      ],
    }

    await sendEmail(confirmationMailOptions)
    console.log('Confirmation email with receipt sent to applicant:', parentEmail)

    return NextResponse.json(
      {
        message: 'Application submitted successfully',
        applicationId: savedApplication.id,
        payment: {
          status: paymentStatus,
          amount: paymentAmount,
          applicationFee: APPLICATION_FEE,
          discountAmount,
          couponCode: validatedCouponCode,
        },
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
