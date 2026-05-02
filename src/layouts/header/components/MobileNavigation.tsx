import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Menu, X, ChevronRight, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import debounce from 'lodash.debounce';
import {
  Sheet,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';
import { Logo } from '@/shared/components/Logo';
import { navLinks } from '@/shared/constants/navigation';
import { HeaderActions } from './HeaderActions';
import { ShopMobileMenu } from './ShopMobileMenu';
import { useAuth } from '@/contexts/AuthContext';

interface MobileNavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  shopSubmenuOpen: boolean;
  setShopSubmenuOpen: (open: boolean) => void;
  isMouseOverShop: boolean;
  setIsMouseOverShop: (over: boolean) => void;
  isMouseOverSubmenu: boolean;
  setIsMouseOverSubmenu: (over: boolean) => void;
  shopSubmenuTimeout: NodeJS.Timeout | null;
  setShopSubmenuTimeout: (timeout: NodeJS.Timeout | null) => void;
}

export const MobileNavigation = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  shopSubmenuOpen,
  setShopSubmenuOpen,
  isMouseOverShop,
  setIsMouseOverShop,
  isMouseOverSubmenu,
  setIsMouseOverSubmenu,
  shopSubmenuTimeout,
  setShopSubmenuTimeout,
}: MobileNavigationProps) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const debouncedNavigate = useRef(
    debounce((value: string) => {
      const trimmedValue = value.trim();
      if (trimmedValue) {
        navigate(`/products?search=${encodeURIComponent(trimmedValue)}`);
      }
    }, 500)
  ).current;

  useEffect(() => {
    return () => {
      debouncedNavigate.cancel();
    };
  }, [debouncedNavigate]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedNavigate(value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim();
    if (trimmedValue) {
      debouncedNavigate.cancel();
      navigate(`/products?search=${encodeURIComponent(trimmedValue)}`);
      setSearchValue('');
    }
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <div className="md:hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 relative">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6 text-white/70" />
            </Button>
            <Logo className="h-12" variant="dark" />
          </div>

          {/* Center: Search */}
          <div className="flex-1 flex justify-center px-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
              <Input
                type="search"
                placeholder="I'm looking for..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-4 h-9 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/30 text-sm focus:border-[#DD2C6C] focus:ring-[#DD2C6C]"
              />
            </form>
          </div>

          {/* Right: Cart */}
          <HeaderActions variant="mobile" />
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="left"
          className="w-full sm:w-[320px] p-0 flex flex-col bg-[#0D0D0D] border-r border-white/10 [&>button]:hidden"
          overlayClassName="bg-black/50"
        >
          {/* Header */}
          <div className="bg-[#111111] border-b border-white/10 px-6 py-4 flex items-center justify-between flex-shrink-0">
            <h2 className="text-white text-lg font-semibold uppercase tracking-wider">Menu</h2>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto bg-[#0D0D0D]">
            {navLinks.map((link) => {
              if (link.hasDropdown && link.label === 'SHOP') {
                return (
                  <button
                    key={link.href}
                    className="flex items-center justify-between w-full px-6 py-4 text-white/70 text-sm font-medium uppercase border-b border-white/8 hover:bg-white/5 hover:text-white transition-colors text-left"
                    onClick={() => setShopSubmenuOpen(true)}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-4 w-4 text-white/30" />
                  </button>
                );
              }
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-6 py-4 text-white/70 text-sm font-medium uppercase border-b border-white/8 hover:bg-white/5 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          {isAuthenticated ? (
            <div className="flex-shrink-0 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-6 py-4 text-red-400 text-sm font-medium uppercase hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>LOGOUT</span>
              </button>
            </div>
          ) : (
            <div className="flex-shrink-0 p-6 space-y-3 bg-[#111111] border-t border-white/10">
              <Button
                className="w-full bg-[#DD2C6C] hover:bg-[#c02560] text-white h-12 rounded-lg font-medium uppercase text-sm"
                onClick={() => setMobileMenuOpen(false)}
                asChild
              >
                <Link to="/login">LOG IN</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white h-12 rounded-lg font-medium uppercase text-sm"
                onClick={() => setMobileMenuOpen(false)}
                asChild
              >
                <Link to="/register">CREATE ACCOUNT</Link>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Shop Submenu Sheet */}
      <ShopMobileMenu
        isOpen={shopSubmenuOpen}
        onOpenChange={setShopSubmenuOpen}
        onLinkClick={() => {
          setShopSubmenuOpen(false);
          setMobileMenuOpen(false);
        }}
        isMouseOverSubmenu={isMouseOverSubmenu}
        setIsMouseOverSubmenu={setIsMouseOverSubmenu}
        shopSubmenuTimeout={shopSubmenuTimeout}
        setShopSubmenuTimeout={setShopSubmenuTimeout}
      />
    </div>
  );
};
