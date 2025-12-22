import { Link } from 'react-router-dom';
import { shopCategories } from '@/constants/navigation';

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
      className="absolute top-full left-0 mt-0 w-[900px] max-w-[calc(100vw-2rem)] bg-white border border-gray-200 shadow-lg rounded-md py-6 px-8 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-7 gap-6">
        {/* Shop All - Prominent */}
        <div className="col-span-1">
          <Link
            to="/products"
            className="text-lg font-bold text-gray-900 hover:text-[#DD2C6C] transition-colors block mb-4"
            onClick={onLinkClick}
          >
            Shop All
          </Link>
        </div>

        {/* Shop By Category */}
        <div className="col-span-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Shop By Category
          </h3>
          <ul className="space-y-2">
            {shopCategories.category.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.searchQuery ? `/products?search=${encodeURIComponent(item.searchQuery)}` : item.href}
                  className="text-sm text-gray-700 hover:text-[#DD2C6C] transition-colors block"
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
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Shop By Shape
          </h3>
          <ul className="space-y-2">
            {shopCategories.shape.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-gray-700 hover:text-[#DD2C6C] transition-colors block"
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
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Shop By Occasion
          </h3>
          <ul className="space-y-2">
            {shopCategories.occasion.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-gray-700 hover:text-[#DD2C6C] transition-colors block"
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
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Shop By Color
          </h3>
          <ul className="space-y-2">
            {shopCategories.color.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-gray-700 hover:text-[#DD2C6C] transition-colors block"
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
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Shop By Length
            </h3>
            <ul className="space-y-2">
              {shopCategories.length.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-700 hover:text-[#DD2C6C] transition-colors block"
                    onClick={onLinkClick}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Shop By Texture
            </h3>
            <ul className="space-y-2">
              {shopCategories.texture.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-700 hover:text-[#DD2C6C] transition-colors block"
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

