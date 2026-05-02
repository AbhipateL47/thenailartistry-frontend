import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Product } from '@/features/products/services/product.service';

interface HeroSectionProps {
  featuredProducts?: Product[];
}

const FALLBACK_STYLES = [
  { name: 'Rose Blush', accent: '#DD2C6C', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600', slug: undefined },
  { name: 'French Classic', accent: '#E8B4B8', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600', slug: undefined },
  { name: 'Berry Dream', accent: '#C71585', image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600', slug: undefined },
  { name: 'Nude Glow', accent: '#DEB887', image: 'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?w=600', slug: undefined },
];

const ACCENT_PALETTE = ['#DD2C6C', '#E8B4B8', '#C71585', '#DEB887'];

const stats = [
  { value: '200+', label: 'Designs' },
  { value: '50K+', label: 'Customers' },
  { value: '4.9★', label: 'Rating' },
  { value: '15+', label: 'Reuses' },
];

export const HeroSection = ({ featuredProducts }: HeroSectionProps) => {
  const [active, setActive] = useState(0);

  const styles =
    featuredProducts && featuredProducts.length >= 4
      ? featuredProducts.slice(0, 4).map((p, i) => ({
          name: p.name,
          accent: ACCENT_PALETTE[i],
          image: p.primaryImage,
          slug: p.slug,
        }))
      : FALLBACK_STYLES;

  const current = styles[active];

  const MainImage = () => (
    <div className="relative w-full aspect-[3/4] max-w-xs mx-auto lg:max-w-none">
      {/* Glow behind image */}
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-30 transition-all duration-700 scale-90"
        style={{ background: `radial-gradient(circle, ${current.accent}, transparent 70%)` }}
      />
      {/* Image frame */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 h-full">
        {current.slug ? (
          <Link to={`/products/${current.slug}`} className="block h-full">
            <img
              key={active}
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover transition-all duration-500"
              loading="eager"
            />
          </Link>
        ) : (
          <img
            key={active}
            src={current.image}
            alt={current.name}
            className="w-full h-full object-cover transition-all duration-500"
            loading="eager"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 via-transparent to-transparent pointer-events-none" />
        {/* Product name badge */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full pointer-events-none">
          <span className="text-white text-xs font-medium truncate max-w-[160px] block text-center">
            {current.name}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="relative min-h-[100svh] bg-[#0D0D0D] overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DD2C6C]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#DD2C6C]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex items-center min-h-[100svh] container mx-auto px-6">
        <div className="grid grid-cols-2 gap-12 lg:gap-20 items-center w-full py-20">

          {/* Left — content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
              <span className="w-2 h-2 rounded-full bg-[#DD2C6C] animate-pulse" />
              <span className="text-white/70 font-medium">New drops every week</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-6xl xl:text-7xl font-black leading-[1.0] tracking-tight">
                <span className="block text-white">Press.</span>
                <span className="block text-[#DD2C6C]">Wear.</span>
                <span className="block text-white">Obsess.</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-white/50 text-lg leading-relaxed max-w-sm">
              Salon-quality press-on nails that last 2–3 weeks. Reusable 15+ times. Applied in 2 minutes.
            </p>

            {/* Swatches */}
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Pick a style</p>
              <div className="flex gap-3">
                {styles.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="relative rounded-2xl transition-all duration-300 overflow-hidden"
                    style={{ width: 56, height: 56 }}
                  >
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                    <div
                      className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${
                        active === i ? 'border-[#DD2C6C]' : 'border-transparent hover:border-white/40'
                      }`}
                    />
                    {active === i && (
                      <div className="absolute inset-0 bg-[#DD2C6C]/20 rounded-2xl" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="group bg-[#DD2C6C] hover:bg-[#c42460] text-white px-8 py-6 rounded-full font-bold text-base shadow-lg shadow-[#DD2C6C]/30 hover:shadow-[#DD2C6C]/50 hover:scale-105 transition-all"
                asChild
              >
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Link
                to="/tutorial"
                className="text-white/40 text-sm hover:text-white/70 transition-colors flex items-center gap-1.5 group"
              >
                How it works
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right — image */}
          <MainImage />
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden flex flex-col min-h-[100svh] px-5 pt-8 pb-6">
        {/* Badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DD2C6C] animate-pulse" />
            <span className="text-white/60 font-medium">New drops every week</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-black leading-[1.05] tracking-tight">
            <span className="block text-white">Press.</span>
            <span className="block text-[#DD2C6C]">Wear.</span>
            <span className="block text-white">Obsess.</span>
          </h1>
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center py-4">
          <MainImage />
        </div>

        {/* Swatches */}
        <div className="flex justify-center gap-3 mb-6">
          {styles.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative rounded-xl overflow-hidden transition-all duration-300"
              style={{ width: 44, height: 44 }}
            >
              <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              <div
                className={`absolute inset-0 rounded-xl border-2 transition-all ${
                  active === i ? 'border-[#DD2C6C]' : 'border-transparent'
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA */}
        <Button
          size="lg"
          className="w-full bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full font-bold py-6 shadow-lg shadow-[#DD2C6C]/30"
          asChild
        >
          <Link to="/products">
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      {/* Stats bar — desktop only */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 divide-x divide-white/10">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex items-center justify-center gap-3 py-4">
                <span className="text-2xl font-black text-[#DD2C6C]">{value}</span>
                <span className="text-white/40 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
