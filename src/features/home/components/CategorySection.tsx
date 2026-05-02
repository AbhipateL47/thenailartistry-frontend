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

  const [first, ...rest] = categories;

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

        {/* Asymmetric grid — desktop */}
        <div className="hidden md:grid grid-cols-2 gap-4 h-[520px]">
          {/* Left — tall hero card */}
          {first && (
            <Link
              to={first.href}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={first.image}
                alt={first.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Hover pink overlay */}
              <div className="absolute inset-0 bg-[#DD2C6C]/0 group-hover:bg-[#DD2C6C]/20 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <h3 className="text-white text-2xl font-black">{first.name}</h3>
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm px-4 py-2 rounded-full">
                  Shop →
                </span>
              </div>
            </Link>
          )}

          {/* Right — 2×2 grid */}
          <div className="grid grid-cols-2 gap-4">
            {rest.slice(0, 4).map((cat) => (
              <Link
                key={cat.name}
                to={cat.href}
                className="group relative overflow-hidden rounded-2xl"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-[#DD2C6C]/0 group-hover:bg-[#DD2C6C]/15 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                  <h3 className="text-white text-base font-bold">{cat.name}</h3>
                  <ArrowRight className="h-4 w-4 text-white/0 group-hover:text-white/80 translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile — 2×2 grid */}
        <div className="grid md:hidden grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.href}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-sm font-bold">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
