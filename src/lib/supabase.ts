import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadAvatar(file: File) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `avatar.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        upsert: true
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
}