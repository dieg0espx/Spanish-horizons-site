"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react'

// Admin emails - redirect these users to admin dashboard after login
const ADMIN_EMAILS = [
  'infospanishhorizons@casitaazulpdx.com',
  'aletxa@comcreate.org',
]

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
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

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type LoginFormData = z.infer<typeof loginSchema>
type SignUpFormData = z.infer<typeof signUpSchema>
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'login' | 'signup' | 'forgot-password'
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot-password'>(defaultMode)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [signUpSuccess, setSignUpSuccess] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)
  const { signIn, signUp, resetPassword } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const forgotPasswordForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    const { error } = await signIn(data.email, data.password)

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error.message,
      })
      setIsLoading(false)
      return
    }

    // Check if user is an admin
    const isAdmin = ADMIN_EMAILS.includes(data.email.toLowerCase())

    toast({
      title: 'Welcome back!',
      description: isAdmin ? 'Redirecting to admin dashboard...' : 'You have successfully logged in.',
    })
    setIsLoading(false)
    onClose()

    // Redirect admin users to admin dashboard, others to family portal
    router.push(isAdmin ? '/admin' : '/dashboard')
  }

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true)
    const { error } = await signUp(data.email, data.password)

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Sign up failed',
        description: error.message,
      })
      setIsLoading(false)
      return
    }

    // Send registration notification emails
    try {
      await fetch('/api/auth/register-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      })
    } catch (emailError) {
      console.error('Failed to send registration notification:', emailError)
    }

    setSignUpSuccess(true)
    toast({
      title: 'Check your email',
      description: 'We sent you a confirmation link to complete your registration.',
    })
    setIsLoading(false)
  }

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    const { error } = await resetPassword(data.email)

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      })
      setIsLoading(false)
      return
    }

    setResetEmailSent(true)
    toast({
      title: 'Check your email',
      description: 'We sent you a password reset link.',
    })
    setIsLoading(false)
  }

  const switchMode = (newMode: 'login' | 'signup' | 'forgot-password') => {
    setMode(newMode)
    setSignUpSuccess(false)
    setResetEmailSent(false)
    loginForm.reset()
    signUpForm.reset()
    forgotPasswordForm.reset()
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
      // Reset forms when closing
      setTimeout(() => {
        loginForm.reset()
        signUpForm.reset()
        forgotPasswordForm.reset()
        setSignUpSuccess(false)
        setResetEmailSent(false)
        setMode(defaultMode)
      }, 200)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white border-0 shadow-2xl rounded-2xl p-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-slate to-slate-medium px-6 pt-8 pb-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white text-center">
              {signUpSuccess
                ? 'Check Your Email'
                : resetEmailSent
                  ? 'Check Your Email'
                  : mode === 'login'
                    ? 'Welcome Back'
                    : mode === 'signup'
                      ? 'Create Account'
                      : 'Reset Password'}
            </DialogTitle>
            <DialogDescription className="text-white/80 text-center mt-2">
              {signUpSuccess
                ? "We've sent you a confirmation link"
                : resetEmailSent
                  ? "We've sent you a password reset link"
                  : mode === 'login'
                    ? 'Sign in to access your account'
                    : mode === 'signup'
                      ? 'Join our Spanish Horizons community'
                      : 'Enter your email to receive a reset link'}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 pt-4">
          {signUpSuccess ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-golden/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-amber" />
              </div>
              <p className="text-slate-medium mb-6">
                Please check your email inbox and click the confirmation link to complete your registration.
              </p>
              <Button
                onClick={() => switchMode('login')}
                className="w-full bg-slate hover:bg-slate-medium text-white rounded-xl py-3 font-medium transition-all duration-200"
              >
                Back to Login
              </Button>
            </div>
          ) : mode === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-slate font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate/40" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 h-12 rounded-xl border-2 border-slate/20 focus:border-amber focus:ring-amber/20 transition-all duration-200"
                    {...loginForm.register('email')}
                    disabled={isLoading}
                  />
                </div>
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-slate font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate/40" />
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 rounded-xl border-2 border-slate/20 focus:border-amber focus:ring-amber/20 transition-all duration-200"
                    {...loginForm.register('password')}
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
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber hover:bg-golden hover:text-slate text-white rounded-xl h-12 font-medium transition-all duration-200 shadow-lg hover:shadow-xl mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => switchMode('forgot-password')}
                  className="text-sm text-slate-medium hover:text-amber transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <div className="text-center pt-4 border-t border-slate/10">
                <p className="text-slate-medium text-sm">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="text-amber hover:text-golden font-semibold transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          ) : mode === 'signup' ? (
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-slate font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate/40" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 h-12 rounded-xl border-2 border-slate/20 focus:border-amber focus:ring-amber/20 transition-all duration-200"
                    {...signUpForm.register('email')}
                    disabled={isLoading}
                  />
                </div>
                {signUpForm.formState.errors.email && (
                  <p className="text-sm text-red-500">{signUpForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-slate font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate/40" />
                  <Input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    className="pl-10 pr-10 h-12 rounded-xl border-2 border-slate/20 focus:border-amber focus:ring-amber/20 transition-all duration-200"
                    {...signUpForm.register('password')}
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
                {signUpForm.formState.errors.password && (
                  <p className="text-sm text-red-500">{signUpForm.formState.errors.password.message}</p>
                )}
                <p className="text-xs text-slate/60">
                  Must be at least 8 characters with uppercase, lowercase, and a number
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password" className="text-slate font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate/40" />
                  <Input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10 h-12 rounded-xl border-2 border-slate/20 focus:border-amber focus:ring-amber/20 transition-all duration-200"
                    {...signUpForm.register('confirmPassword')}
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
                {signUpForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500">{signUpForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber hover:bg-golden hover:text-slate text-white rounded-xl h-12 font-medium transition-all duration-200 shadow-lg hover:shadow-xl mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Create Account
                    <User className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>

              <div className="text-center pt-4 border-t border-slate/10">
                <p className="text-slate-medium text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-amber hover:text-golden font-semibold transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          ) : mode === 'forgot-password' ? (
            resetEmailSent ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-golden/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-amber" />
                </div>
                <p className="text-slate-medium mb-6">
                  Please check your email inbox and click the password reset link to create a new password.
                </p>
                <Button
                  onClick={() => switchMode('login')}
                  className="w-full bg-slate hover:bg-slate-medium text-white rounded-xl py-3 font-medium transition-all duration-200"
                >
                  Back to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" className="text-slate font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate/40" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 h-12 rounded-xl border-2 border-slate/20 focus:border-amber focus:ring-amber/20 transition-all duration-200"
                      {...forgotPasswordForm.register('email')}
                      disabled={isLoading}
                    />
                  </div>
                  {forgotPasswordForm.formState.errors.email && (
                    <p className="text-sm text-red-500">{forgotPasswordForm.formState.errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber hover:bg-golden hover:text-slate text-white rounded-xl h-12 font-medium transition-all duration-200 shadow-lg hover:shadow-xl mt-2"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending reset link...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Reset Link
                      <Mail className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>

                <div className="text-center pt-4 border-t border-slate/10">
                  <p className="text-slate-medium text-sm">
                    Remember your password?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-amber hover:text-golden font-semibold transition-colors"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            )
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
