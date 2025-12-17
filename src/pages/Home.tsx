import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/services/productService';

// Mock data for demo
const featuredProducts: Product[] = [
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

const categories = [
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

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Soft Gel Presson
              <br />
              <span className="text-primary-foreground/90">Nails</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
              Reusable Press-on Nails
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full shadow-lg hover:shadow-pink font-semibold"
              asChild
            >
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-20">
          <img
            src="https://images.unsplash.com/photo-1599206676335-193c82b13c9e?w=800"
            alt="Nails"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 animate-slide-up">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Salon Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Professional results at home
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Quick Application</h3>
                <p className="text-sm text-muted-foreground">
                  Ready in just 3 steps
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-primary/10 p-3 rounded-lg">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Reusable Design</h3>
                <p className="text-sm text-muted-foreground">
                  Use multiple times
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Trending press-on nail designs</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Occasion</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="group relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-pink transition-all animate-scale-in"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img
                src="https://images.unsplash.com/photo-1599206676335-193c82b13c9e?w=600"
                alt="Nail application"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold mb-6">Why The Nail Artistry?</h2>
              <p className="text-muted-foreground mb-6">
                At The Nail Artistry, we believe everyone deserves beautiful, salon-quality nails
                without the time and expense of regular manicures. Our hand-crafted press-on
                nails combine style, convenience, and quality.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="bg-primary rounded-full p-1 mt-0.5">
                    <ArrowRight className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span>Over 200 unique designs to choose from</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary rounded-full p-1 mt-0.5">
                    <ArrowRight className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span>Stays put for up to 2-3 weeks</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary rounded-full p-1 mt-0.5">
                    <ArrowRight className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span>20 nail sizes for the perfect fit</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link to="/tutorial">Learn How to Apply</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Subscribe for nail art inspiration, exclusive offers, and be the first to know
            about new designs
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button size="lg" variant="secondary" className="whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
