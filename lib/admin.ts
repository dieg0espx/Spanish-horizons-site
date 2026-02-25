import { createAdminClient } from '@/lib/supabase/server'

export interface AdminUser {
  id: string
  email: string
  added_by: string | null
  created_at: string
}

/**
 * Check if an email address belongs to an admin user.
 */
export async function isAdmin(email: string): Promise<boolean> {
  const adminClient = createAdminClient()
  if (!adminClient) return false

  const { data, error } = await adminClient
    .from('admin_users')
    .select('id')
    .eq('email', email.toLowerCase())
    .single()

  if (error || !data) return false
  return true
}

/**
 * Get all admin user records.
 */
export async function getAdminUsers(): Promise<AdminUser[]> {
  const adminClient = createAdminClient()
  if (!adminClient) return []

  const { data, error } = await adminClient
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching admin users:', error)
    return []
  }

  return data || []
}

/**
 * Add a new admin user by email.
 */
export async function addAdminUser(email: string, addedBy: string): Promise<AdminUser | null> {
  const adminClient = createAdminClient()
  if (!adminClient) return null

  const { data, error } = await adminClient
    .from('admin_users')
    .insert({ email: email.toLowerCase(), added_by: addedBy })
    .select()
    .single()

  if (error) {
    console.error('Error adding admin user:', error)
    return null
  }

  return data
}

/**
 * Remove an admin user by ID.
 */
export async function removeAdminUser(id: string): Promise<boolean> {
  const adminClient = createAdminClient()
  if (!adminClient) return false

  const { error } = await adminClient
    .from('admin_users')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error removing admin user:', error)
    return false
  }

  return true
}
