import apiClient from '@/api/client';

export interface Announcement {
  _id: string;
  text: string;
  order: number;
  enabled?: boolean;
}

export interface AnnouncementsResponse {
  success: boolean;
  announcements: Announcement[];
}

export const announcementService = {
  /**
   * Get all active announcements for the marquee
   */
  async getAnnouncements(): Promise<Announcement[]> {
    try {
      const response = await apiClient.get<AnnouncementsResponse>('/v1/announcements');
      return response.data.announcements || [];
    } catch (error) {
      console.error('Error fetching announcements:', error);
      // Return fallback announcements if API fails
      return [
        { _id: '1', text: 'Festive Sale Ending Soon - Shop Now!', order: 0 },
        { _id: '2', text: 'Woww! Getting 20% off on design nails', order: 1 },
      ];
    }
  },
};

