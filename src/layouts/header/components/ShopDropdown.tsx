import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Tag } from 'lucide-react';
import { shopCategories } from '@/shared/constants/navigation';

interface ShopDropdownProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLinkClick: () => void;
}

const quickLinks = [
  { href: '/products?category=bestsellers', label: 'Best Sellers', icon: TrendingUp, color: '#DD2C6C' },
  { href: '/products?isOnSale=true', label: 'Sale', icon: Tag, color: '#F59E0B' },
  { href: '/products', label: 'New Arrivals', icon: Sparkles, color: '#72C7B6' },
];

const occasionColors: Record<string, string> = {
  'Casual Nails': '#72C7B6',
  'Party Nails': '#DD2C6C',
  'Wedding Nails': '#E8C4A0',
  'Formal Nails': '#A8C4D4',
  'Holiday Nails': '#F4A7C3',
};

export const ShopDropdown = ({ isOpen, onMouseEnter, onMouseLeave, onLinkClick }: ShopDropdownProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 mt-0 w-[860px] max-w-[calc(100vw-2rem)] bg-[#0D0D0D] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex">

        {/* Left Panel */}
        <div className="w-[220px] shrink-0 bg-[#111111] border-r border-white/8 p-6 flex flex-col gap-6">

          {/* Quick links */}
          <div>
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.18em] mb-3">
              Quick Shop
            </p>
            <div className="space-y-1">
              {quickLinks.map(({ href, label, icon: Icon, color }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={onLinkClick}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: `${color}20` }}
                  >
                    <Icon className="h-3 w-3" style={{ color }} />
                  </div>
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors font-medium">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/8" />

          {/* Shop All CTA */}
          <Link
            to="/products"
            onClick={onLinkClick}
            className="group flex items-center justify-between p-3.5 rounded-xl border border-white/10 hover:border-[#DD2C6C]/40 hover:bg-[#DD2C6C]/8 transition-all duration-200"
          >
            <div>
              <p className="text-sm font-bold text-white group-hover:text-[#DD2C6C] transition-colors">
                Shop All
              </p>
              <p className="text-[11px] text-white/35 mt-0.5">Browse every design</p>
            </div>
            <ArrowRight className="h-4 w-4 text-white/25 group-hover:text-[#DD2C6C] group-hover:translate-x-0.5 transition-all duration-200" />
          </Link>

        </div>

        {/* Right Panel — columns */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-4 gap-6">

            {/* Category */}
            <div>
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.18em] mb-3">
                Category
              </p>
              <ul className="space-y-1.5">
                {shopCategories.category.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.searchQuery ? `/products?search=${encodeURIComponent(item.searchQuery)}` : item.href}
                      className="text-[13px] text-white/55 hover:text-white transition-colors block py-0.5"
                      onClick={onLinkClick}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shape */}
            <div>
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.18em] mb-3">
                Shape
              </p>
              <ul className="space-y-1.5">
                {shopCategories.shape.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-[13px] text-white/55 hover:text-white transition-colors block py-0.5"
                      onClick={onLinkClick}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Occasion */}
            <div>
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.18em] mb-3">
                Occasion
              </p>
              <ul className="space-y-1.5">
                {shopCategories.occasion.map((item) => {
                  const color = occasionColors[item.label];
                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className="group/occ flex items-center gap-2 text-[13px] text-white/55 hover:text-white transition-colors py-0.5"
                        onClick={onLinkClick}
                      >
                        {color && (
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0 opacity-60 group-hover/occ:opacity-100 transition-opacity"
                            style={{ background: color }}
                          />
                        )}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Color + Length + Texture */}
            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.18em] mb-3">
                  Color
                </p>
                <ul className="space-y-1.5">
                  {shopCategories.color.map((item) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className="text-[13px] text-white/55 hover:text-white transition-colors block py-0.5"
                        onClick={onLinkClick}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom row: Length + Texture as chips */}
          <div className="mt-6 pt-5 border-t border-white/8 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-white/25 uppercase tracking-wider">Length:</span>
              {shopCategories.length.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onLinkClick}
                  className="text-[11px] text-white/45 hover:text-white px-2.5 py-1 rounded-full border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all"
                >
                  {item.label.replace(' Nails', '')}
                </Link>
              ))}
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-white/25 uppercase tracking-wider">Texture:</span>
              {shopCategories.texture.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onLinkClick}
                  className="text-[11px] text-white/45 hover:text-white px-2.5 py-1 rounded-full border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all"
                >
                  {item.label.replace(' Nails', '')}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
