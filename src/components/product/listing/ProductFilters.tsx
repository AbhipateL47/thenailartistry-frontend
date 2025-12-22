import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/utils/formatCurrency';
import {
  filterCategories,
  filterLengths,
  filterShapes,
  filterOccasions,
  filterTextures,
  filterColors,
} from '@/constants/filters';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ProductFiltersProps {
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  selectedLengths?: string[];
  onLengthToggle?: (length: string) => void;
  selectedShapes?: string[];
  onShapeToggle?: (shape: string) => void;
  variant?: 'desktop' | 'mobile';
}

export const ProductFilters = ({
  priceRange,
  onPriceRangeChange,
  selectedCategories,
  onCategoryToggle,
  selectedLengths = [],
  onLengthToggle,
  selectedShapes = [],
  onShapeToggle,
  variant = 'desktop',
}: ProductFiltersProps) => {
  const prefix = variant === 'mobile' ? 'mobile-' : '';

  return (
    <div className="space-y-1">
      <Accordion type="multiple" defaultValue={['price', 'type']} className="w-full">
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

        {/* Type / Style */}
        <AccordionItem value="type" className="border-b border-gray-200">
          <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
            Type
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="max-h-44 overflow-y-auto pr-2 space-y-2.5 scrollbar-thin">
              {filterCategories.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <Checkbox
                    id={`${prefix}cat-${category}`}
                    checked={selectedCategories.includes(category.toLowerCase())}
                    onCheckedChange={() => onCategoryToggle(category.toLowerCase())}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label
                    htmlFor={`${prefix}cat-${category}`}
                    className="cursor-pointer text-sm font-normal text-gray-700"
                  >
                    {category} Nails
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Length */}
        <AccordionItem value="length" className="border-b border-gray-200">
          <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
            Length
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-2.5">
              {filterLengths.map((length) => (
                <div key={length} className="flex items-center gap-2">
                  <Checkbox
                    id={`${prefix}len-${length}`}
                    checked={selectedLengths.map(l => l.toLowerCase()).includes(length.toLowerCase())}
                    onCheckedChange={() => onLengthToggle?.(length)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label
                    htmlFor={`${prefix}len-${length}`}
                    className="cursor-pointer text-sm font-normal text-gray-700"
                  >
                    {length}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Shape */}
        <AccordionItem value="shape" className="border-b border-gray-200">
          <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
            Shape
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-2.5">
              {filterShapes.map((shape) => (
                <div key={shape} className="flex items-center gap-2">
                  <Checkbox
                    id={`${prefix}shape-${shape}`}
                    checked={selectedShapes.map(s => s.toLowerCase()).includes(shape.toLowerCase())}
                    onCheckedChange={() => onShapeToggle?.(shape)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label
                    htmlFor={`${prefix}shape-${shape}`}
                    className="cursor-pointer text-sm font-normal text-gray-700"
                  >
                    {shape}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Occasion */}
        <AccordionItem value="occasion" className="border-b border-gray-200">
          <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
            Occasion
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-2.5">
              {filterOccasions.map((occasion) => (
                <div key={occasion} className="flex items-center gap-2">
                  <Checkbox
                    id={`${prefix}occ-${occasion}`}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label
                    htmlFor={`${prefix}occ-${occasion}`}
                    className="cursor-pointer text-sm font-normal text-gray-700"
                  >
                    {occasion} Nails
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Texture */}
        <AccordionItem value="texture" className="border-b border-gray-200">
          <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
            Texture
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-2.5">
              {filterTextures.map((texture) => (
                <div key={texture} className="flex items-center gap-2">
                  <Checkbox
                    id={`${prefix}tex-${texture}`}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label
                    htmlFor={`${prefix}tex-${texture}`}
                    className="cursor-pointer text-sm font-normal text-gray-700"
                  >
                    {texture} Nails
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color */}
        <AccordionItem value="color" className="border-b border-gray-200">
          <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
            Color
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="max-h-44 overflow-y-auto pr-2 space-y-2.5 scrollbar-thin">
              {filterColors.map((color) => (
                <div key={color} className="flex items-center gap-2">
                  <Checkbox
                    id={`${prefix}col-${color}`}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label
                    htmlFor={`${prefix}col-${color}`}
                    className="cursor-pointer text-sm font-normal text-gray-700"
                  >
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
