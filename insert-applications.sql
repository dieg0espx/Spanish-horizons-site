-- =====================================================
-- INSERT TWO NEW ADMISSIONS APPLICATIONS
-- Run this in Supabase SQL Editor (service role)
-- =====================================================

-- Step 1: Create auth user for Krystina (skip if already exists)
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'krystinawt@yahoo.com') THEN
    new_user_id := gen_random_uuid();

    INSERT INTO auth.users (
      instance_id, id, aud, role, email,
      encrypted_password, email_confirmed_at,
      created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data,
      is_super_admin, confirmation_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_user_id,
      'authenticated', 'authenticated',
      'krystinawt@yahoo.com',
      crypt('TempPass123!', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      '{"full_name": "Krystina Tabangcura-Nelson"}'::jsonb,
      false, ''
    );

    INSERT INTO auth.identities (
      id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(),
      new_user_id,
      'krystinawt@yahoo.com',
      jsonb_build_object('sub', new_user_id::text, 'email', 'krystinawt@yahoo.com'),
      'email',
      NOW(), NOW(), NOW()
    );
  END IF;
END $$;

-- Step 2: Create auth user for Lindsey (skip if already exists)
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'lindsey.benj@gmail.com') THEN
    new_user_id := gen_random_uuid();

    INSERT INTO auth.users (
      instance_id, id, aud, role, email,
      encrypted_password, email_confirmed_at,
      created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data,
      is_super_admin, confirmation_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_user_id,
      'authenticated', 'authenticated',
      'lindsey.benj@gmail.com',
      crypt('TempPass123!', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      '{"full_name": "Lindsey Barnes"}'::jsonb,
      false, ''
    );

    INSERT INTO auth.identities (
      id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(),
      new_user_id,
      'lindsey.benj@gmail.com',
      jsonb_build_object('sub', new_user_id::text, 'email', 'lindsey.benj@gmail.com'),
      'email',
      NOW(), NOW(), NOW()
    );
  END IF;
END $$;

-- Step 3: Create profiles for the users (skip if already exists)
INSERT INTO profiles (id, email, full_name)
SELECT id, email, raw_user_meta_data->>'full_name'
FROM auth.users
WHERE email = 'krystinawt@yahoo.com'
  AND NOT EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.users.id);

INSERT INTO profiles (id, email, full_name)
SELECT id, email, raw_user_meta_data->>'full_name'
FROM auth.users
WHERE email = 'lindsey.benj@gmail.com'
  AND NOT EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.users.id);

