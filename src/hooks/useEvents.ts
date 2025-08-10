import { useState, useEffect } from 'react';
import { Event, Photo } from '../types';

export const useEvents = (photographerId?: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - in production, this would fetch from API
    const mockEvents: Event[] = [
      {
        id: '1',
        name: 'Sarah & Mike Wedding',
        description: 'Beautiful outdoor ceremony in Tuscany',
        date: new Date('2024-02-15'),
        photographerId: '1',
        coverImage: 'https://images.pexels.com/photos/1667434/pexels-photo-1667434.jpeg?auto=compress&cs=tinysrgb&w=800',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://honcho.app/gallery/1',
        isActive: true,
        photos: [],
        settings: {
          autoApprove: false,
          allowDownloads: true,
          requirePayment: true,
          price: 15.99,
          notificationsEnabled: true
        },
        stats: {
          totalPhotos: 247,
          totalViews: 1542,
          totalDownloads: 89,
          totalRevenue: 1423.11,
          uniqueVisitors: 78
        }
      },
      {
        id: '2',
        name: 'Tech Conference 2024',
        description: 'Annual technology conference with industry leaders',
        date: new Date('2024-01-28'),
        photographerId: '1',
        coverImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://honcho.app/gallery/2',
        isActive: false,
        photos: [],
        settings: {
          autoApprove: true,
          allowDownloads: true,
          requirePayment: false,
          price: 0,
          notificationsEnabled: true
        },
        stats: {
          totalPhotos: 156,
          totalViews: 892,
          totalDownloads: 234,
          totalRevenue: 0,
          uniqueVisitors: 145
        }
      }
    ];

    setTimeout(() => {
      setEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, [photographerId]);

  const createEvent = async (eventData: Partial<Event>) => {
    // Mock creation
    const newEvent: Event = {
      id: Date.now().toString(),
      name: eventData.name || '',
      description: eventData.description || '',
      date: eventData.date || new Date(),
      photographerId: eventData.photographerId || '1',
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://honcho.app/gallery/${Date.now()}`,
      isActive: true,
      photos: [],
      settings: {
        autoApprove: false,
        allowDownloads: true,
        requirePayment: false,
        price: 0,
        notificationsEnabled: true
      },
      stats: {
        totalPhotos: 0,
        totalViews: 0,
        totalDownloads: 0,
        totalRevenue: 0,
        uniqueVisitors: 0
      }
    };

    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  };

  return {
    events,
    isLoading,
    createEvent
  };
};