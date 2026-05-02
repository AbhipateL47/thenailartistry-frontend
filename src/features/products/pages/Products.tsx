import { useState, useEffect, useRef, useCallback } from 'react';
import { Filter, Loader2, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { productService, Product } from '@/features/products/services/product.service';
import { ProductFilters } from '@/features/products/components/listing/ProductFilters';
import { MobileFilterDrawer } from '@/features/products/components/listing/MobileFilterDrawer';
import { ProductGrid } from '@/features/products/components/listing/ProductGrid';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Log page load
  useEffect(() => {
    console.log('📄 Products Page Loaded');
  }, []);

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [attributes, setAttributes] = useState<Array<{ _id: string; name: string; slug: string; values: string[] }>>([]);
  const [selectedAttributeFilters, setSelectedAttributeFilters] = useState<Record<string, string[]>>({});

  // Read ALL filters from URL - this ensures we react to ANY URL param change
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 2000;
  const priceRange = [minPrice, maxPrice];
  
  const sortBy = searchParams.get('sort') || 'popular';
  const searchQuery = searchParams.get('search') || '';
  const isFeatured = searchParams.get('isFeatured') === 'true';
  const isOnSale = searchParams.get('isOnSale') === 'true';

  // Read ALL dynamic attribute filters from URL (including length, shape, category, etc.)
  useEffect(() => {
    const attributeFilters: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      // Skip system params only
      const systemParams = ['sort', 'minPrice', 'maxPrice', 'page', 'limit', 'search', 'isFeatured', 'isOnSale'];
      if (!systemParams.includes(key) && value) {
        attributeFilters[key] = value.split(',').filter(Boolean);
      }
    });
    setSelectedAttributeFilters(attributeFilters);
  }, [searchParams]);

  // Debounced price range for API calls
  const [debouncedPriceRange, setDebouncedPriceRange] = useState(priceRange);

  // Debounce price range changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 500);
    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);

  // Create a comprehensive filter key that includes ALL URL params
  // This ensures ANY URL change triggers a refetch
  const attributeFilterKey = Object.entries(selectedAttributeFilters)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, values]) => `${key}:${values.join(',')}`)
    .join('|');
  const filterKey = `${debouncedPriceRange[0]}-${debouncedPriceRange[1]}-${sortBy}-${searchQuery}-${isFeatured}-${isOnSale}-${attributeFilterKey}`;

  // Fetch product attributes (separate API call)
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const attrs = await productService.getProductAttributes();
        setAttributes(attrs);
      } catch (error) {
        console.error('Error fetching product attributes:', error);
      }
    };
    fetchAttributes();
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async (page: number, append: boolean = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    try {
      // Build complete filter params from ALL URL params
      const filterParams: any = {
        page,
        limit: 12,
        minPrice: debouncedPriceRange[0],
        maxPrice: debouncedPriceRange[1],
        sort: sortBy as any,
        search: searchQuery || undefined,
        isFeatured: isFeatured || undefined,
        isOnSale: isOnSale || undefined,
      };

      // Add ALL dynamic attribute filters (including length, shape, category, etc.)
      Object.entries(selectedAttributeFilters).forEach(([key, values]) => {
        if (values.length > 0) {
          filterParams[key] = values.join(',');
        }
      });

      const response = await productService.getProducts(filterParams);

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
  }, [debouncedPriceRange, sortBy, selectedAttributeFilters, searchQuery, isFeatured, isOnSale]);

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

  // Handle dynamic attribute filter toggle (includes length, shape, category, etc.)
  const handleAttributeToggle = useCallback((attributeSlug: string, value: string) => {
    const current = searchParams.get(attributeSlug)?.split(',').filter(Boolean) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilters(attributeSlug, updated.length > 0 ? updated.join(',') : null);
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
    // Check if any single attribute filter is active
    const activeFilters = Object.entries(selectedAttributeFilters).filter(([_, values]) => values.length === 1);
    if (activeFilters.length === 1) {
      const [attributeSlug, values] = activeFilters[0];
      const attribute = attributes.find(attr => attr.slug === attributeSlug);
      if (attribute) {
        return `${values[0]} ${attribute.name}`;
      }
    }
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
                attributes={attributes}
                selectedAttributeFilters={selectedAttributeFilters}
                onAttributeToggle={handleAttributeToggle}
                isFeatured={isFeatured}
                onFeaturedToggle={(checked) => updateFilters('isFeatured', checked ? 'true' : null)}
                isOnSale={isOnSale}
                onSaleToggle={(checked) => updateFilters('isOnSale', checked ? 'true' : null)}
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
              searchQuery={searchQuery}
              onClearSearch={() => updateFilters('search', null)}
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
        attributes={attributes}
        selectedAttributeFilters={selectedAttributeFilters}
        onAttributeToggle={handleAttributeToggle}
        isFeatured={isFeatured}
        onFeaturedToggle={(checked) => updateFilters('isFeatured', checked ? 'true' : null)}
        isOnSale={isOnSale}
        onSaleToggle={(checked) => updateFilters('isOnSale', checked ? 'true' : null)}
        onApply={applyFilters}
      />
    </div>
  );
}
