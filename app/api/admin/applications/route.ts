import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import nodemailer from 'nodemailer'

// List of admin emails - add your admin emails here
const ADMIN_EMAILS = [
  'infospanishhorizons@casitaazulpdx.com',
  'aletxa@comcreate.org',
  // Add more admin emails as needed
]

// Status email templates
const statusEmailTemplates = {
  under_review: {
    subject: 'Application Update - Under Review - Spanish Horizons Academy',
    getContent: (childName: string, parentName: string) => ({
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Application Under Review</h1>
            <p style="color: #FFD700; margin: 10px 0 0 0;">Spanish Horizons Academy</p>
          </div>

          <div style="padding: 30px; background-color: #f9fafb;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${parentName},</p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Good news! We wanted to let you know that <strong>${childName}</strong>'s application is now being actively reviewed by our admissions team.
            </p>

            <div style="background-color: #F3E8FF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #9333EA;">
              <p style="color: #581C87; margin: 0; font-weight: 600; font-size: 18px;">
                What This Means
              </p>
              <p style="color: #374151; margin: 15px 0 0 0; font-size: 16px;">
                Our team is carefully reviewing your application materials. We will be in touch soon with next steps.
              </p>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              You can check your application status anytime in your <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard" style="color: #FF8C00;">Family Portal</a>.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Thank you for your patience during this process.
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
      text: `Application Under Review - Spanish Horizons Academy

Dear ${parentName},

Good news! We wanted to let you know that ${childName}'s application is now being actively reviewed by our admissions team.

What This Means:
Our team is carefully reviewing your application materials. We will be in touch soon with next steps.

You can check your application status anytime in your Family Portal: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard

Thank you for your patience during this process.

Warm regards,
Spanish Horizons Academy Admissions Team`
    })
  },
  interview_pending: {
    subject: 'Action Required: Schedule Your Interview - Spanish Horizons Academy',
    getContent: (childName: string, parentName: string) => ({
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Schedule Your Interview!</h1>
            <p style="color: #FFD700; margin: 10px 0 0 0;">Spanish Horizons Academy</p>
          </div>

          <div style="padding: 30px; background-color: #f9fafb;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${parentName},</p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Wonderful news! After reviewing <strong>${childName}</strong>'s application, we are pleased to invite you to schedule an interview with our admissions team.
            </p>

            <div style="background-color: #ECFDF5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10B981;">
              <p style="color: #065F46; margin: 0; font-weight: 600; font-size: 18px;">
                Action Required
              </p>
              <p style="color: #374151; margin: 15px 0 0 0; font-size: 16px;">
                Please log into your Family Portal to select an available interview time that works best for your family.
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard"
                 style="display: inline-block; background-color: #FF8C00; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Schedule Interview Now
              </a>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              During the interview, we look forward to:
            </p>

            <ul style="color: #374151; font-size: 16px; line-height: 1.8;">
              <li>Getting to know your family better</li>
              <li>Answering any questions you may have about our program</li>
              <li>Discussing how Spanish Horizons Academy can support ${childName}'s educational journey</li>
            </ul>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              If you have any questions or need assistance scheduling, please contact us at <a href="mailto:infospanishhorizons@casitaazulpdx.com" style="color: #FF8C00;">infospanishhorizons@casitaazulpdx.com</a>.
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
      `,
      text: `Schedule Your Interview - Spanish Horizons Academy

Dear ${parentName},

Wonderful news! After reviewing ${childName}'s application, we are pleased to invite you to schedule an interview with our admissions team.

ACTION REQUIRED:
Please log into your Family Portal to select an available interview time that works best for your family.

Schedule your interview here: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard

During the interview, we look forward to:
- Getting to know your family better
- Answering any questions you may have about our program
- Discussing how Spanish Horizons Academy can support ${childName}'s educational journey

If you have any questions, please contact us at infospanishhorizons@casitaazulpdx.com.

We look forward to meeting you!
Spanish Horizons Academy Admissions Team`
    })
  },
  interview_scheduled: {
    subject: 'Interview Scheduled - Spanish Horizons Academy',
    getContent: (childName: string, parentName: string, interviewDate?: string, interviewNotes?: string) => ({
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Interview Scheduled</h1>
            <p style="color: #FFD700; margin: 10px 0 0 0;">Spanish Horizons Academy</p>
          </div>

          <div style="padding: 30px; background-color: #f9fafb;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${parentName},</p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Great news! We are pleased to inform you that an interview has been scheduled for <strong>${childName}</strong>'s application to Spanish Horizons Academy.
            </p>

            <div style="background-color: #EBF5FF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3B82F6;">
              <p style="color: #000638; margin: 0; font-weight: 600; font-size: 18px;">
                Interview Details
              </p>
              ${interviewDate ? `
              <p style="color: #374151; margin: 15px 0 0 0; font-size: 16px;">
                <strong>Date & Time:</strong> ${new Date(interviewDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              ` : ''}
              ${interviewNotes ? `
              <p style="color: #374151; margin: 15px 0 0 0; font-size: 16px;">
                <strong>Additional Information:</strong> ${interviewNotes}
              </p>
              ` : ''}
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Please log into your <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard" style="color: #FF8C00;">Family Portal</a> to view more details.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              If you need to reschedule or have any questions, please contact us at <a href="mailto:infospanishhorizons@casitaazulpdx.com" style="color: #FF8C00;">infospanishhorizons@casitaazulpdx.com</a>.
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
      `,
      text: `Interview Scheduled - Spanish Horizons Academy

Dear ${parentName},

Great news! We are pleased to inform you that an interview has been scheduled for ${childName}'s application to Spanish Horizons Academy.

${interviewDate ? `Date & Time: ${new Date(interviewDate).toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}` : ''}
${interviewNotes ? `Additional Information: ${interviewNotes}` : ''}

Please log into your Family Portal to view more details: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard

If you need to reschedule, please contact us at infospanishhorizons@casitaazulpdx.com

We look forward to meeting you!
Spanish Horizons Academy Admissions Team`
    })
  },
  admitted: {
    subject: 'Congratulations! Admission to Spanish Horizons Academy',
    getContent: (childName: string, parentName: string) => ({
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Congratulations!</h1>
            <p style="color: #FFD700; margin: 10px 0 0 0;">Spanish Horizons Academy</p>
          </div>

          <div style="padding: 30px; background-color: #f9fafb;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${parentName},</p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              We are thrilled to inform you that <strong>${childName}</strong> has been <strong>admitted</strong> to Spanish Horizons Academy for Kindergarten Fall 2026!
            </p>

            <div style="background-color: #ECFDF5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10B981;">
              <p style="color: #065F46; margin: 0; font-weight: 600; font-size: 18px;">
                Welcome to the Spanish Horizons Family!
              </p>
              <p style="color: #374151; margin: 15px 0 0 0; font-size: 16px;">
                We are excited to have ${childName} join our founding class and embark on this educational journey together.
              </p>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              <strong>Next Steps:</strong>
            </p>

            <ul style="color: #374151; font-size: 16px; line-height: 1.8;">
              <li>You will receive enrollment documents and tuition information shortly</li>
              <li>Complete and return enrollment forms by the deadline provided</li>
              <li>Join us for our Welcome Event (details coming soon)</li>
            </ul>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Please log into your <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard" style="color: #FF8C00;">Family Portal</a> to view your updated application status.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              If you have any questions, please don't hesitate to contact us at <a href="mailto:infospanishhorizons@casitaazulpdx.com" style="color: #FF8C00;">infospanishhorizons@casitaazulpdx.com</a>.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 30px;">
              Congratulations again!<br>
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
      text: `Congratulations! - Spanish Horizons Academy

Dear ${parentName},

We are thrilled to inform you that ${childName} has been ADMITTED to Spanish Horizons Academy for Kindergarten Fall 2026!

Welcome to the Spanish Horizons Family!

Next Steps:
- You will receive enrollment documents and tuition information shortly
- Complete and return enrollment forms by the deadline provided
- Join us for our Welcome Event (details coming soon)

Please log into your Family Portal to view your updated status: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard

Questions? Contact us at infospanishhorizons@casitaazulpdx.com

Congratulations again!
Spanish Horizons Academy Admissions Team`
    })
  },
  waitlist: {
    subject: 'Application Update - Spanish Horizons Academy Waitlist',
    getContent: (childName: string, parentName: string) => ({
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Application Update</h1>
            <p style="color: #FFD700; margin: 10px 0 0 0;">Spanish Horizons Academy</p>
          </div>

          <div style="padding: 30px; background-color: #f9fafb;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${parentName},</p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Thank you for your interest in Spanish Horizons Academy. After careful consideration of all applications, we have placed <strong>${childName}</strong> on our <strong>waitlist</strong> for Kindergarten Fall 2026.
            </p>

            <div style="background-color: #FFFBEB; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B;">
              <p style="color: #92400E; margin: 0; font-weight: 600; font-size: 18px;">
                Waitlist Status
              </p>
              <p style="color: #374151; margin: 15px 0 0 0; font-size: 16px;">
                Your family remains an important part of our community. Should a spot become available, we will contact you immediately.
              </p>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Being on the waitlist means:
            </p>

            <ul style="color: #374151; font-size: 16px; line-height: 1.8;">
              <li>Your application is complete and has been reviewed</li>
              <li>We will notify you if a spot opens up</li>
              <li>No action is needed from you at this time</li>
            </ul>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              You can check your status anytime in your <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard" style="color: #FF8C00;">Family Portal</a>.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Thank you for considering Spanish Horizons Academy for your child's education.
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
      text: `Application Update - Spanish Horizons Academy

Dear ${parentName},

Thank you for your interest in Spanish Horizons Academy. After careful consideration of all applications, we have placed ${childName} on our waitlist for Kindergarten Fall 2026.

What this means:
- Your application is complete and has been reviewed
- We will notify you if a spot opens up
- No action is needed from you at this time

You can check your status anytime in your Family Portal: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://spanishhorizonsacademy.com'}/dashboard

Thank you for considering Spanish Horizons Academy for your child's education.

Warm regards,
Spanish Horizons Academy Admissions Team`
    })
  },
  rejected: {
    subject: 'Application Decision - Spanish Horizons Academy',
    getContent: (childName: string, parentName: string) => ({
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Application Decision</h1>
            <p style="color: #FFD700; margin: 10px 0 0 0;">Spanish Horizons Academy</p>
          </div>

          <div style="padding: 30px; background-color: #f9fafb;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${parentName},</p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Thank you for your interest in Spanish Horizons Academy and for taking the time to apply for <strong>${childName}</strong>.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              After careful review of all applications, we regret to inform you that we are unable to offer admission at this time. This decision was not made lightly, and we appreciate your patience throughout the process.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              We encourage you to stay connected with our community and consider applying again in the future as we expand grade levels.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Thank you again for considering Spanish Horizons Academy. We wish ${childName} all the best in their educational journey.
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
      text: `Application Decision - Spanish Horizons Academy

Dear ${parentName},

Thank you for your interest in Spanish Horizons Academy and for taking the time to apply for ${childName}.

After careful review of all applications, we regret to inform you that we are unable to offer admission at this time. This decision was not made lightly, and we appreciate your patience throughout the process.

We encourage you to stay connected with our community and consider applying again in the future as we expand grade levels.

Thank you again for considering Spanish Horizons Academy. We wish ${childName} all the best in their educational journey.

Warm regards,
Spanish Horizons Academy Admissions Team`
    })
  },
  declined: {
    subject: 'Application Update - Spanish Horizons Academy',
    getContent: (childName: string, parentName: string) => ({
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #000638; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Application Update</h1>
            <p style="color: #FFD700; margin: 10px 0 0 0;">Spanish Horizons Academy</p>
          </div>

          <div style="padding: 30px; background-color: #f9fafb;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${parentName},</p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              This is to confirm that the application for <strong>${childName}</strong> has been marked as declined.
            </p>

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
      text: `Application Update - Spanish Horizons Academy

Dear ${parentName},

This is to confirm that the application for ${childName} has been marked as declined.

If you have any questions, please contact us at infospanishhorizons@casitaazulpdx.com.

Warm regards,
Spanish Horizons Academy Admissions Team`
    })
  }
}

async function sendStatusUpdateEmail(
  application: any,
  newStatus: string,
  interviewDate?: string,
  interviewNotes?: string
) {
  const template = statusEmailTemplates[newStatus as keyof typeof statusEmailTemplates]
  if (!template) return

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const emailContent = template.getContent(
    application.child_full_name,
    application.parent_name,
    interviewDate,
    interviewNotes
  )

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: application.user_email,
    subject: template.subject,
    html: emailContent.html,
    text: emailContent.text
  })

  console.log(`Status update email sent to ${application.user_email} for status: ${newStatus}`)
}

