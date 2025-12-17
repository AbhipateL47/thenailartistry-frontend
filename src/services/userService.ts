import apiClient from '@/api/client';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender?: 'male' | 'female' | 'other';
  photo?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pinCode: string;
  };
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  deliveryAddress: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  isDefault?: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  newsletters: boolean;
}

// Mock data for development
const mockProfile: UserProfile = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah@example.com',
  phone: '+1 234 567 8900',
  gender: 'female',
  photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  address: {
    street: '123 Beauty Lane',
    city: 'Los Angeles',
    state: 'CA',
    pinCode: '90001',
  },
};

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2025-10-28',
    status: 'delivered',
    total: 89.97,
    items: [
      {
        id: '1',
        name: 'Luxury Press-On Nails - Rose Gold',
        image: '/placeholder.svg',
        quantity: 2,
        price: 29.99,
      },
      {
        id: '2',
        name: 'Nail Care Kit Premium',
        image: '/placeholder.svg',
        quantity: 1,
        price: 29.99,
      },
    ],
    deliveryAddress: '123 Beauty Lane, Los Angeles, CA 90001',
  },
  {
    id: 'ORD-002',
    date: '2025-10-15',
    status: 'shipped',
    total: 59.98,
    items: [
      {
        id: '3',
        name: 'French Tip Press-On Set',
        image: '/placeholder.svg',
        quantity: 2,
        price: 29.99,
      },
    ],
    deliveryAddress: '123 Beauty Lane, Los Angeles, CA 90001',
  },
];

const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'Home',
    street: '123 Beauty Lane',
    city: 'Los Angeles',
    state: 'CA',
    pinCode: '90001',
    phone: '+1 234 567 8900',
    isDefault: true,
  },
];

const mockNotificationPrefs: NotificationPreferences = {
  email: true,
  sms: false,
  push: true,
  orderUpdates: true,
  promotions: true,
  newsletters: false,
};

const useMockData = true; // Set to false when real API is ready

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    if (useMockData) {
      return new Promise((resolve) => setTimeout(() => resolve(mockProfile), 800));
    }
    const response = await apiClient.get('/v1/user/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    if (useMockData) {
      return new Promise((resolve) => 
        setTimeout(() => resolve({ ...mockProfile, ...data }), 1000)
      );
    }
    const response = await apiClient.put('/v1/user/profile', data);
    return response.data;
  },

  getOrders: async (): Promise<Order[]> => {
    if (useMockData) {
      return new Promise((resolve) => setTimeout(() => resolve(mockOrders), 1000));
    }
    const response = await apiClient.get('/v1/user/orders');
    return response.data;
  },

  getOrder: async (id: string): Promise<Order> => {
    if (useMockData) {
      const order = mockOrders.find(o => o.id === id);
      return new Promise((resolve) => setTimeout(() => resolve(order!), 800));
    }
    const response = await apiClient.get(`/v1/user/orders/${id}`);
    return response.data;
  },

  getAddresses: async (): Promise<Address[]> => {
    if (useMockData) {
      return new Promise((resolve) => setTimeout(() => resolve(mockAddresses), 800));
    }
    const response = await apiClient.get('/v1/user/addresses');
    return response.data;
  },

  createAddress: async (data: Omit<Address, 'id'>): Promise<Address> => {
    if (useMockData) {
      const newAddress = { ...data, id: Date.now().toString() };
      return new Promise((resolve) => setTimeout(() => resolve(newAddress), 800));
    }
    const response = await apiClient.post('/v1/user/addresses', data);
    return response.data;
  },

  updateAddress: async (id: string, data: Partial<Address>): Promise<Address> => {
    if (useMockData) {
      const updated = { ...mockAddresses.find(a => a.id === id)!, ...data };
      return new Promise((resolve) => setTimeout(() => resolve(updated), 800));
    }
    const response = await apiClient.put(`/v1/user/addresses/${id}`, data);
    return response.data;
  },

  deleteAddress: async (id: string): Promise<void> => {
    if (useMockData) {
      return new Promise((resolve) => setTimeout(() => resolve(), 800));
    }
    await apiClient.delete(`/v1/user/addresses/${id}`);
  },

  getNotificationPreferences: async (): Promise<NotificationPreferences> => {
    if (useMockData) {
      return new Promise((resolve) => 
        setTimeout(() => resolve(mockNotificationPrefs), 800)
      );
    }
    const response = await apiClient.get('/v1/user/notifications');
    return response.data;
  },

  updateNotificationPreferences: async (
    prefs: Partial<NotificationPreferences>
  ): Promise<NotificationPreferences> => {
    if (useMockData) {
      return new Promise((resolve) => 
        setTimeout(() => resolve({ ...mockNotificationPrefs, ...prefs }), 800)
      );
    }
    const response = await apiClient.put('/v1/user/notifications', prefs);
    return response.data;
  },

  changePassword: async (data: { 
    currentPassword: string; 
    newPassword: string; 
  }): Promise<void> => {
    if (useMockData) {
      return new Promise((resolve) => setTimeout(() => resolve(), 1000));
    }
    await apiClient.put('/v1/user/password', data);
  },
};
