import { useState } from 'react';
import { HeroDesktop } from './components/HeroDesktop';
import { HeroMobile } from './components/HeroMobile';
import { NailStyle } from './types';

/**
 * HeroSection - Interactive Nail Color Picker Experience
 * User can tap/click nail colors and see the hand change
 * Mobile: vertical stacked | Desktop: horizontal left-right
 */
export const HeroSection = () => {
  const [activeColor, setActiveColor] = useState(0);
  
  const nailStyles: NailStyle[] = [
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

      {/* Desktop & Tablet Layout */}
      <HeroDesktop
        nailStyles={nailStyles}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        current={current}
      />

      {/* Mobile Layout */}
      <HeroMobile
        nailStyles={nailStyles}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        current={current}
      />

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

