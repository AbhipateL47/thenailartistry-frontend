import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductFilters } from './ProductFilters';

interface ProductAttribute {
  _id: string;
  name: string;
  slug: string;
  values: string[];
}

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  attributes?: ProductAttribute[];
  selectedAttributeFilters?: Record<string, string[]>;
  onAttributeToggle?: (attributeSlug: string, value: string) => void;
  isFeatured?: boolean;
  onFeaturedToggle?: (checked: boolean) => void;
  isOnSale?: boolean;
  onSaleToggle?: (checked: boolean) => void;
  onApply: () => void;
}

export const MobileFilterDrawer = ({
  isOpen,
  onClose,
  priceRange,
  onPriceRangeChange,
  attributes = [],
  selectedAttributeFilters = {},
  onAttributeToggle,
  isFeatured = false,
  onFeaturedToggle,
  isOnSale = false,
  onSaleToggle,
  onApply,
}: MobileFilterDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden animate-fade-in">
      <div
        className="fixed inset-0 bg-black/60"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-[#0D0D0D] border-l border-white/10 shadow-2xl overflow-y-auto animate-slide-in-right">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white/50 hover:text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <ProductFilters
            priceRange={priceRange}
            onPriceRangeChange={onPriceRangeChange}
            attributes={attributes}
            selectedAttributeFilters={selectedAttributeFilters}
            onAttributeToggle={onAttributeToggle}
            isFeatured={isFeatured}
            onFeaturedToggle={onFeaturedToggle}
            isOnSale={isOnSale}
            onSaleToggle={onSaleToggle}
            variant="mobile"
          />

          <Button
            onClick={onApply}
            className="w-full bg-[#DD2C6C] hover:bg-[#c02560] text-white font-semibold"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};
