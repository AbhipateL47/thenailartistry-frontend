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
        className="fixed inset-0 bg-black/50" 
        onClick={onClose} 
      />
      <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-background shadow-lg overflow-y-auto animate-slide-in-right">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
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

          {/* Apply button */}
          <Button 
            onClick={onApply}
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};
