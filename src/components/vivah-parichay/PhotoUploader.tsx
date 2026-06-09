'use client';

import React, { useState, useRef } from 'react';

interface PhotoUploaderProps {
  photoUrl: string;
  onPhotoChange: (base64Url: string) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photoUrl, onPhotoChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    // Check type
    if (!file.type.startsWith('image/')) {
      setError('कृपया वैध फोटो निवडा (फक्त JPG, Jpeg किंवा PNG)');
      return;
    }

    // Check size (max 5MB to preserve local storage limits safely)
    if (file.size > 5 * 1024 * 1024) {
      setError('कृपया लहान आकाराचा फोटो अपलोड करा (कमाल ५ एमबी)');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onPhotoChange(base64String);
    };
    reader.onerror = () => {
      setError('फोटो लोड करताना त्रुटी आली. कृपया नंतर पुन्हा प्रयत्न करा.');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    onPhotoChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerUpload}
        className={`w-full h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 transition-all cursor-pointer ${
          isDragging
            ? 'border-amber-500 bg-amber-50/40 text-amber-900 scale-[0.99]'
            : 'border-zinc-300 hover:border-amber-500 hover:bg-zinc-50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="photo-uploader-input"
        />

        {photoUrl ? (
          <div className="relative w-full h-full flex items-center justify-center group" onClick={(e) => e.stopPropagation()}>
            <img
              src={photoUrl}
              alt="Candidate Thumbnail Preview"
              className="max-h-full max-w-full rounded-lg object-contain shadow-sm border border-zinc-200"
            />
            {/* Hover Actions Sheet */}
            <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-2">
              <button
                type="button"
                onClick={triggerUpload}
                className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium shadow-md"
              >
                बदला (Change)
              </button>
              <button
                type="button"
                onClick={removePhoto}
                className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium shadow-md"
              >
                काढून टाका (Remove)
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-2 pointer-events-none">
            <span className="text-4xl">📸</span>
            <div className="font-semibold text-sm text-zinc-700">
              इथे फोटो ड्रॅग करा किंवा कॉम्प्युटर मधून निवडा
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              (Drag and drop portrait photo or click to browse)
            </p>
            <div className="text-[10px] text-zinc-400">
              कमाल वय ५ एमबी. शिफारस केलेले प्रमाण: १२00 x १५00 (किमान ८00 x १०00)
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 font-medium font-sans">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
};
