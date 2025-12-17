import apiClient from '@/api/client';

export interface CartItemAPI {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

export const cartService = {
  async addToCart(productId: string, quantity: number) {
    const response = await apiClient.post<CartItemAPI>('/v1/cart', {
      productId,
      quantity,
    });
    return response.data;
  },

  async getCart() {
    const response = await apiClient.get<{ items: CartItemAPI[] }>('/v1/cart');
    return response.data;
  },

  async updateCartItem(itemId: string, quantity: number) {
    const response = await apiClient.put<CartItemAPI>(`/v1/cart/${itemId}`, {
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
};
