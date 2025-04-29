import React, { useState } from 'react';
import { uploadAvatar } from '../lib/supabase';

export default function ImageUpload() {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const publicUrl = await uploadAvatar(file);
      
      // Reload the page to show the new image
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <label className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
        {uploading ? 'Uploading...' : 'Upload Avatar'}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  );
}