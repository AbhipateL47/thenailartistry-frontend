import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * HeroSection 1.4 - Creative "Nail Hand" Showcase
 * Unique layout with hand silhouette holding nails as the centerpiece
 * Immersive full-screen experience with interactive feel
 */
export const HeroSection = () => {
  const nailDesigns = [
    { name: 'Rose Quartz', color: '#F4A5AE', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200' },
    { name: 'Midnight', color: '#2D1B4E', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=200' },
    { name: 'French Tip', color: '#FFF5F5', image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=200' },
    { name: 'Glitter', color: '#E8B4CB', image: 'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?w=200' },
  ];

  return (
    <section className="relative min-h-[100svh] bg-[#0D0D0D] overflow-hidden">
      {/* Animated gradient background - pink shades only */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_#DD2C6C20_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_#F472B615_0%,_transparent_50%)]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-5 min-h-[100svh] flex flex-col">
        {/* Top section - Tagline */}
        <div className="pt-8 md:pt-12 text-center">
          <p className="text-[#DD2C6C]/70 text-xs md:text-sm tracking-[0.3em] uppercase font-medium">
            Handcrafted • Reusable • Stunning
          </p>
        </div>

        {/* Center - Main content */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 py-8">
          
          {/* Left floating text */}
          <div className="lg:flex-1 text-center lg:text-left lg:pr-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight">
              <span className="block">YOUR</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#DD2C6C] to-[#F472B6]">
                NAILS
              </span>
              <span className="block">YOUR</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] to-[#DD2C6C]">
                RULES
              </span>
            </h1>
          </div>

          {/* Center - Creative nail showcase */}
          <div className="relative w-72 sm:w-80 md:w-96 lg:w-[420px] aspect-square flex items-center justify-center">
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-[#DD2C6C]/20 animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Central hand/nail image */}
            <div className="relative w-48 sm:w-56 md:w-64 h-64 sm:h-72 md:h-80">
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl shadow-[#DD2C6C]/20">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500"
                  alt="Featured nails"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-[#DD2C6C]/10 rounded-[4rem] blur-2xl -z-10" />
            </div>

            {/* Orbiting nail designs */}
            {nailDesigns.map((nail, i) => {
              const angle = (i * 90) - 45; // Position at corners
              const radius = 140; // Distance from center
              return (
                <div
                  key={nail.name}
                  className="absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg cursor-pointer hover:scale-110 hover:border-[#DD2C6C]/50 transition-all duration-300"
                  style={{
                    transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
                  }}
                >
                  <img src={nail.image} alt={nail.name} className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>

          {/* Right - Description & CTA */}
          <div className="lg:flex-1 text-center lg:text-right lg:pl-8 space-y-6">
            <p className="text-white/50 text-sm md:text-base max-w-xs mx-auto lg:ml-auto lg:mr-0">
              Handcrafted soft gel press-ons. Reusable. Salon-quality. Made for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <Button
                size="lg"
                className="px-8 py-6 bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full font-bold text-base shadow-lg shadow-[#DD2C6C]/30"
                asChild
              >
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Mini stats */}
            <div className="flex gap-6 justify-center lg:justify-end text-white/40 text-xs">
              <span>500+ Clients</span>
              <span>•</span>
              <span>4.9★ Rating</span>
            </div>
          </div>
        </div>

        {/* Bottom - Scrolling categories */}
        <div className="pb-8 md:pb-12">
          <div className="flex items-center justify-center gap-8 md:gap-16 text-white/30 text-xs md:text-sm tracking-widest uppercase overflow-hidden">
            <span className="hover:text-[#DD2C6C] transition-colors cursor-pointer">French</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="hover:text-[#DD2C6C] transition-colors cursor-pointer">Glitter</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="hover:text-[#DD2C6C] transition-colors cursor-pointer">Ombre</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="hover:text-[#DD2C6C] transition-colors cursor-pointer">Minimal</span>
            <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
            <span className="hover:text-[#DD2C6C] transition-colors cursor-pointer hidden sm:block">Art</span>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-white/5" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-white/5" />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};

