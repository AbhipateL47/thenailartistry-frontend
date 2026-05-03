import { useState, useRef } from 'react';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/shared/utils/cn';
import { Product, productService } from '@/features/products/services/product.service';

interface ProductGalleryProps {
  product: Product;
  onFullscreenClick: (index: number) => void;
}

export const ProductGallery = ({ product, onFullscreenClick }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const images = [product.primaryImage, ...product.gallery];

  const isOnSale =
    product.isOnSale === true &&
    typeof product.salePercent === 'number' &&
    product.salePercent > 0;

  const goTo = (index: number) => {
    setSelectedImage((index + images.length) % images.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) goTo(delta > 0 ? selectedImage + 1 : selectedImage - 1);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Desktop: left-side thumbnails */}
      {images.length > 1 && (
        <div className="hidden md:flex flex-col gap-2 flex-shrink-0">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                'relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all',
                selectedImage === index
                  ? 'border-[#DD2C6C] ring-2 ring-[#DD2C6C]/20'
                  : 'border-white/10 hover:border-white/30'
              )}
            >
              <img
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="flex-1">
        <div
          className="relative aspect-square rounded-lg overflow-hidden bg-white/5 group"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img
            src={images[selectedImage]}
            alt={`${product.name} - view ${selectedImage + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Sale badge */}
          {isOnSale && (
            <Badge className="absolute top-4 left-4 bg-[#DD2C6C] text-white text-sm font-bold px-3 py-1 z-10">
              -{product.salePercent}%
            </Badge>
          )}

          {/* Prev / Next arrows — desktop only */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => goTo(selectedImage - 1)}
                className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={() => goTo(selectedImage + 1)}
                className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </>
          )}

          {/* Expand button */}
          <button
            onClick={() => onFullscreenClick(selectedImage)}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10 md:opacity-0 md:group-hover:opacity-100"
            aria-label="View fullscreen"
          >
            <Maximize2 className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Mobile dots */}
        {images.length > 1 && (
          <div className="flex md:hidden items-center justify-center gap-2 mt-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  'rounded-full transition-all duration-200',
                  i === selectedImage
                    ? 'w-6 h-1.5 bg-[#DD2C6C]'
                    : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
                )}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
