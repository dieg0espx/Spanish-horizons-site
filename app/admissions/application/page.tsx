"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, AlertCircle, CheckCircle, Users, Calendar, Info, User, LogIn, Tag, CreditCard, Loader2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import ApplicationPaymentForm from "@/components/application-payment-form"
import { APPLICATION_FEE } from "@/lib/constants"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface ExistingApplication {
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
}

export default function AdmissionsApplicationPage() {
  const { toast } = useToast()
  const { user, loading: authLoading, openAuthModal } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [existingApplications, setExistingApplications] = useState<ExistingApplication[]>([])
  const [checkingApplication, setCheckingApplication] = useState(true)
  const [parentInfoPreFilled, setParentInfoPreFilled] = useState(false)

  // Payment state
  const [showPaymentStep, setShowPaymentStep] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState<{ valid: boolean; discountAmount: number; finalAmount: number; discountType: string; discountValue: number } | null>(null)
  const [validatingCoupon, setValidatingCoupon] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [paymentAmount, setPaymentAmount] = useState(APPLICATION_FEE)
  const [creatingPayment, setCreatingPayment] = useState(false)
  const [paymentWaived, setPaymentWaived] = useState(false)
  const paymentSectionRef = useRef<HTMLDivElement>(null)

  // Fetch existing applications to pre-fill parent info
  useEffect(() => {
    const fetchExistingApplications = async () => {
      if (!user) {
        setCheckingApplication(false)
        return
      }

      try {
        const response = await fetch('/api/admissions/application')
        const data = await response.json()
        if (data.applications && data.applications.length > 0) {
          setExistingApplications(data.applications)
        }
      } catch (error) {
        console.error('Error fetching applications:', error)
      } finally {
        setCheckingApplication(false)
      }
    }

    if (!authLoading) {
      fetchExistingApplications()
    }
  }, [user, authLoading])
  const [formData, setFormData] = useState({
    // Section 1: Student Information
    childFullName: '',
    preferredName: '',
    dateOfBirth: '',
    primaryLanguages: '',
    attendedPreschool: '',
    currentSchool: '',

    // Section 2: Parent/Guardian Information
    parentName: '',
    relationshipToChild: '',
    parentEmail: '',
    parentPhone: '',
    homeAddress: '',
    preferredCommunication: '',
    secondParentName: '',
    secondParentEmail: '',
    secondParentPhone: '',

    // Section 3: Previous Enrollment Information
    previousEnrollment: [] as string[],
    previousEnrollmentDetails: '',

    // Section 4: Family & Educational Background
    languagesAtHome: '',
    interestInAcademy: '',
    hopingFor: '',

    // Section 5: Interest & Intent
    seekingFullTime: '',
    excitedAbout: '',
    valuesImportant: '',

    // Section 6: Looking Ahead
    interestedInContinuing: false,
    receiveUpdates: false,

    // Section 7: How Did You Find Us?
    howDidYouFind: [] as string[],
    howDidYouFindOther: '',

    // Section 8: Anything Else
    anythingElse: '',

    // Section 9: Acknowledgments
    ackNotGuarantee: false,
    ackKindergartenOnly: false,
    ackFall2026: false,
    ackConsiderationOnly: false,
    ackReviewBased: false,
  })

  // Pre-fill parent information from existing applications
  useEffect(() => {
    if (existingApplications.length > 0 && !parentInfoPreFilled) {
      const existingApp = existingApplications[0]
      setFormData(prev => ({
        ...prev,
        parentName: existingApp.parent_name || '',
        relationshipToChild: existingApp.relationship_to_child || '',
        parentEmail: existingApp.parent_email || '',
        parentPhone: existingApp.parent_phone || '',
        homeAddress: existingApp.home_address || '',
        preferredCommunication: existingApp.preferred_communication || '',
        secondParentName: existingApp.second_parent_name || '',
        secondParentEmail: existingApp.second_parent_email || '',
        secondParentPhone: existingApp.second_parent_phone || '',
        languagesAtHome: existingApp.languages_at_home || '',
      }))
      setParentInfoPreFilled(true)
    }
  }, [existingApplications, parentInfoPreFilled])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleMultiCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = prev[field as keyof typeof prev] as string[]
      if (checked) {
        return { ...prev, [field]: [...currentValues, value] }
      } else {
        return { ...prev, [field]: currentValues.filter(v => v !== value) }
      }
    })
  }

  const handleValidateCoupon = async () => {
    if (!couponCode.trim()) return

    setValidatingCoupon(true)
    setCouponError('')
    setCouponApplied(null)

    try {
      const response = await fetch('/api/admissions/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode }),
      })

      const data = await response.json()

      if (data.valid) {
        setCouponApplied(data)
        setPaymentAmount(data.finalAmount)
        setCouponError('')
      } else {
        setCouponError(data.error || 'Invalid coupon code')
        setCouponApplied(null)
        setPaymentAmount(APPLICATION_FEE)
      }
    } catch {
      setCouponError('Failed to validate coupon')
    } finally {
      setValidatingCoupon(false)
    }
  }

  const handleRemoveCoupon = () => {
    setCouponCode('')
    setCouponApplied(null)
    setCouponError('')
    setPaymentAmount(APPLICATION_FEE)
    setClientSecret('')
    setPaymentWaived(false)
  }

  const handleInitiatePayment = async () => {
    setCreatingPayment(true)
    try {
      const response = await fetch('/api/admissions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ couponCode: couponApplied ? couponCode : undefined }),
      })

      const data = await response.json()

      if (data.waived) {
        setPaymentWaived(true)
        setPaymentAmount(0)
      } else if (data.clientSecret) {
        setClientSecret(data.clientSecret)
        setPaymentAmount(data.finalAmount)
      } else {
        throw new Error('Failed to initialize payment')
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setCreatingPayment(false)
    }
  }

  const submitApplication = async (paymentIntentId?: string) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admissions/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          paymentIntentId: paymentIntentId || null,
          couponCode: couponApplied ? couponCode.trim().toUpperCase() : null,
          paymentWaived,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const params = new URLSearchParams({
          id: data.applicationId,
          amount: String(data.payment?.amount ?? paymentAmount),
          fee: String(data.payment?.applicationFee ?? APPLICATION_FEE),
          discount: String(data.payment?.discountAmount ?? 0),
          coupon: data.payment?.couponCode || '',
          status: data.payment?.status || 'paid',
          child: formData.childFullName,
          parent: formData.parentName,
        })
        router.push(`/admissions/application/success?${params.toString()}`)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit application')
      }
    } catch (error) {
      toast({
        title: "Error submitting application",
        description: error instanceof Error ? error.message : "Please try again later or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // If payment step is already showing, don't re-run validation
    if (showPaymentStep) return

    if (!user) {
      toast({
        title: "Please sign in first",
        description: "You must be signed in to submit an application.",
        variant: "destructive",
      })
      openAuthModal('login')
      return
    }

    if (!formData.ackNotGuarantee || !formData.ackKindergartenOnly || !formData.ackFall2026 || !formData.ackConsiderationOnly || !formData.ackReviewBased) {
      toast({
        title: "Please complete all acknowledgments",
        description: "You must acknowledge all items in Section 9 before submitting.",
        variant: "destructive",
      })
      return
    }

    // Show payment step instead of submitting directly
    setShowPaymentStep(true)
    setTimeout(() => {
      paymentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-slate rounded-full text-white text-xs sm:text-sm font-questa font-medium mb-4 md:mb-6">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Admissions Application
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ivry font-bold text-white mb-4 md:mb-6 px-4">
              Spanish Horizons Academy
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto font-questa px-4">
              Admissions Application for Fall 2026
            </p>
          </div>
        </div>
      </section>

      {/* Please Read Before Applying */}
      <section className="py-8 md:py-12 bg-amber/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-amber border-2">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-ivry text-slate flex items-center">
                <AlertCircle className="h-6 w-6 text-amber mr-3" />
                Please Read Before Applying
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-medium font-questa">
                Thank you for your interest in Spanish Horizons Academy.
              </p>
              <p className="text-slate-medium font-questa font-semibold">
                This form is an application for consideration only.
              </p>
              <p className="text-slate-medium font-questa">
                Submitting this application does not constitute enrollment, registration, or any financial commitment, and does not guarantee acceptance or a space in the program.
              </p>
              <p className="text-slate-medium font-questa font-semibold text-amber">
                At this time, we are only accepting applications for Kindergarten.
              </p>

              <div className="bg-slate/5 rounded-lg p-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-golden mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-questa font-semibold text-slate text-sm">School Year</p>
                      <p className="font-questa text-slate-medium text-sm">Fall 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-golden mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-questa font-semibold text-slate text-sm">Academic Calendar</p>
                      <p className="font-questa text-slate-medium text-sm">Follows the Hillsboro School District calendar</p>
                    </div>
                  </div>
                  <div className="flex items-start md:col-span-2">
                    <Users className="h-5 w-5 text-golden mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-questa font-semibold text-slate text-sm">Grades Open for Application</p>
                      <p className="font-questa text-slate-medium text-sm">Kindergarten only</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-slate-medium font-questa text-sm italic">
                This application helps us thoughtfully plan for our founding class and get to know families who align with our mission and educational approach.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Family Portal Access Info */}
      <section className="py-6 md:py-8 bg-slate/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-ivry text-slate flex items-center">
                <Info className="h-5 w-5 text-slate mr-2" />
                Family Portal Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-medium font-questa mb-4">
                To submit an application, families will be asked to create or log into a secure family portal.
              </p>
              <p className="text-slate-medium font-questa mb-2">Through the portal, you will be able to:</p>
              <ul className="list-disc list-inside text-slate-medium font-questa space-y-1 ml-2">
                <li>View your application status</li>
                <li>Receive admissions updates and communications</li>
                <li>Submit additional information if requested</li>
              </ul>

              {/* Auth Status */}
              <div className="mt-6 pt-6 border-t border-slate/10">
                {authLoading || checkingApplication ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin h-6 w-6 border-2 border-amber border-t-transparent rounded-full mr-3"></div>
                    <span className="text-slate-medium font-questa">Checking account status...</span>
                  </div>
                ) : user ? (
                  <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-questa font-semibold text-green-700">Signed in as {user.email}</p>
                        <p className="text-sm text-green-600 font-questa">You're ready to submit your application</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber/10 p-4 rounded-xl border border-amber/30">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-amber mr-3 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-questa font-semibold text-slate mb-2">Sign in to submit your application</p>
                        <p className="text-sm text-slate-medium font-questa mb-4">
                          Create an account or sign in to save your application and track its status.
                        </p>
                        <div className="flex gap-3">
                          <Button
                            onClick={() => openAuthModal('login')}
                            className="bg-amber hover:bg-golden hover:text-slate text-white rounded-xl font-questa"
                          >
                            <LogIn className="h-4 w-4 mr-2" />
                            Sign In
                          </Button>
                          <Button
                            onClick={() => openAuthModal('signup')}
                            variant="outline"
                            className="border-slate/30 text-slate hover:bg-slate hover:text-white rounded-xl font-questa"
                          >
                            Create Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Adding Another Child Notice */}
      {existingApplications.length > 0 && (
        <section className="py-6 bg-green-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-green-500 border-2">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-ivry font-bold text-slate text-lg mb-2">Adding Another Child</h3>
                    <p className="text-slate-medium font-questa mb-3">
                      You already have {existingApplications.length} application{existingApplications.length > 1 ? 's' : ''} on file. Your parent/guardian information has been pre-filled for convenience.
                    </p>
                    <p className="text-slate-medium font-questa text-sm mb-4">
                      Simply fill in the new child's information below and submit.
                    </p>
                    <Link href="/dashboard">
                      <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-100 rounded-xl font-questa">
                        View Existing Applications
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Application Form */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Section 1: Student Information */}
            <Card>
              <CardHeader className="bg-slate/5">
                <CardTitle className="text-xl md:text-2xl font-ivry text-slate">
                  Section 1: Student Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                <div>
                  <Label htmlFor="childFullName" className="block text-sm font-questa font-medium text-slate mb-2">
                    Child's Full Legal Name *
                  </Label>
                  <Input
                    id="childFullName"
                    name="childFullName"
                    type="text"
                    required
                    value={formData.childFullName}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="preferredName" className="block text-sm font-questa font-medium text-slate mb-2">
                    Preferred Name (if different)
                  </Label>
                  <Input
                    id="preferredName"
                    name="preferredName"
                    type="text"
                    value={formData.preferredName}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-questa font-medium text-slate mb-2">
                    Date of Birth *
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Month */}
                    <Select
                      value={formData.dateOfBirth ? formData.dateOfBirth.split('-')[1] : ''}
                      onValueChange={(month) => {
                        const parts = formData.dateOfBirth ? formData.dateOfBirth.split('-') : ['', '', '']
                        const year = parts[0] || ''
                        const day = parts[2] || ''
                        if (year && month && day) {
                          setFormData(prev => ({ ...prev, dateOfBirth: `${year}-${month}-${day}` }))
                        } else {
                          setFormData(prev => ({ ...prev, dateOfBirth: `${year}-${month}-${day}` }))
                        }
                      }}
                    >
                      <SelectTrigger className="w-full h-12 rounded-xl border-2 border-slate/20 hover:border-amber focus:border-amber focus:ring-amber/20 transition-all duration-200 font-questa">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 border-slate/20 shadow-xl max-h-60">
                        <SelectItem value="01" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">January</SelectItem>
                        <SelectItem value="02" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">February</SelectItem>
                        <SelectItem value="03" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">March</SelectItem>
                        <SelectItem value="04" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">April</SelectItem>
                        <SelectItem value="05" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">May</SelectItem>
                        <SelectItem value="06" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">June</SelectItem>
                        <SelectItem value="07" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">July</SelectItem>
                        <SelectItem value="08" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">August</SelectItem>
                        <SelectItem value="09" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">September</SelectItem>
                        <SelectItem value="10" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">October</SelectItem>
                        <SelectItem value="11" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">November</SelectItem>
                        <SelectItem value="12" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">December</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Day */}
                    <Select
                      value={formData.dateOfBirth ? formData.dateOfBirth.split('-')[2] : ''}
                      onValueChange={(day) => {
                        const parts = formData.dateOfBirth ? formData.dateOfBirth.split('-') : ['', '', '']
                        const year = parts[0] || ''
                        const month = parts[1] || ''
                        setFormData(prev => ({ ...prev, dateOfBirth: `${year}-${month}-${day}` }))
                      }}
                    >
                      <SelectTrigger className="w-full h-12 rounded-xl border-2 border-slate/20 hover:border-amber focus:border-amber focus:ring-amber/20 transition-all duration-200 font-questa">
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 border-slate/20 shadow-xl max-h-60">
                        {Array.from({ length: 31 }, (_, i) => {
                          const day = String(i + 1).padStart(2, '0')
                          return (
                            <SelectItem key={day} value={day} className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">
                              {i + 1}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>

                    {/* Year */}
                    <Select
                      value={formData.dateOfBirth ? formData.dateOfBirth.split('-')[0] : ''}
                      onValueChange={(year) => {
                        const parts = formData.dateOfBirth ? formData.dateOfBirth.split('-') : ['', '', '']
                        const month = parts[1] || ''
                        const day = parts[2] || ''
                        setFormData(prev => ({ ...prev, dateOfBirth: `${year}-${month}-${day}` }))
                      }}
                    >
                      <SelectTrigger className="w-full h-12 rounded-xl border-2 border-slate/20 hover:border-amber focus:border-amber focus:ring-amber/20 transition-all duration-200 font-questa">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 border-slate/20 shadow-xl max-h-60">
                        {Array.from({ length: 26 }, (_, i) => {
                          const year = String(2025 - i)
                          return (
                            <SelectItem key={year} value={year} className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">
                              {year}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="primaryLanguages" className="block text-sm font-questa font-medium text-slate mb-2">
                    Child's Primary Language(s) *
                  </Label>
                  <Input
                    id="primaryLanguages"
                    name="primaryLanguages"
                    type="text"
                    required
                    placeholder="e.g., English, Spanish"
                    value={formData.primaryLanguages}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="attendedPreschool" className="block text-sm font-questa font-medium text-slate mb-2">
                    Has your child attended preschool or kindergarten before? *
                  </Label>
                  <Select
                    value={formData.attendedPreschool}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, attendedPreschool: value }))}
                  >
                    <SelectTrigger className="w-full h-12 rounded-xl border-2 border-slate/20 hover:border-amber focus:border-amber focus:ring-amber/20 transition-all duration-200 font-questa">
                      <SelectValue placeholder="Please select..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-slate/20 shadow-xl">
                      <SelectItem value="yes" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">
                        Yes
                      </SelectItem>
                      <SelectItem value="no" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">
                        No
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currentSchool" className="block text-sm font-questa font-medium text-slate mb-2">
                    Current School or Childcare Setting (if applicable)
                  </Label>
                  <Input
                    id="currentSchool"
                    name="currentSchool"
                    type="text"
                    value={formData.currentSchool}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Parent/Guardian Information */}
            <Card>
              <CardHeader className="bg-slate/5">
                <CardTitle className="text-xl md:text-2xl font-ivry text-slate">
                  Section 2: Parent / Guardian Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                <div>
                  <Label htmlFor="parentName" className="block text-sm font-questa font-medium text-slate mb-2">
                    Parent/Guardian Full Name *
                  </Label>
                  <Input
                    id="parentName"
                    name="parentName"
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="relationshipToChild" className="block text-sm font-questa font-medium text-slate mb-2">
                    Relationship to Child *
                  </Label>
                  <Input
                    id="relationshipToChild"
                    name="relationshipToChild"
                    type="text"
                    required
                    placeholder="e.g., Mother, Father, Guardian"
                    value={formData.relationshipToChild}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="parentEmail" className="block text-sm font-questa font-medium text-slate mb-2">
                    Email Address *
                  </Label>
                  <Input
                    id="parentEmail"
                    name="parentEmail"
                    type="email"
                    required
                    value={formData.parentEmail}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="parentPhone" className="block text-sm font-questa font-medium text-slate mb-2">
                    Phone Number *
                  </Label>
                  <Input
                    id="parentPhone"
                    name="parentPhone"
                    type="tel"
                    required
                    value={formData.parentPhone}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="homeAddress" className="block text-sm font-questa font-medium text-slate mb-2">
                    Home Address *
                  </Label>
                  <Textarea
                    id="homeAddress"
                    name="homeAddress"
                    required
                    rows={3}
                    placeholder="Street Address, City, State, ZIP"
                    value={formData.homeAddress}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="preferredCommunication" className="block text-sm font-questa font-medium text-slate mb-2">
                    Preferred Method of Communication *
                  </Label>
                  <Select
                    value={formData.preferredCommunication}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, preferredCommunication: value }))}
                  >
                    <SelectTrigger className="w-full h-12 rounded-xl border-2 border-slate/20 hover:border-amber focus:border-amber focus:ring-amber/20 transition-all duration-200 font-questa">
                      <SelectValue placeholder="Please select..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-slate/20 shadow-xl">
                      <SelectItem value="email" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">
                        Email
                      </SelectItem>
                      <SelectItem value="phone" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">
                        Phone Call
                      </SelectItem>
                      <SelectItem value="text" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">
                        Text Message
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-4 mt-4">
                  <p className="text-sm font-questa font-medium text-slate mb-4">(Optional) Second Parent/Guardian Contact Information</p>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="secondParentName" className="block text-sm font-questa font-medium text-slate-medium mb-2">
                        Second Parent/Guardian Name
                      </Label>
                      <Input
                        id="secondParentName"
                        name="secondParentName"
                        type="text"
                        value={formData.secondParentName}
                        onChange={handleInputChange}
                        className="text-sm md:text-base"
                      />
                    </div>

                    <div>
                      <Label htmlFor="secondParentEmail" className="block text-sm font-questa font-medium text-slate-medium mb-2">
                        Email Address
                      </Label>
                      <Input
                        id="secondParentEmail"
                        name="secondParentEmail"
                        type="email"
                        value={formData.secondParentEmail}
                        onChange={handleInputChange}
                        className="text-sm md:text-base"
                      />
                    </div>

                    <div>
                      <Label htmlFor="secondParentPhone" className="block text-sm font-questa font-medium text-slate-medium mb-2">
                        Phone Number
                      </Label>
                      <Input
                        id="secondParentPhone"
                        name="secondParentPhone"
                        type="tel"
                        value={formData.secondParentPhone}
                        onChange={handleInputChange}
                        className="text-sm md:text-base"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Previous Enrollment Information */}
            <Card>
              <CardHeader className="bg-slate/5">
                <CardTitle className="text-xl md:text-2xl font-ivry text-slate">
                  Section 3: Previous Enrollment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                <p className="text-slate-medium font-questa text-sm">
                  To help us better understand your family's educational journey, please let us know if your child has previously been enrolled in one of our partner programs.
                </p>

                <div>
                  <Label className="block text-sm font-questa font-medium text-slate mb-3">
                    Has your child previously been enrolled in any of the following programs?
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="prev-casita"
                        checked={formData.previousEnrollment.includes('casita-azul')}
                        onCheckedChange={(checked) => handleMultiCheckboxChange('previousEnrollment', 'casita-azul', checked as boolean)}
                      />
                      <Label htmlFor="prev-casita" className="font-questa text-sm text-slate-medium cursor-pointer">
                        Casita Azul Spanish Immersion Program
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="prev-amanecer"
                        checked={formData.previousEnrollment.includes('amanecer')}
                        onCheckedChange={(checked) => handleMultiCheckboxChange('previousEnrollment', 'amanecer', checked as boolean)}
                      />
                      <Label htmlFor="prev-amanecer" className="font-questa text-sm text-slate-medium cursor-pointer">
                        Amanecer Academy
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="prev-none"
                        checked={formData.previousEnrollment.includes('none')}
                        onCheckedChange={(checked) => handleMultiCheckboxChange('previousEnrollment', 'none', checked as boolean)}
                      />
                      <Label htmlFor="prev-none" className="font-questa text-sm text-slate-medium cursor-pointer">
                        No, this would be our first program within this network
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="previousEnrollmentDetails" className="block text-sm font-questa font-medium text-slate mb-2">
                    If yes, you may share additional details (optional):
                  </Label>
                  <Textarea
                    id="previousEnrollmentDetails"
                    name="previousEnrollmentDetails"
                    rows={3}
                    placeholder="Program name and/or location, approximate years or dates of enrollment"
                    value={formData.previousEnrollmentDetails}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                  <p className="text-xs text-slate-medium font-questa mt-2 italic">
                    This information is used for internal planning and relationship continuity only and does not impact admissions decisions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Family & Educational Background */}
            <Card>
              <CardHeader className="bg-slate/5">
                <CardTitle className="text-xl md:text-2xl font-ivry text-slate">
                  Section 4: Family & Educational Background
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                <div>
                  <Label htmlFor="languagesAtHome" className="block text-sm font-questa font-medium text-slate mb-2">
                    Languages Spoken at Home *
                  </Label>
                  <Input
                    id="languagesAtHome"
                    name="languagesAtHome"
                    type="text"
                    required
                    placeholder="e.g., English, Spanish, Vietnamese"
                    value={formData.languagesAtHome}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="interestInAcademy" className="block text-sm font-questa font-medium text-slate mb-2">
                    What interests you most about Spanish Horizons Academy? *
                  </Label>
                  <Textarea
                    id="interestInAcademy"
                    name="interestInAcademy"
                    required
                    rows={4}
                    value={formData.interestInAcademy}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="hopingFor" className="block text-sm font-questa font-medium text-slate mb-2">
                    What are you hoping for in your child's elementary school experience? *
                  </Label>
                  <Textarea
                    id="hopingFor"
                    name="hopingFor"
                    required
                    rows={4}
                    value={formData.hopingFor}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Interest & Intent (Non-Binding) */}
            <Card>
              <CardHeader className="bg-slate/5">
                <CardTitle className="text-xl md:text-2xl font-ivry text-slate">
                  Section 5: Interest & Intent (Non-Binding)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                <p className="text-slate-medium font-questa text-sm">
                  This section helps us understand interest levels and family alignment only.
                </p>

                <div>
                  <Label htmlFor="seekingFullTime" className="block text-sm font-questa font-medium text-slate mb-2">
                    Are you seeking full-time Kindergarten enrollment? *
                  </Label>
                  <Select
                    value={formData.seekingFullTime}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, seekingFullTime: value }))}
                  >
                    <SelectTrigger className="w-full h-12 rounded-xl border-2 border-slate/20 hover:border-amber focus:border-amber focus:ring-amber/20 transition-all duration-200 font-questa">
                      <SelectValue placeholder="Please select..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-slate/20 shadow-xl">
                      <SelectItem value="yes" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">
                        Yes
                      </SelectItem>
                      <SelectItem value="no" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">
                        No
                      </SelectItem>
                      <SelectItem value="unsure" className="font-questa rounded-lg hover:bg-amber/10 focus:bg-amber/20 cursor-pointer">
                        Unsure
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="excitedAbout" className="block text-sm font-questa font-medium text-slate mb-2">
                    What excites you most about a Spanish-forward, experiential learning model? *
                  </Label>
                  <Textarea
                    id="excitedAbout"
                    name="excitedAbout"
                    required
                    rows={4}
                    value={formData.excitedAbout}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="valuesImportant" className="block text-sm font-questa font-medium text-slate mb-2">
                    What values matter most to you in a school community? *
                  </Label>
                  <Textarea
                    id="valuesImportant"
                    name="valuesImportant"
                    required
                    rows={4}
                    value={formData.valuesImportant}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>

              </CardContent>
            </Card>

            {/* Section 6: Looking Ahead (Optional) */}
            <Card>
              <CardHeader className="bg-slate/5">
                <CardTitle className="text-xl md:text-2xl font-ivry text-slate">
                  Section 6: Looking Ahead (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                <p className="text-slate-medium font-questa text-sm">
                  This helps us plan intentionally as our school grows.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="interestedInContinuing"
                      checked={formData.interestedInContinuing}
                      onCheckedChange={(checked) => handleCheckboxChange('interestedInContinuing', checked as boolean)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="interestedInContinuing" className="font-questa text-sm text-slate-medium cursor-pointer">
                      I'm interested in continuing with Spanish Horizons Academy as additional grade levels open
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="receiveUpdates"
                      checked={formData.receiveUpdates}
                      onCheckedChange={(checked) => handleCheckboxChange('receiveUpdates', checked as boolean)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="receiveUpdates" className="font-questa text-sm text-slate-medium cursor-pointer">
                      I'd like to receive updates about future programs, events, or expansion
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 7: How Did You Find Us? */}
            <Card>
              <CardHeader className="bg-slate/5">
                <CardTitle className="text-xl md:text-2xl font-ivry text-slate">
                  Section 7: How Did You Find Us?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                <p className="text-slate-medium font-questa text-sm">
                  We love knowing how families connect with us.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="find-casita"
                      checked={formData.howDidYouFind.includes('casita-amanecer')}
                      onCheckedChange={(checked) => handleMultiCheckboxChange('howDidYouFind', 'casita-amanecer', checked as boolean)}
                    />
                    <Label htmlFor="find-casita" className="font-questa text-sm text-slate-medium cursor-pointer">
                      Casita Azul or Amanecer Academy
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="find-word"
                      checked={formData.howDidYouFind.includes('word-of-mouth')}
                      onCheckedChange={(checked) => handleMultiCheckboxChange('howDidYouFind', 'word-of-mouth', checked as boolean)}
                    />
                    <Label htmlFor="find-word" className="font-questa text-sm text-slate-medium cursor-pointer">
                      Word of mouth
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="find-social"
                      checked={formData.howDidYouFind.includes('social-media')}
                      onCheckedChange={(checked) => handleMultiCheckboxChange('howDidYouFind', 'social-media', checked as boolean)}
                    />
                    <Label htmlFor="find-social" className="font-questa text-sm text-slate-medium cursor-pointer">
                      Social media
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="find-search"
                      checked={formData.howDidYouFind.includes('online-search')}
                      onCheckedChange={(checked) => handleMultiCheckboxChange('howDidYouFind', 'online-search', checked as boolean)}
                    />
                    <Label htmlFor="find-search" className="font-questa text-sm text-slate-medium cursor-pointer">
                      Online search
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="find-event"
                      checked={formData.howDidYouFind.includes('community-event')}
                      onCheckedChange={(checked) => handleMultiCheckboxChange('howDidYouFind', 'community-event', checked as boolean)}
                    />
                    <Label htmlFor="find-event" className="font-questa text-sm text-slate-medium cursor-pointer">
                      Community event
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="find-other"
                      checked={formData.howDidYouFind.includes('other')}
                      onCheckedChange={(checked) => handleMultiCheckboxChange('howDidYouFind', 'other', checked as boolean)}
                    />
                    <Label htmlFor="find-other" className="font-questa text-sm text-slate-medium cursor-pointer">
                      Other
                    </Label>
                  </div>
                </div>

                {formData.howDidYouFind.includes('other') && (
                  <div>
                    <Label htmlFor="howDidYouFindOther" className="block text-sm font-questa font-medium text-slate mb-2">
                      Please share:
                    </Label>
                    <Input
                      id="howDidYouFindOther"
                      name="howDidYouFindOther"
                      type="text"
                      value={formData.howDidYouFindOther}
                      onChange={handleInputChange}
                      className="text-sm md:text-base"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 8: Anything Else You'd Like to Share? */}
            <Card>
              <CardHeader className="bg-slate/5">
                <CardTitle className="text-xl md:text-2xl font-ivry text-slate">
                  Section 8: Anything Else You'd Like to Share?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                <div>
                  <Label htmlFor="anythingElse" className="block text-sm font-questa font-medium text-slate mb-2">
                    Is there anything else you'd like us to know about your child or family? (Optional)
                  </Label>
                  <Textarea
                    id="anythingElse"
                    name="anythingElse"
                    rows={5}
                    value={formData.anythingElse}
                    onChange={handleInputChange}
                    className="text-sm md:text-base"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 9: Acknowledgment */}
            <Card className="border-slate border-2">
              <CardHeader className="bg-slate">
                <CardTitle className="text-xl md:text-2xl font-ivry text-white">
                  Section 9: Acknowledgment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                <p className="text-slate-medium font-questa text-sm font-semibold">
                  Please review and acknowledge the following:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="ackNotGuarantee"
                      checked={formData.ackNotGuarantee}
                      onCheckedChange={(checked) => handleCheckboxChange('ackNotGuarantee', checked as boolean)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="ackNotGuarantee" className="font-questa text-sm text-slate cursor-pointer">
                      I understand that submitting this application does not guarantee enrollment *
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="ackKindergartenOnly"
                      checked={formData.ackKindergartenOnly}
                      onCheckedChange={(checked) => handleCheckboxChange('ackKindergartenOnly', checked as boolean)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="ackKindergartenOnly" className="font-questa text-sm text-slate cursor-pointer">
                      I understand that Spanish Horizons Academy is currently accepting applications only for Kindergarten *
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="ackFall2026"
                      checked={formData.ackFall2026}
                      onCheckedChange={(checked) => handleCheckboxChange('ackFall2026', checked as boolean)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="ackFall2026" className="font-questa text-sm text-slate cursor-pointer">
                      I understand that enrollment is for Fall 2026 and follows the Hillsboro School District calendar *
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="ackConsiderationOnly"
                      checked={formData.ackConsiderationOnly}
                      onCheckedChange={(checked) => handleCheckboxChange('ackConsiderationOnly', checked as boolean)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="ackConsiderationOnly" className="font-questa text-sm text-slate cursor-pointer">
                      I understand this is an application for consideration and not a registration or payment *
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="ackReviewBased"
                      checked={formData.ackReviewBased}
                      onCheckedChange={(checked) => handleCheckboxChange('ackReviewBased', checked as boolean)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="ackReviewBased" className="font-questa text-sm text-slate cursor-pointer">
                      I understand applications are reviewed based on program alignment and available space *
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card className="bg-slate/5">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-ivry text-slate flex items-center">
                  <CheckCircle className="h-6 w-6 text-golden mr-3" />
                  What Happens Next
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-medium font-questa">
                  After submitting your application:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-golden mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-medium font-questa">Applications are reviewed on a rolling basis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-golden mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-medium font-questa">Families may be contacted for follow-up conversations, tours, or information sessions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-golden mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-medium font-questa">Accepted families will receive details about enrollment timelines, tuition, and next steps</span>
                  </li>
                </ul>
                <p className="text-slate font-questa font-semibold pt-4 border-t">
                  Thank you for your interest in Spanish Horizons Academy. We look forward to learning more about your family and beginning this journey together.
                </p>
              </CardContent>
            </Card>

            {/* Section 10: Application Fee & Payment */}
            {showPaymentStep && (
              <div ref={paymentSectionRef}>
                <Card className="border-amber border-2">
                  <CardHeader className="bg-amber/10">
                    <CardTitle className="text-xl md:text-2xl font-ivry text-slate flex items-center">
                      <CreditCard className="h-6 w-6 text-amber mr-3" />
                      Section 10: Application Fee
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 space-y-6">
                    {/* Fee Summary */}
                    <div className="bg-slate/5 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-questa text-slate">Application Fee</span>
                        <span className="font-questa font-semibold text-slate">${APPLICATION_FEE.toFixed(2)}</span>
                      </div>
                      {couponApplied && (
                        <div className="flex justify-between items-center mb-2 text-green-600">
                          <span className="font-questa">
                            Coupon Discount ({couponApplied.discountType === 'percentage' ? `${couponApplied.discountValue}%` : `$${couponApplied.discountValue}`})
                          </span>
                          <span className="font-questa font-semibold">-${couponApplied.discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 mt-2 flex justify-between items-center">
                        <span className="font-questa font-bold text-slate text-lg">Total</span>
                        <span className="font-questa font-bold text-slate text-lg">${paymentAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Coupon Code */}
                    <div>
                      <Label className="block text-sm font-questa font-medium text-slate mb-2">
                        <Tag className="h-4 w-4 inline mr-1" />
                        Have a coupon code?
                      </Label>
                      {couponApplied ? (
                        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="font-questa text-green-800 flex-1">
                            Coupon <strong>{couponCode.toUpperCase()}</strong> applied — {couponApplied.discountType === 'percentage' ? `${couponApplied.discountValue}% off` : `$${couponApplied.discountAmount.toFixed(2)} off`}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleRemoveCoupon}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => { setCouponCode(e.target.value); setCouponError('') }}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleValidateCoupon())}
                            className="text-sm md:text-base uppercase"
                          />
                          <Button
                            type="button"
                            onClick={handleValidateCoupon}
                            disabled={validatingCoupon || !couponCode.trim()}
                            variant="outline"
                            className="rounded-xl font-questa whitespace-nowrap"
                          >
                            {validatingCoupon ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply'}
                          </Button>
                        </div>
                      )}
                      {couponError && (
                        <p className="text-sm text-red-500 font-questa mt-1">{couponError}</p>
                      )}
                    </div>

                    {/* Payment or Waived */}
                    {paymentWaived ? (
                      <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <p className="font-questa font-semibold text-green-800">Application fee fully covered by coupon!</p>
                        </div>
                        <Button
                          type="button"
                          onClick={() => submitApplication()}
                          disabled={isSubmitting}
                          className="w-full bg-amber hover:bg-golden hover:text-slate font-questa text-base md:text-lg py-6"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                              Submitting Application...
                            </>
                          ) : (
                            <>
                              <FileText className="h-5 w-5 mr-2" />
                              Submit Application (Fee Waived)
                            </>
                          )}
                        </Button>
                      </div>
                    ) : clientSecret ? (
                      <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <ApplicationPaymentForm
                          amount={paymentAmount}
                          onSuccess={(paymentIntentId) => submitApplication(paymentIntentId)}
                        />
                      </Elements>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleInitiatePayment}
                        disabled={creatingPayment}
                        className="w-full bg-amber hover:bg-golden hover:text-slate font-questa text-base md:text-lg py-6"
                      >
                        {creatingPayment ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Preparing Payment...
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-5 w-5 mr-2" />
                            Proceed to Payment — ${paymentAmount.toFixed(2)}
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Submit / Sign In Button */}
            {!showPaymentStep && (
              <div className="pt-4">
                {!user ? (
                  <div className="text-center">
                    <p className="text-slate-medium font-questa mb-4">
                      Please sign in to submit your application.
                    </p>
                    <Button
                      type="button"
                      onClick={() => openAuthModal('login')}
                      className="w-full bg-slate hover:bg-slate-medium text-white font-questa text-base md:text-lg py-6"
                    >
                      <LogIn className="h-5 w-5 mr-2" />
                      Sign In to Submit Application
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-amber hover:bg-golden hover:text-slate font-questa text-base md:text-lg py-6"
                  >
                    {existingApplications.length > 0 ? (
                      <>
                        <Users className="h-5 w-5 mr-2" />
                        Continue to Payment
                      </>
                    ) : (
                      <>
                        <FileText className="h-5 w-5 mr-2" />
                        Continue to Payment
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
