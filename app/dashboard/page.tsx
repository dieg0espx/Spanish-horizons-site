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
  XCircle
} from 'lucide-react'
import InterviewBookingCalendar from '@/components/interview-booking-calendar'

interface Application {
  id: string
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
    description: 'Your application has been received and is being reviewed.'
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

function ApplicationCard({ application, onViewDetails, onBookInterview, onCancel }: { application: Application; onViewDetails: (app: Application) => void; onBookInterview: (app: Application) => void; onCancel: (app: Application) => void }) {
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
                ['submitted', 'interview_scheduled', 'admitted', 'waitlist', 'rejected', 'declined'].includes(application.status)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <p className="text-[10px] sm:text-xs font-questa mt-1">Submitted</p>
            </div>
            <div className={`flex-1 h-0.5 mx-1 ${
              ['interview_scheduled', 'admitted', 'waitlist', 'rejected', 'declined'].includes(application.status)
                ? 'bg-green-500'
                : 'bg-gray-200'
            }`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs ${
                ['interview_scheduled', 'admitted', 'waitlist', 'rejected', 'declined'].includes(application.status)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-400'
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

        {/* Book Interview Button - Show for submitted applications */}
        {application.status === 'submitted' && (
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="font-ivry text-lg sm:text-2xl text-slate flex items-center">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-amber mr-2 sm:mr-3" />
            {application.child_full_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className={`${status.bgLight} p-4 rounded-xl border-l-4 ${status.color.replace('bg-', 'border-')}`}>
            <div className="flex items-center">
              <status.icon className={`h-5 w-5 ${status.textColor} mr-2`} />
              <span className={`font-questa font-semibold ${status.textColor}`}>{status.label}</span>
            </div>
            <p className="text-slate-medium font-questa text-sm mt-1">{status.description}</p>
          </div>

          {/* Interview Info */}
          {application.status === 'interview_scheduled' && application.interview_date && (
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h3 className="font-ivry font-bold text-slate mb-2 flex items-center">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                Interview Details
              </h3>
              <p className="text-slate font-questa">
                {new Date(application.interview_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              {application.interview_notes && (
                <p className="text-slate-medium font-questa mt-2 text-sm">{application.interview_notes}</p>
              )}
            </div>
          )}

          {/* Child Information */}
          <div>
            <h3 className="font-ivry font-bold text-slate mb-3 flex items-center">
              <User className="h-5 w-5 text-amber mr-2" />
              Child Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
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
            <h3 className="font-ivry font-bold text-slate mb-3 flex items-center">
              <Users className="h-5 w-5 text-amber mr-2" />
              Parent/Guardian Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
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
              <div className="mt-4 pt-4 border-t border-slate/10">
                <p className="text-slate-medium font-questa font-semibold mb-2">Second Parent/Guardian</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
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

          {/* Application Responses */}
          <div>
            <h3 className="font-ivry font-bold text-slate mb-3 flex items-center">
              <MessageSquare className="h-5 w-5 text-amber mr-2" />
              Application Responses
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-slate-medium font-questa font-semibold">Languages Spoken at Home</p>
                <p className="font-questa text-slate">{application.languages_at_home}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa font-semibold">Interest in Spanish Horizons Academy</p>
                <p className="font-questa text-slate">{application.interest_in_academy}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa font-semibold">Hopes for Elementary School Experience</p>
                <p className="font-questa text-slate">{application.hoping_for}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa font-semibold">Seeking Full-Time Enrollment</p>
                <p className="font-questa text-slate capitalize">{application.seeking_full_time}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa font-semibold">Excitement About Spanish-Forward Learning</p>
                <p className="font-questa text-slate">{application.excited_about}</p>
              </div>
              <div>
                <p className="text-slate-medium font-questa font-semibold">Important Values in School Community</p>
                <p className="font-questa text-slate">{application.values_important}</p>
              </div>
            </div>
          </div>

          {/* Application Metadata */}
          <div className="bg-slate/5 p-4 rounded-xl">
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-slate-medium font-questa">Submitted</p>
                <p className="font-questa text-slate">
                  {new Date(application.submitted_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-medium font-questa">Last Updated</p>
                <p className="font-questa text-slate">
                  {new Date(application.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-medium font-questa mt-2">Application ID: {application.id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// MOCK DATA - DELETE THIS WHEN CONNECTING TO SUPABASE
const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'mock-1',
    status: 'interview_scheduled',
    child_full_name: 'Sofia Martinez',
    preferred_name: 'Sofi',
    date_of_birth: '2020-03-15',
    primary_languages: 'English, Spanish',
    attended_preschool: 'yes',
    current_school: 'Little Stars Preschool',
    parent_name: 'Maria Martinez',
    relationship_to_child: 'Mother',
    parent_email: 'maria.martinez@email.com',
    parent_phone: '(503) 555-1234',
    home_address: '123 Oak Street, Hillsboro, OR 97124',
    preferred_communication: 'email',
    second_parent_name: 'Carlos Martinez',
    second_parent_email: 'carlos.martinez@email.com',
    second_parent_phone: '(503) 555-5678',
    languages_at_home: 'Spanish and English',
    interest_in_academy: 'We love the Spanish immersion approach and want Sofia to be bilingual. The experiential learning model aligns perfectly with how she learns best.',
    hoping_for: 'A nurturing environment where Sofia can develop her language skills while making friends and building confidence.',
    seeking_full_time: 'yes',
    excited_about: 'The opportunity for Sofia to become fluent in Spanish while learning through hands-on activities and cultural experiences.',
    values_important: 'Community, respect for diversity, love of learning, and strong family-school partnership.',
    submitted_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-20T14:00:00Z',
    interview_date: '2024-02-10T09:00:00Z',
    interview_notes: 'Please arrive 10 minutes early. The interview will be held at the main campus. Bring a photo of Sofia for her file.'
  },
  {
    id: 'mock-2',
    status: 'admitted',
    child_full_name: 'Lucas Martinez',
    preferred_name: null,
    date_of_birth: '2021-07-22',
    primary_languages: 'English, Spanish',
    attended_preschool: 'yes',
    current_school: 'Casita Azul',
    parent_name: 'Maria Martinez',
    relationship_to_child: 'Mother',
    parent_email: 'maria.martinez@email.com',
    parent_phone: '(503) 555-1234',
    home_address: '123 Oak Street, Hillsboro, OR 97124',
    preferred_communication: 'email',
    second_parent_name: 'Carlos Martinez',
    second_parent_email: 'carlos.martinez@email.com',
    second_parent_phone: '(503) 555-5678',
    languages_at_home: 'Spanish and English',
    interest_in_academy: 'Lucas has thrived at Casita Azul and we want to continue his Spanish immersion journey at Spanish Horizons Academy.',
    hoping_for: 'Continuity in his language development and a smooth transition to elementary school.',
    seeking_full_time: 'yes',
    excited_about: 'Building on the foundation Lucas has developed at Casita Azul and watching him grow as a bilingual learner.',
    values_important: 'Consistency, bilingualism, creativity, and strong academics.',
    submitted_at: '2024-01-10T08:15:00Z',
    updated_at: '2024-01-25T11:30:00Z'
  },
  {
    id: 'mock-3',
    status: 'submitted',
    child_full_name: 'Emma Johnson',
    preferred_name: 'Emmy',
    date_of_birth: '2020-11-08',
    primary_languages: 'English',
    attended_preschool: 'yes',
    current_school: 'Sunshine Daycare',
    parent_name: 'Sarah Johnson',
    relationship_to_child: 'Mother',
    parent_email: 'sarah.j@email.com',
    parent_phone: '(503) 555-9999',
    home_address: '456 Maple Ave, Beaverton, OR 97005',
    preferred_communication: 'phone',
    second_parent_name: null,
    second_parent_email: null,
    second_parent_phone: null,
    languages_at_home: 'English',
    interest_in_academy: 'We want Emma to learn Spanish from an early age and believe immersion is the best approach.',
    hoping_for: 'A welcoming environment where Emma can develop Spanish skills while making lasting friendships.',
    seeking_full_time: 'yes',
    excited_about: 'The chance for Emma to become bilingual and experience a different culture.',
    values_important: 'Inclusivity, academic excellence, and cultural awareness.',
    submitted_at: '2024-01-28T16:45:00Z',
    updated_at: '2024-01-28T16:45:00Z'
  },
  {
    id: 'mock-4',
    status: 'waitlist',
    child_full_name: 'Oliver Chen',
    preferred_name: 'Ollie',
    date_of_birth: '2020-05-30',
    primary_languages: 'English, Mandarin',
    attended_preschool: 'yes',
    current_school: 'Happy Kids Academy',
    parent_name: 'Jennifer Chen',
    relationship_to_child: 'Mother',
    parent_email: 'jen.chen@email.com',
    parent_phone: '(503) 555-7777',
    home_address: '789 Pine Road, Portland, OR 97201',
    preferred_communication: 'email',
    second_parent_name: 'David Chen',
    second_parent_email: 'david.chen@email.com',
    second_parent_phone: '(503) 555-8888',
    languages_at_home: 'English and Mandarin',
    interest_in_academy: 'Oliver already speaks two languages and we believe adding Spanish will open more doors for him.',
    hoping_for: 'A trilingual education that challenges and excites Oliver.',
    seeking_full_time: 'yes',
    excited_about: 'The innovative teaching methods and the chance for Oliver to become trilingual.',
    values_important: 'Multilingualism, academic rigor, and global citizenship.',
    submitted_at: '2024-01-05T12:00:00Z',
    updated_at: '2024-01-22T09:15:00Z'
  },
  {
    id: 'mock-5',
    status: 'rejected',
    child_full_name: 'Mia Thompson',
    preferred_name: null,
    date_of_birth: '2020-09-12',
    primary_languages: 'English',
    attended_preschool: 'no',
    current_school: null,
    parent_name: 'Rachel Thompson',
    relationship_to_child: 'Mother',
    parent_email: 'rachel.t@email.com',
    parent_phone: '(503) 555-4444',
    home_address: '321 Cedar Lane, Tigard, OR 97223',
    preferred_communication: 'phone',
    second_parent_name: null,
    second_parent_email: null,
    second_parent_phone: null,
    languages_at_home: 'English',
    interest_in_academy: 'We want Mia to have the opportunity to learn Spanish.',
    hoping_for: 'A good educational foundation for Mia.',
    seeking_full_time: 'unsure',
    excited_about: 'The language learning opportunities.',
    values_important: 'Quality education and caring teachers.',
    submitted_at: '2024-01-02T09:00:00Z',
    updated_at: '2024-01-18T15:30:00Z'
  }
]
// END MOCK DATA

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
  const router = useRouter()

  const handleViewDetails = (app: Application) => {
    setSelectedApplication(app)
    setIsDetailsModalOpen(true)
  }

  const handleBookInterview = (app: Application) => {
    setBookingApplication(app)
    setIsBookingModalOpen(true)
  }

  const handleInterviewBooked = (interviewDate: string) => {
    // Update the application in the list
    setApplications(apps =>
      apps.map(app =>
        app.id === bookingApplication?.id
          ? { ...app, status: 'interview_scheduled' as const, interview_date: interviewDate }
          : app
      )
    )
  }

  const handleCancelApplication = (app: Application) => {
    setCancellingApplication(app)
    setIsCancelModalOpen(true)
  }

  const confirmCancelApplication = async () => {
    if (!cancellingApplication) return

    setIsCancelling(true)
    try {
      // MOCK MODE - Just update locally
      setApplications(apps =>
        apps.map(app =>
          app.id === cancellingApplication.id
            ? { ...app, status: 'withdrawn' as const }
            : app
        )
      )
      setIsCancelModalOpen(false)
      setCancellingApplication(null)

      /* UNCOMMENT WHEN CONNECTING TO SUPABASE
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
      }
      */
    } catch (error) {
      console.error('Error cancelling application:', error)
    } finally {
      setIsCancelling(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // MOCK: Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
    return
    // UNCOMMENT BELOW WHEN CONNECTING TO SUPABASE
    /*
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
    */
  }

  useEffect(() => {
    if (!authLoading && !user) {
      openAuthModal('login')
    }
  }, [authLoading, user, openAuthModal])

  useEffect(() => {
    // MOCK DATA - DELETE THIS BLOCK AND UNCOMMENT THE REAL FETCH BELOW
    const loadMockData = () => {
      setTimeout(() => {
        setApplications(MOCK_APPLICATIONS)
        setLoading(false)
      }, 500) // Simulate loading delay
    }
    loadMockData()
    return
    // END MOCK DATA

    /* UNCOMMENT THIS WHEN CONNECTING TO SUPABASE
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
    }
    */
  }, [user])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  // MOCK MODE: Skip auth check for testing - DELETE THIS CONDITION WHEN CONNECTING TO SUPABASE
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-amber border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-medium font-questa">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  /* UNCOMMENT THIS WHEN CONNECTING TO SUPABASE
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
  */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MOCK DATA BANNER - DELETE WHEN CONNECTING TO SUPABASE */}
      <div className="bg-amber text-white text-center py-2 text-sm font-questa">
        Preview Mode - Using Mock Data
      </div>

      {/* Header */}
      <div className="bg-slate py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-ivry font-bold text-white">Family Portal</h1>
              {/* MOCK: Using mock email - replace with user.email when connecting to Supabase */}
              <p className="text-white/70 font-questa text-sm sm:text-base mt-0.5 truncate">{user?.email || 'maria.martinez@email.com'}</p>
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
                <ApplicationCard key={app.id} application={app} onViewDetails={handleViewDetails} onBookInterview={handleBookInterview} onCancel={handleCancelApplication} />
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-ivry text-2xl text-slate flex items-center">
              <Calendar className="h-6 w-6 text-green-500 mr-3" />
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-ivry text-xl text-slate flex items-center">
              <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
              Withdraw Application
            </DialogTitle>
          </DialogHeader>
          {cancellingApplication && (
            <div className="py-4">
              <p className="text-slate-medium font-questa mb-4">
                Are you sure you want to withdraw the application for <strong>{cancellingApplication.child_full_name}</strong>?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <p className="text-red-700 font-questa text-sm">
                  <strong>Warning:</strong> This action cannot be undone. If you wish to apply again in the future, you will need to submit a new application.
                </p>
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsCancelModalOpen(false)}
                  className="rounded-xl font-questa"
                >
                  Keep Application
                </Button>
                <Button
                  onClick={confirmCancelApplication}
                  disabled={isCancelling}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl font-questa"
                >
                  {isCancelling ? 'Withdrawing...' : 'Yes, Withdraw'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
