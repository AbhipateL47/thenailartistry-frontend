import { Grid3x3, List, ChevronDown, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Product } from '@/services/productService';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalProducts: number;
  showingCount: number;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  onClearFilters?: () => void;
}

const sortOptions = [
  { value: 'popular', label: 'Best Selling' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Top Rated' },
];

export const ProductGrid = ({
  products,
  isLoading,
  viewMode,
  onViewModeChange,
  totalProducts,
  showingCount,
  sortBy = 'popular',
  onSortChange,
  onClearFilters,
}: ProductGridProps) => {
  const currentSort = sortOptions.find((s) => s.value === sortBy) || sortOptions[0];

  return (
    <div className="flex-1">
      {/* Mobile view toggle */}
      <div className="md:hidden mb-6 flex gap-2">
        <div className="flex border rounded-lg overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => onViewModeChange('grid')}
            className="rounded-none"
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => onViewModeChange('list')}
            className="rounded-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            'Loading products...'
          ) : (
            `Showing ${showingCount} of ${totalProducts} products`
          )}
        </p>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden sm:flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
              <span>{currentSort.label}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg border border-gray-200">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onSortChange?.(option.value)}
                className={cn(
                  'cursor-pointer',
                  sortBy === option.value && 'bg-gray-100 font-medium'
                )}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Product Grid or No Products */}
      {!isLoading && products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <SearchX className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md">
            We couldn't find any products matching your filters. Try removing some filters or clear all to see more products.
          </p>
          {onClearFilters && (
            <Button onClick={onClearFilters} variant="outline">
              Remove All Filters
            </Button>
          )}
        </div>
      ) : (
        <div className={cn(
          'gap-6',
          viewMode === 'grid' 
            ? 'grid grid-cols-2 md:grid-cols-3' 
            : 'flex flex-col space-y-2'
        )}>
          {isLoading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} viewMode={viewMode} />
            ))
          )}
        </div>
      )}

      {/* Products count footer */}
      {!isLoading && totalProducts > 0 && (
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {showingCount} of {totalProducts} products
          </p>
        </div>
      )}
    </div>
  );
};
