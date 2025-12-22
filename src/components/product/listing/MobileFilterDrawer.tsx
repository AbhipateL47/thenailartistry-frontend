import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductFilters } from './ProductFilters';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  selectedLengths?: string[];
  onLengthToggle?: (length: string) => void;
  selectedShapes?: string[];
  onShapeToggle?: (shape: string) => void;
  onApply: () => void;
}

export const MobileFilterDrawer = ({
  isOpen,
  onClose,
  priceRange,
  onPriceRangeChange,
  selectedCategories,
  onCategoryToggle,
  selectedLengths = [],
  onLengthToggle,
  selectedShapes = [],
  onShapeToggle,
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
            selectedCategories={selectedCategories}
            onCategoryToggle={onCategoryToggle}
            selectedLengths={selectedLengths}
            onLengthToggle={onLengthToggle}
            selectedShapes={selectedShapes}
            onShapeToggle={onShapeToggle}
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
