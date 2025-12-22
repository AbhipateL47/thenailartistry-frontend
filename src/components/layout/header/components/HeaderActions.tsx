import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderActionsProps {
  variant?: 'desktop' | 'mobile';
  onCartClick?: () => void;
}

export const HeaderActions = ({ variant = 'desktop', onCartClick }: HeaderActionsProps) => {
  const { totalItems, openDrawer } = useCart();
  const { wishlist } = useWishlist();
  const { user, isAuthenticated } = useAuth();

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      openDrawer();
    }
  };

  if (variant === 'mobile') {
    return (
      <div className="flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10"
          onClick={handleCartClick}
        >
          <ShoppingCart className="h-5 w-5 text-gray-700" />
          {totalItems > 0 && (
            <span 
              className="absolute -top-1 -right-1 bg-[#DD2C6C] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
            >
              {totalItems}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {/* Search bar */}
      <div className="relative hidden md:flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="I'm looking for..."
          className="w-48 xl:w-64 pl-9 pr-4 h-9 rounded-full border-gray-300 text-sm focus:border-[#DD2C6C] focus:ring-1 focus:ring-[#DD2C6C]"
        />
      </div>

      {/* User icon / Avatar */}
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 hover:bg-gray-100 rounded-full overflow-hidden"
        asChild
      >
        <Link to={isAuthenticated ? "/profile" : "/login"}>
          {isAuthenticated && user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name || 'User'}
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-gray-700" />
          )}
        </Link>
      </Button>

      {/* Wishlist icon */}
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 hover:bg-gray-100 rounded-full"
        asChild
      >
        <Link to="/wishlist">
          <Heart className="h-5 w-5 text-gray-700" />
          {wishlist.length > 0 && (
            <span 
              className="absolute -top-0.5 -right-0.5 bg-[#DD2C6C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold"
            >
              {wishlist.length}
            </span>
          )}
        </Link>
      </Button>

      {/* Cart icon */}
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 hover:bg-gray-100 rounded-full"
        onClick={handleCartClick}
      >
        <ShoppingCart className="h-5 w-5 text-gray-700" />
        {totalItems > 0 && (
          <span 
            className="absolute -top-0.5 -right-0.5 bg-[#DD2C6C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold"
          >
            {totalItems}
          </span>
        )}
      </Button>
    </div>
  );
};

