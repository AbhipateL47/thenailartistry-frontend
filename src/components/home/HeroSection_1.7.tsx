import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

/**
 * HeroSection 1.7 - "Glow Up" Split Screen Experience
 * Diagonal split design with before/after concept
 * Tagline: "Glow Up in Seconds"
 */
export const HeroSection = () => {
  const [activeStyle, setActiveStyle] = useState(0);

  const styles = [
    { name: 'Minimal', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600' },
    { name: 'Glam', image: 'https://plus.unsplash.com/premium_photo-1670348051093-a3f94b408bcb?w=600' },
    { name: 'Bold', image: 'https://images.unsplash.com/photo-1619607146034-5a05296c8f9a?w=600' },
  ];

  return (
    <section className="relative min-h-[100svh] bg-[#1a1215] overflow-hidden">
      {/* Diagonal split background - darker top for better contrast */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#2a1f22] to-[#1a1215]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 55%)' }}
        />
      </div>

      {/* Subtle glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DD2C6C]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#DD2C6C]/5 rounded-full blur-[100px]" />

      {/* Decorative dots - positioned away from content */}
      <div className="absolute top-[10%] right-[5%] w-2 h-2 rounded-full bg-[#DD2C6C]/40 hidden lg:block" />
      <div className="absolute top-[20%] right-[3%] w-3 h-3 rounded-full bg-[#DD2C6C]/30 hidden lg:block" />
      <div className="absolute bottom-[15%] left-[3%] w-2 h-2 rounded-full bg-[#DD2C6C]/50 hidden lg:block" />
      <div className="absolute bottom-[25%] left-[5%] w-2.5 h-2.5 rounded-full bg-[#F9A8D4]/40 hidden lg:block" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-5 min-h-[100svh] flex items-center py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          
          {/* Left - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Small tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#DD2C6C] animate-pulse" />
              <span className="text-white/80 text-sm font-medium">New Arrivals</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] mb-6">
              <span className="text-white block">Glow Up</span>
              <span className="text-white block">in</span>
              <span className="text-[#DD2C6C] block relative">
                Seconds
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10">
                  <path d="M0,8 Q50,0 100,8 T200,8" stroke="#DD2C6C" strokeWidth="3" fill="none" opacity="0.5" />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-white/50 text-base sm:text-lg max-w-md mx-auto lg:mx-0 mb-8">
              No salon. No wait. Just stunning press-on nails that transform your look instantly.
            </p>

            {/* Style selector */}
            <div className="flex items-center gap-4 justify-center lg:justify-start mb-8">
              <span className="text-white/40 text-sm">Your vibe:</span>
              <div className="flex gap-2">
                {styles.map((style, i) => (
                  <button
                    key={style.name}
                    onClick={() => setActiveStyle(i)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeStyle === i
                        ? 'bg-[#DD2C6C] text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="px-8 py-6 bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full font-bold text-base shadow-xl shadow-[#DD2C6C]/30 hover:scale-105 transition-all"
                asChild
              >
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="px-8 py-6 rounded-full bg-white/10 border border-[#DD2C6C]/30 text-white hover:bg-[#DD2C6C]/20 hover:border-[#DD2C6C]/50 font-medium group backdrop-blur-sm"
                asChild
              >
                <Link to="/tutorial">
                  <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform text-[#DD2C6C]" />
                  Watch Tutorial
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-[#DD2C6C]">2min</div>
                <div className="text-xs text-white/40">Apply Time</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-[#DD2C6C]">15+</div>
                <div className="text-xs text-white/40">Reuses</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-[#DD2C6C]">4.9★</div>
                <div className="text-xs text-white/40">Rating</div>
              </div>
            </div>
          </div>

          {/* Right - Image showcase */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#DD2C6C]/20 rounded-[3rem] blur-3xl scale-110" />
              
              {/* Main image */}
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[420px] rounded-[2.5rem] overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  key={activeStyle}
                  src={styles[activeStyle].image}
                  alt={styles[activeStyle].name}
                  className="w-full h-full object-cover animate-fade-scale"
                />
                
                {/* Style badge */}
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                  <span className="text-sm font-bold text-[#1a1a1a]">{styles[activeStyle].name}</span>
                </div>

                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Floating accent cards */}
              <div className="absolute -left-6 top-1/4 w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-3 border-white shadow-xl -rotate-6 animate-float">
                <img src="https://images.unsplash.com/photo-1696342003838-4a8f9f36588c?w=200" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -right-4 bottom-1/4 w-14 h-18 sm:w-18 sm:h-22 rounded-xl overflow-hidden border-3 border-white shadow-xl rotate-6 animate-float-delayed">
                <img src="https://images.unsplash.com/photo-1619607146034-5a05296c8f9a?w=200" alt="" className="w-full h-full object-cover" />
              </div>

              {/* Decorative ring */}
              <div className="absolute -inset-8 rounded-full border border-dashed border-[#DD2C6C]/20 animate-[spin_30s_linear_infinite] hidden sm:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,60 1440,50 L1440,100 L0,100 Z"
            fill="#DD2C6C"
            fillOpacity="0.1"
          />
        </svg>
      </div>

      <style>{`
        @keyframes fade-scale {
          0% { opacity: 0; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-scale {
          animation: fade-scale 0.5s ease-out;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-10px) rotate(-6deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-8px) rotate(6deg); }
        }
        .animate-float-delayed {
          animation: float-delayed 3.5s ease-in-out infinite 0.5s;
        }
      `}</style>
    </section>
  );
};

