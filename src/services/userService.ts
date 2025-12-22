import apiClient from '@/api/client';

export interface Address {
  _id: string;
  label?: string;
  name?: string;
  phone?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  isDefault?: boolean;
}

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    images: string[];
    price: number;
  };
  quantity: number;
  price: number;
  variant?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  newsletters: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  addresses: Address[];
  isEmailVerified: boolean;
  createdAt: string;
}

export const userService = {
  // Profile
  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get('/v1/user/profile');
    return response.data.data;
  },

  async updateProfile(data: { name?: string; phone?: string }): Promise<UserProfile> {
    const response = await apiClient.put('/v1/user/profile', data);
    return response.data.data;
  },

  // Addresses
  async getAddresses(): Promise<Address[]> {
    const response = await apiClient.get('/v1/user/addresses');
    return response.data.data;
  },

  async addAddress(data: Omit<Address, '_id'>): Promise<Address> {
    const response = await apiClient.post('/v1/user/addresses', data);
    return response.data.data;
  },

  async updateAddress(addressId: string, data: Partial<Address>): Promise<Address> {
    const response = await apiClient.put(`/v1/user/addresses/${addressId}`, data);
    return response.data.data;
  },

  async deleteAddress(addressId: string): Promise<void> {
    await apiClient.delete(`/v1/user/addresses/${addressId}`);
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    const response = await apiClient.get('/v1/user/orders');
    return response.data.data;
  },

  async getOrder(orderId: string): Promise<Order> {
    const response = await apiClient.get(`/v1/user/orders/${orderId}`);
    return response.data.data;
  },

  // Notifications
  async getNotificationPreferences(): Promise<NotificationPreferences> {
    const response = await apiClient.get('/v1/user/notifications');
    return response.data.data;
  },

  async updateNotificationPreferences(prefs: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    const response = await apiClient.put('/v1/user/notifications', prefs);
    return response.data.data;
  },

  // Password (using auth endpoint)
  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    await apiClient.put('/v1/auth/password', data);
  },
};
