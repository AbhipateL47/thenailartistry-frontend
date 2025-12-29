import { useState, useRef } from 'react';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);
  const images = [product.primaryImage, ...product.gallery];
  
  const price = productService.getLowestPrice(product);
  const mrp = productService.getLowestMrp(product);
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const handlePrevious = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailScrollRef.current) {
      const scrollAmount = 100;
      thumbnailScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnail Gallery - Left Side (Desktop) / Below (Mobile) */}
      {images.length > 1 && (
        <>
          {/* Desktop: Left Side Thumbnails */}
          <div className="hidden md:flex flex-col gap-2 flex-shrink-0 order-1 md:order-1">
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

          {/* Mobile: Bottom Thumbnails with Navigation */}
          <div className="md:hidden relative order-3">
            <div className="relative">
              {/* Left Navigation Button */}
              <Button
                size="icon"
                variant="outline"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full h-8 w-8"
                onClick={() => scrollThumbnails('left')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Thumbnail Scroll Container */}
              <div
                ref={thumbnailScrollRef}
                className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all',
                      selectedImage === index
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent'
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

              {/* Right Navigation Button */}
              <Button
                size="icon"
                variant="outline"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full h-8 w-8"
                onClick={() => scrollThumbnails('right')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Main Image Container */}
      <div className="flex-1 order-2 md:order-2">
        {/* Main Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
          <img
            src={images[selectedImage]}
            alt={`${product.name} - View ${selectedImage + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Discount Badge */}
          {discountPercent > 0 && (
            <Badge 
              className="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-3 py-1 z-10"
            >
              -{discountPercent}%
            </Badge>
          )}

          {/* Navigation Buttons (Mobile Only) */}
          {images.length > 1 && (
            <>
              {/* Previous Button */}
              <Button
                size="icon"
                variant="secondary"
                className={cn(
                  "absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white md:hidden z-10",
                  selectedImage === 0 && "opacity-50 cursor-not-allowed"
                )}
                onClick={handlePrevious}
                disabled={selectedImage === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Next Button */}
              <Button
                size="icon"
                variant="secondary"
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white md:hidden z-10",
                  selectedImage === images.length - 1 && "opacity-50 cursor-not-allowed"
                )}
                onClick={handleNext}
                disabled={selectedImage === images.length - 1}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Expand Icon */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
            onClick={onFullscreenClick}
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
