import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * HeroSection 1.1 - Dark Elegant Theme
 * Uses brand colors: #DD2C6C (pink) with dark charcoal background
 * Proper spacing for header/footer, side-by-side on desktop, stacked on mobile
 */
export const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100svh-80px)] bg-[#1a1215] overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#DD2C6C]/5 via-transparent to-[#DD2C6C]/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-2 h-2 rounded-full bg-[#DD2C6C]/60 animate-pulse" />
      <div className="absolute top-40 right-[25%] w-1.5 h-1.5 rounded-full bg-[#DD2C6C]/40 animate-pulse delay-300" />
      <div className="absolute bottom-32 left-[15%] w-2 h-2 rounded-full bg-[#DD2C6C]/50 animate-pulse delay-700" />
      
      {/* Subtle line decorations */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-[#DD2C6C]/20 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-24 bg-gradient-to-t from-[#DD2C6C]/20 to-transparent" />

      <div className="container mx-auto px-5 md:px-8 h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100svh-80px)] py-12 md:py-16">
          
          {/* Left - Content */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DD2C6C]/10 border border-[#DD2C6C]/20">
              <Sparkles className="w-4 h-4 text-[#DD2C6C]" />
              <span className="text-sm text-[#DD2C6C] font-medium">Handcrafted with Love</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1]">
              Soft Gel
              <br />
              <span className="text-[#DD2C6C]">Press-On</span>
              <br />
              Nails
            </h1>

            {/* Subtext */}
            <p className="text-base md:text-lg text-white/60 max-w-md mx-auto lg:mx-0">
              Luxurious, reusable nails that fit perfectly. 
              Salon-quality beauty, delivered to your door.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Button
                size="lg"
                className="px-8 py-6 bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full font-semibold text-base shadow-lg shadow-[#DD2C6C]/20 transition-all hover:shadow-[#DD2C6C]/30"
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
                className="px-8 py-6 rounded-full border-white/20 text-white hover:bg-white/5 font-semibold text-base"
                asChild
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-6 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-[#DD2C6C]">500+</div>
                <div className="text-xs md:text-sm text-white/50">Happy Clients</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-[#DD2C6C]">50+</div>
                <div className="text-xs md:text-sm text-white/50">Designs</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-[#DD2C6C]">4.9★</div>
                <div className="text-xs md:text-sm text-white/50">Rating</div>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Main image */}
              <div className="w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600"
                  alt="Elegant nail art"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1215]/60 via-transparent to-transparent" />
              </div>

              {/* Floating card - left */}
              <div className="absolute -left-4 sm:-left-8 top-1/4 w-20 sm:w-24 h-24 sm:h-28 rounded-xl overflow-hidden border border-white/10 shadow-xl bg-[#1a1215]/80 backdrop-blur-sm transform -rotate-6">
                <img
                  src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=150"
                  alt="Nail design"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>

              {/* Floating card - right */}
              <div className="absolute -right-4 sm:-right-8 bottom-1/4 w-20 sm:w-24 h-24 sm:h-28 rounded-xl overflow-hidden border border-white/10 shadow-xl bg-[#1a1215]/80 backdrop-blur-sm transform rotate-6">
                <img
                  src="https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=150"
                  alt="Nail design"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>

              {/* Price badge */}
              <div className="absolute -right-2 top-4 bg-[#DD2C6C] text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-bold">From ₹299</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
