"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  CalendarDays
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import AdminAvailabilityCalendar from '@/components/admin-availability-calendar'

interface Application {
  id: string
  user_id: string
  user_email: string
  status: 'submitted' | 'interview_scheduled' | 'admitted' | 'waitlist' | 'rejected' | 'declined' | 'withdrawn'
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
}

const statusConfig = {
  submitted: {
    label: 'Submitted',
    color: 'bg-amber',
    textColor: 'text-amber',
  },
  interview_scheduled: {
    label: 'Interview Scheduled',
    color: 'bg-blue-500',
    textColor: 'text-blue-500',
  },
  admitted: {
    label: 'Admitted',
    color: 'bg-green-500',
    textColor: 'text-green-500',
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
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [activeTab, setActiveTab] = useState<'applications' | 'calendar'>('applications')
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
        </div>

        {activeTab === 'calendar' ? (
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-slate/40" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 sm:pl-10 rounded-xl text-sm sm:text-base h-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto pl-9 pr-8 py-2 border rounded-xl font-questa text-slate bg-white appearance-none cursor-pointer text-sm h-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center'
              }}
            >
              <option value="all">All Statuses</option>
              <option value="submitted">🟡 Submitted</option>
              <option value="interview_scheduled">🔵 Interview</option>
              <option value="admitted">🟢 Admitted</option>
              <option value="waitlist">🟠 Waitlist</option>
              <option value="rejected">🔴 Rejected</option>
              <option value="declined">⚫ Declined</option>
              <option value="withdrawn">⬜ Withdrawn</option>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-ivry text-slate">Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-medium font-questa">Child's Name</p>
                  <p className="font-questa font-semibold text-slate">{selectedApplication.child_full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-medium font-questa">Date of Birth</p>
                  <p className="font-questa text-slate">{new Date(selectedApplication.date_of_birth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-medium font-questa">Parent Name</p>
                  <p className="font-questa text-slate">{selectedApplication.parent_name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-medium font-questa">Email</p>
                  <p className="font-questa text-slate">{selectedApplication.parent_email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-medium font-questa">Phone</p>
                  <p className="font-questa text-slate">{selectedApplication.parent_phone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-medium font-questa">Portal Account</p>
                  <p className="font-questa text-slate">{selectedApplication.user_email}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-medium font-questa">Home Address</p>
                <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.home_address}</p>
              </div>

              <div>
                <p className="text-sm text-slate-medium font-questa">Languages at Home</p>
                <p className="font-questa text-slate">{selectedApplication.languages_at_home}</p>
              </div>

              <div>
                <p className="text-sm text-slate-medium font-questa">Interest in Academy</p>
                <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.interest_in_academy}</p>
              </div>

              <div>
                <p className="text-sm text-slate-medium font-questa">Hoping For</p>
                <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.hoping_for}</p>
              </div>

              <div>
                <p className="text-sm text-slate-medium font-questa">What Excites Them</p>
                <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.excited_about}</p>
              </div>

              <div>
                <p className="text-sm text-slate-medium font-questa">Important Values</p>
                <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.values_important}</p>
              </div>

              {selectedApplication.admin_notes && (
                <div className="bg-amber/10 p-4 rounded-xl">
                  <p className="text-sm text-slate-medium font-questa">Admin Notes</p>
                  <p className="font-questa text-slate whitespace-pre-wrap">{selectedApplication.admin_notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

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
                <p className="text-sm text-slate-medium font-questa mb-3">Select New Status</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditData({ ...editData, status: 'submitted' })}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      editData.status === 'submitted'
                        ? 'bg-amber text-white ring-2 ring-amber ring-offset-2'
                        : 'bg-amber/10 text-amber hover:bg-amber/20'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
                    Submitted
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditData({ ...editData, status: 'interview_scheduled' })}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      editData.status === 'interview_scheduled'
                        ? 'bg-blue-500 text-white ring-2 ring-blue-500 ring-offset-2'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
                    Interview
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditData({ ...editData, status: 'admitted' })}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      editData.status === 'admitted'
                        ? 'bg-green-500 text-white ring-2 ring-green-500 ring-offset-2'
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
                    Admitted
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditData({ ...editData, status: 'waitlist' })}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      editData.status === 'waitlist'
                        ? 'bg-yellow-500 text-white ring-2 ring-yellow-500 ring-offset-2'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
                    Waitlist
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditData({ ...editData, status: 'rejected' })}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      editData.status === 'rejected'
                        ? 'bg-red-500 text-white ring-2 ring-red-500 ring-offset-2'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
                    Rejected
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditData({ ...editData, status: 'declined' })}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      editData.status === 'declined'
                        ? 'bg-gray-500 text-white ring-2 ring-gray-500 ring-offset-2'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
                    Declined
                  </button>
                </div>
              </div>

              {editData.status === 'interview_scheduled' && (
                <div>
                  <p className="text-sm text-slate-medium font-questa mb-2">Interview Date & Time</p>
                  <Input
                    type="datetime-local"
                    value={editData.interview_date}
                    onChange={(e) => setEditData({ ...editData, interview_date: e.target.value })}
                    className="rounded-xl"
                  />
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
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
                    className="rounded-xl px-6"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleRequestUpdate}
                    disabled={editData.status === selectedApplication.status}
                    className="bg-amber hover:bg-golden hover:text-slate rounded-xl px-6"
                  >
                    Update Status
                  </Button>
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
