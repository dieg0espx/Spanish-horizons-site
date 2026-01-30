"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AuthModal } from '@/components/auth-modal'
import type { User, AuthError } from '@supabase/supabase-js'

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
