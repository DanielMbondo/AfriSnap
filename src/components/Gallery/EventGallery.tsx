import React, { useState } from 'react';
import { 
  Search, 
  Camera, 
  Download, 
  Share, 
  QrCode, 
  Filter,
  Heart,
  ShoppingCart,
  User
} from 'lucide-react';
import { FaceSearchModal } from './FaceSearchModal';
import { PhotoGrid } from './PhotoGrid';
import { PaymentModal } from './PaymentModal';

export const EventGallery: React.FC = () => {
  const [showFaceSearch, setShowFaceSearch] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock photos
  const photos = [
    {
      id: '1',
      url: 'https://images.pexels.com/photos/1667434/pexels-photo-1667434.jpeg?auto=compress&cs=tinysrgb&w=600',
      thumbnail: 'https://images.pexels.com/photos/1667434/pexels-photo-1667434.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
      thumbnail: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600',
      thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '4',
      url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
      thumbnail: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '5',
      url: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=600',
      thumbnail: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '6',
      url: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=600',
      thumbnail: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const handlePurchase = () => {
    if (selectedPhotos.length > 0) {
      setShowPayment(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Sarah & Mike Wedding</h1>
            <p className="text-blue-100 text-lg mb-8">February 15, 2024 • Tuscany, Italy</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowFaceSearch(true)}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-50 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Find Your Photos</span>
              </button>
              
              <button className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                <QrCode className="h-5 w-5" />
                <span>Share Gallery</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search photos..."
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{photos.length} photos</span>
            {selectedPhotos.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 font-medium">{selectedPhotos.length} selected</span>
                <button
                  onClick={handlePurchase}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-1 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Purchase</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <PhotoGrid
          photos={photos}
          selectedPhotos={selectedPhotos}
          onSelectionChange={setSelectedPhotos}
        />
      </div>

      {/* Modals */}
      {showFaceSearch && (
        <FaceSearchModal
          onClose={() => setShowFaceSearch(false)}
          onSearch={(faceData) => {
            console.log('Searching for face:', faceData);
            setShowFaceSearch(false);
          }}
        />
      )}

      {showPayment && (
        <PaymentModal
          selectedPhotos={selectedPhotos}
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            setShowPayment(false);
            setSelectedPhotos([]);
          }}
        />
      )}
    </div>
  );
};