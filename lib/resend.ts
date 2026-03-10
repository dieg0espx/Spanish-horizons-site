import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FALLBACK_FROM = 'Spanish Horizons Academy <noreply@comcreate.org>'

export type EmailOptions = {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
  attachments?: { filename: string; content: Buffer }[]
}

export async function sendEmail(options: EmailOptions) {
  const from = process.env.EMAIL_FROM || FALLBACK_FROM

  const { data, error } = await resend.emails.send({
    from,
    to: Array.isArray(options.to) ? options.to : [options.to],
    subject: options.subject,
    html: options.html,
    text: options.text,
    replyTo: options.replyTo,
    attachments: options.attachments,
  })

  if (error) {
    // If domain is not verified, retry with fallback address
    if (error.message?.includes('domain is not verified') && from !== FALLBACK_FROM) {
      console.warn(`Domain not verified for "${from}", retrying with fallback "${FALLBACK_FROM}"`)
      const { data: retryData, error: retryError } = await resend.emails.send({
        from: FALLBACK_FROM,
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo,
        attachments: options.attachments,
      })

      if (retryError) {
        throw new Error(`Failed to send email: ${retryError.message}`)
      }

      return retryData
    }

    throw new Error(`Failed to send email: ${error.message}`)
  }

  return data
}
