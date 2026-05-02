import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, RefreshCw, Leaf, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

/**
 * HeroSection 1.5 - Interactive Nail Color Picker Experience
 * User can tap/click nail colors and see the hand change
 * Mobile: vertical stacked | Desktop: horizontal left-right
 */
export const HeroSection = () => {
  const [activeColor, setActiveColor] = useState(0);
  
  const nailStyles = [
    { name: 'Rose Blush', accent: '#DD2C6C', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500' },
    { name: 'French Classic', accent: '#E8B4B8', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500' },
    { name: 'Berry Dream', accent: '#C71585', image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=500' },
    { name: 'Nude Glow', accent: '#DEB887', image: 'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?w=500' },
  ];

  const current = nailStyles[activeColor];

  return (
    <section className="relative min-h-[100svh] bg-[#f7cdd6] overflow-hidden">
      {/* Fixed background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#DD2C6C]/10 blur-2xl" />
        <div className="absolute bottom-20 left-[5%] w-40 h-40 md:w-64 md:h-64 rounded-full bg-[#F9A8D4]/15 blur-3xl" />
      </div>

      {/* Desktop & Tablet Layout - Side by side */}
      <div className="relative z-10 container mx-auto px-5 min-h-[100svh] hidden md:flex items-center">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center w-full">
          
          {/* Left - Content */}
          <div className="relative">
            {/* Decorative corner brackets */}
            <div className="absolute -left-4 -top-4 w-8 h-8 border-l-2 border-t-2 border-[#DD2C6C]/30" />
            <div className="absolute -left-4 bottom-0 w-8 h-8 border-l-2 border-b-2 border-[#DD2C6C]/20" />
            
            <div className="space-y-5 pl-6">
              {/* Animated badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-md border border-[#DD2C6C]/10">
                <div className="relative">
                  <Sparkles className="w-4 h-4 text-[#DD2C6C]" />
                  <div className="absolute inset-0 w-4 h-4 bg-[#DD2C6C]/30 rounded-full animate-ping" />
                </div>
                <span className="text-[#1a1a1a] text-sm font-semibold">Pick Your Vibe</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              </div>
              
              {/* Main heading */}
              <div className="relative">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-[#1a1a1a] leading-[1]">
                  <span className="block overflow-hidden">
                    <span className="inline-block hover:translate-x-2 transition-transform duration-300 cursor-default">Press.</span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="inline-block text-[#DD2C6C] hover:translate-x-2 transition-transform duration-300 cursor-default">Slay.</span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="inline-block hover:translate-x-2 transition-transform duration-300 cursor-default">Repeat.</span>
                  </span>
                </h1>
                
                {/* Floating sparkle */}
                <Sparkles className="absolute -right-2 top-0 w-6 h-6 text-[#DD2C6C]/50 animate-pulse" />
              </div>

              {/* Description with highlight */}
              <p className="text-[#1a1a1a]/60 text-base lg:text-lg max-w-sm leading-relaxed">
                Soft gel press-on nails that make you feel 
                <span className="relative mx-1">
                  <span className="relative z-10 text-[#1a1a1a] font-semibold">unstoppable</span>
                  <span className="absolute bottom-0 left-0 right-0 h-2 bg-[#DD2C6C]/20 -rotate-1" />
                </span>
              </p>

              {/* Color picker - Horizontal scroll style */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-[1px] bg-[#DD2C6C]/30" />
                  <span className="text-xs text-[#1a1a1a]/50 uppercase tracking-widest font-medium">Styles</span>
                </div>
                <div className="flex gap-3">
                  {nailStyles.map((style, i) => (
                    <button
                      key={style.name}
                      onClick={() => setActiveColor(i)}
                      className="group relative"
                      title={style.name}
                    >
                      <div 
                        className={`w-14 h-14 rounded-2xl transition-all duration-300 flex items-center justify-center ${
                          activeColor === i 
                            ? 'scale-110 shadow-xl' 
                            : 'opacity-50 hover:opacity-80 hover:scale-105'
                        }`}
                        style={{ 
                          backgroundColor: style.accent,
                          boxShadow: activeColor === i ? `0 10px 30px ${style.accent}60` : 'none'
                        }}
                      >
                        {activeColor === i && (
                          <div className="w-3 h-3 rounded-full bg-white/80" />
                        )}
                      </div>
                      <span className={`block mt-2 text-[10px] font-semibold uppercase tracking-wide text-center transition-all ${
                        activeColor === i ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/30'
                      }`}>
                        {style.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4 pt-2">
                <Button
                  size="lg"
                  className="group px-8 py-6 bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full font-bold text-base shadow-xl shadow-[#DD2C6C]/30 hover:shadow-[#DD2C6C]/50 hover:scale-105 transition-all"
                  asChild
                >
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Link 
                  to="/tutorial" 
                  className="text-[#1a1a1a]/60 text-sm font-medium hover:text-[#DD2C6C] transition-colors flex items-center gap-1 group"
                >
                  How it works
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Features - Minimal style */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-[#1a1a1a]/60">
                  <div className="w-8 h-8 rounded-lg bg-[#DD2C6C]/10 flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-[#DD2C6C]" />
                  </div>
                  <span className="text-sm font-medium">15+ Uses</span>
                </div>
                <div className="flex items-center gap-2 text-[#1a1a1a]/60">
                  <div className="w-8 h-8 rounded-lg bg-[#DD2C6C]/10 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-[#DD2C6C]" />
                  </div>
                  <span className="text-sm font-medium">Gentle</span>
                </div>
                <div className="flex items-center gap-2 text-[#1a1a1a]/60">
                  <div className="w-8 h-8 rounded-lg bg-[#DD2C6C]/10 flex items-center justify-center">
                    <Scissors className="w-4 h-4 text-[#DD2C6C]" />
                  </div>
                  <span className="text-sm font-medium">Custom</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Image showcase */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Multiple decorative rings */}
              <div className="absolute inset-0 -m-6 rounded-full border border-[#DD2C6C]/10" />
              <div className="absolute inset-0 -m-12 rounded-full border-2 border-dashed border-[#DD2C6C]/20 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-0 -m-20 rounded-full border border-dotted border-[#DD2C6C]/10 animate-[spin_45s_linear_infinite_reverse]" />
              
              {/* Orbiting dots on the rings */}
              <div className="absolute -m-12 inset-0 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#DD2C6C]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-[#F9A8D4]" />
              </div>
              <div className="absolute -m-20 inset-0 animate-[spin_25s_linear_infinite_reverse]">
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#DD2C6C]/70" />
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F9A8D4]/80" />
              </div>
              
              {/* Main image */}
              <div className="relative w-64 lg:w-80 xl:w-96 h-[380px] lg:h-[450px] xl:h-[520px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/80">
                <img
                  key={activeColor}
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover animate-fade-scale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 via-transparent to-transparent" />
                
                {/* Style name badge */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-6 py-2.5 rounded-full shadow-lg">
                  <span className="font-bold text-[#1a1a1a]">{current.name}</span>
                </div>
              </div>

              {/* Floating mini cards */}
              <div className="absolute -left-10 top-1/4 w-20 h-24 lg:w-24 lg:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <img
                  src={nailStyles[(activeColor + 1) % 4].image}
                  alt="Style preview"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -right-8 bottom-1/4 w-20 h-24 lg:w-24 lg:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <img
                  src={nailStyles[(activeColor + 2) % 4].image}
                  alt="Style preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 right-8 w-4 h-4 rounded-full bg-[#DD2C6C] animate-pulse" />
              <div className="absolute top-1/3 -right-12 w-3 h-3 rounded-full bg-[#F9A8D4] animate-pulse delay-300" />
              <div className="absolute -bottom-4 left-8 w-5 h-5 rounded-full bg-[#DD2C6C]/60 animate-pulse delay-700" />
              
              {/* Price tag */}
              <div className="absolute -right-4 lg:-right-8 top-8 px-5 py-2.5 rounded-full bg-[#DD2C6C] text-white font-bold text-sm shadow-xl">
                From ₹299
              </div>
              
              {/* Rating badge */}
              <div className="absolute -left-4 lg:-left-8 bottom-12 px-4 py-2 rounded-full bg-white shadow-xl flex items-center gap-2">
                <span className="text-amber-500">★</span>
                <span className="font-bold text-sm text-[#1a1a1a]">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Vertical stacked (only on small screens) */}
      <div className="relative z-10 px-4 py-8 min-h-[100svh] flex flex-col justify-center md:hidden">
        
        {/* Animated badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-[#DD2C6C]/10">
            <div className="relative">
              <Sparkles className="w-4 h-4 text-[#DD2C6C]" />
              <div className="absolute inset-0 w-4 h-4 bg-[#DD2C6C]/30 rounded-full animate-ping" />
            </div>
            <span className="text-[#1a1a1a] text-xs font-semibold">Pick Your Vibe</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="text-5xl sm:text-6xl font-black text-[#1a1a1a] leading-[1]">
            <span className="block">Press.</span>
            <span className="block text-[#DD2C6C]">Slay.</span>
            <span className="block">Repeat.</span>
          </h1>
        </div>

        {/* Image showcase */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            {/* Multiple rotating rings - behind image */}
            <div className="absolute inset-0 -m-3 rounded-full border border-[#DD2C6C]/10 -z-10" />
            <div className="absolute inset-0 -m-6 rounded-full border border-dashed border-[#DD2C6C]/20 animate-[spin_25s_linear_infinite] -z-10" />
            <div className="absolute inset-0 -m-10 rounded-full border border-dotted border-[#DD2C6C]/10 animate-[spin_35s_linear_infinite_reverse] -z-10" />
            
            {/* Orbiting dots */}
            <div className="absolute inset-0 -m-6 animate-[spin_18s_linear_infinite] -z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#DD2C6C]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#F9A8D4]" />
            </div>
            <div className="absolute inset-0 -m-10 animate-[spin_22s_linear_infinite_reverse] -z-10">
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#DD2C6C]/60" />
            </div>
            
            <div className="relative w-64 h-[300px] sm:w-72 sm:h-[340px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <img
                key={activeColor}
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover animate-fade-scale"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full shadow-lg">
                <span className="font-bold text-sm text-[#1a1a1a]">{current.name}</span>
              </div>
            </div>
            
            {/* Price tag */}
            <div className="absolute -right-2 top-6 px-4 py-2 rounded-full bg-[#DD2C6C] text-white font-bold text-sm shadow-xl">
              ₹299
            </div>
            
            {/* Rating badge */}
            <div className="absolute -left-2 bottom-10 px-3 py-1.5 rounded-full bg-white shadow-lg flex items-center gap-1.5">
              <span className="text-amber-500 text-sm">★</span>
              <span className="font-bold text-xs text-[#1a1a1a]">4.9</span>
            </div>
          </div>
        </div>

        {/* Color picker with labels */}
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-[1px] bg-[#DD2C6C]/30" />
            <span className="text-[10px] text-[#1a1a1a]/50 uppercase tracking-widest font-medium">Styles</span>
            <div className="w-6 h-[1px] bg-[#DD2C6C]/30" />
          </div>
          <div className="flex justify-center gap-4">
            {nailStyles.map((style, i) => (
              <button
                key={style.name}
                onClick={() => setActiveColor(i)}
                className="group"
              >
                <div 
                  className={`w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center ${
                    activeColor === i 
                      ? 'scale-110 shadow-xl' 
                      : 'opacity-50'
                  }`}
                  style={{ 
                    backgroundColor: style.accent,
                    boxShadow: activeColor === i ? `0 8px 25px ${style.accent}60` : 'none'
                  }}
                >
                  {activeColor === i && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
                  )}
                </div>
                <span className={`block mt-1.5 text-[9px] font-semibold uppercase tracking-wide text-center transition-all ${
                  activeColor === i ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/30'
                }`}>
                  {style.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="w-full max-w-xs px-8 py-6 bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full font-bold text-base shadow-xl shadow-[#DD2C6C]/30"
            asChild
          >
            <Link to="/products">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          {/* Features row */}
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="flex items-center gap-1.5 text-[#1a1a1a]/50">
              <RefreshCw className="w-3.5 h-3.5 text-[#DD2C6C]" />
              <span className="text-xs font-medium">15+ Uses</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#DD2C6C]/30" />
            <div className="flex items-center gap-1.5 text-[#1a1a1a]/50">
              <Leaf className="w-3.5 h-3.5 text-[#DD2C6C]" />
              <span className="text-xs font-medium">Gentle</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#DD2C6C]/30" />
            <div className="flex items-center gap-1.5 text-[#1a1a1a]/50">
              <Scissors className="w-3.5 h-3.5 text-[#DD2C6C]" />
              <span className="text-xs font-medium">Custom</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-scale {
          0% { opacity: 0; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-scale {
          animation: fade-scale 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};
