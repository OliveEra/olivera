/*
  # Create storage buckets for portfolio assets
  
  1. New Buckets
    - `portfolio` - For portfolio images and PDFs
    - `avatars` - For profile pictures
  
  2. Security
    - Enable public access for portfolio bucket
    - Enable authenticated access for avatars bucket
*/

-- Create buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('portfolio', 'portfolio', true),
  ('avatars', 'avatars', false);

-- Set up security policies
CREATE POLICY "Public Access" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'portfolio');

CREATE POLICY "Authenticated users can upload portfolio files" 
  ON storage.objects FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "Avatar access for authenticated users" 
  ON storage.objects FOR ALL 
  TO authenticated 
  USING (bucket_id = 'avatars');