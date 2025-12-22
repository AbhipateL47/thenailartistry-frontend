import { HeroSection } from '@/components/home/HeroSection_1.5';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { FeaturedProductsSection } from '@/components/home/FeaturedProductsSection';
import { CategorySection } from '@/components/home/CategorySection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { featuredProducts, categories } from '@/constants/homeData';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function Home() {
  usePageTitle('The Nail Artistry - Premium Press-On Nails | Reusable & Salon Quality');
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection products={featuredProducts} />
      <CategorySection categories={categories} />
      <WhyChooseUsSection />
      <NewsletterSection />
    </div>
  );
}
