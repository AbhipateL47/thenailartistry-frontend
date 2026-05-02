import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/services/product.service';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/shared/utils/cn';

interface FeaturedProductsSectionProps {
  products: Product[];
  isLoading?: boolean;
  onQuickView?: (product: Product) => void;
}

export const FeaturedProductsSection = ({
  products,
  isLoading = false,
  onQuickView,
}: FeaturedProductsSectionProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  // Track selected slide for dot indicators
  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
    setSnapCount(emblaApi.scrollSnapList().length);
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (!api || products.length === 0) return;
    const interval = setInterval(() => {
      if (!api.canScrollNext()) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [api, products.length]);

  if (isLoading) {
    return (
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-56 mb-2" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Subtle background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-8 w-2 h-2 bg-pink-300 rounded-full opacity-50 animate-pulse" />
        <div className="absolute top-1/3 right-12 w-1.5 h-1.5 bg-rose-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-1/4 w-2.5 h-2.5 bg-pink-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-1">
              Our Most Loved Sets ✨
            </h2>
            <p className="text-sm text-muted-foreground">Fresh, trending, obsession-worthy</p>
          </div>
          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
            <Link to="/products">View All</Link>
          </Button>
        </div>

        {/* Embla Carousel */}
        <Carousel
          setApi={setApi}
          opts={{ align: 'start', loop: true, dragFree: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {products.map((product, index) => (
              <CarouselItem
                key={product._id}
                className="pl-3 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <ProductCard
                  product={product}
                  onQuickView={onQuickView}
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className="hidden md:flex -left-5 h-9 w-9 border-gray-200 bg-white shadow-md hover:bg-pink-50 hover:border-[#DD2C6C]"
            aria-label="Previous products"
          />
          <CarouselNext
            className="hidden md:flex -right-5 h-9 w-9 border-gray-200 bg-white shadow-md hover:bg-pink-50 hover:border-[#DD2C6C]"
            aria-label="Next products"
          />
        </Carousel>

        {/* Dot indicators */}
        {snapCount > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  i === activeIndex ? 'w-8 bg-[#DD2C6C]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                )}
              />
            ))}
          </div>
        )}

        {/* Mobile "View All" */}
        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" asChild className="w-full max-w-xs">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
