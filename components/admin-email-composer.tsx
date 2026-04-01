"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mail, Send, Eye, Edit, Loader2, Link2, X, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EmailComposerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipientEmail: string
  parentName: string
  childName: string
}

export default function AdminEmailComposer({
  open,
  onOpenChange,
  recipientEmail,
  parentName,
  childName,
}: EmailComposerProps) {
  const { toast } = useToast()
  const [showPreview, setShowPreview] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const [emailData, setEmailData] = useState({
    subject: '',
    greeting: `Dear ${parentName}`,
    body: '',
    brightwheelLink: '',
    closingName: 'Spanish Horizons Academy Admissions Team',
  })

  // Reset form when modal opens with new data
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setEmailData({
        subject: '',
        greeting: `Dear ${parentName}`,
        body: '',
        brightwheelLink: '',
        closingName: 'Spanish Horizons Academy Admissions Team',
      })
      setShowPreview(false)
      setSent(false)
    }
    onOpenChange(open)
  }

  const handleSend = async () => {
    if (!emailData.subject.trim() || !emailData.body.trim()) {
      toast({ title: 'Missing fields', description: 'Subject and message body are required.', variant: 'destructive' })
      return
    }

    setSending(true)
    try {
      const response = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipientEmail,
          parentName,
          childName,
          subject: emailData.subject,
          greeting: emailData.greeting,
          body: emailData.body,
          brightwheelLink: emailData.brightwheelLink || null,
          closingName: emailData.closingName,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSent(true)
        toast({ title: 'Email sent!', description: `Email sent to ${recipientEmail}` })
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to send email', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to send email', variant: 'destructive' })
    } finally {
      setSending(false)
    }
  }

  // Convert body to preview HTML
  const bodyPreviewHtml = emailData.body
    .split('\n\n')
    .map((p) => `<p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">${p.replace(/\n/g, '<br>')}</p>`)
    .join('')

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-ivry text-slate text-xl flex items-center gap-2">
            <Mail className="h-5 w-5 text-amber" />
            Send Email to {parentName}
          </DialogTitle>
        </DialogHeader>

        {sent ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="font-ivry text-xl text-slate mb-2">Email Sent Successfully!</h3>
            <p className="text-slate-medium font-questa mb-6">Your email has been sent to {recipientEmail}</p>
            <Button onClick={() => handleOpenChange(false)} className="bg-slate hover:bg-slate-medium text-white rounded-xl">
              Close
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Compose */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-questa font-semibold text-slate text-sm">Compose</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="lg:hidden rounded-xl text-xs"
                >
                  {showPreview ? <><Edit className="h-3 w-3 mr-1" /> Edit</> : <><Eye className="h-3 w-3 mr-1" /> Preview</>}
                </Button>
              </div>

              <div className={showPreview ? 'hidden lg:block' : ''}>
                {/* To field (read-only) */}
                <div className="mb-3">
                  <Label className="text-xs font-questa text-slate-medium">To</Label>
                  <div className="flex items-center gap-2 bg-slate/5 rounded-xl px-3 py-2">
                    <Mail className="h-4 w-4 text-slate/40" />
                    <span className="font-questa text-sm text-slate">{parentName} &lt;{recipientEmail}&gt;</span>
                    <span className="text-xs text-slate-medium ml-auto">Re: {childName}</span>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-3">
                  <Label className="text-xs font-questa text-slate-medium">Subject *</Label>
                  <Input
                    placeholder="e.g. Welcome to Spanish Horizons Academy!"
                    value={emailData.subject}
                    onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>

                {/* Greeting */}
                <div className="mb-3">
                  <Label className="text-xs font-questa text-slate-medium">Greeting</Label>
                  <Input
                    placeholder={`Dear ${parentName}`}
                    value={emailData.greeting}
                    onChange={(e) => setEmailData(prev => ({ ...prev, greeting: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>

                {/* Body */}
                <div className="mb-3">
                  <Label className="text-xs font-questa text-slate-medium">Message *</Label>
                  <Textarea
                    placeholder={`Write your message here...\n\nUse blank lines to create paragraphs.\n\nExample:\nWe are thrilled to welcome ${childName} to Spanish Horizons Academy! We can't wait to begin this exciting journey together.\n\nPlease find below a link to set up your Brightwheel account for tuition payments and school communications.`}
                    value={emailData.body}
                    onChange={(e) => setEmailData(prev => ({ ...prev, body: e.target.value }))}
                    className="rounded-xl resize-none"
                    rows={8}
                  />
                  <p className="text-xs text-slate-medium font-questa mt-1">Separate paragraphs with a blank line.</p>
                </div>

                {/* Brightwheel Link */}
                <div className="mb-3">
                  <Label className="text-xs font-questa text-slate-medium flex items-center gap-1">
                    <Link2 className="h-3 w-3" />
                    Brightwheel Link (optional)
                  </Label>
                  <Input
                    type="url"
                    placeholder="https://mybrightwheel.com/..."
                    value={emailData.brightwheelLink}
                    onChange={(e) => setEmailData(prev => ({ ...prev, brightwheelLink: e.target.value }))}
                    className="rounded-xl"
                  />
                  <p className="text-xs text-slate-medium font-questa mt-1">A branded Brightwheel payment button will appear in the email.</p>
                </div>

                {/* Closing Name */}
                <div className="mb-3">
                  <Label className="text-xs font-questa text-slate-medium">Closing Signature</Label>
                  <Input
                    value={emailData.closingName}
                    onChange={(e) => setEmailData(prev => ({ ...prev, closingName: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>

                {/* Send Button */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => handleOpenChange(false)}
                    className="rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSend}
                    disabled={sending || !emailData.subject.trim() || !emailData.body.trim()}
                    className="bg-amber hover:bg-golden hover:text-slate rounded-xl flex-1"
                  >
                    {sending ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="h-4 w-4 mr-2" /> Send Email</>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right: Preview */}
            <div className={`${showPreview ? '' : 'hidden lg:block'}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-questa font-semibold text-slate text-sm">Email Preview</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(false)}
                  className="lg:hidden rounded-xl text-xs"
                >
                  <Edit className="h-3 w-3 mr-1" /> Back to Edit
                </Button>
              </div>
              <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
                {/* Email header */}
                <div style={{ backgroundColor: '#000638', padding: '20px', textAlign: 'center' }}>
                  <h2 className="text-white font-bold text-base m-0">
                    {emailData.subject || 'Email Subject'}
                  </h2>
                  <p style={{ color: '#FFD700', marginTop: '6px', fontSize: '13px' }}>Spanish Horizons Academy</p>
                </div>

                {/* Email body */}
                <div style={{ padding: '24px', backgroundColor: '#f9fafb' }}>
                  <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
                    {emailData.greeting || `Dear ${parentName}`},
                  </p>

                  {emailData.body ? (
                    <div dangerouslySetInnerHTML={{ __html: bodyPreviewHtml }} />
                  ) : (
                    <p style={{ color: '#9ca3af', fontSize: '14px', fontStyle: 'italic' }}>
                      Your message will appear here...
                    </p>
                  )}

                  {/* Brightwheel preview */}
                  {emailData.brightwheelLink && (
                    <div style={{
                      backgroundColor: '#FFF8E7',
                      padding: '16px',
                      borderRadius: '8px',
                      margin: '20px 0',
                      borderLeft: '4px solid #FF8C00',
                    }}>
                      <p style={{ color: '#000638', margin: '0 0 6px 0', fontWeight: 600, fontSize: '14px' }}>
                        Brightwheel Payment Portal
                      </p>
                      <p style={{ color: '#374151', margin: '0 0 12px 0', fontSize: '12px' }}>
                        Use the link below to access your Brightwheel account for tuition payments and billing information.
                      </p>
                      <span style={{
                        display: 'inline-block',
                        backgroundColor: '#FF8C00',
                        color: 'white',
                        padding: '8px 20px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}>
                        Open Brightwheel Portal
                      </span>
                    </div>
                  )}

                  <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.6, marginTop: '20px' }}>
                    If you have any questions, please don't hesitate to reach out at{' '}
                    <span style={{ color: '#FF8C00' }}>infospanishhorizons@casitaazulpdx.com</span>.
                  </p>

                  <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.6, marginTop: '20px' }}>
                    Warm regards,<br />
                    <strong>{emailData.closingName || 'Spanish Horizons Academy Admissions Team'}</strong>
                  </p>
                </div>

                {/* Email footer */}
                <div style={{ backgroundColor: '#000638', padding: '16px', textAlign: 'center' }}>
                  <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0 }}>
                    770 NE Rogahn Street, Hillsboro, OR 97124<br />
                    <span style={{ color: '#FFD700' }}>infospanishhorizons@casitaazulpdx.com</span>
                  </p>
                </div>
              </div>

              {/* Send from preview (mobile) */}
              <div className="lg:hidden mt-4">
                <Button
                  onClick={handleSend}
                  disabled={sending || !emailData.subject.trim() || !emailData.body.trim()}
                  className="bg-amber hover:bg-golden hover:text-slate rounded-xl w-full"
                >
                  {sending ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="h-4 w-4 mr-2" /> Send Email</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
