import apiClient from '@/api/client';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  role: 'customer' | 'admin' | 'manager';
  addresses?: Address[];
  wishlistCount?: number;
  isEmailVerified?: boolean;
  createdAt?: string;
}

export interface Address {
  _id?: string;
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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface ProfileUpdateData {
  name?: string;
  phone?: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

export const authService = {
  // Register new user
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/v1/auth/register', credentials);
    return response.data;
  },

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/v1/auth/login', credentials);
    return response.data;
  },

  // Get current user
  async getMe(): Promise<{ success: boolean; data: { user: User } }> {
    const response = await apiClient.get('/v1/auth/me');
    return response.data;
  },

  // Update profile
  async updateProfile(data: ProfileUpdateData): Promise<{ success: boolean; message: string; data: { user: User } }> {
    const response = await apiClient.put('/v1/auth/profile', data);
    return response.data;
  },

  // Change password
  async changePassword(data: PasswordChangeData): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.put('/v1/auth/password', data);
    return response.data;
  },

  // Logout (clears cookie on server)
  async logout(): Promise<void> {
    await apiClient.post('/v1/auth/logout');
  },

  // Delete account (soft delete)
  async deleteAccount(password: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete('/v1/auth/account', { data: { password } });
    return response.data;
  },
};
