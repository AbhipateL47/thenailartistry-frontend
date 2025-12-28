import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/services/productService';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface FeaturedProductsSectionProps {
  products: Product[];
  isLoading?: boolean;
}

export const FeaturedProductsSection = ({ products, isLoading = false }: FeaturedProductsSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality - move one product at a time
  useEffect(() => {
    if (!scrollRef.current || isPaused || products.length === 0) return;

    const scroll = () => {
      if (scrollRef.current) {
        // Get the first product element to calculate width
        const firstProduct = scrollRef.current.querySelector('div[data-product-index]') as HTMLElement;
        if (!firstProduct) return;

        const productWidth = firstProduct.offsetWidth;
        const gap = 24; // gap-6 = 24px
        const scrollAmount = productWidth + gap;
        
        const maxIndex = products.length;
        const nextIndex = (currentIndex + 1) % maxIndex;
        
        scrollRef.current.scrollTo({
          left: nextIndex * scrollAmount,
          behavior: 'smooth'
        });
        
        setCurrentIndex(nextIndex);
        
        // Reset to start when reaching the end (seamless loop)
        if (nextIndex === 0 && scrollRef.current) {
          setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollLeft = 0;
              setCurrentIndex(0);
            }
          }, 600); // After animation completes
        }
      }
    };

    scrollIntervalRef.current = setInterval(scroll, 3000); // Move every 3 seconds

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isPaused, products.length, currentIndex]);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Trending press-on nail designs</p>
            </div>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  // Duplicate products for seamless infinite loop
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Sparkling Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-32 right-20 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-2.5 h-2.5 bg-rose-300 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-pink-300 rounded-full animate-pulse opacity-70" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-32 right-10 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-transparent to-purple-50/20 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Trending press-on nail designs</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/products">View All</Link>
          </Button>
        </div>

        {/* Auto-Scrolling Carousel - Shows 4 products at once */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Products Carousel */}
          <div
            ref={scrollRef}
            className={cn(
              "flex gap-6 overflow-x-hidden scrollbar-hide",
              "scroll-smooth"
            )}
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {duplicatedProducts.map((product, index) => (
              <div 
                key={`${product._id}-${index}`}
                data-product-index={index % products.length}
                className={cn(
                  "flex-shrink-0",
                  "w-[260px] sm:w-[280px] md:w-[300px]"
                )}
              >
                {/* Product Card - Borderless */}
                <div className="relative bg-transparent">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <div className="w-12 h-px bg-[#DD2C6C]/20" />
          <div className="w-2 h-2 rounded-full bg-[#DD2C6C]/30" />
          <div className="w-12 h-px bg-[#DD2C6C]/20" />
        </div>
      </div>
    </section>
  );
};
