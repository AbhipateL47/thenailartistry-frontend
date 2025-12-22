import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';
import { Logo } from '@/components/common/Logo';
import { navLinks } from '@/constants/navigation';
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

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <div className="md:hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 relative">
          {/* Left section: Menu + Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </Button>
            <Logo className="h-12" />
          </div>

          {/* Center: Search bar */}
          <div className="flex-1 flex justify-center px-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="I'm looking for..."
                className="w-full pl-9 pr-4 h-9 rounded-full border-gray-300 text-sm focus:border-[#DD2C6C] focus:ring-[#DD2C6C]"
              />
            </div>
          </div>

          {/* Right section: Cart icon */}
          <HeaderActions variant="mobile" />
        </div>
      </div>

      {/* Mobile menu - Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent 
          side="left" 
          className="w-full sm:w-[320px] p-0 flex flex-col bg-white [&>button]:hidden"
          overlayClassName="bg-black/20"
        >
          {/* Black Header */}
          <div className="bg-black px-6 py-4 flex items-center justify-between flex-shrink-0">
            <h2 className="text-white text-lg font-semibold uppercase">MENU</h2>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-black/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto bg-white">
            {navLinks.map((link) => {
              if (link.hasDropdown && link.label === 'SHOP') {
                return (
                  <button
                    key={link.href}
                    className="flex items-center justify-between w-full px-6 py-4 text-black text-sm font-medium uppercase border-b border-gray-200 hover:bg-gray-50 transition-colors text-left"
                    onMouseEnter={() => {
                      setIsMouseOverShop(true);
                      if (shopSubmenuTimeout) {
                        clearTimeout(shopSubmenuTimeout);
                        setShopSubmenuTimeout(null);
                      }
                      setShopSubmenuOpen(true);
                    }}
                    onMouseLeave={() => {
                      setIsMouseOverShop(false);
                    }}
                    onClick={() => {
                      setShopSubmenuOpen(true);
                    }}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                );
              }
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-6 py-4 text-black text-sm font-medium uppercase border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          {isAuthenticated ? (
            /* Logout button when logged in */
            <div className="flex-shrink-0 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-6 py-4 text-red-500 text-sm font-medium uppercase hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>LOGOUT</span>
              </button>
            </div>
          ) : (
            /* Login/Register buttons when NOT logged in */
            <div className="flex-shrink-0 p-6 space-y-3 bg-white border-t border-gray-200">
              <Button 
                className="w-full bg-black text-white hover:bg-black/90 h-12 rounded-md font-medium uppercase text-sm"
                onClick={() => setMobileMenuOpen(false)}
                asChild
              >
                <Link to="/login">LOG IN</Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-white text-black border-black hover:bg-gray-50 h-12 rounded-md font-medium uppercase text-sm"
                onClick={() => setMobileMenuOpen(false)}
                asChild
              >
                <Link to="/register">CREATE ACCOUNT</Link>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Shop Submenu - Sheet */}
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

