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

export interface ProductAttribute {
  _id: string;
  name: string;
  slug: string;
  values: string[];
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
  filters?: {
    attributes?: ProductAttribute[];
  };
}

export interface ProductResponse {
  success: boolean;
  data: Product;
}

export interface ProductFilters {
  search?: string;
  categoryIds?: string; // Comma-separated category IDs
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'rating' | 'popular';
  isOnSale?: boolean;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  // Dynamic attribute filters (e.g., length, shape, occasion, texture, style)
  [key: string]: string | number | boolean | undefined;
}

export const productService = {
  async getProducts(params?: ProductFilters, signal?: AbortSignal): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();
    
    // System filters (matching backend contract)
    if (params?.search) queryParams.append('search', params.search);
    if (params?.categoryIds) queryParams.append('categoryIds', params.categoryIds);
    if (params?.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.isOnSale === true) queryParams.append('isOnSale', 'true');
    if (params?.isFeatured === true) queryParams.append('isFeatured', 'true');
    if (params?.page !== undefined)
      queryParams.append('page', params.page.toString());
    
    if (params?.limit !== undefined)
      queryParams.append('limit', params.limit.toString());

    // Dynamic attribute filters (length, shape, occasion, texture, style, etc.)
    // These are passed directly as query params using their slug
    const systemParams = ['search', 'categoryIds', 'minPrice', 'maxPrice', 'sort', 'isOnSale', 'isFeatured', 'page', 'limit'];
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (!systemParams.includes(key) && value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      }
    }

    const response = await apiClient.get<ProductsResponse>(`/v1/products?${queryParams.toString()}`, { signal });
    return response.data;
  },

  async getProduct(idOrSlug: string, signal?: AbortSignal): Promise<Product> {
    const response = await apiClient.get<ProductResponse>(`/v1/products/${idOrSlug}`, { signal });
    return response.data.data;
  },

  async getFeaturedProducts(limit?: number, signal?: AbortSignal): Promise<Product[]> {
    const response = await apiClient.get<{ success: boolean; data: Product[] }>(
      `/v1/products/featured${limit ? `?limit=${limit}` : ''}`,
      { signal }
    );
    return response.data.data;
  },

  async getSaleProducts(limit?: number, signal?: AbortSignal): Promise<Product[]> {
    const response = await apiClient.get<{ success: boolean; data: Product[] }>(
      `/v1/products/sale${limit ? `?limit=${limit}` : ''}`,
      { signal }
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
