import { RelatedProductsSection } from './RelatedProductsSection';
import { Product } from '@/services/productService';

interface RecentlyViewedSectionProps {
  products: Product[];
}

export const RecentlyViewedSection = ({ products }: RecentlyViewedSectionProps) => {
  if (!products || products.length === 0) return null;

  return (
    <RelatedProductsSection
      products={products}
      title="Recently Viewed"
      subtitle="Don't forget! The products that you viewed. Add it to cart now."
    />
  );
};

