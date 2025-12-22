import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, RefreshCw, Leaf, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NailStyle } from '../types';

interface HeroMobileProps {
  nailStyles: NailStyle[];
  activeColor: number;
  setActiveColor: (index: number) => void;
  current: NailStyle;
}

export const HeroMobile = ({ nailStyles, activeColor, setActiveColor, current }: HeroMobileProps) => {
  return (
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
  );
};

