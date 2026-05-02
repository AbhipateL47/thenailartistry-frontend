import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Category {
  name: string;
  image: string;
  href: string;
}

interface CategorySectionProps {
  categories: Category[];
}

export const CategorySection = ({ categories }: CategorySectionProps) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[#111111]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Collections</p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">Shop by Occasion</h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors group"
          >
            All Products
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Desktop: masonry-style 3+2 grid */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {/* Row 1: 3 tall cards */}
          {categories.slice(0, 3).map((cat) => (
            <Link
              key={cat.name}
              to={cat.href}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                style={{ '--tw-scale-x': 'var(--scale, 1)', '--tw-scale-y': 'var(--scale, 1)' } as React.CSSProperties}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Pink hover tint */}
              <div className="absolute inset-0 bg-[#DD2C6C]/0 group-hover:bg-[#DD2C6C]/15 transition-all duration-500" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <h3 className="text-white font-black text-lg leading-tight">{cat.name}</h3>
                <span className="opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 text-white/80 text-sm">
                  Shop →
                </span>
              </div>
            </Link>
          ))}

          {/* Row 2: 2 wide landscape cards */}
          {categories.slice(3, 5).map((cat) => (
            <Link
              key={cat.name}
              to={cat.href}
              className="group relative overflow-hidden rounded-2xl aspect-video col-span-1 md:col-span-1"
              style={{ gridColumn: 'span 1' }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-[#DD2C6C]/0 group-hover:bg-[#DD2C6C]/15 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <h3 className="text-white font-bold text-base">{cat.name}</h3>
                <ArrowRight className="h-4 w-4 text-white/0 group-hover:text-white/80 translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </Link>
          ))}
          {/* Fill last cell if only 4 categories */}
          {categories.length === 4 && (
            <Link
              to="/products"
              className="group relative overflow-hidden rounded-2xl aspect-video flex items-center justify-center bg-[#DD2C6C]/10 border border-[#DD2C6C]/20 hover:bg-[#DD2C6C]/20 transition-all"
            >
              <div className="text-center">
                <p className="text-[#DD2C6C] font-bold text-sm mb-1">Explore All</p>
                <ArrowRight className="h-5 w-5 text-[#DD2C6C] mx-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-none">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.href}
              className="group relative flex-shrink-0 w-44 aspect-[3/4] overflow-hidden rounded-2xl snap-start"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white text-sm font-bold leading-tight">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "View All" */}
        <div className="mt-6 sm:hidden text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            View All Products <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
