import { HeroSection } from '@/components/home/HeroSection_1.5';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { FeaturedProductsSection } from '@/components/home/FeaturedProductsSection';
import { CategorySection } from '@/components/home/CategorySection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { categories } from '@/constants/homeData';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';

export default function Home() {
  usePageTitle('The Nail Artistry - Premium Press-On Nails | Reusable & Salon Quality');
  
  // Fetch featured products from API
  const { data: featuredProducts = [], isLoading: isLoadingFeatured } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => productService.getFeaturedProducts(12), // Get 12 featured products
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection products={featuredProducts} isLoading={isLoadingFeatured} />
      <CategorySection categories={categories} />
      <WhyChooseUsSection />
      <NewsletterSection />
    </div>
  );
}
