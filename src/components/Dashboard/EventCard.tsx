import React from 'react';
import { 
  Calendar, 
  Users, 
  Camera, 
  DollarSign, 
  QrCode, 
  Settings,
  ExternalLink,
  MoreVertical
} from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onViewGallery: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewGallery }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleQRCode = () => {
    // Open QR code in new window or show modal
    window.open(event.qrCode, '_blank');
  };

  const handleSettings = () => {
    // Open settings modal (would be implemented)
    alert('Event settings would open here');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Cover Image */}
      <div className="relative h-48">
        <img
          src={event.coverImage}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            event.isActive 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {event.isActive ? 'Active' : 'Completed'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{event.name}</h3>
            <p className="text-gray-600 text-sm">{event.description}</p>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        {/* Event Info */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Camera className="h-4 w-4" />
            <span>{event.stats.totalPhotos} photos</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-blue-600 text-sm font-medium">Views</span>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-xl font-bold text-blue-900">{event.stats.totalViews.toLocaleString()}</span>
          </div>
          <div className="bg-emerald-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-emerald-600 text-sm font-medium">Revenue</span>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-xl font-bold text-emerald-900">${event.stats.totalRevenue.toFixed(0)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1">
            onClick={onViewGallery}
            <ExternalLink className="h-4 w-4" />
            <span>View Gallery</span>
          </button>
          <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
            onClick={handleQRCode}
            <QrCode className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
            onClick={handleSettings}
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};