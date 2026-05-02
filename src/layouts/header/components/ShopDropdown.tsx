import { Link } from 'react-router-dom';
import { shopCategories } from '@/shared/constants/navigation';

interface ShopDropdownProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLinkClick: () => void;
}

export const ShopDropdown = ({ isOpen, onMouseEnter, onMouseLeave, onLinkClick }: ShopDropdownProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 mt-0 w-[900px] max-w-[calc(100vw-2rem)] bg-[#111111] border border-white/10 shadow-2xl rounded-xl py-6 px-8 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-7 gap-6">
        {/* Shop All */}
        <div className="col-span-1">
          <Link
            to="/products"
            className="text-lg font-bold text-white hover:text-[#DD2C6C] transition-colors block mb-4"
            onClick={onLinkClick}
          >
            Shop All
          </Link>
        </div>

        {/* Shop By Category */}
        <div className="col-span-1">
          <h3 className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-widest">
            Category
          </h3>
          <ul className="space-y-2">
            {shopCategories.category.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.searchQuery ? `/products?search=${encodeURIComponent(item.searchQuery)}` : item.href}
                  className="text-sm text-white/60 hover:text-white transition-colors block"
                  onClick={onLinkClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop By Shape */}
        <div className="col-span-1">
          <h3 className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-widest">
            Shape
          </h3>
          <ul className="space-y-2">
            {shopCategories.shape.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-white/60 hover:text-white transition-colors block"
                  onClick={onLinkClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop By Occasion */}
        <div className="col-span-1">
          <h3 className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-widest">
            Occasion
          </h3>
          <ul className="space-y-2">
            {shopCategories.occasion.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-white/60 hover:text-white transition-colors block"
                  onClick={onLinkClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop By Color */}
        <div className="col-span-1">
          <h3 className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-widest">
            Color
          </h3>
          <ul className="space-y-2">
            {shopCategories.color.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-white/60 hover:text-white transition-colors block"
                  onClick={onLinkClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop By Length & Texture */}
        <div className="col-span-2 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-widest">
              Length
            </h3>
            <ul className="space-y-2">
              {shopCategories.length.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors block"
                    onClick={onLinkClick}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-widest">
              Texture
            </h3>
            <ul className="space-y-2">
              {shopCategories.texture.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors block"
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
    </div>
  );
};
