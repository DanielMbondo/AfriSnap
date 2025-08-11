import React, { useState } from 'react';
import { Check, Download, Heart, Maximize } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  thumbnail: string;
}

interface PhotoGridProps {
  photos: Photo[];
  selectedPhotos: string[];
  onSelectionChange: (photos: string[]) => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ 
  photos, 
  selectedPhotos, 
  onSelectionChange 
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const toggleSelection = (photoId: string) => {
    if (selectedPhotos.includes(photoId)) {
      onSelectionChange(selectedPhotos.filter(id => id !== photoId));
    } else {
      onSelectionChange([...selectedPhotos, photoId]);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => {
          const isSelected = selectedPhotos.includes(photo.id);
          
          return (
            <div key={photo.id} className="relative group">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={photo.thumbnail}
                  alt={`Photo ${photo.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300">
                  <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setSelectedPhoto(photo)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <Maximize className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = photo.url;
                        link.download = `photo-${photo.id}.jpg`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <Download className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2">
                  <button
                    onClick={() => toggleSelection(photo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600'
                        : 'bg-white bg-opacity-80 border-gray-300'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Image Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedPhoto.url}
              alt={`Photo ${selectedPhoto.id}`}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};