import { Link } from 'react-router-dom';
import { ArrowRight, Clock, RefreshCw, Ruler, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '200+', label: 'Unique Designs' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '15+',  label: 'Reuses Per Set'  },
];

const features = [
  {
    icon: Clock,
    tag: '2 min',
    title: 'Applied in Minutes',
    desc: 'No UV lamp. No skill required. Peel, press, and go — gorgeous nails before your coffee gets cold.',
  },
  {
    icon: RefreshCw,
    tag: '15+ reuses',
    title: 'Reusable by Design',
    desc: 'Remove, store, reapply. Each set pays for itself again and again, and is kinder to the planet.',
  },
  {
    icon: Ruler,
    tag: '20 sizes',
    title: 'Fits Every Nail',
    desc: 'Every kit ships with 20 sizes — petite to wide, short to long — for a flawless edge-to-edge fit.',
  },
  {
    icon: Sparkles,
    tag: '2–3 weeks',
    title: 'Salon Staying Power',
    desc: 'Stays put without lifting or chipping. Looks like a salon set, costs a fraction of the price.',
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section className="bg-[#0D0D0D] relative overflow-hidden">

      {/* Dot grid — consistent with hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Centre ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(221,44,108,0.07) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative">

        {/* ── Headline ── */}
        <div className="pt-20 md:pt-28 pb-16 md:pb-20 text-center">
          <div className="container mx-auto px-4">
            <p className="inline-flex items-center gap-2.5 text-[#DD2C6C] text-[11px] font-semibold tracking-[0.28em] uppercase mb-6">
              <span className="h-px w-5 bg-[#DD2C6C]/50 inline-block" />
              Why choose us
              <span className="h-px w-5 bg-[#DD2C6C]/50 inline-block" />
            </p>

            <h2 className="font-black leading-[0.9] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)' }}
            >
              <span className="text-white">Salon nails.</span><br />
              <span style={{ WebkitTextStroke: '2px #DD2C6C', color: 'transparent' }}>
                Without the salon.
              </span>
            </h2>

            <p className="text-white/40 text-sm md:text-[15px] max-w-xs mx-auto leading-relaxed">
              Beautiful, lasting nails at home — no appointment, no UV lamp, no damage.
            </p>
          </div>
        </div>

        {/* ── Stats band ── */}
        <div className="border-y border-white/[0.07]">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={[
                    'flex flex-col items-center justify-center py-8 gap-1.5',
                    'w-1/2 md:flex-1',
                    // mobile: right border on left column, bottom border on top row
                    i % 2 === 0 ? 'border-r border-white/[0.07]' : '',
                    i < 2 ? 'border-b md:border-b-0 border-white/[0.07]' : '',
                    // desktop: right border on all except last
                    i < stats.length - 1 ? 'md:border-r md:border-white/[0.07]' : '',
                  ].join(' ')}
                >
                  <span className="text-[2rem] md:text-[2.6rem] xl:text-[3rem] font-black text-white tabular-nums leading-none">
                    {value}
                  </span>
                  <span className="text-white/35 text-[11px] tracking-[0.18em] uppercase text-center">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Feature cards ── */}
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map(({ icon: Icon, tag, title, desc }) => (
                <div
                  key={title}
                  className="group relative p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#DD2C6C]/30 hover:bg-[#DD2C6C]/[0.03] transition-all duration-300 cursor-default"
                >
                  {/* Top edge accent on hover */}
                  <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#DD2C6C]/0 to-transparent group-hover:via-[#DD2C6C]/50 transition-all duration-500 rounded-full" />

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-[#DD2C6C]/10 border border-[#DD2C6C]/20 flex items-center justify-center mb-5 group-hover:bg-[#DD2C6C]/20 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-[#DD2C6C]" />
                  </div>

                  {/* Tag */}
                  <p className="text-[#DD2C6C] text-[11px] font-semibold tracking-[0.2em] uppercase mb-2">
                    {tag}
                  </p>

                  {/* Title */}
                  <h3 className="text-white font-bold text-[15px] mb-2.5 leading-snug">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/40 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 md:mt-16 flex justify-center">
              <Button
                size="lg"
                asChild
                className="group bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full px-9 py-6 font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#DD2C6C]/25 hover:shadow-[#DD2C6C]/40 hover:scale-105 transition-all duration-300"
              >
                <Link to="/tutorial">
                  Learn How to Apply
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
