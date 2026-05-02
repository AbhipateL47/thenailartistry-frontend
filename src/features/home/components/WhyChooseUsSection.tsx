import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '200+', label: 'Unique Designs' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '15+', label: 'Reuses Per Set' },
];

const reasons = [
  'Reusable 15+ times — eco-friendly & cost-effective',
  'Lasts 2–3 weeks without lifting or chipping',
  '20 nail sizes for the perfect fit every time',
];

export const WhyChooseUsSection = () => {
  return (
    <section className="bg-[#0D0D0D]">
      {/* Stats band */}
      <div className="border-t border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-8 px-4 gap-1">
                <span className="text-3xl md:text-4xl font-black text-[#DD2C6C] leading-none">{value}</span>
                <span className="text-white/40 text-xs md:text-sm text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#DD2C6C]/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1599206676335-193c82b13c9e?w=800"
                  alt="Nail application"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0D0D0D]/50 to-transparent" />
              </div>
            </div>

            {/* Text */}
            <div className="space-y-6">
              <div>
                <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Why Us</p>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Nails that actually last.<br />
                  <span className="text-[#DD2C6C]">Without the salon price.</span>
                </h2>
              </div>

              <p className="text-white/50 text-base leading-relaxed">
                At The Nail Artistry, we believe you shouldn't have to choose between beautiful nails and your budget. Our press-ons deliver salon results you can achieve at home — in 2 minutes flat.
              </p>

              <ul className="space-y-3">
                {reasons.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#DD2C6C]/20 border border-[#DD2C6C]/40 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[#DD2C6C]" />
                    </div>
                    <span className="text-white/70 text-sm">{r}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                asChild
                className="bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full px-8 shadow-lg shadow-[#DD2C6C]/25 hover:shadow-[#DD2C6C]/40 transition-all group"
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
