import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Image, Check, AlertCircle } from 'lucide-react';

interface UploadPhotosModalProps {
  eventId: string;
  onClose: () => void;
  onUploadComplete: (photos: any[]) => void;
}

export const UploadPhotosModal: React.FC<UploadPhotosModalProps> = ({ 
  eventId, 
  onClose, 
  onUploadComplete 
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setSelectedFiles(prev => [...prev, ...imageFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const uploadedPhotos = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Create object URL for preview
      const url = URL.createObjectURL(file);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPhoto = {
        id: Date.now().toString() + i,
        eventId,
        url,
        thumbnail: url,
        uploadedAt: new Date(),
        faces: [],
        tags: [],
        isApproved: true,
        downloads: 0,
        purchases: 0,
        fileName: file.name
      };

      uploadedPhotos.push(newPhoto);
      setUploadProgress(((i + 1) / selectedFiles.length) * 100);
    }

    // Add to mock database
    const { mockDatabase } = await import('../../lib/supabase');
    const event = mockDatabase.events.find(e => e.id === eventId);
    if (event) {
      event.photos.push(...uploadedPhotos);
      event.stats.totalPhotos += uploadedPhotos.length;
    }

    setIsUploading(false);
    onUploadComplete(uploadedPhotos);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Upload Photos</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
          {/* Upload Area */}
          <div className="mb-6">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">Upload Event Photos</p>
                <p className="text-gray-600">Drag and drop photos here, or click to browse</p>
                <p className="text-sm text-gray-500">Supports JPG, PNG, HEIC up to 50MB each</p>
              </div>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                <Upload className="h-4 w-4 inline mr-2" />
                Choose Photos
              </button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Selected Photos ({selectedFiles.length})
              </h3>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Image className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Uploading photos...</span>
                <span className="text-sm text-gray-500">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Upload Settings */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">Upload Settings</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Photos will be automatically processed for face recognition and made available to event participants.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {selectedFiles.length > 0 && `${selectedFiles.length} photo${selectedFiles.length > 1 ? 's' : ''} selected`}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || isUploading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Upload Photos</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};