import React, { useState, useRef } from 'react';
import { X, Camera, Upload, Search } from 'lucide-react';

interface FaceSearchModalProps {
  onClose: () => void;
  onSearch: (faceData: string) => void;
}

export const FaceSearchModal: React.FC<FaceSearchModalProps> = ({ onClose, onSearch }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    if (uploadedImage) {
      // Simulate AI face recognition search
      setTimeout(() => {
        alert('Face recognition search completed! Found 12 photos with matching faces.');
      }, 2000);
      onSearch(uploadedImage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Find Your Photos</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Upload a selfie and our AI will find all photos containing your face in this gallery.
          </p>
          
          {!uploadedImage ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-gray-600">Upload a clear photo of yourself</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <span className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <Upload className="h-4 w-4" />
                      <span>Choose Photo</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden">
                <img
                  src={uploadedImage}
                  alt="Uploaded selfie"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => {
                  setUploadedImage(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Upload Different Photo
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSearch}
            disabled={!uploadedImage}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Find Photos</span>
          </button>
        </div>
      </div>
    </div>
  );
};