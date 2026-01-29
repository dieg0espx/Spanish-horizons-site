import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import nodemailer from 'nodemailer'

// MOCK MODE - Set to false when connecting to Supabase
const MOCK_MODE = true

// List of admin emails - add your admin emails here
const ADMIN_EMAILS = [
  'infospanishhorizons@casitaazulpdx.com',
  'aletxa@comcreate.org',
  // Add more admin emails as needed
]

// MOCK DATA - DELETE WHEN CONNECTING TO SUPABASE
let MOCK_APPLICATIONS = [
  {
    id: 'mock-1',
    user_id: 'mock-user-1',
    user_email: 'aletxa.pascual@gmail.com',
    status: 'interview_scheduled',
    child_full_name: 'Sofia Martinez',
    preferred_name: 'Sofi',
    date_of_birth: '2021-03-15',
    primary_languages: 'Spanish, English',
    attended_preschool: 'yes',
    current_school: 'Little Stars Preschool',
    parent_name: 'Maria Martinez',
    relationship_to_child: 'Mother',
    parent_email: 'aletxa.pascual@gmail.com',
    parent_phone: '(503) 555-0101',
    home_address: '123 Oak Street, Portland, OR 97201',
    preferred_communication: 'email',
    second_parent_name: 'Carlos Martinez',
    second_parent_email: 'carlos.m@email.com',
    second_parent_phone: '(503) 555-0102',
    languages_at_home: 'Spanish (primary), English',
    interest_in_academy: 'We want Sofia to maintain her Spanish heritage while excelling academically.',
    hoping_for: 'Bilingual education and strong community values',
    seeking_full_time: 'yes',
    excited_about: 'The immersion approach and cultural education',
    values_important: 'Family, education, cultural preservation',
    submitted_at: '2025-01-15T10:30:00Z',
    interview_date: '2026-02-03T11:00:00Z',
    interview_notes: '',
    admin_notes: ''
  },
  {
    id: 'mock-2',
    user_id: 'mock-user-1',
    user_email: 'aletxa.pascual@gmail.com',
    status: 'admitted',
    child_full_name: 'Lucas Martinez',
    preferred_name: null,
    date_of_birth: '2021-06-22',
    primary_languages: 'Spanish, English',
    attended_preschool: 'yes',
    current_school: 'Little Stars Preschool',
    parent_name: 'Maria Martinez',
    relationship_to_child: 'Mother',
    parent_email: 'aletxa.pascual@gmail.com',
    parent_phone: '(503) 555-0101',
    home_address: '123 Oak Street, Portland, OR 97201',
    preferred_communication: 'email',
    second_parent_name: 'Carlos Martinez',
    second_parent_email: 'carlos.m@email.com',
    second_parent_phone: '(503) 555-0102',
    languages_at_home: 'Spanish (primary), English',
    interest_in_academy: 'We want Lucas to have the same opportunities as his sister.',
    hoping_for: 'Academic excellence in a bilingual environment',
    seeking_full_time: 'yes',
    excited_about: 'Learning alongside his sister',
    values_important: 'Family, education, cultural preservation',
    submitted_at: '2025-01-10T14:20:00Z',
    interview_date: '2025-01-20T10:00:00Z',
    interview_notes: 'Great family interview. Very engaged parents.',
    admin_notes: 'Priority admission - sibling'
  },
  {
    id: 'mock-3',
    user_id: 'mock-user-2',
    user_email: 'john.doe@email.com',
    status: 'submitted',
    child_full_name: 'Emma Johnson',
    preferred_name: 'Emmy',
    date_of_birth: '2021-09-10',
    primary_languages: 'English',
    attended_preschool: 'yes',
    current_school: 'Sunshine Montessori',
    parent_name: 'John Johnson',
    relationship_to_child: 'Father',
    parent_email: 'john.doe@email.com',
    parent_phone: '(503) 555-0201',
    home_address: '456 Pine Avenue, Hillsboro, OR 97124',
    preferred_communication: 'phone',
    second_parent_name: 'Sarah Johnson',
    second_parent_email: 'sarah.j@email.com',
    second_parent_phone: '(503) 555-0202',
    languages_at_home: 'English',
    interest_in_academy: 'We want Emma to learn Spanish from a young age for future opportunities.',
    hoping_for: 'Full Spanish immersion and cultural exposure',
    seeking_full_time: 'yes',
    excited_about: 'The small class sizes and dedicated teachers',
    values_important: 'Education, diversity, global mindset',
    submitted_at: '2025-01-18T09:15:00Z',
    interview_date: null,
    interview_notes: '',
    admin_notes: ''
  },
  {
    id: 'mock-4',
    user_id: 'mock-user-3',
    user_email: 'lisa.w@email.com',
    status: 'waitlist',
    child_full_name: 'Oliver Wilson',
    preferred_name: 'Ollie',
    date_of_birth: '2021-04-05',
    primary_languages: 'English, Portuguese',
    attended_preschool: 'no',
    current_school: null,
    parent_name: 'Lisa Wilson',
    relationship_to_child: 'Mother',
    parent_email: 'lisa.w@email.com',
    parent_phone: '(503) 555-0301',
    home_address: '789 Cedar Lane, Beaverton, OR 97005',
    preferred_communication: 'email',
    second_parent_name: null,
    second_parent_email: null,
    second_parent_phone: null,
    languages_at_home: 'English, Portuguese',
    interest_in_academy: 'Adding Spanish would make Oliver trilingual.',
    hoping_for: 'A nurturing environment that celebrates multilingualism',
    seeking_full_time: 'yes',
    excited_about: 'The focus on language development',
    values_important: 'Languages, creativity, independence',
    submitted_at: '2025-01-12T16:45:00Z',
    interview_date: '2025-01-22T14:00:00Z',
    interview_notes: 'Very bright child, parents very engaged.',
    admin_notes: 'Waitlist position #3'
  },
  {
    id: 'mock-5',
    user_id: 'mock-user-4',
    user_email: 'ana.r@email.com',
    status: 'rejected',
    child_full_name: 'Mia Rodriguez',
    preferred_name: null,
    date_of_birth: '2020-11-28',
    primary_languages: 'Spanish',
    attended_preschool: 'yes',
    current_school: 'Community Daycare',
    parent_name: 'Ana Rodriguez',
    relationship_to_child: 'Mother',
    parent_email: 'ana.r@email.com',
    parent_phone: '(503) 555-0401',
    home_address: '321 Maple Drive, Portland, OR 97210',
    preferred_communication: 'email',
    second_parent_name: 'Miguel Rodriguez',
    second_parent_email: 'miguel.r@email.com',
    second_parent_phone: '(503) 555-0402',
    languages_at_home: 'Spanish',
    interest_in_academy: 'Want Mia to maintain Spanish while learning English properly.',
    hoping_for: 'Balanced bilingual education',
    seeking_full_time: 'yes',
    excited_about: 'The curriculum and teaching methods',
    values_important: 'Heritage, education, community',
    submitted_at: '2025-01-08T11:00:00Z',
    interview_date: '2025-01-18T09:00:00Z',
    interview_notes: 'Child is too old for Kindergarten program.',
    admin_notes: 'Age does not meet requirements for K Fall 2026'
  }
]
// END MOCK DATA

