import apiClient from '@/api/httpClient';

interface SubscribeResponse {
  success: boolean;
  message: string;
}

export const newsletterService = {
  subscribe: async (email: string): Promise<SubscribeResponse> => {
    const { data } = await apiClient.post<SubscribeResponse>('/api/v1/newsletter/subscribe', {
      email,
      source: 'homepage',
    });
    return data;
  },
};
