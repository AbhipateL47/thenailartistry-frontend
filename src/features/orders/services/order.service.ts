import apiClient from '@/api/httpClient';
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
  tracking?: {
    courier: string;
    trackingId: string;
    trackingUrl?: string;
  };
  shippedAt?: string;
  deliveredAt?: string;
  refundStatus?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}

export const orderService = {
  async createOrderIntent(orderData: OrderIntentRequest): Promise<OrderIntentResponse> {
    const response = await apiClient.post<OrderIntentResponse>('/api/v1/orders/intent', orderData);
    return response.data;
  },

  async getOrderByNumber(orderNumber: string, email?: string, signal?: AbortSignal): Promise<Order> {
    const params = email ? { email } : {};
    const response = await apiClient.get<{ success: boolean; data: Order }>(
      `/api/v1/orders/${orderNumber}`,
      { params }
    );
    return response.data.data;
  },

  async trackOrder(orderNumber: string, signal: AbortSignal): Promise<Order> {
    const response = await apiClient.get<{
      success: boolean;
      data: Order;
    }>(`/api/v1/orders/track/${orderNumber}`);
    return response.data.data;
  },

  async cancelOrder(orderId: string): Promise<{ success: boolean; message: string; data: any }> {
    const response = await apiClient.put<{
      success: boolean;
      message: string;
      data: {
        orderId: string;
        orderNumber: string;
        status: string;
        cancelledAt: string;
        refundStatus?: string;
      };
    }>(`/api/v1/user/orders/${orderId}/cancel`);
    return response.data;
  },

  // Get order ID by orderNumber from user's orders
  async getOrderIdByOrderNumber(orderNumber: string): Promise<string | null> {
    try {
      // Import userService here to avoid circular dependency
      const { userService } = await import('@/features/profile/services/user.service');
      const response = await userService.getOrders(1, 100); // Get first 100 orders to find the one we need
      const foundOrder = response.data.find(o => o.orderNumber === orderNumber);
      return (foundOrder as any)?._id || foundOrder?._id || null;
    } catch (error) {
      console.error('Error getting order ID:', error);
      return null;
    }
  },
};

