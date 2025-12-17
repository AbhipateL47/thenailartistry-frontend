import apiClient from '@/api/client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await apiClient.post<{ token: string; user: User }>('/v1/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await apiClient.post<{ token: string; user: User }>('/v1/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  async logout() {
    localStorage.removeItem('authToken');
  },

  async getCurrentUser() {
    const response = await apiClient.get<User>('/v1/auth/me');
    return response.data;
  },
};
