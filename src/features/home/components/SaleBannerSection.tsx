import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { saleService, Sale } from '@/features/home/services/sale.service';
import { cn } from '@/shared/utils/cn';
import { Skeleton } from '@/components/ui/skeleton';

export const SaleBannerSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch active sales for homeHero placement
  const { data: sales = [], isLoading } = useQuery({
    queryKey: ['active-sales', 'homeHero'],
    queryFn: ({ signal }) => saleService.getActiveSales('homeHero', signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter only active sales and sort by order
  const activeSales = sales
    .filter((sale) => sale.isActive)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Reset to first slide if current index is out of bounds
  useEffect(() => {
    if (activeSales.length > 0 && currentIndex >= activeSales.length) {
      setCurrentIndex(0);
    }
  }, [activeSales.length, currentIndex]);

  // Handle swipe gestures
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < activeSales.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeSales.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === activeSales.length - 1 ? 0 : prev + 1));
  };

  // Don't render if no active sales
  if (!isLoading && activeSales.length === 0) {
    return null;
  }

  const currentSale = activeSales[currentIndex];

  return (
    <section className="py-12 md:py-16 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 md:px-5 relative">
        {isLoading ? (
          <div className="bg-[#111111] rounded-2xl border border-white/10 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-10 w-32" />
              </div>
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        ) : (
          <>
            {/* Navigation Arrows - Only show if multiple sales */}
            {activeSales.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPrevious}
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10",
                    "h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 border border-white/15",
                    "hover:bg-[#DD2C6C] hover:border-[#DD2C6C] transition-all",
                    "hidden md:flex items-center justify-center"
                  )}
                  aria-label="Previous sale"
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  className={cn(
                    "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10",
                    "h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 border border-white/15",
                    "hover:bg-[#DD2C6C] hover:border-[#DD2C6C] transition-all",
                    "hidden md:flex items-center justify-center"
                  )}
                  aria-label="Next sale"
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </Button>
              </>
            )}

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="relative overflow-hidden rounded-2xl bg-[#111111] border border-white/10"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {activeSales.map((sale) => (
                  <div
                    key={sale._id}
                    className="min-w-full grid md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8 lg:p-12"
                  >
                    {/* Left Content */}
                    <div className="flex flex-col justify-center space-y-4 md:space-y-6 order-2 md:order-1">
                      {/* Heading */}
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                        {sale.heading}
                      </h2>

                      {/* Description */}
                      <p className="text-white/55 text-sm md:text-base leading-relaxed">
                        {sale.description}
                      </p>

                      {/* Coupon Code Badge (if available) */}
                      {sale.couponCode && (
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="px-3 py-1.5 text-sm font-semibold border-[#DD2C6C] text-[#DD2C6C] bg-[#DD2C6C]/5"
                          >
                            Code: {sale.couponCode}
                          </Badge>
                        </div>
                      )}

                      {/* CTA Button */}
                      <div className="pt-2">
                        <Button
                          asChild
                          className="bg-[#DD2C6C] hover:bg-[#DD2C6C]/90 text-white px-6 py-2.5 text-sm md:text-base font-semibold rounded-lg transition-all hover:shadow-lg"
                        >
                          <Link to={sale.ctaLink}>{sale.ctaText}</Link>
                        </Button>
                      </div>
                    </div>

                    {/* Right Image */}
                    {/* TODO: Use banners by device/placement when available (sale.banners) */}
                    <div className="order-1 md:order-2 flex items-center justify-center">
                      <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden bg-white/5">
                        <img
                          src={sale.image}
                          alt={sale.imageAlt || sale.heading}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator - Only show if multiple sales */}
            {activeSales.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {activeSales.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      index === currentIndex
                        ? "w-8 bg-[#DD2C6C]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
