import apiClient from '@/api/client';

export interface CartItemAPI {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variantSku?: string;
}

export interface CartResponse {
  success: boolean;
  data: {
    items: CartItemAPI[];
  };
}

export const cartService = {
  async addToCart(productId: string, quantity: number, variantSku?: string, price?: number) {
    const response = await apiClient.post<CartResponse>('/v1/cart', {
      productId,
      quantity,
      variantSku,
      price,
    });
    return response.data;
  },

  async getCart(): Promise<CartResponse> {
    const response = await apiClient.get<CartResponse>('/v1/cart');
    return response.data;
  },

  async updateCartItem(itemId: string, quantity: number) {
    const response = await apiClient.put<CartResponse>(`/v1/cart/${itemId}`, {
      quantity,
    });
    return response.data;
  },

  async removeCartItem(itemId: string) {
    await apiClient.delete(`/v1/cart/${itemId}`);
  },

  async clearCart() {
    await apiClient.delete('/v1/cart');
  },

  async syncCart(items: Array<{ productId: string; quantity: number; price: number; variantSku?: string }>) {
    const response = await apiClient.post<CartResponse>('/v1/cart/sync', { items });
    return response.data;
  },
};
