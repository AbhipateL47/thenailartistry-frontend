import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/utils/formatCurrency';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ProductAttribute {
  _id: string;
  name: string;
  slug: string;
  values: string[];
}

interface ProductFiltersProps {
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  attributes?: ProductAttribute[];
  selectedAttributeFilters?: Record<string, string[]>;
  onAttributeToggle?: (attributeSlug: string, value: string) => void;
  isFeatured?: boolean;
  onFeaturedToggle?: (checked: boolean) => void;
  isOnSale?: boolean;
  onSaleToggle?: (checked: boolean) => void;
  variant?: 'desktop' | 'mobile';
}

export const ProductFilters = ({
  priceRange,
  onPriceRangeChange,
  attributes = [],
  selectedAttributeFilters = {},
  onAttributeToggle,
  isFeatured = false,
  onFeaturedToggle,
  isOnSale = false,
  onSaleToggle,
  variant = 'desktop',
}: ProductFiltersProps) => {
  const prefix = variant === 'mobile' ? 'mobile-' : '';

  // Get default accordion values - include price and any attributes
  const defaultAccordionValues = ['price', ...attributes.map(attr => attr.slug)];

  return (
    <div className="space-y-1">
      <Accordion type="multiple" defaultValue={defaultAccordionValues} className="w-full">
        {/* Price */}
        <AccordionItem value="price" className="border-b border-gray-200">
          <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
            Price
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-2">
            <div className="px-2">
              <Slider
                min={0}
                max={2000}
                step={1}
                value={priceRange}
                onValueChange={onPriceRangeChange}
                className="mb-3"
              />
              <p className="text-sm text-muted-foreground">
                Price: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Featured / On Sale */}
        {(onFeaturedToggle || onSaleToggle) && (
          <>
            {onFeaturedToggle && (
              <AccordionItem value="featured" className="border-b border-gray-200">
                <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
                  Featured
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`${prefix}featured`}
                      checked={isFeatured}
                      onCheckedChange={(checked) => onFeaturedToggle(checked === true)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label
                      htmlFor={`${prefix}featured`}
                      className="cursor-pointer text-sm font-normal text-gray-700"
                    >
                      Featured Products
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {onSaleToggle && (
              <AccordionItem value="sale" className="border-b border-gray-200">
                <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
                  On Sale
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`${prefix}sale`}
                      checked={isOnSale}
                      onCheckedChange={(checked) => onSaleToggle(checked === true)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label
                      htmlFor={`${prefix}sale`}
                      className="cursor-pointer text-sm font-normal text-gray-700"
                    >
                      On Sale Products
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </>
        )}

        {/* Dynamic Attributes */}
        {attributes.map((attribute) => {
          const selectedValues = selectedAttributeFilters[attribute.slug] || [];
          return (
            <AccordionItem key={attribute._id} value={attribute.slug} className="border-b border-gray-200">
              <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
                {attribute.name}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className={`space-y-2.5 ${attribute.values.length > 5 ? 'max-h-44 overflow-y-auto pr-2 scrollbar-thin' : ''}`}>
                  {attribute.values.map((value) => (
                    <div key={value} className="flex items-center gap-2">
                      <Checkbox
                        id={`${prefix}attr-${attribute.slug}-${value}`}
                        checked={selectedValues.includes(value)}
                        onCheckedChange={() => onAttributeToggle?.(attribute.slug, value)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label
                        htmlFor={`${prefix}attr-${attribute.slug}-${value}`}
                        className="cursor-pointer text-sm font-normal text-gray-700"
                      >
                        {value}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
