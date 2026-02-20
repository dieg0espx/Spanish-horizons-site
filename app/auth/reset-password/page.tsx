"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState(false)
  const { updatePassword, user, loading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  useEffect(() => {
    // Wait for auth to finish loading
    if (loading) return

    // Check if user is authenticated (came through callback successfully)
    if (user) {
      setIsValidToken(true)
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid or expired link',
        description: 'Please request a new password reset link.',
      })
      setTimeout(() => router.push('/'), 3000)
    }
  }, [user, loading, router, toast])

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    const { error } = await updatePassword(data.password)

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      })
      setIsLoading(false)
      return
    }

    setResetSuccess(true)
    toast({
      title: 'Password updated successfully!',
      description: 'You can now sign in with your new password.',
    })
    setIsLoading(false)

    // Redirect to home page after 3 seconds
    setTimeout(() => router.push('/'), 3000)
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate/5 via-golden/5 to-amber/5 px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate mb-2">Invalid Link</h1>
          <p className="text-slate-medium">Redirecting you to the home page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate/5 via-golden/5 to-amber/5 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate to-slate-medium px-6 pt-8 pb-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">
                {resetSuccess ? 'Password Reset!' : 'Set New Password'}
              </h1>
              <p className="text-white/80 mt-2">
                {resetSuccess
                  ? 'Your password has been updated successfully'
                  : 'Enter your new password below'}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="px-6 pb-6 pt-4">
            {resetSuccess ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-slate-medium mb-4">
                  You can now sign in with your new password.
                </p>
                <Button
                  onClick={() => router.push('/')}
                  className="w-full bg-slate hover:bg-slate-medium text-white rounded-xl py-3 font-medium transition-all duration-200"
                >
                  Go to Home
                </Button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate font-medium">
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate/40" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a new password"
                      className="pl-10 pr-10 h-12 rounded-xl border-2 border-slate/20 focus:border-amber focus:ring-amber/20 transition-all duration-200"
                      {...form.register('password')}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate/40 hover:text-slate transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                  )}
                  <p className="text-xs text-slate/60">
                    Must be at least 8 characters with uppercase, lowercase, and a number
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-slate font-medium">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate/40" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your new password"
                      className="pl-10 pr-10 h-12 rounded-xl border-2 border-slate/20 focus:border-amber focus:ring-amber/20 transition-all duration-200"
                      {...form.register('confirmPassword')}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate/40 hover:text-slate transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {form.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber hover:bg-golden hover:text-slate text-white rounded-xl h-12 font-medium transition-all duration-200 shadow-lg hover:shadow-xl mt-4"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating password...
                    </span>
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
