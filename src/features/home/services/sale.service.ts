import apiClient from '@/api/httpClient';

export interface SaleBanner {
  image: string;
  imageAlt?: string;
  placement: 'desktop' | 'mobile' | 'square';
  order: number;
}

export interface Sale {
  _id: string;
  heading: string;
  description: string;
  couponCode?: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  imageAlt?: string;
  order: number;
  isActive: boolean;
  validFrom?: string;
  validTill?: string;
  placement?: 'homeHero' | 'homeMid' | 'productPage';
  banners?: SaleBanner[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SalesResponse {
  success: boolean;
  data: Sale[];
}

export const saleService = {
  // Get active sales for banner display
  async getActiveSales(
    placement: 'homeHero' | 'homeMid' | 'productPage' = 'homeHero',
    signal?: AbortSignal
  ): Promise<Sale[]> {
    try {
      const response = await apiClient.get<SalesResponse>(
        `/api/v1/sales/active?placement=${placement}`,
        { signal }
      );
      return response.data.data || [];
    } catch (error) {
      // If API doesn't exist yet, return empty array
      console.warn('Sales API not available, returning empty array');
      return [];
    }
  },
};
