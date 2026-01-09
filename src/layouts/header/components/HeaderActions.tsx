import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent, useCallback, useRef, useEffect } from 'react';
import { Search, ShoppingCart, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import debounce from 'lodash.debounce';
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
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  
  // Use wishlistCount from user object (lightweight) for header badge
  // Fallback to wishlist.length for guest users or if count is not available
  const wishlistCount = isAuthenticated 
    ? (user?.wishlistCount ?? wishlist.length)
    : wishlist.length;

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      openDrawer();
    }
  };

  // Create debounced function to navigate to search results
  const debouncedNavigate = useRef(
    debounce((value: string) => {
      const trimmedValue = value.trim();
      if (trimmedValue) {
        navigate(`/products?search=${encodeURIComponent(trimmedValue)}`);
      }
    }, 500)
  ).current;

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedNavigate.cancel();
    };
  }, [debouncedNavigate]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim();
    if (trimmedValue) {
      // Cancel any pending debounced navigation
      debouncedNavigate.cancel();
      // Navigate immediately on form submit
      navigate(`/products?search=${encodeURIComponent(trimmedValue)}`);
      setSearchValue(''); // Clear search after navigation
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    // Debounce navigation to search results
    debouncedNavigate(value);
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
      <form onSubmit={handleSearchSubmit} className="relative hidden md:flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
        <Input
          type="search"
          placeholder="I'm looking for..."
          value={searchValue}
          onChange={handleSearchChange}
          className="w-48 xl:w-64 pl-9 pr-4 h-9 rounded-full border-gray-300 text-sm focus:border-[#DD2C6C] focus:ring-1 focus:ring-[#DD2C6C]"
        />
      </form>

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
          {wishlistCount > 0 && (
            <span 
              className="absolute -top-0.5 -right-0.5 bg-[#DD2C6C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold"
            >
              {wishlistCount}
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

