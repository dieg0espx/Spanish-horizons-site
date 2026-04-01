"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  FileText,
  CheckCircle,
  Clock,
  Calendar,
  User,
  Mail,
  Phone,
  LogOut,
  Search,
  Filter,
  Eye,
  Edit,
  X,
  AlertCircle,
  CalendarDays,
  Download,
  Loader2,
  Save,
  Shield,
  DollarSign,
  Tag,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Plus,
  Copy
} from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useToast } from '@/hooks/use-toast'
import AdminAvailabilityCalendar from '@/components/admin-availability-calendar'
import InvoicesClient from '@/components/invoices-client'
import AdminEmailComposer from '@/components/admin-email-composer'

interface Application {
  id: string
  user_id: string
  user_email: string
  status: 'submitted' | 'under_review' | 'interview_pending' | 'interview_scheduled' | 'admitted' | 'waitlist' | 'rejected' | 'declined' | 'withdrawn'
  child_full_name: string
  preferred_name: string | null
  date_of_birth: string
  primary_languages: string
  attended_preschool: string
  current_school: string | null
  parent_name: string
  relationship_to_child: string
  parent_email: string
  parent_phone: string
  home_address: string
  preferred_communication: string
  second_parent_name: string | null
  second_parent_email: string | null
  second_parent_phone: string | null
  languages_at_home: string
  interest_in_academy: string
  hoping_for: string
  seeking_full_time: string
  excited_about: string
  values_important: string
  submitted_at: string
  interview_date?: string
  interview_notes?: string
  admin_notes?: string
  // Additional fields
  previous_enrollment?: string
  previous_enrollment_details?: string
  interested_in_continuing?: string
  receive_updates?: string
  how_did_you_find?: string
  how_did_you_find_other?: string
  anything_else?: string
}

const statusConfig = {
  submitted: {
    label: 'Submitted',
    color: 'bg-amber',
    textColor: 'text-amber',
  },
  under_review: {
    label: 'Under Review',
    color: 'bg-purple-500',
    textColor: 'text-purple-500',
  },
  interview_pending: {
    label: 'Interview Pending',
    color: 'bg-green-500',
    textColor: 'text-green-500',
  },
  interview_scheduled: {
    label: 'Interview Scheduled',
    color: 'bg-blue-500',
    textColor: 'text-blue-500',
  },
  admitted: {
    label: 'Admitted',
    color: 'bg-green-600',
    textColor: 'text-green-600',
  },
  waitlist: {
    label: 'Waitlist',
    color: 'bg-golden',
    textColor: 'text-golden',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-500',
    textColor: 'text-red-500',
  },
  declined: {
    label: 'Declined',
    color: 'bg-gray-500',
    textColor: 'text-gray-500',
  },
  withdrawn: {
    label: 'Withdrawn',
    color: 'bg-gray-400',
    textColor: 'text-gray-400',
  }
}

