import apiClient from '@/api/client';

export interface ProductVariant {
  sku: string;
  price: number;
  mrp: number;
  stock: number;
  attributes: {
    length?: string;
    shape?: string;
    color?: string;
  };
  images?: string[];
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  tags: string[];
  variants: ProductVariant[];
  primaryImage: string;
  gallery: string[];
  ratingAvg: number;
  ratingCount: number;
  isFeatured: boolean;
  isOnSale: boolean;
  salePercent?: number;
  salesData?: {
    soldIn24Hours: number;
    totalStock: number;
    isLowStock: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ProductResponse {
  success: boolean;
  data: Product;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  length?: string;
  shape?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'rating' | 'popular';
  featured?: boolean;
  onSale?: boolean;
  page?: number;
  limit?: number;
}

export const productService = {
  async getProducts(params?: ProductFilters): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params?.length) queryParams.append('length', params.length);
    if (params?.shape) queryParams.append('shape', params.shape);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.featured) queryParams.append('featured', 'true');
    if (params?.onSale) queryParams.append('onSale', 'true');
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await apiClient.get<ProductsResponse>(`/v1/products?${queryParams.toString()}`);
    return response.data;
  },

  async getProduct(idOrSlug: string): Promise<Product> {
    const response = await apiClient.get<ProductResponse>(`/v1/products/${idOrSlug}`);
    return response.data.data;
  },

  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    const response = await apiClient.get<{ success: boolean; data: Product[] }>(
      `/v1/products/featured${limit ? `?limit=${limit}` : ''}`
    );
    return response.data.data;
  },

  async getSaleProducts(limit?: number): Promise<Product[]> {
    const response = await apiClient.get<{ success: boolean; data: Product[] }>(
      `/v1/products/sale${limit ? `?limit=${limit}` : ''}`
    );
    return response.data.data;
  },

  // Helper to get the lowest price from variants
  getLowestPrice(product: Product): number {
    if (!product.variants || product.variants.length === 0) return 0;
    return Math.min(...product.variants.map(v => v.price));
  },

  // Helper to get the original MRP from variants
  getLowestMrp(product: Product): number {
    if (!product.variants || product.variants.length === 0) return 0;
    return Math.min(...product.variants.map(v => v.mrp));
  },

  // Helper to check if product is in stock
  isInStock(product: Product): boolean {
    if (!product.variants || product.variants.length === 0) return false;
    return product.variants.some(v => v.stock > 0);
  },
};
