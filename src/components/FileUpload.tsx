import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { uploadPortfolioImage, uploadCV } from '../lib/storage';

interface FileUploadProps {
  type: 'image' | 'pdf';
  onUploadComplete: (url: string) => void;
}

export default function FileUpload({ type, onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select a file to upload.');
      }

      const file = event.target.files[0];
      
      // Validate file type
      if (type === 'image' && !file.type.startsWith('image/')) {
        throw new Error('Please select an image file.');
      }
      if (type === 'pdf' && file.type !== 'application/pdf') {
        throw new Error('Please select a PDF file.');
      }

      // Upload file
      const publicUrl = type === 'image' 
        ? await uploadPortfolioImage(file)
        : await uploadCV(file);
      
      onUploadComplete(publicUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <label className="btn-secondary cursor-pointer">
      {uploading ? 'Uploading...' : `Upload ${type === 'image' ? 'Image' : 'CV'}`}
      <Upload size={20} />
      <input
        type="file"
        accept={type === 'image' ? 'image/*' : 'application/pdf'}
        onChange={handleFileUpload}
        disabled={uploading}
        className="hidden"
      />
    </label>
  );
}