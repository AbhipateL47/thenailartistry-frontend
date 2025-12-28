import { useState, useEffect, useRef, useCallback } from 'react';
import { Filter, Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { productService, Product } from '@/services/productService';
import { ProductFilters } from '@/components/product/listing/ProductFilters';
import { MobileFilterDrawer } from '@/components/product/listing/MobileFilterDrawer';
import { ProductGrid } from '@/components/product/listing/ProductGrid';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Read filters from URL
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 2000;
  const priceRange = [minPrice, maxPrice];
  
  const selectedCategories = searchParams.get('type')?.split(',').filter(Boolean) || [];
  const selectedLengths = searchParams.get('length')?.split(',').filter(Boolean) || [];
  const selectedShapes = searchParams.get('shape')?.split(',').filter(Boolean) || [];
  const sortBy = searchParams.get('sort') || 'popular';

  // Debounced price range for API calls
  const [debouncedPriceRange, setDebouncedPriceRange] = useState(priceRange);

  // Debounce price range changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 500);
    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);

  // Create a filter key to detect filter changes
  const filterKey = `${debouncedPriceRange[0]}-${debouncedPriceRange[1]}-${selectedCategories.join(',')}-${selectedLengths.join(',')}-${selectedShapes.join(',')}-${sortBy}`;

  // Fetch products
  const fetchProducts = useCallback(async (page: number, append: boolean = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await productService.getProducts({
        page,
        limit: 12,
        minPrice: debouncedPriceRange[0],
        maxPrice: debouncedPriceRange[1],
        category: selectedCategories.length > 0 ? selectedCategories.join(',') : undefined,
        length: selectedLengths.length > 0 ? selectedLengths.join(',') : undefined,
        shape: selectedShapes.length > 0 ? selectedShapes.join(',') : undefined,
        sort: sortBy as any,
      });

      if (append) {
        setProducts((prev) => [...prev, ...response.data]);
      } else {
        setProducts(response.data);
      }

      setTotalProducts(response.pagination?.total || 0);
      setCurrentPage(response.pagination?.page || 1);
      setTotalPages(response.pagination?.pages || 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [debouncedPriceRange, selectedCategories, selectedLengths, selectedShapes, sortBy]);

  // Initial fetch and filter change
  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1, false);
  }, [filterKey]);

  // Load more products
  const loadMore = useCallback(() => {
    if (!isLoadingMore && currentPage < totalPages) {
      fetchProducts(currentPage + 1, true);
    }
  }, [currentPage, totalPages, isLoadingMore, fetchProducts]);

  // Auto load when user reaches the end
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages && !isLoadingMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const currentTarget = loadMoreRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [currentPage, totalPages, isLoadingMore, isLoading, loadMore]);

  // Update URL params without page refresh
  const updateFilters = useCallback((key: string, value: string | null) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      return newParams;
    }, { replace: true });
  }, [setSearchParams]);

  // Handle price range change
  const handlePriceRangeChange = useCallback((range: number[]) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (range[0] === 0) {
        newParams.delete('minPrice');
      } else {
        newParams.set('minPrice', range[0].toString());
      }
      if (range[1] === 2000) {
        newParams.delete('maxPrice');
      } else {
        newParams.set('maxPrice', range[1].toString());
      }
      return newParams;
    }, { replace: true });
  }, [setSearchParams]);

  // Handle category toggle
  const handleCategoryToggle = useCallback((category: string) => {
    const current = searchParams.get('type')?.split(',').filter(Boolean) || [];
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    updateFilters('type', updated.length > 0 ? updated.join(',') : null);
  }, [searchParams, updateFilters]);

  // Handle length toggle
  const handleLengthToggle = useCallback((length: string) => {
    const current = searchParams.get('length')?.split(',').filter(Boolean) || [];
    const updated = current.includes(length)
      ? current.filter((l) => l !== length)
      : [...current, length];
    updateFilters('length', updated.length > 0 ? updated.join(',') : null);
  }, [searchParams, updateFilters]);

  // Handle shape toggle
  const handleShapeToggle = useCallback((shape: string) => {
    const current = searchParams.get('shape')?.split(',').filter(Boolean) || [];
    const updated = current.includes(shape)
      ? current.filter((s) => s !== shape)
      : [...current, shape];
    updateFilters('shape', updated.length > 0 ? updated.join(',') : null);
  }, [searchParams, updateFilters]);

  // Handle sort change
  const handleSortChange = useCallback((sort: string) => {
    updateFilters('sort', sort === 'popular' ? null : sort);
  }, [updateFilters]);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const applyFilters = () => {
    setMobileFiltersOpen(false);
  };

  const hasNextPage = currentPage < totalPages;

  // Build breadcrumb based on active filters
  const getPageTitle = () => {
    if (selectedCategories.length === 1) return `${selectedCategories[0]} Nails`;
    if (selectedShapes.length === 1) return `${selectedShapes[0]} Nails`;
    if (selectedLengths.length === 1) return `${selectedLengths[0]} Nails`;
    return 'All Products';
  };

  // Update page title
  const pageTitle = getPageTitle();
  if (pageTitle === 'All Products') {
    usePageTitle('Shop Premium Press - On Nails - 200+ Designs');
  } else {
    usePageTitle(`${pageTitle} - Premium Press-On Nails`);
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Tablet & Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="scrollbar-thin">
              <ProductFilters
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                selectedLengths={selectedLengths}
                onLengthToggle={handleLengthToggle}
                selectedShapes={selectedShapes}
                onShapeToggle={handleShapeToggle}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile filter button */}
            <div className="md:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setMobileFiltersOpen(true)}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <ProductGrid
              products={products}
              isLoading={isLoading}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalProducts={totalProducts}
              showingCount={products.length}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onClearFilters={handleClearFilters}
            />

            {/* Load More Section */}
            {hasNextPage && !isLoading && (
              <div ref={loadMoreRef} className="mt-10 flex flex-col items-center gap-4">
                {isLoadingMore ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading more products...</span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={loadMore}
                    className="px-8"
                  >
                    Load More
                  </Button>
                )}
              </div>
            )}

            {/* No more products message */}
            {!hasNextPage && products.length > 0 && !isLoading && (
              <div className="mt-10 text-center">
                <p className="text-sm text-muted-foreground">
                  You've seen all {totalProducts} products
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        priceRange={priceRange}
        onPriceRangeChange={handlePriceRangeChange}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        selectedLengths={selectedLengths}
        onLengthToggle={handleLengthToggle}
        selectedShapes={selectedShapes}
        onShapeToggle={handleShapeToggle}
        onApply={applyFilters}
      />
    </div>
  );
}
