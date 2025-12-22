import apiClient from '@/api/client';

export const uploadService = {
  uploadProfileImage: async (
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await apiClient.post('/v1/upload/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    return response.data.data;
  },

  deleteProfileImage: async (): Promise<void> => {
    await apiClient.delete('/v1/upload/profile');
  },

  uploadProductImages: async (files: File[]): Promise<{ imageUrls: string[] }> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    
    const response = await apiClient.post('/v1/upload/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  uploadReviewImage: async (file: File): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await apiClient.post('/v1/upload/review', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },
};

