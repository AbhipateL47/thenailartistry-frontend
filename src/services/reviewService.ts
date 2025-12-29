import apiClient from '@/api/client';

export interface Review {
  _id: string;
  productId: string | {
    _id: string;
    name: string;
    slug: string;
    primaryImage?: string;
  };
  userId: string | {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  rating: number;
  title?: string;
  body?: string;
  images?: string[];
  approved: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  productId: string;
  rating: number;
  title?: string;
  body?: string;
  images?: string[];
}

export interface UpdateReviewRequest {
  rating?: number;
  title?: string;
  body?: string;
  images?: string[];
}

export interface ReviewsResponse {
  success: boolean;
  data: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const reviewService = {
  // Get reviews for a product with pagination
  async getProductReviews(
    productId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ReviewsResponse> {
    const response = await apiClient.get<ReviewsResponse>(
      `/v1/reviews/product/${productId}`,
      {
        params: { page, limit },
      }
    );
    return response.data;
  },

  // Get single review
  async getReview(reviewId: string): Promise<{ success: boolean; data: Review }> {
    const response = await apiClient.get<{ success: boolean; data: Review }>(
      `/v1/reviews/${reviewId}`
    );
    return response.data;
  },

  // Create a new review
  async createReview(data: CreateReviewRequest): Promise<{ success: boolean; message: string; data: Review }> {
    const response = await apiClient.post<{ success: boolean; message: string; data: Review }>(
      '/v1/reviews',
      data
    );
    return response.data;
  },

  // Update a review
  async updateReview(
    reviewId: string,
    data: UpdateReviewRequest
  ): Promise<{ success: boolean; message: string; data: Review }> {
    const response = await apiClient.put<{ success: boolean; message: string; data: Review }>(
      `/v1/reviews/${reviewId}`,
      data
    );
    return response.data;
  },

  // Delete a review
  async deleteReview(reviewId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      `/v1/reviews/${reviewId}`
    );
    return response.data;
  },

  // Mark review as helpful
  async markHelpful(reviewId: string): Promise<{ success: boolean; data: { helpfulCount: number } }> {
    const response = await apiClient.post<{ success: boolean; data: { helpfulCount: number } }>(
      `/v1/reviews/${reviewId}/helpful`
    );
    return response.data;
  },

  // Get user's reviews
  async getMyReviews(page: number = 1, limit: number = 10): Promise<ReviewsResponse> {
    const response = await apiClient.get<ReviewsResponse>(
      '/v1/reviews/user/my-reviews',
      {
        params: { page, limit },
      }
    );
    return response.data;
  },
};

