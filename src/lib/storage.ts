import { supabase } from './supabase';

export async function uploadPortfolioImage(file: File) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('portfolio')
      .upload(filePath, file, {
        upsert: true
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function uploadCV(file: File) {
  try {
    const fileName = 'cv.pdf';
    const filePath = `documents/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(filePath, file, {
        upsert: true,
        contentType: 'application/pdf'
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading CV:', error);
    throw error;
  }
}