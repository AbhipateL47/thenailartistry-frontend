import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * HeroSection 1.3 - Mobile-First Centered Design
 * Uses brand colors: #DD2C6C (pink) with soft blush background
 * Centered layout that works beautifully on mobile, expands on desktop
 */
export const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100svh-80px)] bg-gradient-to-b from-[#FDF5F7] to-[#FBF7F4] overflow-hidden">
      {/* Decorative sparkle dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-[10%] w-1.5 h-1.5 rounded-full bg-[#DD2C6C]/40 animate-pulse" />
        <div className="absolute top-24 right-[15%] w-2 h-2 rounded-full bg-[#DD2C6C]/30 animate-pulse delay-300" />
        <div className="absolute top-1/3 left-[5%] w-1 h-1 rounded-full bg-[#DD2C6C]/50 animate-pulse delay-500" />
        <div className="absolute top-1/2 right-[8%] w-1.5 h-1.5 rounded-full bg-[#DD2C6C]/35 animate-pulse delay-700" />
        <div className="absolute bottom-1/3 left-[12%] w-2 h-2 rounded-full bg-[#DD2C6C]/25 animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 right-[20%] w-1 h-1 rounded-full bg-[#DD2C6C]/45 animate-pulse delay-200" />
      </div>

      {/* Subtle line accents */}
      <div className="absolute top-0 left-1/4 w-px h-20 bg-gradient-to-b from-[#DD2C6C]/15 to-transparent hidden md:block" />
      <div className="absolute top-0 right-1/4 w-px h-16 bg-gradient-to-b from-[#DD2C6C]/10 to-transparent hidden md:block" />

      <div className="container mx-auto px-5 md:px-8 h-full">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 min-h-[calc(100svh-80px)] py-10 md:py-16">
          
          {/* Content - Centered on mobile, left on desktop */}
          <div className="flex-1 space-y-5 md:space-y-6 text-center lg:text-left max-w-xl order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#DD2C6C]/15 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#DD2C6C]" />
              <span className="text-xs sm:text-sm text-[#DD2C6C] font-medium">Handcrafted Magic</span>
              <Sparkles className="w-4 h-4 text-[#DD2C6C]" />
            </div>

            {/* Heading - Optimized for mobile readability */}
            <h1 className="text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2a1f22]">
              Soft Gel
              <br />
              <span className="text-[#DD2C6C]">Press-On</span>
              <br />
              Nails
            </h1>

            {/* Decorative line */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-8 sm:w-12 h-px bg-[#DD2C6C]/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#DD2C6C]" />
              <div className="w-8 sm:w-12 h-px bg-[#DD2C6C]/30" />
            </div>

            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg text-[#2a1f22]/60 max-w-md mx-auto lg:mx-0">
              Luxurious, reusable nails. Salon-quality at home.
            </p>

            {/* CTAs - Full width on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full sm:w-auto justify-center lg:justify-start">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-6 bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full font-semibold text-base shadow-lg shadow-[#DD2C6C]/20"
                asChild
              >
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 rounded-full border-[#DD2C6C]/20 text-[#DD2C6C] hover:bg-[#DD2C6C]/5 font-semibold text-base"
                asChild
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>

            {/* Stats - Compact on mobile */}
            <div className="flex gap-6 sm:gap-8 pt-4 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#DD2C6C]">500+</div>
                <div className="text-xs text-[#2a1f22]/50">Clients</div>
              </div>
              <div className="w-px bg-[#DD2C6C]/15" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#DD2C6C]">50+</div>
                <div className="text-xs text-[#2a1f22]/50">Designs</div>
              </div>
              <div className="w-px bg-[#DD2C6C]/15" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#DD2C6C]">4.9★</div>
                <div className="text-xs text-[#2a1f22]/50">Rating</div>
              </div>
            </div>
          </div>

          {/* Image - Shows first on mobile */}
          <div className="relative flex-shrink-0 order-1 lg:order-2">
            <div className="relative">
              {/* Main image */}
              <div className="w-52 h-64 sm:w-64 sm:h-80 lg:w-72 lg:h-96 rounded-[2rem] overflow-hidden shadow-2xl shadow-[#DD2C6C]/10 border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600"
                  alt="Nail art showcase"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating mini cards - visible on larger screens */}
              <div className="absolute -left-6 top-1/4 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-white shadow-lg transform -rotate-6 hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=100"
                  alt="Nail design"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -right-4 bottom-1/4 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-white shadow-lg transform rotate-6 hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=100"
                  alt="Nail design"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Price badge */}
              <div className="absolute -right-2 top-4 bg-[#DD2C6C] text-white px-3 py-1.5 rounded-full shadow-md">
                <span className="text-xs sm:text-sm font-bold">From ₹299</span>
              </div>

              {/* Sparkle decoration */}
              <Sparkles className="absolute -left-3 -top-3 w-6 h-6 text-[#DD2C6C]/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DD2C6C]/20 to-transparent" />
    </section>
  );
};
