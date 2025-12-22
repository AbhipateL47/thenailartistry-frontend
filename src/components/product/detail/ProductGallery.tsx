import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Product, productService } from '@/services/productService';

interface ProductGalleryProps {
  product: Product;
  onFullscreenClick: () => void;
}

export const ProductGallery = ({ product, onFullscreenClick }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [product.primaryImage, ...product.gallery];
  
  const price = productService.getLowestPrice(product);
  const mrp = productService.getLowestMrp(product);
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <div className="flex gap-4">
      {/* Thumbnail Gallery - Left Side */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 flex-shrink-0">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                'relative w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 transition-all',
                selectedImage === index
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-muted-foreground/20'
              )}
            >
              <img
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="relative flex-1 aspect-square rounded-lg overflow-hidden bg-muted group">
        <img
          src={images[selectedImage]}
          alt={`${product.name} - View ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <Badge 
            className="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-3 py-1"
          >
            -{discountPercent}%
          </Badge>
        )}

        {/* Expand Icon */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onFullscreenClick}
        >
          <Maximize2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
