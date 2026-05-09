import { lazy, Suspense, useState } from 'react';
import { HeroSection } from '@/features/home/components/HeroSection';
import { SaleBannerSection } from '@/features/home/components/SaleBannerSection';
import { FeaturesSection } from '@/features/home/components/FeaturesSection';
import { categories } from '@/features/home/constants/homeData';
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { useQuery } from '@tanstack/react-query';
import { productService, Product } from '@/features/products/services/product.service';
import { QuickViewModal } from '@/features/products/components/QuickViewModal';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/shared/utils/cn';

// Lazy-load below-fold sections — keeps initial bundle lean
const FeaturedProductsSection = lazy(() =>
  import('@/features/home/components/FeaturedProductsSection').then((m) => ({
    default: m.FeaturedProductsSection,
  }))
);
const CategorySection = lazy(() =>
  import('@/features/home/components/CategorySection').then((m) => ({
    default: m.CategorySection,
  }))
);
const WhyChooseUsSection = lazy(() =>
  import('@/features/home/components/WhyChooseUsSection').then((m) => ({
    default: m.WhyChooseUsSection,
  }))
);
const NewsletterSection = lazy(() =>
  import('@/features/home/components/NewsletterSection').then((m) => ({
    default: m.NewsletterSection,
  }))
);

function AnimatedSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  usePageTitle('The Nail Artistry - Premium Press-On Nails | Reusable & Salon Quality');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);


  const { data: featuredProducts = [], isLoading: isLoadingFeatured } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => productService.getFeaturedProducts(12),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="min-h-screen">
      {/* Above-fold: eager load */}
      <HeroSection featuredProducts={featuredProducts} />
      <SaleBannerSection />
      <FeaturesSection />

      {/* Below-fold: lazy + animated */}
      <AnimatedSection>
        <Suspense fallback={<Skeleton className="h-80 w-full rounded-none" />}>
          <FeaturedProductsSection
            products={featuredProducts}
            isLoading={isLoadingFeatured}
            onQuickView={setQuickViewProduct}
          />
        </Suspense>
      </AnimatedSection>

      <AnimatedSection delay={50}>
        <Suspense fallback={<Skeleton className="h-64 w-full rounded-none" />}>
          <CategorySection categories={categories} />
        </Suspense>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <Suspense fallback={<Skeleton className="h-64 w-full rounded-none" />}>
          <WhyChooseUsSection />
        </Suspense>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <Suspense fallback={<Skeleton className="h-48 w-full rounded-none" />}>
          <NewsletterSection />
        </Suspense>
      </AnimatedSection>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
