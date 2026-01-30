-- Supabase SQL Schema for Spanish Horizons Academy Applications
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- This schema is idempotent - safe to run multiple times

-- =====================================================
-- Profiles Table (extends auth.users)
-- =====================================================
-- This table stores additional user profile information
-- that persists across all applications

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  preferred_language TEXT DEFAULT 'en',
  receive_marketing_emails BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before recreating (makes script idempotent)
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Service role can read all profiles" ON profiles;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Service role can read all profiles (for admin)
CREATE POLICY "Service role can read all profiles"
  ON profiles
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- Applications Table
-- =====================================================

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted',

  -- Section 1: Student Information
  child_full_name TEXT NOT NULL,
  preferred_name TEXT,
  date_of_birth DATE NOT NULL,
  primary_languages TEXT NOT NULL,
  attended_preschool TEXT NOT NULL,
  current_school TEXT,

  -- Section 2: Parent/Guardian Information
  parent_name TEXT NOT NULL,
  relationship_to_child TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  home_address TEXT NOT NULL,
  preferred_communication TEXT NOT NULL,
  second_parent_name TEXT,
  second_parent_email TEXT,
  second_parent_phone TEXT,

  -- Section 3: Previous Enrollment Information
  previous_enrollment TEXT[] DEFAULT '{}',
  previous_enrollment_details TEXT,

  -- Section 4: Family & Educational Background
  languages_at_home TEXT NOT NULL,
  interest_in_academy TEXT NOT NULL,
  hoping_for TEXT NOT NULL,

  -- Section 5: Interest & Intent
  seeking_full_time TEXT NOT NULL,
  excited_about TEXT NOT NULL,
  values_important TEXT NOT NULL,

  -- Section 6: Looking Ahead
  interested_in_continuing BOOLEAN DEFAULT FALSE,
  receive_updates BOOLEAN DEFAULT FALSE,

  -- Section 7: How Did You Find Us?
  how_did_you_find TEXT[] DEFAULT '{}',
  how_did_you_find_other TEXT,

  -- Section 8: Anything Else
  anything_else TEXT,

  -- Admin fields
  interview_date TIMESTAMPTZ,
  interview_notes TEXT,
  admin_notes TEXT,

  -- Metadata
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update status constraint to include all valid statuses
-- First drop the old constraint if it exists, then add the new one
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_status_check;
ALTER TABLE applications ADD CONSTRAINT applications_status_check
  CHECK (status IN ('submitted', 'under_review', 'interview_pending', 'interview_scheduled', 'admitted', 'waitlist', 'rejected', 'declined', 'withdrawn'));

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON applications(submitted_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before recreating (makes script idempotent)
DROP POLICY IF EXISTS "Users can read own applications" ON applications;
DROP POLICY IF EXISTS "Users can insert own applications" ON applications;
DROP POLICY IF EXISTS "Users can update own applications" ON applications;
DROP POLICY IF EXISTS "Service role can read all applications" ON applications;
DROP POLICY IF EXISTS "Service role can update applications" ON applications;

-- Policy: Users can read their own applications
CREATE POLICY "Users can read own applications"
  ON applications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own applications
CREATE POLICY "Users can insert own applications"
  ON applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own applications (for withdrawing)
CREATE POLICY "Users can update own applications"
  ON applications
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Admins can read all applications
-- Note: You'll need to create an admin role or use a service role key for full admin access
-- For now, this allows reading via service role
CREATE POLICY "Service role can read all applications"
  ON applications
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Policy: Service role can update any application
CREATE POLICY "Service role can update applications"
  ON applications
  FOR UPDATE
  USING (auth.role() = 'service_role');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_applications_updated_at ON applications;
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for profiles updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (run these if needed)
-- GRANT ALL ON applications TO authenticated;
-- GRANT ALL ON applications TO service_role;

-- =====================================================
-- Interview Availability Table
-- =====================================================

-- Create interview_availability table
CREATE TABLE IF NOT EXISTS interview_availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE,
  booked_by_application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_interview_availability_date ON interview_availability(date);
CREATE INDEX IF NOT EXISTS idx_interview_availability_is_booked ON interview_availability(is_booked);
CREATE INDEX IF NOT EXISTS idx_interview_availability_booked_by ON interview_availability(booked_by_application_id);

-- Enable Row Level Security (RLS)
ALTER TABLE interview_availability ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before recreating (makes script idempotent)
DROP POLICY IF EXISTS "Anyone can read availability slots" ON interview_availability;
DROP POLICY IF EXISTS "Service role can insert availability" ON interview_availability;
DROP POLICY IF EXISTS "Service role can update availability" ON interview_availability;
DROP POLICY IF EXISTS "Service role can delete availability" ON interview_availability;

-- Policy: Anyone can read availability slots (needed for booking calendar)
CREATE POLICY "Anyone can read availability slots"
  ON interview_availability
  FOR SELECT
  USING (true);

-- Policy: Service role can insert availability slots (admin only via server)
CREATE POLICY "Service role can insert availability"
  ON interview_availability
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Policy: Service role can update availability slots
CREATE POLICY "Service role can update availability"
  ON interview_availability
  FOR UPDATE
  USING (auth.role() = 'service_role');

-- Policy: Service role can delete availability slots
CREATE POLICY "Service role can delete availability"
  ON interview_availability
  FOR DELETE
  USING (auth.role() = 'service_role');

-- =====================================================
-- Architecture Notes
-- =====================================================
-- This schema uses the following structure:
--
-- 1. auth.users (Supabase built-in) - Handles authentication
--    - email, password, etc. managed by Supabase Auth
--
-- 2. profiles - User profile data (1:1 with auth.users)
--    - Stores persistent user preferences
--    - Auto-created via trigger when user signs up
--
-- 3. applications - Admission applications (many per user)
--    - Each application contains complete parent/child info
--    - This denormalized approach is intentional for admissions:
--      * Each application is a snapshot in time
--      * Parent info might differ between applications
--      * Simplifies queries and data management
--
-- 4. interview_availability - Interview time slots (managed by admin)
--    - Links to applications when booked
