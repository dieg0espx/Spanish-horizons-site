"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AuthModal } from '@/components/auth-modal'
import type { User, AuthError } from '@supabase/supabase-js'

// MOCK AUTH - DELETE WHEN CONNECTING TO SUPABASE
const MOCK_USERS = [
  {
    id: 'mock-admin-1',
    email: 'aletxa@comcreate.org',
    password: 'Test1234#',
    role: 'admin'
  },
  {
    id: 'mock-user-1',
    email: 'aletxa.pascual@gmail.com',
    password: 'Test1234#',
    role: 'user'
  }
]

const MOCK_MODE = true // Set to false when using Supabase
// END MOCK AUTH

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  openAuthModal: (mode?: 'login' | 'signup') => void
  closeAuthModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'login' | 'signup'>('login')
  const supabase = createClient()

  useEffect(() => {
    // MOCK MODE - Check localStorage for mock session
    if (MOCK_MODE) {
      const mockSession = localStorage.getItem('mock_user')
      if (mockSession) {
        try {
          const userData = JSON.parse(mockSession)
          setUser(userData)
          // Restore cookie for API routes
          if (userData.email) {
            document.cookie = `mock_user_email=${userData.email}; path=/; max-age=86400`
          }
        } catch {
          localStorage.removeItem('mock_user')
          document.cookie = 'mock_user_email=; path=/; max-age=0'
        }
      }
      setLoading(false)
      return
    }
    // END MOCK MODE

    // Skip Supabase if not configured
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    // MOCK MODE - Check mock users
    if (MOCK_MODE) {
      const mockUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )
      if (mockUser) {
        const userObj = {
          id: mockUser.id,
          email: mockUser.email,
          role: mockUser.role,
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as unknown as User
        localStorage.setItem('mock_user', JSON.stringify(userObj))
        // Set cookie for API routes to verify
        document.cookie = `mock_user_email=${mockUser.email}; path=/; max-age=86400`
        setUser(userObj)
        return { error: null }
      }
      return {
        error: {
          message: 'Invalid login credentials',
          status: 400,
        } as AuthError
      }
    }
    // END MOCK MODE

    if (!supabase) {
      return { error: { message: 'Supabase not configured', status: 500 } as AuthError }
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    // MOCK MODE - Add to mock users (in real app, this would persist)
    if (MOCK_MODE) {
      const existingUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      )
      if (existingUser) {
        return {
          error: {
            message: 'User already registered',
            status: 400,
          } as AuthError
        }
      }
      // In mock mode, just sign them in after "signup"
      const userObj = {
        id: `mock-${Date.now()}`,
        email: email,
        role: 'user',
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as unknown as User
      localStorage.setItem('mock_user', JSON.stringify(userObj))
      // Set cookie for API routes to verify
      document.cookie = `mock_user_email=${email}; path=/; max-age=86400`
      setUser(userObj)
      return { error: null }
    }
    // END MOCK MODE

    if (!supabase) {
      return { error: { message: 'Supabase not configured', status: 500 } as AuthError }
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { error }
  }

  const signOut = async () => {
    // MOCK MODE
    if (MOCK_MODE) {
      localStorage.removeItem('mock_user')
      // Clear the mock user cookie
      document.cookie = 'mock_user_email=; path=/; max-age=0'
      setUser(null)
      return { error: null }
    }
    // END MOCK MODE

    if (!supabase) {
      return { error: { message: 'Supabase not configured', status: 500 } as AuthError }
    }
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const openAuthModal = useCallback((mode: 'login' | 'signup' = 'login') => {
    setModalMode(mode)
    setIsModalOpen(true)
  }, [])

  const closeAuthModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, openAuthModal, closeAuthModal }}>
      {children}
      <AuthModal
        isOpen={isModalOpen}
        onClose={closeAuthModal}
        defaultMode={modalMode}
      />
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
