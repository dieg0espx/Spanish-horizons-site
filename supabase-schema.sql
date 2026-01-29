-- Supabase SQL Schema for Spanish Horizons Academy Applications
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'interview_scheduled', 'admitted', 'waitlist', 'declined')),

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

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON applications(submitted_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

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

-- Grant permissions (run these if needed)
-- GRANT ALL ON applications TO authenticated;
-- GRANT ALL ON applications TO service_role;
