import apiClient from '@/api/client';

export interface Feature {
  _id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
}

interface FeaturesResponse {
  success: boolean;
  count: number;
  data: Feature[];
}

export const featureService = {
  // Get all active features
  getFeatures: async (): Promise<Feature[]> => {
    const response = await apiClient.get<FeaturesResponse>('/v1/features');
    return response.data.data;
  },
};

