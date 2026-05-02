import { useEffect, useState } from 'react';
import { HeroSection } from '@/features/home/components/HeroSectionV5';
import { SaleBannerSection } from '@/features/home/components/SaleBannerSection';
import { FeaturesSection } from '@/features/home/components/FeaturesSection';
import { FeaturedProductsSection } from '@/features/home/components/FeaturedProductsSection';
import { CategorySection } from '@/features/home/components/CategorySection';
import { WhyChooseUsSection } from '@/features/home/components/WhyChooseUsSection';
import { NewsletterSection } from '@/features/home/components/NewsletterSection';
import { categories } from '@/features/home/constants/homeData';
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { useQuery } from '@tanstack/react-query';
import { productService, Product } from '@/features/products/services/product.service';
import { QuickViewModal } from '@/features/products/components/QuickViewModal';

export default function Home() {
  usePageTitle('The Nail Artistry - Premium Press-On Nails | Reusable & Salon Quality');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Log page load
  useEffect(() => {
    console.log('📄 Home Page Loaded');
  }, []);
  
  // Fetch featured products from API
  const { data: featuredProducts = [], isLoading: isLoadingFeatured } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: ({ signal }) => productService.getFeaturedProducts(12), // Get 12 featured products
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div className="min-h-screen">
      <HeroSection featuredProducts={featuredProducts} />
      <SaleBannerSection />
      <FeaturesSection />
      <FeaturedProductsSection
        products={featuredProducts}
        isLoading={isLoadingFeatured}
        onQuickView={setQuickViewProduct}
      />
      <CategorySection categories={categories} />
      <WhyChooseUsSection />
      <NewsletterSection />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}