// Status email templates
const statusEmailTemplates = {
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
    to: application.parent_email,
    subject: template.subject,
    html: emailContent.html,
    text: emailContent.text
  })

  console.log(`Status update email sent to ${application.parent_email} for status: ${newStatus}`)
}

export async function GET(request: NextRequest) {
  try {
    // MOCK MODE - Return mock data
    if (MOCK_MODE) {
      // Check for mock auth via cookie
      const mockUserCookie = request.cookies.get('mock_user_email')
      const mockUserEmail = mockUserCookie?.value

      if (!mockUserEmail) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      // Check if mock user is admin
      if (!ADMIN_EMAILS.includes(mockUserEmail)) {
        return NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        )
      }

      return NextResponse.json({ applications: MOCK_APPLICATIONS })
    }
    // END MOCK MODE

    const supabase = await createClient()

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

    const { data: applications, error } = await supabase
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

    const validStatuses = ['submitted', 'interview_scheduled', 'admitted', 'waitlist', 'rejected', 'declined', 'withdrawn']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // MOCK MODE - Update mock data
    if (MOCK_MODE) {
      const mockUserCookie = request.cookies.get('mock_user_email')
      const mockUserEmail = mockUserCookie?.value

      if (!mockUserEmail || !ADMIN_EMAILS.includes(mockUserEmail)) {
        return NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        )
      }

      const appIndex = MOCK_APPLICATIONS.findIndex(app => app.id === applicationId)
      if (appIndex === -1) {
        return NextResponse.json(
          { error: 'Application not found' },
          { status: 404 }
        )
      }

      // Update mock application
      MOCK_APPLICATIONS[appIndex] = {
        ...MOCK_APPLICATIONS[appIndex],
        status,
        ...(interview_date !== undefined && { interview_date }),
        ...(interview_notes !== undefined && { interview_notes }),
        ...(admin_notes !== undefined && { admin_notes })
      }

      return NextResponse.json({ application: MOCK_APPLICATIONS[appIndex] })
    }
    // END MOCK MODE

    const supabase = await createClient()

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

    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    }

    if (interview_date !== undefined) {
      updateData.interview_date = interview_date
    }
    if (interview_notes !== undefined) {
      updateData.interview_notes = interview_notes
    }
    if (admin_notes !== undefined) {
      updateData.admin_notes = admin_notes
    }

    // First, get the current application to check for status change
    const { data: currentApp } = await supabase
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .single()

    const { data: application, error } = await supabase
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
