import apiClient from '@/api/httpClient';

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
  orderId?: string;
  rating: number;
  title?: string;
  body?: string;
  images?: string[];
  approved: boolean;
  helpfulCount: number;
  isHelpful?: boolean; // Whether the current user has marked this review as helpful
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  orderId: string;
  productId: string;
  rating: number;
  comment?: string;
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
  // Get reviews for a product with pagination, filters, and search
  async getProductReviews(
    productId: string,
    page: number = 1,
    limit: number = 10,
    sort?: 'rating_desc' | 'rating_asc' | 'latest' | 'oldest',
    filter?: 'all' | 'photos' | 'verified' | '5stars',
    searchQuery?: string,
    rating?: number | null,
    signal?: AbortSignal
  ): Promise<ReviewsResponse> {
    const params: any = { page, limit };
    if (sort) params.sort = sort;
    if (filter && filter !== 'all') params.filter = filter;
    if (searchQuery && searchQuery.trim()) params.search = searchQuery.trim();
    if (rating && rating >= 1 && rating <= 5) params.rating = rating;
    const response = await apiClient.get<ReviewsResponse>(
      `/v1/reviews/product/${productId}`,
      { params, signal }
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

  // Create a new review (verified purchase)
  async createReview(data: CreateReviewRequest): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post<{ success: boolean; message: string }>(
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

  // Toggle helpful vote for a review
  async markHelpful(reviewId: string): Promise<{ success: boolean; data: { helpfulCount: number; isHelpful: boolean } }> {
    const response = await apiClient.post<{ success: boolean; data: { helpfulCount: number; isHelpful: boolean } }>(
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

