export interface User {
  id: string;
  email: string;
  name: string;
  role: 'photographer' | 'client' | 'editor';
  avatar?: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: Date;
  photographerId: string;
  coverImage?: string;
  qrCode: string;
  isActive: boolean;
  photos: Photo[];
  settings: EventSettings;
  stats: EventStats;
}

export interface Photo {
  id: string;
  eventId: string;
  url: string;
  thumbnail: string;
  uploadedAt: Date;
  faces: FaceDetection[];
  tags: string[];
  isApproved: boolean;
  downloads: number;
  purchases: number;
}

export interface FaceDetection {
  id: string;
  photoId: string;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  similarity: number;
  userId?: string;
}

export interface EventSettings {
  autoApprove: boolean;
  allowDownloads: boolean;
  requirePayment: boolean;
  price: number;
  notificationsEnabled: boolean;
}

export interface EventStats {
  totalPhotos: number;
  totalViews: number;
  totalDownloads: number;
  totalRevenue: number;
  uniqueVisitors: number;
}

export interface PaymentSession {
  id: string;
  eventId: string;
  photoIds: string[];
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  clientEmail: string;
}