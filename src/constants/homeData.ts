import { Product } from '@/services/productService';

export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'British Wedding Glossy Fake Nails Set',
    description: 'Elegant glossy finish perfect for weddings',
    price: 1299,
    salePrice: 1099,
    images: ['https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500'],
    category: 'wedding',
    inStock: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Purple Lavender Daisies Artificial Nail Set',
    description: 'Cute daisy design with lavender tones',
    price: 899,
    salePrice: 749,
    images: ['https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500'],
    category: 'casual',
    inStock: true,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Shimmering Sunrise Elegance Light Weight',
    description: 'Lightweight design with shimmer',
    price: 1099,
    salePrice: 899,
    images: ['https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500'],
    category: 'party',
    inStock: true,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Golden Chrome Presson Nails Set',
    description: 'Luxurious gold chrome finish',
    price: 1499,
    images: ['https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500'],
    category: 'designer',
    inStock: true,
    rating: 5.0,
  },
];

export const categories = [
  {
    name: 'Wedding',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400',
    href: '/products?category=wedding',
  },
  {
    name: 'Party',
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400',
    href: '/products?category=party',
  },
  {
    name: 'Casual',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
    href: '/products?category=casual',
  },
  {
    name: 'Designer',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400',
    href: '/products?category=designer',
  },
];

