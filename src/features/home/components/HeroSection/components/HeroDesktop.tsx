import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, RefreshCw, Leaf, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NailStyle } from '../types';

interface HeroDesktopProps {
  nailStyles: NailStyle[];
  activeColor: number;
  setActiveColor: (index: number) => void;
  current: NailStyle;
}

export const HeroDesktop = ({ nailStyles, activeColor, setActiveColor, current }: HeroDesktopProps) => {
  return (
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
  );
};

