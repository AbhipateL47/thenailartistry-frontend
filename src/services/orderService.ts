import apiClient from '@/api/client';
import { CartItem } from '@/contexts/CartContext';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderRequest {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress;
  paymentMethod: 'cod' | 'card' | 'upi' | 'netbanking';
  paymentDetails?: object;
  guestEmail?: string;
  guestPhone?: string;
}

export interface OrderResponse {
  success: boolean;
  data: {
    orderNumber: string;
    orderId: string;
    grandTotal: number;
    status: string;
  };
}

export interface Order {
  _id: string;
  orderNumber: string;
  userId?: string;
  guestEmail?: string;
  guestPhone?: string;
  items: Array<{
    productId: string;
    variantSku?: string;
    title: string;
    qty: number;
    unitPrice: number;
    totalPrice: number;
    image: string;
  }>;
  shippingAddress: ShippingAddress;
  billingAddress: ShippingAddress;
  subTotal: number;
  shippingFee: number;
  discount: number;
  tax: number;
  grandTotal: number;
  status: string;
  payment: {
    method: string;
    status: string;
    amount: number;
  };
  createdAt: string;
  updatedAt: string;
}

export const orderService = {
  async createOrder(orderData: OrderRequest): Promise<OrderResponse> {
    const response = await apiClient.post<OrderResponse>('/v1/orders', orderData);
    return response.data;
  },

  async getOrderByNumber(orderNumber: string, email?: string): Promise<Order> {
    const params = email ? { email } : {};
    const response = await apiClient.get<{ success: boolean; data: Order }>(
      `/v1/orders/${orderNumber}`,
      { params }
    );
    return response.data.data;
  },

  async trackOrder(orderNumber: string): Promise<{
    orderNumber: string;
    status: string;
    createdAt: string;
    grandTotal: number;
    itemCount: number;
  }> {
    const response = await apiClient.get<{
      success: boolean;
      data: {
        orderNumber: string;
        status: string;
        createdAt: string;
        grandTotal: number;
        itemCount: number;
      };
    }>(`/v1/orders/track/${orderNumber}`);
    return response.data.data;
  },
};

