import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface FullscreenGalleryModalProps {
  images: string[];
  productName: string;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const FullscreenGalleryModal = ({
  images,
  productName,
  isOpen,
  onClose,
  initialIndex = 0,
}: FullscreenGalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
      if (e.key === 'ArrowRight') goTo(currentIndex + 1);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  const goTo = (index: number) => {
    setCurrentIndex((index + images.length) % images.length);
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
    if (Math.abs(delta) > 50) goTo(delta > 0 ? currentIndex + 1 : currentIndex - 1);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black flex flex-col"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
        <span className="text-white/50 text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Image area */}
      <div
        className="flex-1 relative flex items-center justify-center overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`${productName} - ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain select-none"
          draggable={false}
        />

        {/* Prev / Next — desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo(currentIndex - 1)}
              className="hidden md:flex absolute left-4 w-11 h-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={() => goTo(currentIndex + 1)}
              className="hidden md:flex absolute right-4 w-11 h-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 py-4 flex-shrink-0">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-200 ${
                i === currentIndex
                  ? 'w-6 h-1.5 bg-[#DD2C6C]'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
};
