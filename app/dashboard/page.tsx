"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  ChevronRight,
  AlertCircle,
  Plus,
  Users,
  Eye,
  Home,
  MessageSquare,
  RefreshCw,
  CalendarPlus,
  X,
  XCircle,
  CalendarX,
  CalendarClock
} from 'lucide-react'
import InterviewBookingCalendar from '@/components/interview-booking-calendar'

interface Application {
  id: string
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
  // Section 3: Previous Enrollment
  previous_enrollment: string[]
  previous_enrollment_details: string | null
  // Section 4: Family & Educational Background
  languages_at_home: string
  interest_in_academy: string
  hoping_for: string
  // Section 5: Interest & Intent
  seeking_full_time: string
  excited_about: string
  values_important: string
  // Section 6: Looking Ahead
  interested_in_continuing: boolean
  receive_updates: boolean
  // Section 7: How Did You Find Us
  how_did_you_find: string[]
  how_did_you_find_other: string | null
  // Section 8: Anything Else
  anything_else: string | null
  // Metadata
  submitted_at: string
  updated_at: string
  interview_date?: string
  interview_notes?: string
  admin_notes?: string
}

const statusConfig = {
  submitted: {
    label: 'Application Submitted',
    color: 'bg-amber',
    textColor: 'text-amber',
    bgLight: 'bg-amber/10',
    icon: FileText,
    description: 'Your application has been received and is pending review.'
  },
  under_review: {
    label: 'Under Review',
    color: 'bg-purple-500',
    textColor: 'text-purple-500',
    bgLight: 'bg-purple-50',
    icon: Clock,
    description: 'Your application is currently being reviewed by our admissions team.'
  },
  interview_pending: {
    label: 'Interview Available',
    color: 'bg-green-500',
    textColor: 'text-green-500',
    bgLight: 'bg-green-50',
    icon: CalendarPlus,
    description: 'Great news! Your application has been approved. Please schedule your interview.'
  },
  interview_scheduled: {
    label: 'Interview Scheduled',
    color: 'bg-blue-500',
    textColor: 'text-blue-500',
    bgLight: 'bg-blue-50',
    icon: Calendar,
    description: 'Great news! Your interview has been scheduled.'
  },
  admitted: {
    label: 'Admitted',
    color: 'bg-green-500',
    textColor: 'text-green-500',
    bgLight: 'bg-green-50',
    icon: CheckCircle,
    description: 'Congratulations! Your child has been admitted to Spanish Horizons Academy.'
  },
  waitlist: {
    label: 'Waitlist',
    color: 'bg-golden',
    textColor: 'text-golden',
    bgLight: 'bg-golden/10',
    icon: Clock,
    description: 'Your child has been placed on our waitlist. We will notify you if a spot becomes available.'
  },
  rejected: {
    label: 'Not Accepted',
    color: 'bg-red-500',
    textColor: 'text-red-500',
    bgLight: 'bg-red-50',
    icon: AlertCircle,
    description: 'Unfortunately, we are unable to offer admission at this time.'
  },
  declined: {
    label: 'Declined',
    color: 'bg-gray-500',
    textColor: 'text-gray-500',
    bgLight: 'bg-gray-50',
    icon: AlertCircle,
    description: 'This application has been declined.'
  },
  withdrawn: {
    label: 'Withdrawn',
    color: 'bg-gray-400',
    textColor: 'text-gray-400',
    bgLight: 'bg-gray-50',
    icon: X,
    description: 'You have withdrawn this application.'
  }
}

