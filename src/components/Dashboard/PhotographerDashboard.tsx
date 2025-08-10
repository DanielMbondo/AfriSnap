import React, { useState } from 'react';
import { 
  Plus, 
  BarChart3, 
  Calendar, 
  Users, 
  DollarSign, 
  Camera,
  Eye,
  Download,
  TrendingUp
} from 'lucide-react';
import { useEvents } from '../../hooks/useEvents';
import { EventCard } from './EventCard';
import { CreateEventModal } from './CreateEventModal';
import { StatsCard } from './StatsCard';

interface PhotographerDashboardProps {
  onViewGallery: () => void;
}

export const PhotographerDashboard: React.FC<PhotographerDashboardProps> = ({ onViewGallery }) => {
  const { events, isLoading, createEvent } = useEvents();
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalStats = events.reduce((acc, event) => ({
    photos: acc.photos + event.stats.totalPhotos,
    views: acc.views + event.stats.totalViews,
    downloads: acc.downloads + event.stats.totalDownloads,
    revenue: acc.revenue + event.stats.totalRevenue
  }), { photos: 0, views: 0, downloads: 0, revenue: 0 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your events and track performance</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Event</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Photos"
          value={totalStats.photos.toString()}
          icon={Camera}
          color="blue"
          trend="+12%"
        />
        <StatsCard
          title="Total Views"
          value={totalStats.views.toLocaleString()}
          icon={Eye}
          color="emerald"
          trend="+8%"
        />
        <StatsCard
          title="Downloads"
          value={totalStats.downloads.toString()}
          icon={Download}
          color="orange"
          trend="+15%"
        />
        <StatsCard
          title="Revenue"
          value={`$${totalStats.revenue.toFixed(2)}`}
          icon={DollarSign}
          color="purple"
          trend="+23%"
        />
      </div>

      {/* Events Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Events</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              All Events
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Active
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Completed
            </button>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-500 mb-4">Create your first event to start managing photos</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Create Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <EventCard key={event.id} event={event} onViewGallery={onViewGallery} />
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateEventModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={async (eventData) => {
            await createEvent(eventData);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
};