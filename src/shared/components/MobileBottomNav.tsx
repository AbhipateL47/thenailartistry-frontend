import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/shared/utils/cn';

const navItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Shop', icon: ShoppingBag, href: '/products' },
  { label: 'Wishlist', icon: Heart, href: '/wishlist' },
  { label: 'Profile', icon: User, href: '/profile' },
] as const;

export const MobileBottomNav = () => {
  const location = useLocation();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ label, icon: Icon, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              to={href}
              className={cn(
                'flex flex-col items-center gap-0.5 flex-1 py-2 transition-colors relative',
                active ? 'text-[#DD2C6C]' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <div className="relative">
                <Icon
                  className={cn('h-5 w-5', active && 'fill-[#DD2C6C]/20')}
                  strokeWidth={active ? 2.5 : 1.75}
                />
                {label === 'Wishlist' && wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-0.5 bg-[#DD2C6C] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </div>
              <span className={cn('text-[10px] font-medium', active ? 'text-[#DD2C6C]' : 'text-gray-500')}>
                {label}
              </span>
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#DD2C6C] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