function ApplicationCard({ application, onViewDetails, onBookInterview, onCancel, onCancelInterview, onRescheduleInterview }: { application: Application; onViewDetails: (app: Application) => void; onBookInterview: (app: Application) => void; onCancel: (app: Application) => void; onCancelInterview: (app: Application) => void; onRescheduleInterview: (app: Application) => void }) {
  const status = statusConfig[application.status]
  const StatusIcon = status.icon

  return (
    <Card className="overflow-hidden">
      <div className={`${status.color} p-3 sm:p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <div className="bg-white/20 rounded-full p-1.5 sm:p-2 mr-2 sm:mr-3 shrink-0">
              <StatusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-ivry font-bold text-white truncate">{application.child_full_name}</h3>
              <p className="text-white/80 text-xs sm:text-sm font-questa">{status.label}</p>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-3 sm:p-4">
        <p className="text-slate-medium font-questa text-xs sm:text-sm mb-3 sm:mb-4">{status.description}</p>

        {/* Progress Steps */}
        {application.status === 'withdrawn' ? (
          <div className="flex items-center justify-center mb-3 sm:mb-4 py-2">
            <div className="bg-gray-100 text-gray-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-questa">
              Application Withdrawn
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs ${
                ['submitted', 'under_review', 'interview_pending', 'interview_scheduled', 'admitted', 'waitlist', 'rejected', 'declined'].includes(application.status)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <p className="text-[10px] sm:text-xs font-questa mt-1">Submitted</p>
            </div>
            <div className={`flex-1 h-0.5 mx-1 ${
              ['under_review', 'interview_pending', 'interview_scheduled', 'admitted', 'waitlist', 'rejected', 'declined'].includes(application.status)
                ? 'bg-green-500'
                : 'bg-gray-200'
            }`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs ${
                ['under_review', 'interview_pending', 'interview_scheduled', 'admitted', 'waitlist', 'rejected', 'declined'].includes(application.status)
                  ? application.status === 'under_review' ? 'bg-purple-500 text-white' : 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <p className="text-[10px] sm:text-xs font-questa mt-1">Review</p>
            </div>
            <div className={`flex-1 h-0.5 mx-1 ${
              ['interview_pending', 'interview_scheduled', 'admitted', 'waitlist', 'rejected', 'declined'].includes(application.status)
                ? 'bg-green-500'
                : 'bg-gray-200'
            }`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs ${
                ['interview_scheduled', 'admitted', 'waitlist', 'rejected', 'declined'].includes(application.status)
                  ? 'bg-green-500 text-white'
                  : application.status === 'interview_pending' ? 'bg-green-500 text-white animate-pulse' : 'bg-gray-200 text-gray-400'
              }`}>
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <p className="text-[10px] sm:text-xs font-questa mt-1">Interview</p>
            </div>
            <div className={`flex-1 h-0.5 mx-1 ${
              ['admitted', 'waitlist', 'rejected', 'declined'].includes(application.status)
                ? 'bg-green-500'
                : 'bg-gray-200'
            }`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs ${
                ['admitted', 'waitlist'].includes(application.status)
                  ? 'bg-green-500 text-white'
                  : ['rejected', 'declined'].includes(application.status)
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-400'
              }`}>
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <p className="text-[10px] sm:text-xs font-questa mt-1">Decision</p>
            </div>
          </div>
        )}

        {/* Interview Details */}
        {application.status === 'interview_scheduled' && application.interview_date && (
          <div className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200 mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm font-questa font-semibold text-slate mb-1">Interview Scheduled</p>
            <p className="text-xs sm:text-sm text-slate-medium font-questa">
              <Calendar className="h-3 w-3 inline mr-1" />
              {new Date(application.interview_date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            {application.interview_notes && (
              <p className="text-xs text-slate-medium font-questa mt-1 sm:mt-2 line-clamp-2">{application.interview_notes}</p>
            )}
            <div className="flex gap-2 mt-2 sm:mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRescheduleInterview(application)}
                className="flex-1 text-blue-600 border-blue-300 hover:bg-blue-100 rounded-lg text-xs"
              >
                <CalendarClock className="h-3 w-3 mr-1" />
                Reschedule
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCancelInterview(application)}
                className="flex-1 text-red-500 border-red-300 hover:bg-red-50 rounded-lg text-xs"
              >
                <CalendarX className="h-3 w-3 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Details */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm mb-3 sm:mb-4">
          <div>
            <p className="text-slate-medium font-questa">Date of Birth</p>
            <p className="font-questa text-slate">
              {new Date(application.date_of_birth).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="text-slate-medium font-questa">Submitted</p>
            <p className="font-questa text-slate">
              {new Date(application.submitted_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Book Interview Button - Only show when admin has approved for interview */}
        {application.status === 'interview_pending' && (
          <Button
            onClick={() => onBookInterview(application)}
            size="sm"
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl font-questa mb-2 text-xs sm:text-sm"
          >
            <CalendarPlus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Book Interview
          </Button>
        )}

        {/* View Details Button */}
        <Button
          variant="outline"
          onClick={() => onViewDetails(application)}
          size="sm"
          className="w-full border-slate/30 text-slate hover:bg-slate/5 rounded-xl font-questa mb-2 text-xs sm:text-sm"
        >
          <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          View Details
        </Button>

        {/* Cancel/Withdraw Button - Only show for active applications */}
        {!['admitted', 'rejected', 'declined', 'withdrawn'].includes(application.status) && (
          <Button
            variant="ghost"
            onClick={() => onCancel(application)}
            size="sm"
            className="w-full text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl font-questa text-xs sm:text-sm"
          >
            <XCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Withdraw
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

function ApplicationDetailsModal({ application, isOpen, onClose }: { application: Application | null; isOpen: boolean; onClose: () => void }) {
  if (!application) return null

  const status = statusConfig[application.status]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <DialogHeader className="pb-2">
          <DialogTitle className="font-ivry text-lg sm:text-2xl text-slate flex items-center">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-amber mr-2 sm:mr-3 shrink-0" />
            <span className="truncate">{application.child_full_name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Status Badge */}
          <div className={`${status.bgLight} p-3 sm:p-4 rounded-xl border-l-4 ${status.color.replace('bg-', 'border-')}`}>
            <div className="flex items-center">
              <status.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${status.textColor} mr-2 shrink-0`} />
              <span className={`font-questa font-semibold text-sm sm:text-base ${status.textColor}`}>{status.label}</span>
            </div>
            <p className="text-slate-medium font-questa text-xs sm:text-sm mt-1">{status.description}</p>
          </div>

          {/* Interview Info */}
          {application.status === 'interview_scheduled' && application.interview_date && (
            <div className="bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-200">
              <h3 className="font-ivry font-bold text-slate mb-2 flex items-center text-sm sm:text-base">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2 shrink-0" />
                Interview Details
              </h3>
              <p className="text-slate font-questa text-sm sm:text-base">
                {new Date(application.interview_date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              {application.interview_notes && (
                <p className="text-slate-medium font-questa mt-2 text-xs sm:text-sm">{application.interview_notes}</p>
              )}
            </div>
          )}

          {/* Child Information */}
          <div>
            <h3 className="font-ivry font-bold text-slate mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-amber mr-2 shrink-0" />
              Child Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <p className="text-slate-medium font-questa">Full Name</p>
                <p className="font-questa text-slate">{application.child_full_name}</p>
              </div>
              {application.preferred_name && (
                <div>
                  <p className="text-slate-medium font-questa">Preferred Name</p>
                  <p className="font-questa text-slate">{application.preferred_name}</p>
                </div>
              )}
              <div>
                <p className="text-slate-medium font-questa">Date of Birth</p>
                <p className="font-questa text-slate">
                  {new Date(application.date_of_birth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-slate-medium font-questa">Primary Languages</p>
                <p className="font-questa text-slate">{application.primary_languages}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa">Previous Preschool/Kindergarten</p>
                <p className="font-questa text-slate">{application.attended_preschool === 'yes' ? 'Yes' : 'No'}</p>
              </div>
              {application.current_school && (
                <div>
                  <p className="text-slate-medium font-questa">Current School</p>
                  <p className="font-questa text-slate">{application.current_school}</p>
                </div>
              )}
            </div>
          </div>

          {/* Parent Information */}
          <div>
            <h3 className="font-ivry font-bold text-slate mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-amber mr-2 shrink-0" />
              Parent/Guardian Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <p className="text-slate-medium font-questa">Name</p>
                <p className="font-questa text-slate">{application.parent_name}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa">Relationship</p>
                <p className="font-questa text-slate">{application.relationship_to_child}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa">Email</p>
                <p className="font-questa text-slate">{application.parent_email}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa">Phone</p>
                <p className="font-questa text-slate">{application.parent_phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-medium font-questa">Home Address</p>
                <p className="font-questa text-slate">{application.home_address}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa">Preferred Communication</p>
                <p className="font-questa text-slate capitalize">{application.preferred_communication}</p>
              </div>
            </div>

            {(application.second_parent_name || application.second_parent_email || application.second_parent_phone) && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate/10">
                <p className="text-slate-medium font-questa font-semibold mb-2 text-xs sm:text-sm">Second Parent/Guardian</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  {application.second_parent_name && (
                    <div>
                      <p className="text-slate-medium font-questa">Name</p>
                      <p className="font-questa text-slate">{application.second_parent_name}</p>
                    </div>
                  )}
                  {application.second_parent_email && (
                    <div>
                      <p className="text-slate-medium font-questa">Email</p>
                      <p className="font-questa text-slate">{application.second_parent_email}</p>
                    </div>
                  )}
                  {application.second_parent_phone && (
                    <div>
                      <p className="text-slate-medium font-questa">Phone</p>
                      <p className="font-questa text-slate">{application.second_parent_phone}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Previous Enrollment */}
          {(application.previous_enrollment?.length > 0 || application.previous_enrollment_details) && (
            <div>
              <h3 className="font-ivry font-bold text-slate mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-amber mr-2 shrink-0" />
                Previous Enrollment
              </h3>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                {application.previous_enrollment?.length > 0 && (
                  <div>
                    <p className="text-slate-medium font-questa font-semibold">Previous Programs</p>
                    <ul className="font-questa text-slate list-disc list-inside">
                      {application.previous_enrollment.map((program, index) => (
                        <li key={index}>
                          {program === 'casita-azul' && 'Casita Azul Spanish Immersion Program'}
                          {program === 'amanecer' && 'Amanecer Academy'}
                          {program === 'none' && 'No previous enrollment in our network'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {application.previous_enrollment_details && (
                  <div>
                    <p className="text-slate-medium font-questa font-semibold">Additional Details</p>
                    <p className="font-questa text-slate">{application.previous_enrollment_details}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Family & Educational Background */}
          <div>
            <h3 className="font-ivry font-bold text-slate mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-amber mr-2 shrink-0" />
              Family & Educational Background
            </h3>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <div>
                <p className="text-slate-medium font-questa font-semibold">Languages Spoken at Home</p>
                <p className="font-questa text-slate">{application.languages_at_home}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa font-semibold">Interest in Spanish Horizons Academy</p>
                <p className="font-questa text-slate whitespace-pre-wrap">{application.interest_in_academy}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa font-semibold">Hopes for Elementary School Experience</p>
                <p className="font-questa text-slate whitespace-pre-wrap">{application.hoping_for}</p>
              </div>
            </div>
          </div>

          {/* Interest & Intent */}
          <div>
            <h3 className="font-ivry font-bold text-slate mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber mr-2 shrink-0" />
              Interest & Intent
            </h3>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <div>
                <p className="text-slate-medium font-questa font-semibold">Seeking Full-Time Enrollment</p>
                <p className="font-questa text-slate capitalize">{application.seeking_full_time}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa font-semibold">Excitement About Spanish-Forward Learning</p>
                <p className="font-questa text-slate whitespace-pre-wrap">{application.excited_about}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa font-semibold">Important Values in School Community</p>
                <p className="font-questa text-slate whitespace-pre-wrap">{application.values_important}</p>
              </div>
            </div>
          </div>

          {/* Looking Ahead */}
          <div>
            <h3 className="font-ivry font-bold text-slate mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-amber mr-2 shrink-0" />
              Looking Ahead
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded mr-2 flex items-center justify-center ${application.interested_in_continuing ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {application.interested_in_continuing ? <CheckCircle className="h-3 w-3" /> : <X className="h-3 w-3" />}
                </div>
                <p className="font-questa text-slate">Interested in continuing as additional grade levels open</p>
              </div>
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded mr-2 flex items-center justify-center ${application.receive_updates ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {application.receive_updates ? <CheckCircle className="h-3 w-3" /> : <X className="h-3 w-3" />}
                </div>
                <p className="font-questa text-slate">Would like to receive updates about future programs & events</p>
              </div>
            </div>
          </div>

          {/* How Did You Find Us */}
          {application.how_did_you_find?.length > 0 && (
            <div>
              <h3 className="font-ivry font-bold text-slate mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-amber mr-2 shrink-0" />
                How They Found Us
              </h3>
              <div className="text-xs sm:text-sm">
                <ul className="font-questa text-slate list-disc list-inside space-y-1">
                  {application.how_did_you_find.map((source, index) => (
                    <li key={index}>
                      {source === 'casita-amanecer' && 'Casita Azul or Amanecer Academy'}
                      {source === 'word-of-mouth' && 'Word of mouth'}
                      {source === 'social-media' && 'Social media'}
                      {source === 'online-search' && 'Online search'}
                      {source === 'community-event' && 'Community event'}
                      {source === 'other' && `Other: ${application.how_did_you_find_other || 'Not specified'}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Anything Else */}
          {application.anything_else && (
            <div>
              <h3 className="font-ivry font-bold text-slate mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-amber mr-2 shrink-0" />
                Additional Information
              </h3>
              <div className="text-xs sm:text-sm">
                <p className="font-questa text-slate whitespace-pre-wrap">{application.anything_else}</p>
              </div>
            </div>
          )}

          {/* Application Metadata */}
          <div className="bg-slate/5 p-3 sm:p-4 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-xs sm:text-sm">
              <div>
                <p className="text-slate-medium font-questa">Submitted</p>
                <p className="font-questa text-slate">
                  {new Date(application.submitted_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-slate-medium font-questa">Last Updated</p>
                <p className="font-questa text-slate">
                  {new Date(application.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-medium font-questa mt-2 truncate">ID: {application.id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function DashboardPage() {
  const { user, loading: authLoading, signOut, openAuthModal } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingApplication, setBookingApplication] = useState<Application | null>(null)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [cancellingApplication, setCancellingApplication] = useState<Application | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isCancelInterviewModalOpen, setIsCancelInterviewModalOpen] = useState(false)
  const [cancellingInterviewApp, setCancellingInterviewApp] = useState<Application | null>(null)
  const [isCancellingInterview, setIsCancellingInterview] = useState(false)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [reschedulingApp, setReschedulingApp] = useState<Application | null>(null)
  const router = useRouter()

  const handleViewDetails = (app: Application) => {
    setSelectedApplication(app)
    setIsDetailsModalOpen(true)
  }

  const handleBookInterview = (app: Application) => {
    setBookingApplication(app)
    setIsBookingModalOpen(true)
  }

  const handleInterviewBooked = async (interviewDate: string) => {
    // Update the application in the list
    const bookedAppId = bookingApplication?.id
    setApplications(apps =>
      apps.map(app =>
        app.id === bookedAppId
          ? { ...app, status: 'interview_scheduled' as const, interview_date: interviewDate }
          : app
      )
    )

    // Clear booking state to prevent accidental reschedule
    setBookingApplication(null)

    // Close modal after a short delay to show success message
    setTimeout(() => {
      setIsBookingModalOpen(false)
      // Refresh applications from server to ensure data is in sync
      handleRefresh()
    }, 2000)
  }

  const handleCancelApplication = (app: Application) => {
    setCancellingApplication(app)
    setIsCancelModalOpen(true)
  }

  const handleCancelInterview = (app: Application) => {
    setCancellingInterviewApp(app)
    setIsCancelInterviewModalOpen(true)
  }

  const handleRescheduleInterview = (app: Application) => {
    // Prevent reschedule if booking modal is open or we just finished booking
    if (isBookingModalOpen || bookingApplication) {
      console.log('Reschedule blocked - booking in progress')
      return
    }

    // Show confirmation modal
    setReschedulingApp(app)
    setIsRescheduleModalOpen(true)
  }

  const confirmRescheduleInterview = async () => {
    if (!reschedulingApp) return

    setIsRescheduleModalOpen(false)

    // First cancel the current interview, then open booking modal
    setIsCancellingInterview(true)
    try {
      const response = await fetch('/api/admissions/cancel-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: reschedulingApp.id })
      })

      if (response.ok) {
        // Update application in list
        setApplications(apps =>
          apps.map(a =>
            a.id === reschedulingApp.id
              ? { ...a, status: 'interview_pending' as const, interview_date: undefined }
              : a
          )
        )
        // Open booking modal for rescheduling
        setBookingApplication({ ...reschedulingApp, status: 'interview_pending' as const, interview_date: undefined })
        setIsBookingModalOpen(true)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to reschedule interview')
      }
    } catch (error) {
      console.error('Error rescheduling interview:', error)
      setError('Failed to reschedule interview')
    } finally {
      setIsCancellingInterview(false)
      setReschedulingApp(null)
    }
  }

  const confirmCancelInterview = async () => {
    if (!cancellingInterviewApp) return

    setIsCancellingInterview(true)
    try {
      const response = await fetch('/api/admissions/cancel-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: cancellingInterviewApp.id })
      })

      if (response.ok) {
        setApplications(apps =>
          apps.map(app =>
            app.id === cancellingInterviewApp.id
              ? { ...app, status: 'interview_pending' as const, interview_date: undefined }
              : app
          )
        )
        setIsCancelInterviewModalOpen(false)
        setCancellingInterviewApp(null)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to cancel interview')
      }
    } catch (error) {
      console.error('Error cancelling interview:', error)
      setError('Failed to cancel interview')
    } finally {
      setIsCancellingInterview(false)
    }
  }

  const confirmCancelApplication = async () => {
    if (!cancellingApplication) return

    setIsCancelling(true)
    try {
      const response = await fetch('/api/admissions/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: cancellingApplication.id })
      })

      if (response.ok) {
        setApplications(apps =>
          apps.map(app =>
            app.id === cancellingApplication.id
              ? { ...app, status: 'withdrawn' as const }
              : app
          )
        )
        setIsCancelModalOpen(false)
        setCancellingApplication(null)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to withdraw application')
      }
    } catch (error) {
      console.error('Error cancelling application:', error)
      setError('Failed to withdraw application')
    } finally {
      setIsCancelling(false)
    }
  }

  const handleRefresh = async () => {
    if (!user) return
    setIsRefreshing(true)
    try {
      const response = await fetch('/api/admissions/application')
      const data = await response.json()
      if (response.ok) {
        setApplications(data.applications || [])
      }
    } catch (err) {
      console.error('Failed to refresh:', err)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    if (!authLoading && !user) {
      openAuthModal('login')
    }
  }, [authLoading, user, openAuthModal])

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return

      try {
        const response = await fetch('/api/admissions/application')
        const data = await response.json()

        if (response.ok) {
          setApplications(data.applications || [])
        } else if (response.status !== 401) {
          setError(data.error)
        }
      } catch (err) {
        setError('Failed to load application data')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchApplications()
    } else if (!authLoading) {
      setLoading(false)
    }
  }, [user, authLoading])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-amber border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-medium font-questa">Loading your dashboard...</p>
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
            <h2 className="text-xl font-ivry font-bold text-slate mb-2">Sign In Required</h2>
            <p className="text-slate-medium font-questa mb-6">
              Please sign in to access your Family Portal and view your application status.
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-ivry font-bold text-white">Family Portal</h1>
              <p className="text-white/70 font-questa text-sm sm:text-base mt-0.5 truncate">{user?.email}</p>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              size="sm"
              className="border-amber/50 text-amber hover:bg-amber hover:text-white rounded-xl font-questa shrink-0"
            >
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {error && (
          <Card className="mb-4 sm:mb-6 border-red-200 bg-red-50">
            <CardContent className="p-3 sm:p-4">
              <p className="text-red-600 font-questa text-sm sm:text-base">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Header with Add Child Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex items-center">
            <Users className="h-5 sm:h-6 w-5 sm:w-6 text-amber mr-2" />
            <h2 className="text-lg sm:text-xl font-ivry font-bold text-slate">
              {applications.length === 0 ? 'Your Applications' : `Your Children (${applications.length})`}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {applications.length > 0 && (
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
                size="sm"
                className="border-slate/30 text-slate hover:bg-slate/5 rounded-xl font-questa"
              >
                <RefreshCw className={`h-4 w-4 sm:mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            )}
            <Link href="/admissions/application">
              <Button size="sm" className="bg-amber hover:bg-golden hover:text-slate text-white rounded-xl font-questa">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add Child</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </Link>
          </div>
        </div>

        {applications.length === 0 ? (
          /* No Applications Yet */
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-16 w-16 text-slate/30 mx-auto mb-4" />
              <h2 className="text-xl font-ivry font-bold text-slate mb-2">No Applications Found</h2>
              <p className="text-slate-medium font-questa mb-6">
                You haven't submitted an application yet. Start your application for Kindergarten Fall 2026.
              </p>
              <Link href="/admissions/application">
                <Button className="bg-amber hover:bg-golden hover:text-slate text-white rounded-xl font-questa">
                  Start Application
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          /* Applications Grid */
          <div className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
              {applications.map((app) => (
                <ApplicationCard key={app.id} application={app} onViewDetails={handleViewDetails} onBookInterview={handleBookInterview} onCancel={handleCancelApplication} onCancelInterview={handleCancelInterview} onRescheduleInterview={handleRescheduleInterview} />
              ))}
            </div>

            {/* Add Another Child Card */}
            <Card className="border-dashed border-2 border-slate/20 bg-slate/5">
              <CardContent className="p-6 text-center">
                <Plus className="h-10 w-10 text-slate/30 mx-auto mb-3" />
                <h3 className="font-ivry font-bold text-slate mb-2">Add Another Child</h3>
                <p className="text-slate-medium font-questa text-sm mb-4">
                  Submit an application for another child in your family.
                </p>
                <Link href="/admissions/application">
                  <Button variant="outline" className="border-slate/30 text-slate hover:bg-slate hover:text-white rounded-xl font-questa">
                    <Plus className="h-4 w-4 mr-2" />
                    New Application
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-slate/5">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-ivry font-bold text-slate mb-2 sm:mb-4 text-base sm:text-lg">Questions?</h3>
                <p className="text-slate-medium font-questa mb-3 sm:mb-4 text-sm sm:text-base">
                  Contact us about your applications or the admissions process.
                </p>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <a href="mailto:infospanishhorizons@casitaazulpdx.com" className="flex items-center text-amber hover:text-golden transition-colors">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0" />
                    <span className="font-questa text-xs sm:text-base truncate">infospanishhorizons@casitaazulpdx.com</span>
                  </a>
                  <a href="tel:5039169758" className="flex items-center text-amber hover:text-golden transition-colors">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0" />
                    <span className="font-questa text-sm sm:text-base">(503) 916-9758</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      <ApplicationDetailsModal
        application={selectedApplication}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      {/* Interview Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] max-w-2xl max-h-[90vh] overflow-y-auto p-3 sm:p-6 rounded-xl sm:rounded-2xl">
          <DialogHeader className="pb-2">
            <DialogTitle className="font-ivry text-lg sm:text-2xl text-slate flex items-center">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2 sm:mr-3 shrink-0" />
              Schedule Interview
            </DialogTitle>
          </DialogHeader>
          {bookingApplication && (
            <InterviewBookingCalendar
              applicationId={bookingApplication.id}
              childName={bookingApplication.child_full_name}
              onBooked={handleInterviewBooked}
              onClose={() => setIsBookingModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel/Withdraw Confirmation Modal */}
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-md p-4 sm:p-6 rounded-xl">
          <DialogHeader className="pb-2">
            <DialogTitle className="font-ivry text-lg sm:text-xl text-slate flex items-center">
              <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 mr-2 sm:mr-3 shrink-0" />
              Withdraw Application
            </DialogTitle>
          </DialogHeader>
          {cancellingApplication && (
            <div className="py-2 sm:py-4">
              <p className="text-slate-medium font-questa mb-3 sm:mb-4 text-sm sm:text-base">
                Are you sure you want to withdraw the application for <strong>{cancellingApplication.child_full_name}</strong>?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                <p className="text-red-700 font-questa text-xs sm:text-sm">
                  <strong>Warning:</strong> This action cannot be undone. If you wish to apply again in the future, you will need to submit a new application.
                </p>
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsCancelModalOpen(false)}
                  className="rounded-xl font-questa w-full sm:w-auto"
                >
                  Keep Application
                </Button>
                <Button
                  onClick={confirmCancelApplication}
                  disabled={isCancelling}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl font-questa w-full sm:w-auto"
                >
                  {isCancelling ? 'Withdrawing...' : 'Yes, Withdraw'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Interview Confirmation Modal */}
      <Dialog open={isCancelInterviewModalOpen} onOpenChange={setIsCancelInterviewModalOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-md p-4 sm:p-6 rounded-xl">
          <DialogHeader className="pb-2">
            <DialogTitle className="font-ivry text-lg sm:text-xl text-slate flex items-center">
              <CalendarX className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 mr-2 sm:mr-3 shrink-0" />
              Cancel Interview
            </DialogTitle>
          </DialogHeader>
          {cancellingInterviewApp && (
            <div className="py-2 sm:py-4">
              <p className="text-slate-medium font-questa mb-3 sm:mb-4 text-sm sm:text-base">
                Are you sure you want to cancel the scheduled interview for <strong>{cancellingInterviewApp.child_full_name}</strong>?
              </p>
              {cancellingInterviewApp.interview_date && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                  <p className="text-blue-700 font-questa text-xs sm:text-sm">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                    {new Date(cancellingInterviewApp.interview_date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              )}
              <p className="text-slate-medium font-questa text-xs sm:text-sm mb-3 sm:mb-4">
                You will be able to book a new interview time after canceling.
              </p>
              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsCancelInterviewModalOpen(false)}
                  className="rounded-xl font-questa w-full sm:w-auto"
                >
                  Keep Interview
                </Button>
                <Button
                  onClick={confirmCancelInterview}
                  disabled={isCancellingInterview}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl font-questa w-full sm:w-auto"
                >
                  {isCancellingInterview ? 'Canceling...' : 'Yes, Cancel'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reschedule Interview Confirmation Modal */}
      <Dialog open={isRescheduleModalOpen} onOpenChange={setIsRescheduleModalOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-md p-4 sm:p-6 rounded-xl">
          <DialogHeader className="pb-2">
            <DialogTitle className="font-ivry text-lg sm:text-xl text-slate flex items-center">
              <CalendarClock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 mr-2 sm:mr-3 shrink-0" />
              Reschedule Interview
            </DialogTitle>
          </DialogHeader>
          {reschedulingApp && (
            <div className="py-2 sm:py-4">
              <p className="text-slate-medium font-questa mb-3 sm:mb-4 text-sm sm:text-base">
                Are you sure you want to reschedule the interview for <strong>{reschedulingApp.child_full_name}</strong>?
              </p>
              {reschedulingApp.interview_date && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-slate-medium font-questa mb-1">Current appointment:</p>
                  <p className="text-blue-700 font-questa font-semibold text-sm sm:text-base">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                    {new Date(reschedulingApp.interview_date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              )}
              <div className="bg-amber/10 border border-amber/30 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                <p className="text-amber-700 font-questa text-xs sm:text-sm">
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  This will cancel your current appointment. You'll then be able to select a new time.
                </p>
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsRescheduleModalOpen(false)
                    setReschedulingApp(null)
                  }}
                  className="rounded-xl font-questa w-full sm:w-auto"
                >
                  Keep Current Time
                </Button>
                <Button
                  onClick={confirmRescheduleInterview}
                  disabled={isCancellingInterview}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-questa w-full sm:w-auto"
                >
                  {isCancellingInterview ? 'Processing...' : 'Yes, Reschedule'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
