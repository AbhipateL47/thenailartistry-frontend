import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/features/products/services/product.service';
import { ProductGallery } from '@/features/products/components/detail/ProductGallery';
import { ProductInfo, ProductInfoSkeleton } from '@/features/products/components/detail/ProductInfo';
import { FullscreenGalleryModal } from '@/features/products/components/detail/FullscreenGalleryModal';
import { ProductReviewsSection } from '@/features/products/components/detail/ProductReviewsSection';
import { ProductDescription } from '@/features/products/components/detail/ProductDescription';
import { YouMayAlsoLikeSection } from '@/features/products/components/detail/YouMayAlsoLikeSection';
import { RecentlyViewedSection } from '@/features/products/components/detail/RecentlyViewedSection';
import { StickyAddToCartBar } from '@/features/products/components/detail/StickyAddToCartBar';
import { Skeleton } from '@/components/ui/skeleton';
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { useRecentlyViewed } from '@/shared/hooks/useRecentlyViewed';
import { useMetaTags } from '@/shared/hooks/useMetaTags';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>(); // This can be either slug or ID, backend handles both
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Log page load
  useEffect(() => {
    console.log(`📄 Product Detail Page Loaded - Product Slug: ${slug || 'N/A'}`);
  }, [slug]);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: ({ signal }) => productService.getProduct(slug!, signal),
    enabled: !!slug,
  });

  // Fetch product recommendations (You May Also Like)
  const { data: recommendations, isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ['product-recommendations', product?._id],
    queryFn: ({ signal }) => productService.getRecommendations(product!._id, 5, signal),
    enabled: !!product?._id, // Only fetch when product is loaded and has _id
  });

  const recentlyViewed = useRecentlyViewed(product);

  // Update page title
  usePageTitle(product?.name ? `${product.name} - Premium Press-On Nails` : 'Product');
  useMetaTags({
    title: product?.name,
    description: product?.shortDescription || product?.description?.substring(0, 160),
    image: product?.primaryImage,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Skeleton */}
        <Skeleton className="h-4 w-64 mb-6" />

        {/* Product Layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Gallery Skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
          </div>

          {/* Info Skeleton */}
          <ProductInfoSkeleton />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/products" className="text-primary hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 pb-4 md:pb-8">
      <Breadcrumbs
        items={[
          { label: 'Products', href: '/products' },
          { label: product.name, href: `/products/${product.slug}` },
        ]}
      />

        {/* Product Layout */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-16">
          {/* Product Gallery */}
          <div className="order-1">
            <ProductGallery
              product={product}
              onFullscreenClick={() => setIsGalleryOpen(true)}
            />
          </div>

          {/* Product Info */}
          <div className="order-2">
            <ProductInfo product={product} />

            {/* Description Section */}
            <ProductDescription description={product.description || product.shortDescription || ''} />
          </div>
        </div>

        {/* Customer Reviews Section */}
        <ProductReviewsSection
          productId={product._id}
          productCode={product.productCode}
          rating={product.ratingAvg || 0}
          reviewCount={product.ratingCount || 0}
          ratingDistribution={product.ratingDistribution}
        />

        {/* You May Also Like - Recommendations */}
        <YouMayAlsoLikeSection
          products={recommendations || []}
          isLoading={isLoadingRecommendations}
        />

        {/* Recently Viewed */}
        <RecentlyViewedSection products={recentlyViewed} />

        {/* Fullscreen Gallery Modal */}
        <FullscreenGalleryModal
          images={[product.primaryImage, ...product.gallery]}
          productName={product.name}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
        />
      </div>

      {/* Sticky Add to Cart Bar (Mobile Only) */}
      <StickyAddToCartBar product={product} />
    </>
  );
}