export default function AdminDashboardPage() {
  const { user, loading: authLoading, signOut, openAuthModal } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editData, setEditData] = useState({
    status: '',
    interview_date: '',
    interview_notes: '',
    admin_notes: ''
  })
  const [updating, setUpdating] = useState(false)
  const [savingNotes, setSavingNotes] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [activeTab, setActiveTab] = useState<'applications' | 'calendar' | 'admins' | 'invoices' | 'coupons'>('applications')
  const [generatingPdf, setGeneratingPdf] = useState(false)
  const [adminUsers, setAdminUsers] = useState<{ id: string; email: string; added_by: string | null; created_at: string }[]>([])
  const [adminUsersLoading, setAdminUsersLoading] = useState(false)
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [addingAdmin, setAddingAdmin] = useState(false)
  const [removingAdminId, setRemovingAdminId] = useState<string | null>(null)

  // Coupons state
  const [coupons, setCoupons] = useState<any[]>([])
  const [couponsLoading, setCouponsLoading] = useState(false)
  const [newCoupon, setNewCoupon] = useState({ code: '', discountType: 'fixed', discountValue: '', maxUses: '1', expiresAt: '', recipientEmail: '', recipientName: '', childName: '' })
  const [creatingCoupon, setCreatingCoupon] = useState(false)
  const [deletingCouponId, setDeletingCouponId] = useState<string | null>(null)
  const [togglingCouponId, setTogglingCouponId] = useState<string | null>(null)
  const [sendingCouponId, setSendingCouponId] = useState<string | null>(null)

  // Email composer state
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [emailRecipient, setEmailRecipient] = useState({ email: '', parentName: '', childName: '' })

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading && !user) {
      openAuthModal('login')
    }
  }, [authLoading, user, openAuthModal])

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return

      try {
        const response = await fetch('/api/admin/applications')
        const data = await response.json()

        if (response.ok) {
          setApplications(data.applications || [])
        } else if (response.status === 403) {
          setError('Access denied. Admin privileges required.')
        } else {
          setError(data.error)
        }
      } catch (err) {
        setError('Failed to load applications')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchApplications()
    }
  }, [user])

  // Fetch admin users when the admins tab becomes active
  useEffect(() => {
    const fetchAdminUsers = async () => {
      if (!user || activeTab !== 'admins') return
      setAdminUsersLoading(true)
      try {
        const response = await fetch('/api/admin/users')
        const data = await response.json()
        if (response.ok) {
          setAdminUsers(data.admins || [])
        }
      } catch {
        // silently fail
      } finally {
        setAdminUsersLoading(false)
      }
    }

    fetchAdminUsers()
  }, [user, activeTab])

  const handleAddAdmin = async () => {
    if (!newAdminEmail.trim()) return

    setAddingAdmin(true)
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newAdminEmail.trim() })
      })
      const data = await response.json()

      if (response.ok) {
        setAdminUsers(prev => [...prev, data.admin])
        setNewAdminEmail('')
        toast({ title: 'Admin added', description: `${data.admin.email} has been added as an admin.` })
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to add admin', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to add admin', variant: 'destructive' })
    } finally {
      setAddingAdmin(false)
    }
  }

  const handleRemoveAdmin = async (id: string) => {
    setRemovingAdminId(id)
    try {
      const response = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' })
      const data = await response.json()

      if (response.ok) {
        setAdminUsers(prev => prev.filter(a => a.id !== id))
        toast({ title: 'Admin removed', description: 'The admin user has been removed.' })
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to remove admin', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to remove admin', variant: 'destructive' })
    } finally {
      setRemovingAdminId(null)
    }
  }

  // Fetch coupons when the coupons tab becomes active
  useEffect(() => {
    const fetchCoupons = async () => {
      if (!user || activeTab !== 'coupons') return
      setCouponsLoading(true)
      try {
        const response = await fetch('/api/admin/coupons')
        const data = await response.json()
        if (response.ok) {
          setCoupons(data.coupons || [])
        }
      } catch {
        // silently fail
      } finally {
        setCouponsLoading(false)
      }
    }

    fetchCoupons()
  }, [user, activeTab])

  const handleCreateCoupon = async () => {
    if (!newCoupon.code.trim() || !newCoupon.discountValue) return

    setCreatingCoupon(true)
    try {
      const response = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: newCoupon.code,
          discountType: newCoupon.discountType,
          discountValue: parseFloat(newCoupon.discountValue),
          maxUses: newCoupon.maxUses ? parseInt(newCoupon.maxUses) : 1,
          expiresAt: newCoupon.expiresAt || null,
          recipientEmail: newCoupon.recipientEmail || null,
          recipientName: newCoupon.recipientName || null,
          childName: newCoupon.childName || null,
        })
      })
      const data = await response.json()

      if (response.ok) {
        setCoupons(prev => [data.coupon, ...prev])
        setNewCoupon({ code: '', discountType: 'fixed', discountValue: '', maxUses: '1', expiresAt: '', recipientEmail: '', recipientName: '', childName: '' })
        toast({ title: 'Coupon created', description: `Coupon ${data.coupon.code} has been created.` })
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to create coupon', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to create coupon', variant: 'destructive' })
    } finally {
      setCreatingCoupon(false)
    }
  }

  const handleSendCouponEmail = async (id: string) => {
    setSendingCouponId(id)
    try {
      const response = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_email', id })
      })
      const data = await response.json()

      if (response.ok) {
        setCoupons(prev => prev.map(c => c.id === id ? { ...c, email_sent: true, email_sent_at: new Date().toISOString() } : c))
        toast({ title: 'Email sent!', description: data.message })
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to send email', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to send email', variant: 'destructive' })
    } finally {
      setSendingCouponId(null)
    }
  }

  const handleToggleCoupon = async (id: string, currentActive: boolean) => {
    setTogglingCouponId(id)
    try {
      const response = await fetch('/api/admin/coupons', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: !currentActive })
      })

      if (response.ok) {
        setCoupons(prev => prev.map(c => c.id === id ? { ...c, is_active: !currentActive } : c))
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to update coupon', variant: 'destructive' })
    } finally {
      setTogglingCouponId(null)
    }
  }

  const handleDeleteCoupon = async (id: string) => {
    setDeletingCouponId(id)
    try {
      const response = await fetch(`/api/admin/coupons?id=${id}`, { method: 'DELETE' })

      if (response.ok) {
        setCoupons(prev => prev.filter(c => c.id !== id))
        toast({ title: 'Coupon deleted', description: 'The coupon has been deleted.' })
      } else {
        const data = await response.json()
        toast({ title: 'Error', description: data.error || 'Failed to delete coupon', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to delete coupon', variant: 'destructive' })
    } finally {
      setDeletingCouponId(null)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const openViewModal = (app: Application) => {
    setSelectedApplication(app)
    setIsViewModalOpen(true)
  }

  const openEditModal = (app: Application) => {
    setSelectedApplication(app)
    setEditData({
      status: app.status,
      interview_date: app.interview_date || '',
      interview_notes: app.interview_notes || '',
      admin_notes: app.admin_notes || ''
    })
    setShowConfirmation(false)
    setIsEditModalOpen(true)
  }

  const openEmailModal = (app: Application) => {
    setEmailRecipient({
      email: app.parent_email,
      parentName: app.parent_name,
      childName: app.child_full_name,
    })
    setIsEmailModalOpen(true)
  }

  const handleRequestUpdate = () => {
    setShowConfirmation(true)
  }

  const handleConfirmUpdate = async () => {
    if (!selectedApplication) return

    setUpdating(true)
    try {
      const response = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: selectedApplication.id,
          ...editData
        })
      })

      const data = await response.json()

      if (response.ok) {
        setApplications(apps =>
          apps.map(app =>
            app.id === selectedApplication.id ? data.application : app
          )
        )
        toast({
          title: 'Application updated',
          description: 'The application status has been updated successfully.'
        })
        setShowConfirmation(false)
        setIsEditModalOpen(false)
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to update application',
          variant: 'destructive'
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update application',
        variant: 'destructive'
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleCancelConfirmation = () => {
    setShowConfirmation(false)
  }

  const handleSaveNotes = async () => {
    if (!selectedApplication) return

    setSavingNotes(true)
    try {
      const response = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: selectedApplication.id,
          status: selectedApplication.status, // Keep the same status
          interview_date: editData.interview_date,
          interview_notes: editData.interview_notes,
          admin_notes: editData.admin_notes
        })
      })

      const data = await response.json()

      if (response.ok) {
        setApplications(apps =>
          apps.map(app =>
            app.id === selectedApplication.id ? data.application : app
          )
        )
        setSelectedApplication(data.application)
        toast({
          title: 'Notes saved',
          description: 'The notes have been saved successfully.'
        })
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to save notes',
          variant: 'destructive'
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save notes',
        variant: 'destructive'
      })
    } finally {
      setSavingNotes(false)
    }
  }

  const handleDownloadPdf = async (app: Application) => {
    setGeneratingPdf(true)

    try {
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 15
      let yPos = 20

      // Helper function to add text with word wrap
      const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number = 6) => {
        const lines = pdf.splitTextToSize(text, maxWidth)
        lines.forEach((line: string) => {
          if (y > pageHeight - 20) {
            pdf.addPage()
            y = 20
          }
          pdf.text(line, x, y)
          y += lineHeight
        })
        return y
      }

      // Header
      pdf.setFillColor(49, 68, 80) // slate color
      pdf.rect(0, 0, pageWidth, 35, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Spanish Horizons Academy', margin, 15)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Admissions Application', margin, 25)

      // Reset text color
      pdf.setTextColor(0, 0, 0)
      yPos = 45

      // Status badge
      const statusLabel = statusConfig[app.status].label
      pdf.setFontSize(10)
      pdf.setTextColor(100, 100, 100)
      pdf.text(`Status: ${statusLabel}`, margin, yPos)
      pdf.text(`Submitted: ${new Date(app.submitted_at).toLocaleDateString()}`, pageWidth - margin - 50, yPos)
      yPos += 10

      // Section helper
      const addSection = (title: string, yPosition: number) => {
        if (yPosition > pageHeight - 40) {
          pdf.addPage()
          yPosition = 20
        }
        pdf.setFillColor(245, 166, 35) // amber color
        pdf.rect(margin, yPosition, pageWidth - margin * 2, 8, 'F')
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'bold')
        pdf.text(title, margin + 3, yPosition + 5.5)
        pdf.setTextColor(0, 0, 0)
        pdf.setFont('helvetica', 'normal')
        return yPosition + 14
      }

      // Field helper
      const addField = (label: string, value: string | null | undefined, yPosition: number) => {
        if (!value) return yPosition
        if (yPosition > pageHeight - 25) {
          pdf.addPage()
          yPosition = 20
        }
        pdf.setFontSize(9)
        pdf.setTextColor(100, 100, 100)
        pdf.text(label, margin, yPosition)
        pdf.setFontSize(10)
        pdf.setTextColor(0, 0, 0)
        yPosition = addWrappedText(value, margin, yPosition + 5, pageWidth - margin * 2)
        return yPosition + 3
      }

      // SECTION 1: Student Information
      yPos = addSection('Student Information', yPos)
      yPos = addField('Child\'s Full Name', app.child_full_name, yPos)
      yPos = addField('Preferred Name', app.preferred_name, yPos)
      yPos = addField('Date of Birth', new Date(app.date_of_birth).toLocaleDateString(), yPos)
      yPos = addField('Primary Language(s)', app.primary_languages, yPos)
      yPos = addField('Attended Preschool', app.attended_preschool, yPos)
      yPos = addField('Current School', app.current_school, yPos)

      // SECTION 2: Primary Parent/Guardian
      yPos = addSection('Primary Parent/Guardian', yPos)
      yPos = addField('Name', app.parent_name, yPos)
      yPos = addField('Relationship to Child', app.relationship_to_child, yPos)
      yPos = addField('Email', app.parent_email, yPos)
      yPos = addField('Phone', app.parent_phone, yPos)
      yPos = addField('Home Address', app.home_address, yPos)
      yPos = addField('Preferred Communication', app.preferred_communication, yPos)

      // SECTION 3: Secondary Parent/Guardian
      if (app.second_parent_name) {
        yPos = addSection('Secondary Parent/Guardian', yPos)
        yPos = addField('Name', app.second_parent_name, yPos)
        yPos = addField('Email', app.second_parent_email, yPos)
        yPos = addField('Phone', app.second_parent_phone, yPos)
      }

      // SECTION 4: Family & Educational Background
      yPos = addSection('Family & Educational Background', yPos)
      yPos = addField('Languages Spoken at Home', app.languages_at_home, yPos)

      // SECTION 5: Previous Enrollment
      if (app.previous_enrollment) {
        yPos = addSection('Previous Enrollment', yPos)
        yPos = addField('Previously Enrolled at Casita Azul', app.previous_enrollment, yPos)
        yPos = addField('Details', app.previous_enrollment_details, yPos)
      }

      // SECTION 6: Interest & Intent
      yPos = addSection('Interest & Intent', yPos)
      yPos = addField('Why are you interested in Spanish Horizons Academy?', app.interest_in_academy, yPos)
      yPos = addField('What do you hope your child will gain?', app.hoping_for, yPos)
      yPos = addField('Seeking full-time Spanish immersion?', app.seeking_full_time, yPos)

      // SECTION 7: Looking Ahead
      yPos = addSection('Looking Ahead', yPos)
      yPos = addField('What excites you most about our program?', app.excited_about, yPos)
      yPos = addField('What values are important to you in your child\'s education?', app.values_important, yPos)
      yPos = addField('Interested in continuing with Spanish Horizons?', app.interested_in_continuing, yPos)
      yPos = addField('Receive updates about expansion?', app.receive_updates, yPos)

      // SECTION 8: How They Found Us
      if (app.how_did_you_find) {
        yPos = addSection('How They Found Us', yPos)
        yPos = addField('How did you hear about us?', app.how_did_you_find, yPos)
        yPos = addField('Other Details', app.how_did_you_find_other, yPos)
      }

      // SECTION 9: Additional Information
      if (app.anything_else) {
        yPos = addSection('Additional Information', yPos)
        yPos = addField('Anything else you\'d like us to know?', app.anything_else, yPos)
      }

      // SECTION 10: Admin Notes
      if (app.admin_notes || app.interview_notes || app.interview_date) {
        yPos = addSection('Admin Notes', yPos)
        yPos = addField('Interview Date', app.interview_date ? new Date(app.interview_date).toLocaleString() : null, yPos)
        yPos = addField('Interview Notes', app.interview_notes, yPos)
        yPos = addField('Admin Notes', app.admin_notes, yPos)
      }

      // Footer on all pages
      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8)
        pdf.setTextColor(150, 150, 150)
        pdf.text(
          `Generated on ${new Date().toLocaleDateString()} | Page ${i} of ${totalPages}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        )
      }

      // Save the PDF
      const fileName = `application_${app.child_full_name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)

      toast({
        title: 'PDF Downloaded',
        description: `Application saved as ${fileName}`
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast({
        title: 'Error',
        description: 'Failed to generate PDF',
        variant: 'destructive'
      })
    } finally {
      setGeneratingPdf(false)
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.child_full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.parent_email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: applications.length,
    submitted: applications.filter(a => a.status === 'submitted').length,
    interview: applications.filter(a => a.status === 'interview_scheduled').length,
    admitted: applications.filter(a => a.status === 'admitted').length,
    waitlist: applications.filter(a => a.status === 'waitlist').length,
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-amber border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-medium font-questa">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <User className="h-16 w-16 text-slate/30 mx-auto mb-4" />
            <h2 className="text-xl font-ivry font-bold text-slate mb-2">Admin Sign In Required</h2>
            <p className="text-slate-medium font-questa mb-6">
              Please sign in with an admin account to access this page.
            </p>
            <Button
              onClick={() => openAuthModal('login')}
              className="bg-amber hover:bg-golden hover:text-slate text-white rounded-xl font-questa"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error === 'Access denied. Admin privileges required.') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-red-200">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-ivry font-bold text-slate mb-2">Access Denied</h2>
            <p className="text-slate-medium font-questa mb-6">
              You don't have permission to access this page. Admin privileges are required.
            </p>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-slate/30 text-slate rounded-xl font-questa"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-ivry font-bold text-white truncate">Admin Dashboard</h1>
              <p className="text-white/70 font-questa text-sm sm:text-base mt-0.5 sm:mt-1 hidden sm:block">Manage Admissions Applications</p>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              size="sm"
              className="border-amber/50 text-amber hover:bg-amber hover:text-white hover:border-amber rounded-xl font-questa shrink-0"
            >
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-4 sm:mb-8 overflow-x-auto pb-2">
          <Button
            variant={activeTab === 'applications' ? 'default' : 'outline'}
            onClick={() => setActiveTab('applications')}
            size="sm"
            className={`rounded-xl font-questa whitespace-nowrap ${activeTab === 'applications' ? 'bg-slate text-white' : ''}`}
          >
            <FileText className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Applications</span>
            <span className="sm:hidden">Apps</span>
          </Button>
          <Button
            variant={activeTab === 'calendar' ? 'default' : 'outline'}
            onClick={() => setActiveTab('calendar')}
            size="sm"
            className={`rounded-xl font-questa whitespace-nowrap ${activeTab === 'calendar' ? 'bg-slate text-white' : ''}`}
          >
            <CalendarDays className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Interview Calendar</span>
            <span className="sm:hidden">Calendar</span>
          </Button>
          <Button
            variant={activeTab === 'invoices' ? 'default' : 'outline'}
            onClick={() => setActiveTab('invoices')}
            size="sm"
            className={`rounded-xl font-questa whitespace-nowrap ${activeTab === 'invoices' ? 'bg-slate text-white' : ''}`}
          >
            <DollarSign className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Invoices</span>
            <span className="sm:hidden">Invoices</span>
          </Button>
          <Button
            variant={activeTab === 'coupons' ? 'default' : 'outline'}
            onClick={() => setActiveTab('coupons')}
            size="sm"
            className={`rounded-xl font-questa whitespace-nowrap ${activeTab === 'coupons' ? 'bg-slate text-white' : ''}`}
          >
            <Tag className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Coupons</span>
            <span className="sm:hidden">Coupons</span>
          </Button>
          <Button
            variant={activeTab === 'admins' ? 'default' : 'outline'}
            onClick={() => setActiveTab('admins')}
            size="sm"
            className={`rounded-xl font-questa whitespace-nowrap ${activeTab === 'admins' ? 'bg-slate text-white' : ''}`}
          >
            <Shield className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Admin Users</span>
            <span className="sm:hidden">Admins</span>
          </Button>
        </div>

        {activeTab === 'invoices' ? (
          <InvoicesClient />
        ) : activeTab === 'coupons' ? (
          <Card>
            <CardHeader>
              <CardTitle className="font-questa text-slate flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Coupons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Create new coupon */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <p className="font-questa font-semibold text-slate text-sm">Create New Coupon</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs font-questa text-slate-medium">Parent/Guardian Name *</Label>
                    <Input
                      type="text"
                      placeholder="e.g. Maria Garcia"
                      value={newCoupon.recipientName}
                      onChange={(e) => setNewCoupon(prev => ({ ...prev, recipientName: e.target.value }))}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-questa text-slate-medium">Parent Email *</Label>
                    <Input
                      type="email"
                      placeholder="e.g. maria@example.com"
                      value={newCoupon.recipientEmail}
                      onChange={(e) => setNewCoupon(prev => ({ ...prev, recipientEmail: e.target.value }))}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-questa text-slate-medium">Child's Name *</Label>
                    <Input
                      type="text"
                      placeholder="e.g. Sofia Garcia"
                      value={newCoupon.childName}
                      onChange={(e) => setNewCoupon(prev => ({ ...prev, childName: e.target.value }))}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div>
                    <Label className="text-xs font-questa text-slate-medium">Coupon Code *</Label>
                    <Input
                      type="text"
                      placeholder="e.g. SOFIA2026"
                      value={newCoupon.code}
                      onChange={(e) => setNewCoupon(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                      className="rounded-xl uppercase"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-questa text-slate-medium">Discount Type</Label>
                    <select
                      value={newCoupon.discountType}
                      onChange={(e) => setNewCoupon(prev => ({ ...prev, discountType: e.target.value }))}
                      className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm"
                    >
                      <option value="fixed">Fixed ($)</option>
                      <option value="percentage">Percentage (%)</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs font-questa text-slate-medium">
                      {newCoupon.discountType === 'fixed' ? 'Amount ($) *' : 'Percentage (%) *'}
                    </Label>
                    <Input
                      type="number"
                      placeholder={newCoupon.discountType === 'fixed' ? '120' : '100'}
                      value={newCoupon.discountValue}
                      onChange={(e) => setNewCoupon(prev => ({ ...prev, discountValue: e.target.value }))}
                      className="rounded-xl"
                      min="0"
                      max={newCoupon.discountType === 'percentage' ? '100' : undefined}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-questa text-slate-medium">Max Uses</Label>
                    <Input
                      type="number"
                      placeholder="1"
                      value={newCoupon.maxUses}
                      onChange={(e) => setNewCoupon(prev => ({ ...prev, maxUses: e.target.value }))}
                      className="rounded-xl"
                      min="1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-questa text-slate-medium">Expires (optional)</Label>
                    <Input
                      type="date"
                      value={newCoupon.expiresAt}
                      onChange={(e) => setNewCoupon(prev => ({ ...prev, expiresAt: e.target.value }))}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleCreateCoupon}
                  disabled={creatingCoupon || !newCoupon.code.trim() || !newCoupon.discountValue || !newCoupon.recipientEmail.trim() || !newCoupon.childName.trim()}
                  className="bg-slate hover:bg-slate-medium text-white rounded-xl"
                >
                  {creatingCoupon ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  Create Coupon
                </Button>
              </div>

              {/* Coupons list */}
              {couponsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-slate/40" />
                </div>
              ) : coupons.length === 0 ? (
                <p className="text-center text-slate-medium py-8 font-questa">No coupons created yet.</p>
              ) : (
                <div className="space-y-2">
                  {coupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border ${coupon.is_active ? 'bg-white border-gray-200' : 'bg-gray-100 border-gray-200 opacity-60'}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-mono font-bold text-slate text-sm bg-slate/10 px-2 py-0.5 rounded">{coupon.code}</span>
                          <button
                            onClick={() => { navigator.clipboard.writeText(coupon.code); toast({ title: 'Copied!', description: `${coupon.code} copied to clipboard` }) }}
                            className="text-slate/40 hover:text-slate"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          {!coupon.is_active && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-questa">Inactive</span>
                          )}
                          {coupon.email_sent && (
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded font-questa">Email Sent</span>
                          )}
                        </div>
                        {(coupon.child_name || coupon.recipient_name) && (
                          <p className="text-sm text-slate font-questa font-medium">
                            {coupon.child_name && <span>Child: {coupon.child_name}</span>}
                            {coupon.child_name && coupon.recipient_name && <span> · </span>}
                            {coupon.recipient_name && <span>Parent: {coupon.recipient_name}</span>}
                            {coupon.recipient_email && <span className="text-slate-medium"> ({coupon.recipient_email})</span>}
                          </p>
                        )}
                        <p className="text-xs text-slate-medium font-questa">
                          {coupon.discount_type === 'fixed' ? `$${coupon.discount_value} off` : `${coupon.discount_value}% off`}
                          {' · '}
                          {coupon.max_uses ? `${coupon.current_uses}/${coupon.max_uses} uses` : `${coupon.current_uses} uses (unlimited)`}
                          {coupon.expires_at && ` · Expires ${new Date(coupon.expires_at).toLocaleDateString()}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        {coupon.recipient_email && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSendCouponEmail(coupon.id)}
                            disabled={sendingCouponId === coupon.id}
                            className={`rounded-xl ${coupon.email_sent ? 'text-green-600 hover:text-green-700 hover:bg-green-50' : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'}`}
                            title={coupon.email_sent ? `Resend to ${coupon.recipient_email}` : `Send to ${coupon.recipient_email}`}
                          >
                            {sendingCouponId === coupon.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Mail className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleCoupon(coupon.id, coupon.is_active)}
                          disabled={togglingCouponId === coupon.id}
                          className="rounded-xl"
                          title={coupon.is_active ? 'Deactivate' : 'Activate'}
                        >
                          {togglingCouponId === coupon.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : coupon.is_active ? (
                            <ToggleRight className="h-5 w-5 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-5 w-5 text-gray-400" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCoupon(coupon.id)}
                          disabled={deletingCouponId === coupon.id}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                        >
                          {deletingCouponId === coupon.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : activeTab === 'admins' ? (
          <Card>
            <CardHeader>
              <CardTitle className="font-questa text-slate flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Admin Users
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add new admin */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
                  <Input
                    type="email"
                    placeholder="Enter email address..."
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddAdmin()}
                    className="pl-10 rounded-xl"
                    disabled={addingAdmin}
                  />
                </div>
                <Button
                  onClick={handleAddAdmin}
                  disabled={addingAdmin || !newAdminEmail.trim()}
                  className="bg-slate hover:bg-slate-medium text-white rounded-xl"
                >
                  {addingAdmin ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add Admin'}
                </Button>
              </div>

              {/* Admin list */}
              {adminUsersLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-slate/40" />
                </div>
              ) : adminUsers.length === 0 ? (
                <p className="text-center text-slate-medium py-8">No admin users found.</p>
              ) : (
                <div className="space-y-2">
                  {adminUsers.map((admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate/10 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-slate" />
                        </div>
                        <div>
                          <p className="font-medium text-slate text-sm">{admin.email}</p>
                          <p className="text-xs text-slate-medium">
                            Added {admin.added_by ? `by ${admin.added_by}` : 'by system'} on{' '}
                            {new Date(admin.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveAdmin(admin.id)}
                        disabled={admin.email === user?.email?.toLowerCase() || removingAdminId === admin.id}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl disabled:opacity-40"
                        title={admin.email === user?.email?.toLowerCase() ? 'Cannot remove yourself' : 'Remove admin'}
                      >
                        {removingAdminId === admin.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : activeTab === 'calendar' ? (
          <Card>
            <CardContent className="p-6">
              <AdminAvailabilityCalendar />
            </CardContent>
          </Card>
        ) : (
        <>
        {/* Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <Card>
            <CardContent className="p-2 sm:p-4 text-center">
              <p className="text-xl sm:text-3xl font-bold text-slate">{stats.total}</p>
              <p className="text-xs sm:text-sm text-slate-medium font-questa">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-2 sm:p-4 text-center">
              <p className="text-xl sm:text-3xl font-bold text-amber">{stats.submitted}</p>
              <p className="text-xs sm:text-sm text-slate-medium font-questa">New</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-2 sm:p-4 text-center">
              <p className="text-xl sm:text-3xl font-bold text-blue-500">{stats.interview}</p>
              <p className="text-xs sm:text-sm text-slate-medium font-questa">Interview</p>
            </CardContent>
          </Card>
          <Card className="hidden sm:block">
            <CardContent className="p-2 sm:p-4 text-center">
              <p className="text-xl sm:text-3xl font-bold text-green-500">{stats.admitted}</p>
              <p className="text-xs sm:text-sm text-slate-medium font-questa">Admitted</p>
            </CardContent>
          </Card>
          <Card className="hidden sm:block">
            <CardContent className="p-2 sm:p-4 text-center">
              <p className="text-xl sm:text-3xl font-bold text-golden">{stats.waitlist}</p>
              <p className="text-xs sm:text-sm text-slate-medium font-questa">Waitlist</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-amber" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 sm:pl-10 rounded-xl text-sm sm:text-base h-10 border-2 border-slate/20 focus:border-amber focus:ring-2 focus:ring-amber/50 transition-all hover:border-amber/50"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto pl-9 pr-10 py-2 border-2 border-slate/20 rounded-xl font-questa font-medium text-slate bg-white appearance-none cursor-pointer text-sm h-10 focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-all hover:border-amber/50"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23F5A623' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center'
              }}
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="interview_pending">Interview Pending</option>
              <option value="interview_scheduled">Interview Scheduled</option>
              <option value="admitted">Admitted</option>
              <option value="waitlist">Waitlist</option>
              <option value="declined">Declined</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="sm:hidden space-y-3">
          {filteredApplications.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-slate-medium font-questa">
                No applications found
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map((app) => (
              <Card key={app.id} className="overflow-hidden">
                <div className={`${statusConfig[app.status].color} px-3 py-2`}>
                  <span className="text-white text-xs font-medium font-questa">
                    {statusConfig[app.status].label}
                  </span>
                </div>
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-questa font-bold text-slate">{app.child_full_name}</p>
                      <p className="text-xs text-slate-medium">{app.parent_name}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openViewModal(app)}
                        className="rounded-lg h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEmailModal(app)}
                        className="rounded-lg h-8 w-8 p-0 text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => openEditModal(app)}
                        className="rounded-lg bg-amber hover:bg-golden hover:text-slate h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-medium">
                    <span>{app.parent_email}</span>
                    <span>{new Date(app.submitted_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <Card className="hidden sm:block">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate/5 border-b">
                  <tr>
                    <th className="text-left p-4 font-questa font-semibold text-slate">Child Name</th>
                    <th className="text-left p-4 font-questa font-semibold text-slate hidden md:table-cell">Parent</th>
                    <th className="text-left p-4 font-questa font-semibold text-slate hidden lg:table-cell">Contact</th>
                    <th className="text-left p-4 font-questa font-semibold text-slate">Status</th>
                    <th className="text-left p-4 font-questa font-semibold text-slate hidden md:table-cell">Submitted</th>
                    <th className="text-right p-4 font-questa font-semibold text-slate">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-medium font-questa">
                        No applications found
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((app) => (
                      <tr key={app.id} className="border-b hover:bg-slate/5">
                        <td className="p-4">
                          <p className="font-questa font-semibold text-slate">{app.child_full_name}</p>
                          <p className="text-sm text-slate-medium">DOB: {new Date(app.date_of_birth).toLocaleDateString()}</p>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <p className="font-questa text-slate">{app.parent_name}</p>
                          <p className="text-sm text-slate-medium">{app.relationship_to_child}</p>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <p className="text-sm text-slate">{app.parent_email}</p>
                          <p className="text-sm text-slate-medium">{app.parent_phone}</p>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white ${statusConfig[app.status].color}`}>
                            {statusConfig[app.status].label}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-slate-medium hidden md:table-cell">
                          {new Date(app.submitted_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openViewModal(app)}
                              className="rounded-lg"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEmailModal(app)}
                              className="rounded-lg text-blue-600 border-blue-200 hover:bg-blue-50"
                              title="Send email"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => openEditModal(app)}
                              className="rounded-lg bg-amber hover:bg-golden hover:text-slate"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        </>
        )}
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between pr-8">
            <DialogTitle className="font-ivry text-slate text-xl">Application Details</DialogTitle>
            {selectedApplication && (
              <Button
                onClick={() => handleDownloadPdf(selectedApplication)}
                disabled={generatingPdf}
                className="bg-slate hover:bg-slate/80 text-white rounded-xl"
                size="sm"
              >
                {generatingPdf ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Download PDF
              </Button>
            )}
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between bg-slate/5 p-4 rounded-xl">
                <div>
                  <p className="text-sm text-slate-medium font-questa">Application Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${statusConfig[selectedApplication.status].color}`}>
                    {statusConfig[selectedApplication.status].label}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-medium font-questa">Submitted</p>
                  <p className="font-questa text-slate">{new Date(selectedApplication.submitted_at).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Section 1: Student Information */}
              <div className="border-b pb-4">
                <h3 className="font-ivry text-amber text-lg mb-4">Student Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Child's Full Name</p>
                    <p className="font-questa font-semibold text-slate">{selectedApplication.child_full_name}</p>
                  </div>
                  {selectedApplication.preferred_name && (
                    <div>
                      <p className="text-sm text-slate-medium font-questa">Preferred Name</p>
                      <p className="font-questa text-slate">{selectedApplication.preferred_name}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Date of Birth</p>
                    <p className="font-questa text-slate">{new Date(selectedApplication.date_of_birth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Primary Language(s)</p>
                    <p className="font-questa text-slate">{selectedApplication.primary_languages}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Attended Preschool Before</p>
                    <p className="font-questa text-slate">{selectedApplication.attended_preschool}</p>
                  </div>
                  {selectedApplication.current_school && (
                    <div>
                      <p className="text-sm text-slate-medium font-questa">Current School</p>
                      <p className="font-questa text-slate">{selectedApplication.current_school}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Primary Parent/Guardian */}
              <div className="border-b pb-4">
                <h3 className="font-ivry text-amber text-lg mb-4">Primary Parent/Guardian</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Name</p>
                    <p className="font-questa font-semibold text-slate">{selectedApplication.parent_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Relationship to Child</p>
                    <p className="font-questa text-slate">{selectedApplication.relationship_to_child}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Email</p>
                    <p className="font-questa text-slate">{selectedApplication.parent_email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Phone</p>
                    <p className="font-questa text-slate">{selectedApplication.parent_phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-slate-medium font-questa">Home Address</p>
                    <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.home_address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Preferred Communication</p>
                    <p className="font-questa text-slate">{selectedApplication.preferred_communication}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Portal Account Email</p>
                    <p className="font-questa text-slate text-sm">{selectedApplication.user_email}</p>
                  </div>
                </div>
              </div>

              {/* Section 3: Secondary Parent/Guardian (if exists) */}
              {selectedApplication.second_parent_name && (
                <div className="border-b pb-4">
                  <h3 className="font-ivry text-amber text-lg mb-4">Secondary Parent/Guardian</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-medium font-questa">Name</p>
                      <p className="font-questa font-semibold text-slate">{selectedApplication.second_parent_name}</p>
                    </div>
                    {selectedApplication.second_parent_email && (
                      <div>
                        <p className="text-sm text-slate-medium font-questa">Email</p>
                        <p className="font-questa text-slate">{selectedApplication.second_parent_email}</p>
                      </div>
                    )}
                    {selectedApplication.second_parent_phone && (
                      <div>
                        <p className="text-sm text-slate-medium font-questa">Phone</p>
                        <p className="font-questa text-slate">{selectedApplication.second_parent_phone}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Section 4: Previous Enrollment */}
              {selectedApplication.previous_enrollment && (
                <div className="border-b pb-4">
                  <h3 className="font-ivry text-amber text-lg mb-4">Previous Enrollment</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-medium font-questa">Previously Enrolled at Casita Azul?</p>
                      <p className="font-questa text-slate">{selectedApplication.previous_enrollment}</p>
                    </div>
                    {selectedApplication.previous_enrollment_details && (
                      <div className="col-span-2">
                        <p className="text-sm text-slate-medium font-questa">Enrollment Details</p>
                        <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.previous_enrollment_details}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Section 5: Family & Educational Background */}
              <div className="border-b pb-4">
                <h3 className="font-ivry text-amber text-lg mb-4">Family & Educational Background</h3>
                <div>
                  <p className="text-sm text-slate-medium font-questa">Languages Spoken at Home</p>
                  <p className="font-questa text-slate">{selectedApplication.languages_at_home}</p>
                </div>
              </div>

              {/* Section 6: Interest & Intent */}
              <div className="border-b pb-4">
                <h3 className="font-ivry text-amber text-lg mb-4">Interest & Intent</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Why are you interested in Spanish Horizons Academy?</p>
                    <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.interest_in_academy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-medium font-questa">What do you hope your child will gain from this experience?</p>
                    <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.hoping_for}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Are you seeking full-time Spanish language immersion?</p>
                    <p className="font-questa text-slate">{selectedApplication.seeking_full_time}</p>
                  </div>
                </div>
              </div>

              {/* Section 7: Looking Ahead */}
              <div className="border-b pb-4">
                <h3 className="font-ivry text-amber text-lg mb-4">Looking Ahead</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-medium font-questa">What excites you most about our program?</p>
                    <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.excited_about}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-medium font-questa">What values are important in your child's education?</p>
                    <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.values_important}</p>
                  </div>
                  {selectedApplication.interested_in_continuing && (
                    <div>
                      <p className="text-sm text-slate-medium font-questa">Interested in continuing with Spanish Horizons through elementary grades?</p>
                      <p className="font-questa text-slate">{selectedApplication.interested_in_continuing}</p>
                    </div>
                  )}
                  {selectedApplication.receive_updates && (
                    <div>
                      <p className="text-sm text-slate-medium font-questa">Receive updates about program expansion?</p>
                      <p className="font-questa text-slate">{selectedApplication.receive_updates}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 8: How They Found Us */}
              {selectedApplication.how_did_you_find && (
                <div className="border-b pb-4">
                  <h3 className="font-ivry text-amber text-lg mb-4">How They Found Us</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-medium font-questa">How did you hear about Spanish Horizons Academy?</p>
                      <p className="font-questa text-slate">{selectedApplication.how_did_you_find}</p>
                    </div>
                    {selectedApplication.how_did_you_find_other && (
                      <div>
                        <p className="text-sm text-slate-medium font-questa">Additional Details</p>
                        <p className="font-questa text-slate">{selectedApplication.how_did_you_find_other}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Section 9: Additional Information */}
              {selectedApplication.anything_else && (
                <div className="border-b pb-4">
                  <h3 className="font-ivry text-amber text-lg mb-4">Additional Information</h3>
                  <div>
                    <p className="text-sm text-slate-medium font-questa">Anything else you'd like us to know?</p>
                    <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.anything_else}</p>
                  </div>
                </div>
              )}

              {/* Admin Notes Section */}
              {(selectedApplication.admin_notes || selectedApplication.interview_notes || selectedApplication.interview_date) && (
                <div className="bg-amber/10 p-4 rounded-xl">
                  <h3 className="font-ivry text-amber text-lg mb-4">Admin Notes</h3>
                  <div className="space-y-4">
                    {selectedApplication.interview_date && (
                      <div>
                        <p className="text-sm text-slate-medium font-questa">Interview Date</p>
                        <p className="font-questa text-slate">{new Date(selectedApplication.interview_date).toLocaleString()}</p>
                      </div>
                    )}
                    {selectedApplication.interview_notes && (
                      <div>
                        <p className="text-sm text-slate-medium font-questa">Interview Notes</p>
                        <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.interview_notes}</p>
                      </div>
                    )}
                    {selectedApplication.admin_notes && (
                      <div>
                        <p className="text-sm text-slate-medium font-questa">General Notes</p>
                        <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.admin_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Email Composer Modal */}
      <AdminEmailComposer
        open={isEmailModalOpen}
        onOpenChange={setIsEmailModalOpen}
        recipientEmail={emailRecipient.email}
        parentName={emailRecipient.parentName}
        childName={emailRecipient.childName}
      />

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={(open) => {
        setIsEditModalOpen(open)
        if (!open) setShowConfirmation(false)
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-ivry text-slate text-xl">Update Application Status</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-5">
              {/* Application Info */}
              <div className="bg-slate/5 p-4 rounded-xl">
                <p className="font-questa font-bold text-lg text-slate">{selectedApplication.child_full_name}</p>
                <p className="text-sm text-slate-medium">{selectedApplication.parent_name} • {selectedApplication.parent_email}</p>
              </div>

              {/* Status Selector */}
              <div>
                <p className="text-sm text-slate-medium font-questa mb-2">Select New Status</p>
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none ${
                    editData.status === 'submitted' ? 'bg-amber' :
                    editData.status === 'under_review' ? 'bg-purple-500' :
                    editData.status === 'interview_pending' ? 'bg-green-500' :
                    editData.status === 'interview_scheduled' ? 'bg-blue-500' :
                    editData.status === 'admitted' ? 'bg-green-600' :
                    editData.status === 'waitlist' ? 'bg-yellow-500' :
                    'bg-gray-500'
                  }`}></div>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    className="w-full pl-10 pr-10 py-3 border-2 border-slate/20 rounded-xl font-questa font-medium text-slate bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-all hover:border-amber/50"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23F5A623' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center'
                    }}
                  >
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="interview_pending">Open Interview</option>
                    <option value="interview_scheduled">Interview Scheduled</option>
                    <option value="admitted">Admitted</option>
                    <option value="waitlist">Waitlist</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>

              {/* Show interview date if scheduled (read-only - set by client) */}
              {selectedApplication.interview_date && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                  <p className="text-sm text-blue-600 font-questa mb-1">Scheduled Interview</p>
                  <p className="font-questa font-semibold text-slate">
                    {new Date(selectedApplication.interview_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {' at '}
                    {new Date(selectedApplication.interview_date).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-medium font-questa mb-2">Interview Notes</p>
                  <Textarea
                    value={editData.interview_notes}
                    onChange={(e) => setEditData({ ...editData, interview_notes: e.target.value })}
                    placeholder="Notes about the interview..."
                    className="rounded-xl resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <p className="text-sm text-slate-medium font-questa mb-2">Admin Notes</p>
                  <Textarea
                    value={editData.admin_notes}
                    onChange={(e) => setEditData({ ...editData, admin_notes: e.target.value })}
                    placeholder="Internal notes..."
                    className="rounded-xl resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {!showConfirmation ? (
                <div className="flex justify-between pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
                    className="rounded-xl px-6"
                  >
                    Cancel
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handleSaveNotes}
                      disabled={savingNotes}
                      className="rounded-xl px-4 border-slate/30 hover:bg-slate/10"
                    >
                      {savingNotes ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {savingNotes ? 'Saving...' : 'Save Notes'}
                    </Button>
                    <Button
                      onClick={handleRequestUpdate}
                      disabled={editData.status === selectedApplication.status}
                      className="bg-amber hover:bg-golden hover:text-slate rounded-xl px-6"
                    >
                      Update Status
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-t pt-4 mt-4">
                  <div className="bg-amber/10 border border-amber/30 rounded-xl p-4 mb-4">
                    <p className="font-questa font-semibold text-slate mb-2">Confirm Status Change</p>
                    <p className="text-sm text-slate-medium">
                      Are you sure you want to change <strong>{selectedApplication.child_full_name}</strong>'s status from{' '}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${statusConfig[selectedApplication.status].color}`}>
                        {statusConfig[selectedApplication.status].label}
                      </span>
                      {' '}to{' '}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${statusConfig[editData.status as keyof typeof statusConfig].color}`}>
                        {statusConfig[editData.status as keyof typeof statusConfig].label}
                      </span>
                      ?
                    </p>
                    {editData.status !== selectedApplication.status && ['admitted', 'rejected', 'declined'].includes(editData.status) && (
                      <p className="text-xs text-amber mt-2">
                        <AlertCircle className="inline h-3 w-3 mr-1" />
                        An email notification will be sent to the parent.
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={handleCancelConfirmation}
                      className="rounded-xl px-6"
                    >
                      Go Back
                    </Button>
                    <Button
                      onClick={handleConfirmUpdate}
                      disabled={updating}
                      className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-6"
                    >
                      {updating ? 'Updating...' : 'Yes, Confirm Change'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
