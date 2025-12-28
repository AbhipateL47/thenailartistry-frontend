import apiClient from '@/api/client';
import { Product } from './productService';

export interface WishlistResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export interface WishlistToggleResponse {
  success: boolean;
  message: string;
  action: 'added' | 'removed';
  isInWishlist: boolean;
  productId: string;
}

export interface WishlistActionResponse {
  success: boolean;
  message: string;
  action: 'added' | 'removed';
  productId: string;
}

export const wishlistService = {
  // Get user's wishlist
  async getWishlist(): Promise<Product[]> {
    const response = await apiClient.get<WishlistResponse>('/v1/user/wishlist');
    return response.data.data;
  },

  // Add product to wishlist
  async addToWishlist(productId: string): Promise<WishlistActionResponse> {
    const response = await apiClient.post<WishlistActionResponse>(
      `/v1/user/wishlist/${productId}`
    );
    return response.data;
  },

  // Remove product from wishlist
  async removeFromWishlist(productId: string): Promise<WishlistActionResponse> {
    const response = await apiClient.delete<WishlistActionResponse>(
      `/v1/user/wishlist/${productId}`
    );
    return response.data;
  },

  // Toggle product in wishlist
  async toggleWishlist(productId: string): Promise<WishlistToggleResponse> {
    const response = await apiClient.patch<WishlistToggleResponse>(
      `/v1/user/wishlist/${productId}`
    );
    return response.data;
  },

  // Clear wishlist
  async clearWishlist(): Promise<void> {
    await apiClient.delete('/v1/user/wishlist');
  },
};

