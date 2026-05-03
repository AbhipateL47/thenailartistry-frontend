import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/features/products/services/product.service';

interface HeroSectionProps {
  featuredProducts?: Product[];
}

const features = [
  'Lasts 2–3 weeks',
  'Applied in 2 minutes',
  'Reusable 15+ times',
  'No damage · No glue',
];

// Five abstract nail shapes fanned like fingers — pure SVG, zero photos
const NailArtComposition = ({ compact = false }: { compact?: boolean }) => {
  const W = compact ? 320 : 480;
  const H = compact ? 320 : 480;
  const s = compact ? 0.67 : 1;

  // Each nail: cx, cy at center-bottom of nail, rotation, opacity scale
  const nails = [
    { tx: 64 * s,  ty: 295 * s, r: -22, op: 0.60, sz: 0.82 },
    { tx: 152 * s, ty: 262 * s, r: -10, op: 0.80, sz: 0.92 },
    { tx: 240 * s, ty: 250 * s, r:   0, op: 1.00, sz: 1.00 },
    { tx: 328 * s, ty: 262 * s, r:  10, op: 0.80, sz: 0.92 },
    { tx: 416 * s, ty: 295 * s, r:  22, op: 0.60, sz: 0.82 },
  ];

  // Almond nail path centred at origin (tip up, base down)
  // width ~58, height ~148 at scale 1
  const nailPath = (sz: number) => {
    const w = 29 * sz, h = 74 * sz;
    return `M0,${-h} C${w * 0.55},${-h} ${w},${-h * 0.65} ${w},${-h * 0.15} C${w},${h * 0.45} ${w * 0.55},${h} 0,${h} C${-w * 0.55},${h} ${-w},${h * 0.45} ${-w},${-h * 0.15} C${-w},${-h * 0.65} ${-w * 0.55},${-h} 0,${-h} Z`;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Glow behind the composition */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: W * 0.72, height: H * 0.55,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -48%)',
          background: 'radial-gradient(ellipse, rgba(221,44,108,0.22) 0%, transparent 68%)',
          filter: 'blur(32px)',
        }}
      />

      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} fill="none">
        <defs>
          <linearGradient id="ng1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F9A8C9" />
            <stop offset="55%" stopColor="#DD2C6C" />
            <stop offset="100%" stopColor="#9B1B47" />
          </linearGradient>
          <linearGradient id="ng2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="55%" stopColor="#C42460" />
            <stop offset="100%" stopColor="#7E1040" />
          </linearGradient>
          <filter id="nailGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {nails.map((n, i) => {
          const path = nailPath(n.sz * s);
          const isCenter = i === 2;
          return (
            <g key={i} transform={`translate(${n.tx}, ${n.ty}) rotate(${n.r})`}>
              {/* Fill */}
              <path
                d={path}
                fill={isCenter ? 'url(#ng1)' : 'url(#ng2)'}
                fillOpacity={n.op}
                filter={isCenter ? 'url(#nailGlow)' : undefined}
              />
              {/* Border */}
              <path
                d={path}
                fill="none"
                stroke="#F472B6"
                strokeWidth={isCenter ? 1.2 : 0.8}
                strokeOpacity={n.op * 0.55}
              />
              {/* Highlight streak */}
              <ellipse
                cx={-5 * n.sz * s}
                cy={-52 * n.sz * s}
                rx={6 * n.sz * s}
                ry={14 * n.sz * s}
                fill="white"
                fillOpacity={isCenter ? 0.18 : 0.1}
                transform="rotate(-8)"
              />
              {/* Center nail subtle art lines */}
              {isCenter && (
                <>
                  <path
                    d={`M${-10 * s},${10 * s} C${-8 * s},${2 * s} ${8 * s},${2 * s} ${10 * s},${10 * s}`}
                    stroke="white" strokeWidth="0.8" strokeOpacity="0.22" fill="none"
                  />
                  <path
                    d={`M${-8 * s},${28 * s} C${-6 * s},${20 * s} ${6 * s},${20 * s} ${8 * s},${28 * s}`}
                    stroke="white" strokeWidth="0.8" strokeOpacity="0.16" fill="none"
                  />
                </>
              )}
            </g>
          );
        })}

        {/* Gold diamond accents */}
        {[
          { x: 148 * s, y: 148 * s },
          { x: 332 * s, y: 148 * s },
          { x: 240 * s, y: 108 * s },
        ].map((d, i) => (
          <polygon
            key={i}
            points={`${d.x},${d.y - 5 * s} ${d.x + 3 * s},${d.y} ${d.x},${d.y + 5 * s} ${d.x - 3 * s},${d.y}`}
            fill="#D4A853"
            fillOpacity={0.6}
          />
        ))}

        {/* Subtle outer dots */}
        <circle cx={40 * s} cy={180 * s} r={2.5 * s} fill="#DD2C6C" fillOpacity={0.22} />
        <circle cx={440 * s} cy={300 * s} r={2 * s} fill="#DD2C6C" fillOpacity={0.18} />
        <circle cx={240 * s} cy={400 * s} r={2.5 * s} fill="#DD2C6C" fillOpacity={0.15} />
      </svg>
    </div>
  );
};