export async function GET(request: NextRequest) {
  try {
    // Use regular client for auth check
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (!ADMIN_EMAILS.includes(user.email || '')) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Use admin client to bypass RLS for fetching all applications
    const adminClient = createAdminClient()

    if (!adminClient) {
      return NextResponse.json(
        { error: 'Admin client not configured. Please add SUPABASE_SERVICE_ROLE_KEY to environment variables.' },
        { status: 500 }
      )
    }

    const { data: applications, error } = await adminClient
      .from('applications')
      .select('*')
      .order('submitted_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      )
    }

    return NextResponse.json({ applications })

  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

// Update application status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { applicationId, status, interview_date, interview_notes, admin_notes } = body

    if (!applicationId || !status) {
      return NextResponse.json(
        { error: 'Application ID and status are required' },
        { status: 400 }
      )
    }

    const validStatuses = ['submitted', 'under_review', 'interview_pending', 'interview_scheduled', 'admitted', 'waitlist', 'rejected', 'declined', 'withdrawn']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Use regular client for auth check
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (!ADMIN_EMAILS.includes(user.email || '')) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Use admin client to bypass RLS for updating applications
    const adminClient = createAdminClient()

    if (!adminClient) {
      return NextResponse.json(
        { error: 'Admin client not configured. Please add SUPABASE_SERVICE_ROLE_KEY to environment variables.' },
        { status: 500 }
      )
    }

    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    }

    if (interview_date !== undefined) {
      // Convert empty string to null for timestamp fields
      updateData.interview_date = interview_date === '' ? null : interview_date
    }
    if (interview_notes !== undefined) {
      updateData.interview_notes = interview_notes || null
    }
    if (admin_notes !== undefined) {
      updateData.admin_notes = admin_notes || null
    }

    // First, get the current application to check for status change
    const { data: currentApp } = await adminClient
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .single()

    const { data: application, error } = await adminClient
      .from('applications')
      .update(updateData)
      .eq('id', applicationId)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update application' },
        { status: 500 }
      )
    }

    // Send email notification if status changed
    if (currentApp && currentApp.status !== status) {
      try {
        await sendStatusUpdateEmail(application, status, interview_date, interview_notes)
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ application })

  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    )
  }
}
