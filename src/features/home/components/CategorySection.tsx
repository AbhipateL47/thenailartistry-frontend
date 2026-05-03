import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Category {
  name: string;
  image?: string;
  href: string;
}

interface CategorySectionProps {
  categories: Category[];
}

const occasionMeta: Record<string, {
  accent: string;
  tags: string[];
  number: string;
  description: string;
}> = {
  Wedding: {
    accent: '#F5C6D8',
    tags: ['French Tips', 'Nude & Blush', 'Pearl Gloss'],
    number: '01',
    description: 'Timeless elegance for your big day',
  },
  Party: {
    accent: '#DD2C6C',
    tags: ['Glitter', 'Neon Chrome', 'Bold Color'],
    number: '02',
    description: 'Make every entrance unforgettable',
  },
  Casual: {
    accent: '#E8719A',
    tags: ['Minimalist', 'Pastel', 'Soft Matte'],
    number: '03',
    description: 'Effortless style for everyday wear',
  },
  Designer: {
    accent: '#C42460',
    tags: ['Abstract Art', 'Jewel Finish', '3D Accents'],
    number: '04',
    description: 'Wearable art for the bold',
  },
  Bridal: {
    accent: '#F0A0BE',
    tags: ['Lace Detail', 'Rose Gold', 'Crystal Gems'],
    number: '05',
    description: 'Romance crafted in every detail',
  },
  Office: {
    accent: '#D4547E',
    tags: ['Neutral Tones', 'Classic Red', 'Sheer Pink'],
    number: '06',
    description: 'Polished looks for the professional',
  },
};

const fallbackMeta = (index: number) => ({
  accent: '#DD2C6C',
  tags: ['Classic', 'Trending', 'New Arrivals'],
  number: String(index + 1).padStart(2, '0'),
  description: 'Explore the collection',
});

export const CategorySection = ({ categories }: CategorySectionProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[#0D0D0D]">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Collections
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Shop by Occasion
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-2 text-sm text-white/30 hover:text-white/70 transition-colors group"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Row list */}
        <div className="border-t border-white/8">
          {categories.map((cat, index) => {
            const meta = occasionMeta[cat.name] ?? fallbackMeta(index);
            const isHovered = hoveredIndex === index;

            return (
              <Link
                key={cat.name}
                to={cat.href}
                className="group relative flex items-center border-b border-white/8 hover:border-white/12 transition-colors duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-r-full"
                  style={{ background: meta.accent }}
                />

                {/* Hover background fill */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `${meta.accent}06` }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center w-full py-5 md:py-6 pl-6 md:pl-8 pr-4 md:pr-6 gap-4 md:gap-8">

                  {/* Index number */}
                  <span
                    className="text-xs font-mono w-7 shrink-0 transition-colors duration-300"
                    style={{ color: isHovered ? meta.accent : 'rgba(255,255,255,0.18)' }}
                  >
                    {meta.number}
                  </span>

                  {/* Category name */}
                  <h3
                    className="text-2xl md:text-4xl lg:text-[2.75rem] font-black uppercase tracking-tight leading-none transition-colors duration-300 flex-1"
                    style={{ color: isHovered ? meta.accent : '#ffffff' }}
                  >
                    {cat.name}
                  </h3>

                  {/* Description — large desktop only */}
                  <p
                    className="hidden lg:block text-sm flex-shrink-0 w-52 text-right transition-colors duration-300"
                    style={{ color: isHovered ? `${meta.accent}90` : 'rgba(255,255,255,0.22)' }}
                  >
                    {meta.description}
                  </p>

                  {/* Tags — desktop only */}
                  <div className="hidden md:flex items-center gap-3 shrink-0">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium transition-colors duration-300"
                        style={{ color: isHovered ? `${meta.accent}80` : 'rgba(255,255,255,0.22)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div
                    className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      borderColor: isHovered ? `${meta.accent}50` : 'rgba(255,255,255,0.1)',
                      background: isHovered ? `${meta.accent}15` : 'transparent',
                      opacity: isHovered ? 1 : 0.4,
                    }}
                  >
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      style={{ color: isHovered ? meta.accent : 'rgba(255,255,255,0.5)' }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 md:hidden text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 transition-colors"
          >
            View All Products
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
