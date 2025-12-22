import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

/**
 * HeroSection 1.6 - "Floating Mood Board" Experience
 * Images float and drift around the screen creating an immersive gallery
 * Auto-rotating featured image with manual selection
 */
export const HeroSection = () => {
  const [featured, setFeatured] = useState(0);

  // Variety of nail art, polish, accessories images
  const images = [
    'https://plus.unsplash.com/premium_photo-1670348051093-a3f94b408bcb?w=600',
    'https://plus.unsplash.com/premium_photo-1677434519189-c37c1bb6b848?w=600',
    'https://images.unsplash.com/photo-1619607146034-5a05296c8f9a?w=600',
    'https://plus.unsplash.com/premium_photo-1661337159345-bc2e2e014c49?w=600',
    'https://plus.unsplash.com/premium_photo-1670590785960-c6f592c8d877?w=600',
    'https://images.unsplash.com/photo-1696342003838-4a8f9f36588c?w=600',
    'https://images.unsplash.com/photo-1636019411480-58321fcb11ce?w=600',
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600',
  ];

  const products = [
    { name: 'Rose Quartz Set', price: '₹349' },
    { name: 'French Tips', price: '₹299' },
    { name: 'Glitter Collection', price: '₹399' },
    { name: 'Nude Elegance', price: '₹329' },
    { name: 'Chrome Finish', price: '₹449' },
    { name: 'Floral Art', price: '₹379' },
    { name: 'Marble Effect', price: '₹359' },
    { name: 'Classic Red', price: '₹289' },
  ];

  // Auto rotate featured
  useEffect(() => {
    const interval = setInterval(() => {
      setFeatured((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] bg-[#FDF8F8] overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#DD2C6C]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#F9A8D4]/10 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#DD2C6C]/5 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2" />

      {/* Floating scattered images - Desktop */}
      <div className="hidden lg:block">
        {/* Top left cluster */}
        <div className="absolute top-[8%] left-[3%] w-32 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer opacity-80 hover:opacity-100">
          <img src={images[0]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-[5%] left-[18%] w-24 h-28 rounded-xl overflow-hidden shadow-lg border-3 border-white rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer opacity-60 hover:opacity-100">
          <img src={images[1]} alt="" className="w-full h-full object-cover" />
        </div>
        
        {/* Top right cluster */}
        <div className="absolute top-[6%] right-[5%] w-28 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-8 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer opacity-75 hover:opacity-100">
          <img src={images[2]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-[12%] right-[20%] w-20 h-24 rounded-xl overflow-hidden shadow-lg border-3 border-white -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer opacity-50 hover:opacity-100">
          <img src={images[3]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Left side */}
        <div className="absolute top-[40%] left-[2%] w-24 h-32 rounded-xl overflow-hidden shadow-lg border-3 border-white rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer opacity-60 hover:opacity-100">
          <img src={images[4]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Right side */}
        <div className="absolute top-[45%] right-[3%] w-28 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer opacity-70 hover:opacity-100">
          <img src={images[5]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Bottom left */}
        <div className="absolute bottom-[12%] left-[5%] w-28 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-10 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer opacity-75 hover:opacity-100">
          <img src={images[6]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-[8%] left-[20%] w-20 h-24 rounded-xl overflow-hidden shadow-lg border-3 border-white -rotate-8 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer opacity-50 hover:opacity-100">
          <img src={images[7]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Bottom right */}
        <div className="absolute bottom-[10%] right-[6%] w-32 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer opacity-80 hover:opacity-100">
          <img src={images[0]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-[18%] right-[22%] w-20 h-26 rounded-xl overflow-hidden shadow-lg border-3 border-white rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer opacity-55 hover:opacity-100">
          <img src={images[1]} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Tablet floating images */}
      <div className="hidden md:block lg:hidden">
        <div className="absolute top-[10%] left-[5%] w-24 h-32 rounded-xl overflow-hidden shadow-lg border-3 border-white -rotate-6 opacity-60">
          <img src={images[0]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-[8%] right-[5%] w-24 h-32 rounded-xl overflow-hidden shadow-lg border-3 border-white rotate-6 opacity-60">
          <img src={images[2]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-[12%] left-[8%] w-20 h-28 rounded-xl overflow-hidden shadow-lg border-3 border-white rotate-8 opacity-50">
          <img src={images[4]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-[10%] right-[8%] w-20 h-28 rounded-xl overflow-hidden shadow-lg border-3 border-white -rotate-8 opacity-50">
          <img src={images[6]} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Mobile subtle corner images */}
      <div className="md:hidden">
        <div className="absolute top-16 left-2 w-14 h-18 rounded-lg overflow-hidden border-2 border-white shadow-md opacity-30 -rotate-6">
          <img src={images[0]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-20 right-2 w-12 h-16 rounded-lg overflow-hidden border-2 border-white shadow-md opacity-25 rotate-6">
          <img src={images[2]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-24 left-3 w-12 h-16 rounded-lg overflow-hidden border-2 border-white shadow-md opacity-20 rotate-3">
          <img src={images[4]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-28 right-2 w-14 h-18 rounded-lg overflow-hidden border-2 border-white shadow-md opacity-25 -rotate-3">
          <img src={images[6]} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-[25%] left-[35%] w-2 h-2 rounded-full bg-[#DD2C6C]/30 animate-pulse" />
      <div className="absolute top-[60%] right-[30%] w-3 h-3 rounded-full bg-[#DD2C6C]/20 animate-pulse delay-500" />
      <div className="absolute bottom-[35%] left-[32%] w-2 h-2 rounded-full bg-[#F9A8D4]/40 animate-pulse delay-1000" />
      <div className="absolute top-[45%] right-[35%] w-1.5 h-1.5 rounded-full bg-[#DD2C6C]/25 animate-pulse delay-300" />

      {/* Center content */}
      <div className="relative z-20 min-h-[100svh] flex flex-col items-center justify-center px-4 py-10">
        <div className="text-center max-w-xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-lg border border-[#DD2C6C]/10 mb-6">
            <div className="relative">
              <Sparkles className="w-4 h-4 text-[#DD2C6C]" />
              <div className="absolute inset-0 bg-[#DD2C6C]/30 rounded-full animate-ping" />
            </div>
            <span className="text-sm font-semibold text-[#1a1a1a]">New Collection</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>

          {/* Main tagline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#1a1a1a] leading-[0.9] mb-6">
            Find Your
            <br />
            <span className="text-[#DD2C6C] relative">
              Perfect
              <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8">
                <path d="M0,6 Q50,0 100,6 T200,6" stroke="#DD2C6C" strokeWidth="3" fill="none" opacity="0.3" />
              </svg>
            </span>
            <br />
            Match
          </h1>

          {/* Featured showcase with rotating rings */}
          <div className="relative my-8">
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-[#DD2C6C]/10" />
              <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-dashed border-[#DD2C6C]/15 animate-[spin_35s_linear_infinite]" />
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-dotted border-[#DD2C6C]/10 animate-[spin_45s_linear_infinite_reverse]" />
            </div>
            
            {/* Orbiting dots */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 sm:w-80 sm:h-80 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#DD2C6C]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F9A8D4]" />
              </div>
            </div>

            {/* Featured image */}
            <div className="relative mx-auto w-44 h-56 sm:w-52 sm:h-68 md:w-60 md:h-76 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
              <img
                key={featured}
                src={images[featured]}
                alt={products[featured].name}
                className="w-full h-full object-cover animate-fade-scale"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                <p className="text-white font-bold text-lg">{products[featured].name}</p>
                {/* <p className="text-white/80 text-sm">{products[featured].price}</p> */}
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mb-6">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setFeatured(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  featured === i 
                    ? 'bg-[#DD2C6C] w-6' 
                    : 'bg-[#DD2C6C]/25 w-2 hover:bg-[#DD2C6C]/50'
                }`}
              />
            ))}
          </div>

          {/* Description */}
          <p className="text-[#1a1a1a]/60 text-base sm:text-lg max-w-md mx-auto mb-8">
            50+ handcrafted designs. Soft gel press-ons, polishes & accessories that feel like magic.
          </p>

          {/* CTA */}
          <Button
            size="lg"
            className="px-10 py-7 bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full font-bold text-base sm:text-lg shadow-xl shadow-[#DD2C6C]/25 hover:scale-105 transition-all"
            asChild
          >
            <Link to="/products">
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-[#1a1a1a]/50 text-sm">
            <span className="flex items-center gap-1">
              <span className="text-amber-500">★</span>
              <span className="font-semibold">4.9</span> Rating
            </span>
            <span className="w-1 h-1 rounded-full bg-[#DD2C6C]/30 hidden sm:block" />
            <span><span className="font-semibold">500+</span> Clients</span>
            <span className="w-1 h-1 rounded-full bg-[#DD2C6C]/30 hidden sm:block" />
            <span><span className="font-semibold">15+</span> Reuses</span>
          </div>
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#DD2C6C]/15 hidden md:block" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[#DD2C6C]/15 hidden md:block" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[#DD2C6C]/15 hidden md:block" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#DD2C6C]/15 hidden md:block" />

      <style>{`
        @keyframes fade-scale {
          0% { opacity: 0; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-scale {
          animation: fade-scale 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};
