import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/features/products/services/product.service';
import { ProductCard } from '../ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useRef } from 'react';

interface YouMayAlsoLikeSectionProps {
  products: Product[];
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
}

// Product Card Skeleton Component
const ProductCardSkeleton = () => {
  return (
    <div className="flex-shrink-0 w-[200px] md:w-[240px] bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Image */}
      <Skeleton className="w-full aspect-square rounded-t-xl" />

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Title (2 lines) */}
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[70%]" />

        {/* Price + Rating */}
        <div className="flex items-center justify-between pt-1">
          <div className="space-y-1">
            <Skeleton className="h-4 w-16" /> {/* price */}
            <Skeleton className="h-3 w-10" /> {/* strike price */}
          </div>

          <Skeleton className="h-4 w-8" /> {/* ⭐ 4.x */}
        </div>
      </div>
    </div>
  );
};

export const YouMayAlsoLikeSection = ({ 
  products, 
  isLoading = false,
  title = "You May Also Like",
  subtitle = "Discover products that complement your style"
}: YouMayAlsoLikeSectionProps) => {

  // Always take max 5 products
  const visibleProducts = products?.slice(0, 5) || [];

  if (!isLoading && visibleProducts.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 md:mb-16">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {/* ================= MOBILE (Carousel) ================= */}
      <div className="md:hidden">
        <div
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading
            ? [...Array(5)].map((_, index) => (
                <ProductCardSkeleton key={`skeleton-mobile-${index}`} />
              ))
            : visibleProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex-shrink-0 w-[200px]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>

      {/* ================= DESKTOP (Grid) ================= */}
      <div className="hidden md:grid grid-cols-5 gap-4">
        {isLoading
          ? [...Array(5)].map((_, index) => (
              <ProductCardSkeleton key={`skeleton-desktop-${index}`} />
            ))
          : visibleProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </div>
  );
};
