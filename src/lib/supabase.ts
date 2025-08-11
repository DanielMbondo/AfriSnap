import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock database for demo purposes
export const mockDatabase = {
  users: [
    {
      id: '1',
      email: 'photographer@example.com',
      name: 'John Photographer',
      role: 'photographer',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      email: 'client@example.com',
      name: 'Sarah Client',
      role: 'client',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: new Date('2024-01-15')
    }
  ],
  events: [
    {
      id: '1',
      name: 'Sarah & Mike Wedding',
      description: 'Beautiful outdoor ceremony in Tuscany',
      date: new Date('2024-02-15'),
      photographerId: '1',
      coverImage: 'https://images.pexels.com/photos/1667434/pexels-photo-1667434.jpeg?auto=compress&cs=tinysrgb&w=800',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://afrisnap.app/gallery/1',
      isActive: true,
      photos: [
        {
          id: '1',
          eventId: '1',
          url: 'https://images.pexels.com/photos/1667434/pexels-photo-1667434.jpeg?auto=compress&cs=tinysrgb&w=600',
          thumbnail: 'https://images.pexels.com/photos/1667434/pexels-photo-1667434.jpeg?auto=compress&cs=tinysrgb&w=300',
          uploadedAt: new Date(),
          faces: [],
          tags: ['wedding', 'ceremony'],
          isApproved: true,
          downloads: 5,
          purchases: 2
        },
        {
          id: '2',
          eventId: '1',
          url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
          thumbnail: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=300',
          uploadedAt: new Date(),
          faces: [],
          tags: ['wedding', 'reception'],
          isApproved: true,
          downloads: 3,
          purchases: 1
        }
      ],
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
    }
  ]
}