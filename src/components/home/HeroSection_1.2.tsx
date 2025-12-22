import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * HeroSection 1.2 - Light Cream Theme
 * Uses brand colors: #DD2C6C (pink) with warm cream background
 * Clean, elegant, feminine aesthetic
 */
export const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100svh-80px)] bg-[#FBF7F4] overflow-hidden">
      {/* Subtle decorative shape */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#DD2C6C]/[0.03] rounded-bl-[100px] hidden lg:block" />
      
      {/* Small decorative dots */}
      <div className="absolute top-32 left-[20%] w-2 h-2 rounded-full bg-[#DD2C6C]/30" />
      <div className="absolute top-48 right-[40%] w-1.5 h-1.5 rounded-full bg-[#DD2C6C]/20" />
      <div className="absolute bottom-40 left-[30%] w-2 h-2 rounded-full bg-[#DD2C6C]/25" />

      <div className="container mx-auto px-5 md:px-8 h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100svh-80px)] py-12 md:py-16">
          
          {/* Left - Content */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left">
            {/* Rating badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">500+ Happy Customers</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2a1f22] leading-[1.1]">
              Nails That
              <br />
              <span className="relative inline-block">
                Speak
                <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8">
                  <path d="M0,6 Q50,0 100,6 T200,6" stroke="#DD2C6C" strokeWidth="3" fill="none" />
                </svg>
              </span>
              <br />
              <span className="text-[#DD2C6C]">Your Style</span>
            </h1>

            {/* Subtext */}
            <p className="text-base md:text-lg text-[#2a1f22]/60 max-w-md mx-auto lg:mx-0">
              Premium soft gel press-on nails, handcrafted for the perfect fit. 
              Reusable, gentle on natural nails, and absolutely stunning.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Button
                size="lg"
                className="px-8 py-6 bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full font-semibold text-base shadow-lg shadow-[#DD2C6C]/20"
                asChild
              >
                <Link to="/products">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 rounded-full border-[#2a1f22]/20 text-[#2a1f22] hover:bg-[#2a1f22]/5 font-semibold text-base"
                asChild
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 pt-4 justify-center lg:justify-start">
              {['Reusable', 'Gentle Formula', 'Custom Sizes', 'Salon Quality'].map((feature) => (
                <span
                  key={feature}
                  className="px-4 py-2 rounded-full bg-white border border-[#DD2C6C]/10 text-sm font-medium text-[#2a1f22]/70 shadow-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Main circular image */}
              <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600"
                  alt="Beautiful nail art"
                  className="w-full h-full object-cover scale-110"
                />
              </div>

              {/* Floating product card - left */}
              <div className="absolute -left-2 sm:-left-8 top-1/2 -translate-y-1/2 bg-white rounded-2xl p-2 sm:p-3 shadow-xl hidden sm:block">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=150"
                    alt="French Tips"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-center mt-2 text-[#2a1f22]">French Tips</p>
              </div>

              {/* Floating product card - right */}
              <div className="absolute -right-2 sm:-right-8 bottom-8 bg-white rounded-2xl p-2 sm:p-3 shadow-xl hidden sm:block">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=150"
                    alt="Glitter Set"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-center mt-2 text-[#2a1f22]">Glitter Set</p>
              </div>

              {/* Price tag */}
              <div className="absolute -right-2 sm:right-0 top-4 bg-[#DD2C6C] text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-bold">From ₹299</span>
              </div>

              {/* Decorative ring */}
              <div className="absolute inset-0 -m-6 rounded-full border border-[#DD2C6C]/10 hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
