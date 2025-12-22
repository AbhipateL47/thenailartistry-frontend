import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { navLinks } from '@/constants/navigation';
import { ShopDropdown } from './ShopDropdown';

interface DesktopNavigationProps {
  shopDropdownOpen: boolean;
  onShopMouseEnter: () => void;
  onShopMouseLeave: () => void;
  onShopLinkClick: () => void;
}

export const DesktopNavigation = ({
  shopDropdownOpen,
  onShopMouseEnter,
  onShopMouseLeave,
  onShopLinkClick,
}: DesktopNavigationProps) => {
  return (
    <nav className="flex items-center gap-4 xl:gap-6">
      {navLinks.filter(link => !link.mobileOnly).map((link) => {
        if (link.hasDropdown && link.label === 'SHOP') {
          return (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={onShopMouseEnter}
              onMouseLeave={onShopMouseLeave}
            >
              <Link
                to={link.href}
                className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-[#DD2C6C] transition-colors uppercase tracking-wide relative group"
              >
                {link.label}
                <ChevronDown className="h-3 w-3" />
                {shopDropdownOpen && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DD2C6C]"></span>
                )}
              </Link>
              
              <ShopDropdown
                isOpen={shopDropdownOpen}
                onMouseEnter={onShopMouseEnter}
                onMouseLeave={onShopMouseLeave}
                onLinkClick={onShopLinkClick}
              />
            </div>
          );
        }
        return (
          <Link
            key={link.href}
            to={link.href}
            className="text-sm font-medium text-gray-900 hover:text-[#DD2C6C] transition-colors uppercase tracking-wide"
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

