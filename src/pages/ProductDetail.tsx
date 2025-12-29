import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { ProductGallery } from '@/components/product/detail/ProductGallery';
import { ProductInfo, ProductInfoSkeleton } from '@/components/product/detail/ProductInfo';
import { FullscreenGalleryModal } from '@/components/product/detail/FullscreenGalleryModal';
import { ProductBreadcrumb } from '@/components/product/detail/ProductBreadcrumb';
import { ProductReviewsSection } from '@/components/product/detail/ProductReviewsSection';
import { ProductDescription } from '@/components/product/detail/ProductDescription';
import { RelatedProductsSection } from '@/components/product/detail/RelatedProductsSection';
import { RecentlyViewedSection } from '@/components/product/detail/RecentlyViewedSection';
import { StickyAddToCartBar } from '@/components/product/detail/StickyAddToCartBar';
import { Skeleton } from '@/components/ui/skeleton';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>(); // This can be either slug or ID, backend handles both
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id!),
    enabled: !!id,
  });

  // Fetch related products (People Also Bought)
  const { data: relatedProducts } = useQuery({
    queryKey: ['related-products', product?._id],
    queryFn: () =>
      productService.getProducts({ limit: 4 }),
    enabled: !!product,
  });

  // Mock recently viewed products (can be replaced with real data from localStorage/API)
  const recentlyViewedProducts = relatedProducts?.data?.slice(0, 4) || [];

  // Update page title
  usePageTitle(product?.name ? `${product.name} - Premium Press-On Nails` : 'Product');

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
        <ProductBreadcrumb productName={product.name} />

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
          </div>
        </div>

        {/* Customer Reviews Section */}
        <ProductReviewsSection
          productId={product._id}
          rating={product.ratingAvg || 0}
          reviewCount={product.ratingCount || 0}
        />

        {/* Description Section */}
        <ProductDescription description={product.description || product.shortDescription || ''} />

        {/* People Also Bought */}
        {relatedProducts && relatedProducts.data && relatedProducts.data.length > 0 && (
          <RelatedProductsSection products={relatedProducts.data} />
        )}

        {/* Recently Viewed */}
        {recentlyViewedProducts.length > 0 && (
          <RecentlyViewedSection products={recentlyViewedProducts} />
        )}

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
