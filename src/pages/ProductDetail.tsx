import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo, ProductInfoSkeleton } from '@/components/product/ProductInfo';
import { FullscreenGalleryModal } from '@/components/product/FullscreenGalleryModal';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id!),
    enabled: !!id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ['related-products', product?.category],
    queryFn: () =>
      productService.getProducts({ category: product?.category, limit: 4 }),
    enabled: !!product?.category,
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
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-md" />
              ))}
            </div>
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
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/products" className="hover:text-foreground transition-colors">
          Products
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
        {/* Product Gallery */}
        <div className="order-1">
          <ProductGallery
            images={product.images}
            productName={product.name}
            onFullscreenClick={() => setIsGalleryOpen(true)}
          />
        </div>

        {/* Product Info */}
        <div className="order-2">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mb-16">
        <Accordion type="single" collapsible className="border rounded-lg">
          <AccordionItem value="reviews" className="border-none">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Customer Reviews</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold">{product.rating?.toFixed(1)}</div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < Math.floor(product.rating || 0)
                              ? 'text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {product.reviews || 0} reviews
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Reviews will be displayed here.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="description" className="border-none">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Description</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.products.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">People Also Bought</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.products.slice(0, 4).map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Gallery Modal */}
      <FullscreenGalleryModal
        images={product.images}
        productName={product.name}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
