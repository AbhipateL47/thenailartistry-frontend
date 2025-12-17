import apiClient from '@/api/client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  inStock: boolean;
  rating?: number;
  reviews?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

// Dummy products data
const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Glitter Calling Nails',
    description: 'Stunning glitter press-on nails perfect for any occasion',
    price: 1499,
    salePrice: 1199,
    images: ['https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop'],
    category: 'Designer',
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Wedding Elegance Set',
    description: 'Elegant white and gold nails for your special day',
    price: 2499,
    images: ['https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500&h=500&fit=crop'],
    category: 'Wedding',
    inStock: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: '3',
    name: 'French Manicure Classic',
    description: 'Timeless French tip design in premium quality',
    price: 999,
    images: ['https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500&h=500&fit=crop'],
    category: 'French',
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: '4',
    name: 'Party Pink Glam',
    description: 'Bold pink with rhinestone accents for party nights',
    price: 1799,
    salePrice: 1399,
    images: ['https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&h=500&fit=crop'],
    category: 'Party',
    inStock: true,
    rating: 4.6,
    reviews: 98,
  },
  {
    id: '5',
    name: 'Ombre Sunset Dreams',
    description: 'Beautiful gradient from pink to orange',
    price: 1299,
    images: ['https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=500&h=500&fit=crop'],
    category: 'Ombre',
    inStock: true,
    rating: 4.8,
    reviews: 203,
  },
  {
    id: '6',
    name: 'Casual Nude Naturals',
    description: 'Subtle and sophisticated for everyday wear',
    price: 899,
    images: ['https://images.unsplash.com/photo-1599206676335-193c82b13c9e?w=500&h=500&fit=crop'],
    category: 'Casual',
    inStock: true,
    rating: 4.5,
    reviews: 142,
  },
  {
    id: '7',
    name: 'Designer Marble Art',
    description: 'Unique marble pattern with gold flakes',
    price: 2199,
    images: ['https://images.unsplash.com/photo-1610992015877-d4d31c3fbcc2?w=500&h=500&fit=crop'],
    category: 'Designer',
    inStock: true,
    rating: 4.9,
    reviews: 67,
  },
  {
    id: '8',
    name: 'Festive Holiday Sparkle',
    description: 'Red and green glitter for the holiday season',
    price: 1599,
    salePrice: 1299,
    images: ['https://images.unsplash.com/photo-1612830960786-1c6b8d8b5a2f?w=500&h=500&fit=crop'],
    category: 'Party',
    inStock: true,
    rating: 4.7,
    reviews: 178,
  },
];

export const productService = {
  async getProducts(params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) {
    // Simulate API call with dummy data
    return new Promise<{ products: Product[]; total: number }>((resolve) => {
      setTimeout(() => {
        let filteredProducts = [...DUMMY_PRODUCTS];
        
        // Filter by category
        if (params?.category) {
          filteredProducts = filteredProducts.filter(p => 
            p.category.toLowerCase() === params.category?.toLowerCase()
          );
        }
        
        // Filter by price range
        if (params?.minPrice !== undefined && params?.maxPrice !== undefined) {
          filteredProducts = filteredProducts.filter(p => 
            p.price >= params.minPrice! && p.price <= params.maxPrice!
          );
        }
        
        // Pagination
        const page = params?.page || 1;
        const limit = params?.limit || 12;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
        resolve({
          products: paginatedProducts,
          total: filteredProducts.length,
        });
      }, 500);
    });
  },

  async getProduct(id: string) {
    const response = await apiClient.get<Product>(`/v1/products/${id}`);
    return response.data;
  },

  async getCategories() {
    const response = await apiClient.get<Category[]>('/v1/categories');
    return response.data;
  },

  async getFeaturedProducts() {
    const response = await apiClient.get<Product[]>('/v1/products/featured');
    return response.data;
  },
};
