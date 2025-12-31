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

export interface OrderIntentRequest {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress;
  paymentMethod: 'card' | 'upi' | 'netbanking';
  guestEmail?: string;
  guestPhone?: string;
}

export interface OrderIntentResponse {
  success: boolean;
  data: {
    orderIntentId: string;
    amount: number;
    currency: string;
    status: string;
    expiresAt: string;
    cartSnapshot: {
      items: Array<{
        productId: string;
        variantSku?: string;
        title: string;
        qty: number;
        unitPrice: number;
        totalPrice: number;
        image: string;
      }>;
      subtotal: number;
      shippingFee: number;
      tax: number;
      discount: number;
      grandTotal: number;
    };
    shippingAddress: ShippingAddress;
    billingAddress: ShippingAddress;
    paymentMethod: string;
    createdAt: string;
    guestEmail?: string;
    guestPhone?: string;
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
  async createOrderIntent(orderData: OrderIntentRequest): Promise<OrderIntentResponse> {
    const response = await apiClient.post<OrderIntentResponse>('/v1/orders/intent', orderData);
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

  async trackOrder(orderNumber: string): Promise<Order> {
    const response = await apiClient.get<{
      success: boolean;
      data: Order;
    }>(`/v1/orders/track/${orderNumber}`);
    return response.data.data;
  },
};

