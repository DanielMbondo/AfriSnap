import { useState, useEffect } from 'react';
import { Event, Photo } from '../types';
import { mockDatabase } from '../lib/supabase';

export const useEvents = (photographerId?: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const filteredEvents = photographerId 
        ? mockDatabase.events.filter(e => e.photographerId === photographerId)
        : mockDatabase.events;
      setEvents(filteredEvents);
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

    // Add to mock database
    mockDatabase.events.unshift(newEvent);
    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  };

  return {
    events,
    isLoading,
    createEvent
  };
};