-- Step 4: Insert Application #1 - Thomas "Kaleo" Nelson
INSERT INTO applications (
  user_id, user_email, status,
  child_full_name, preferred_name, date_of_birth,
  primary_languages, attended_preschool, current_school,
  parent_name, relationship_to_child, parent_email,
  parent_phone, home_address, preferred_communication,
  second_parent_name, second_parent_email, second_parent_phone,
  previous_enrollment, previous_enrollment_details,
  languages_at_home, interest_in_academy, hoping_for,
  seeking_full_time, excited_about, values_important,
  interested_in_continuing, receive_updates,
  how_did_you_find, how_did_you_find_other,
  anything_else,
  submitted_at
)
SELECT
  u.id,
  'krystinawt@yahoo.com',
  'submitted',
  'Thomas Kaleolanimaluikeola Nelson',
  'Kaleo',
  '2021-01-31'::date,
  'English',
  'yes',
  'Guidepost Montessori - Hillsboro',
  'Krystina Tabangcura-Nelson',
  'Mother',
  'krystinawt@yahoo.com',
  '8087798144',
  '4291 SE Oakhurst St, Hillsboro, OR 97123',
  'Text',
  'Jarrod Nelson',
  'nelsojar@hotmail.com',
  '503-502-6716',
  ARRAY[]::text[],
  'No previous enrollment in network',
  'English',
  E'I''m very interested in both the Spanish Immersion and also the Expeditionary learning for Kaleo. Seeing the way my son learns, he''s very hands on and always has to be moving. Though when he finds something that interests him, he can stay on that topic for days, weeks, and longer. I feel this environment is just the perfect fit for him and will help him integrate into the next level of learning more successfully than a traditional kindergarten environment. I would also love for my son to learn Spanish and I look forward to learning it along with him.',
  E'First and foremost, I want Kaleo to learn the core subjects, reading/writing/math. I see that Spanish Horizons does (and really any Kindergarten should be doing) but as I said earlier I really like that this school does expeditionary learning. I''ve had the most success getting Kaleo to learn something new when we''re doing an activity or I make it into a game. Secondly, while the core subjects are important, I do also want Kaleo to learn a second language. Being Hawaiian/Filipino with a non-fluent Hawaiian mother and fluent (Ilocano) Filipino Father, I wish I grew up learning a language in the household. I did not. I studied Hawaiian in middle/high/college but without being around other fluent speakers, I''ve lost that skill. I would love for Kaleo to learn Spanish and I would love to help keep that going in the home. And finally, I feel like the topping on the cake is teaching life skills lessons. This is a thing I like about Montessori and am happy to see that Spanish Horizons school will take it even further with gardening, cooking, etc. Kaleo will love it as he loves to help and be independent!',
  'yes',
  E'So I''ve been looking at other private schools: German International and Valley Catholic were among the top but neither felt quite right. German International had the small class sizes we were looking for, had a nice community feel, and for an extra fee there is extended day care. We also have friends with a son Kaleo''s age going there and they just absolutely love it. But at the end of the day, my husband and I both just could not get excited about our son learning German or Chinese. For Valley Catholic, they have great resources and I was very interested in some of the programs they offered. When we went to the Open House, Kaleo took right to the principal which is just odd because he usually never takes to strangers so quickly and he just loved her. Though on the negative, the class sizes are huge (28 avg for the kindergarten classes) and their afterschool program can only have 50 kids so it''s something you need to sign up for and won''t necessarily get so most likely we would also need to get afterschool care.\n\nSpanish Horizons is the first school that I am just 100% excited about, no hesitations. When I first learned about Spanish Horizons, I felt like I finally found a school that is not just perfect for Kaleo but for us parents as well. I like the small family community feel, the Casita Azul preschool I''ve heard great things about, my husband and I both work at the Intel Jones Farm campus so we work only a few minutes away from the school. And finally, I just think this school and style of learning would be a really great fit for Kaleo.',
  E'What I value most in a school community is having the school/teacher work with us parents if there are any issues. I also like a school that fosters a community. The school Kaleo is at now, they regularly (maybe every other month or so) have events at the school where parents can attend. It''s fun to see the kids do activities in their school environment.',
  true,
  true,
  ARRAY['Other']::text[],
  'Found Cocinarte as I was looking to plan a birthday party for Kaleo and when I went in to talk to Laura, she told me about Spanish Horizons.',
  E'As I said previously, I''ve looked into several kindergartens for Kaleo and none quite seemed to fit right until I learned about Spanish Horizons. I look forward to not just my son but our family being a part of this school community. Whether it be Spanish Horizons or the camps offered during breaks or even the cooking classes, I look forward to seeing what more happens with these schools!',
  NOW()
FROM auth.users u
WHERE u.email = 'krystinawt@yahoo.com';

-- Step 5: Insert Application #2 - Ellis Barnes
INSERT INTO applications (
  user_id, user_email, status,
  child_full_name, preferred_name, date_of_birth,
  primary_languages, attended_preschool, current_school,
  parent_name, relationship_to_child, parent_email,
  parent_phone, home_address, preferred_communication,
  second_parent_name, second_parent_email, second_parent_phone,
  previous_enrollment, previous_enrollment_details,
  languages_at_home, interest_in_academy, hoping_for,
  seeking_full_time, excited_about, values_important,
  interested_in_continuing, receive_updates,
  how_did_you_find, how_did_you_find_other,
  anything_else,
  submitted_at
)
SELECT
  u.id,
  'lindsey.benj@gmail.com',
  'submitted',
  'Ellis Barnes',
  NULL,
  '2021-09-15'::date,
  'English',
  'yes',
  'Casita Azul 4',
  'Lindsey Barnes',
  'Mother',
  'lindsey.benj@gmail.com',
  '8185773835',
  '3840 NW 171st Place, Beaverton, Oregon 97006',
  'Text',
  'Matt Barnes',
  'mwbarnesy@gmail.com',
  '7073266611',
  ARRAY['Casita Azul Spanish Immersion Program']::text[],
  NULL,
  'English',
  'Our last 2.5 years in your program have been amazing and fruitful. We are hoping to possibly continue that as Ellis gets older.',
  'Community and love for Learning, learn emotional regulation and continue her bilingual journey.',
  'yes',
  'Bilingualism is such a gift and I believe children learn best through project based learning',
  'Consistency, transparency and a true partnership between school and home.',
  true,
  true,
  ARRAY['Casita Azul or Amanecer Academy']::text[],
  NULL,
  NULL,
  '2026-01-24 03:54:00+00'::timestamptz
FROM auth.users u
WHERE u.email = 'lindsey.benj@gmail.com';
