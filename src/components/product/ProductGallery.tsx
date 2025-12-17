import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  onFullscreenClick: () => void;
}

export const ProductGallery = ({ images, productName, onFullscreenClick }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
        <img
          src={images[selectedImage]}
          alt={`${productName} - View ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onFullscreenClick}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                'relative aspect-square rounded-md overflow-hidden border-2 transition-all',
                selectedImage === index
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-muted-foreground/20'
              )}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
