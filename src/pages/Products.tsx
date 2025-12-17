import { useState, useEffect, useRef } from 'react';
import { Filter, X, Grid3x3, List } from 'lucide-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { productService } from '@/services/productService';
import { formatCurrency } from '@/utils/formatCurrency';
import { cn } from '@/lib/utils';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const observerTarget = useRef<HTMLDivElement>(null);
  
  // Get category from URL params
  const categoryParam = searchParams.get('category');
  
  // Debounce price range
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 500);
    return () => clearTimeout(timer);
  }, [priceRange]);
  
  // Set category from URL param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [categoryParam]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['products', debouncedPriceRange, selectedCategories],
    queryFn: ({ pageParam = 1 }) =>
      productService.getProducts({
        page: pageParam,
        limit: 12,
        minPrice: debouncedPriceRange[0],
        maxPrice: debouncedPriceRange[1],
        category: selectedCategories.length === 1 ? selectedCategories[0] : undefined,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedProducts = allPages.reduce((acc, page) => acc + page.products.length, 0);
      return loadedProducts < lastPage.total ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
  
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };
  
  const applyFilters = () => {
    setMobileFiltersOpen(false);
  };

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];
  const totalProducts = data?.pages[0]?.total ?? 0;

  const categories = ['Wedding', 'Party', 'Casual', 'Designer', 'French', 'Ombre'];
  const lengths = ['Short', 'Medium', 'Long'];
  const shapes = ['Almond', 'Coffin', 'Square', 'Oval'];

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-secondary border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">Browse our complete collection</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <Slider
                  min={0}
                  max={5000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatCurrency(priceRange[0])}</span>
                  <span>{formatCurrency(priceRange[1])}</span>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-4">Category</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center gap-2">
                      <Checkbox 
                        id={`cat-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <Label htmlFor={`cat-${category}`} className="cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Length */}
              <div>
                <h3 className="font-semibold mb-4">Length</h3>
                <div className="space-y-3">
                  {lengths.map((length) => (
                    <div key={length} className="flex items-center gap-2">
                      <Checkbox id={`len-${length}`} />
                      <Label htmlFor={`len-${length}`} className="cursor-pointer">
                        {length}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shape */}
              <div>
                <h3 className="font-semibold mb-4">Shape</h3>
                <div className="space-y-3">
                  {shapes.map((shape) => (
                    <div key={shape} className="flex items-center gap-2">
                      <Checkbox id={`shape-${shape}`} />
                      <Label htmlFor={`shape-${shape}`} className="cursor-pointer">
                        {shape}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile filter button and view toggle */}
            <div className="lg:hidden mb-6 flex gap-2">
              <Button
                variant="outline"
                onClick={() => setMobileFiltersOpen(true)}
                className="flex-1"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
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
                  `Showing ${allProducts.length} of ${totalProducts} products`
                )}
              </p>
              <select className="hidden sm:block border rounded-lg px-3 py-2 text-sm bg-background">
                <option>Best Selling</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className={cn(
              'gap-6',
              viewMode === 'grid' 
                ? 'grid grid-cols-2 lg:grid-cols-3' 
                : 'flex flex-col space-y-4'
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
                allProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))
              )}
            </div>

            {/* Loading more indicator */}
            {isFetchingNextPage && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {/* Intersection observer target */}
            <div ref={observerTarget} className="h-10" />

            {/* Products count footer */}
            {!isLoading && totalProducts > 0 && (
              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">
                  Showing {allProducts.length} of {totalProducts} products
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setMobileFiltersOpen(false)} 
          />
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-background shadow-lg overflow-y-auto animate-slide-in-right">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <Slider
                  min={0}
                  max={5000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatCurrency(priceRange[0])}</span>
                  <span>{formatCurrency(priceRange[1])}</span>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-4">Category</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center gap-2">
                      <Checkbox 
                        id={`mobile-cat-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <Label htmlFor={`mobile-cat-${category}`} className="cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Length */}
              <div>
                <h3 className="font-semibold mb-4">Length</h3>
                <div className="space-y-3">
                  {lengths.map((length) => (
                    <div key={length} className="flex items-center gap-2">
                      <Checkbox id={`mobile-len-${length}`} />
                      <Label htmlFor={`mobile-len-${length}`} className="cursor-pointer">
                        {length}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shape */}
              <div>
                <h3 className="font-semibold mb-4">Shape</h3>
                <div className="space-y-3">
                  {shapes.map((shape) => (
                    <div key={shape} className="flex items-center gap-2">
                      <Checkbox id={`mobile-shape-${shape}`} />
                      <Label htmlFor={`mobile-shape-${shape}`} className="cursor-pointer">
                        {shape}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply button */}
              <Button 
                onClick={applyFilters}
                className="w-full"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
