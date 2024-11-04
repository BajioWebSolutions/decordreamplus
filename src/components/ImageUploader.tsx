import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

export function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center transition-colors hover:border-indigo-300"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        id="room-upload"
      />
      <label
        htmlFor="room-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <div className="mb-4 p-4 bg-indigo-50 rounded-full">
          <ImageIcon className="w-8 h-8 text-indigo-600" />
        </div>
        <p className="text-lg font-medium text-gray-900 mb-2">
          Upload your room photo
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop or click to select
        </p>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>Minimum resolution: 512x512 pixels</li>
          <li>Supported formats: JPG, PNG</li>
          <li>Maximum size: 10MB</li>
        </ul>
      </label>
    </div>
  );
}