export const HeroSection = ({ featuredProducts: _ }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[100svh] bg-[#0D0D0D] overflow-hidden">

      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient glow — top right */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(221,44,108,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      {/* Ambient glow — bottom left */}
      <div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(221,44,108,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      {/* ═══════ DESKTOP ═══════ */}
      <div className="hidden md:flex items-center min-h-[100svh] container mx-auto px-8">
        <div className="grid grid-cols-2 xl:grid-cols-[1.15fr_0.85fr] gap-12 xl:gap-20 items-center w-full py-24">

          {/* Left — copy */}
          <div className="space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#DD2C6C]/30 bg-[#DD2C6C]/8">
              <Sparkles className="h-3.5 w-3.5 text-[#DD2C6C]" />
              <span className="text-[#DD2C6C] text-xs font-semibold uppercase tracking-[0.15em]">
                Premium Press-On Nail Art
              </span>
            </div>

            {/* Headline — solid / stroke / muted alternating */}
            <h1 className="font-black uppercase leading-[0.9] tracking-tight">
              <span className="block text-[76px] xl:text-[88px] text-white">Salon</span>
              <span
                className="block text-[76px] xl:text-[88px]"
                style={{ WebkitTextStroke: '2.5px #DD2C6C', color: 'transparent' }}
              >
                Nails.
              </span>
              <span className="block text-[76px] xl:text-[88px] text-white/70">At Home.</span>
            </h1>

            {/* Tagline rule */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#DD2C6C]/50 flex-shrink-0" />
              <p className="text-white/40 text-xs uppercase tracking-[0.22em] font-medium">
                Salon quality · Zero effort
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {features.map((f) => (
                <span
                  key={f}
                  className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/10 text-white/50"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-5 pt-1">
              <Button
                size="lg"
                className="group bg-[#DD2C6C] hover:bg-[#c42460] text-white px-9 py-6 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#DD2C6C]/25 hover:shadow-[#DD2C6C]/45 hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/products">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Link
                to="/tutorial"
                className="text-white/30 text-sm hover:text-white/65 transition-colors flex items-center gap-1.5 group uppercase tracking-wider"
              >
                How it works
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right — abstract nail shapes */}
          <div className="relative h-[500px] xl:h-[560px] flex items-center justify-center">
            <NailArtComposition />
          </div>
        </div>
      </div>

      {/* ═══════ MOBILE ═══════ */}
      <div className="md:hidden flex flex-col min-h-[100svh] px-5 pt-10 pb-8">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#DD2C6C]/30 bg-[#DD2C6C]/8">
            <Sparkles className="h-3 w-3 text-[#DD2C6C]" />
            <span className="text-[#DD2C6C] text-xs font-semibold uppercase tracking-wider">Press-On Nail Art</span>
          </div>
        </div>

        {/* Nail art composition — compact */}
        <div className="flex justify-center mb-4" style={{ height: 220 }}>
          <NailArtComposition compact />
        </div>

        {/* Headline */}
        <div className="text-center mb-5">
          <h1 className="font-black uppercase leading-[0.9] tracking-tight">
            <span className="block text-[52px] text-white">Salon</span>
            <span
              className="block text-[52px]"
              style={{ WebkitTextStroke: '2px #DD2C6C', color: 'transparent' }}
            >
              Nails.
            </span>
            <span className="block text-[52px] text-white/70">At Home.</span>
          </h1>
          <p className="text-white/35 text-xs mt-3 uppercase tracking-[0.18em]">
            Salon quality · Zero effort
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {features.map((f) => (
            <span
              key={f}
              className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/10 text-white/45"
            >
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Button
          size="lg"
          className="w-full bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full font-bold py-6 shadow-lg shadow-[#DD2C6C]/25 uppercase tracking-wider text-sm"
          asChild
        >
          <Link to="/products">
            Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

    </section>
  );
};
