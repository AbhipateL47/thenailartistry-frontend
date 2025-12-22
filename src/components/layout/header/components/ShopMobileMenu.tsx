import { Link } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';
import { shopCategories } from '@/constants/navigation';

interface ShopMobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onLinkClick: () => void;
  isMouseOverSubmenu: boolean;
  setIsMouseOverSubmenu: (over: boolean) => void;
  shopSubmenuTimeout: NodeJS.Timeout | null;
  setShopSubmenuTimeout: (timeout: NodeJS.Timeout | null) => void;
}

export const ShopMobileMenu = ({
  isOpen,
  onOpenChange,
  onLinkClick,
  isMouseOverSubmenu,
  setIsMouseOverSubmenu,
  shopSubmenuTimeout,
  setShopSubmenuTimeout,
}: ShopMobileMenuProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="left" 
        className="w-full sm:w-[320px] p-0 flex flex-col bg-white [&>button]:hidden"
        overlayClassName="bg-black/20"
        onMouseEnter={() => {
          setIsMouseOverSubmenu(true);
          if (shopSubmenuTimeout) {
            clearTimeout(shopSubmenuTimeout);
            setShopSubmenuTimeout(null);
          }
        }}
        onMouseLeave={() => {
          setIsMouseOverSubmenu(false);
        }}
      >
        {/* Black Header with Back Button */}
        <div className="bg-black px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-black/20"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-white text-lg font-semibold uppercase">SHOP</h2>
          </div>
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
        
        {/* Shop Navigation Links */}
        <nav className="flex-1 overflow-y-auto bg-white">
          {/* Shop All */}
          <Link
            to="/products"
            className="block px-6 py-4 text-black text-sm font-medium uppercase border-b border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={onLinkClick}
          >
            Shop All
          </Link>

          {/* Shop By Category */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-3 text-xs font-bold text-gray-700 uppercase bg-gray-50">
              Shop By Category
            </div>
            {shopCategories.category.map((item) => (
              <Link
                key={item.href}
                to={item.searchQuery ? `/products?search=${encodeURIComponent(item.searchQuery)}` : item.href}
                className="block px-6 py-4 text-black text-sm font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors"
                onClick={onLinkClick}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Shop By Shape */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-3 text-xs font-bold text-gray-700 uppercase bg-gray-50">
              Shop By Shape
            </div>
            {shopCategories.shape.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-6 py-4 text-black text-sm font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors"
                onClick={onLinkClick}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Shop By Occasion */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-3 text-xs font-bold text-gray-700 uppercase bg-gray-50">
              Shop By Occasion
            </div>
            {shopCategories.occasion.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-6 py-4 text-black text-sm font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors"
                onClick={onLinkClick}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Shop By Color */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-3 text-xs font-bold text-gray-700 uppercase bg-gray-50">
              Shop By Color
            </div>
            {shopCategories.color.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-6 py-4 text-black text-sm font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors"
                onClick={onLinkClick}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Shop By Length */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-3 text-xs font-bold text-gray-700 uppercase bg-gray-50">
              Shop By Length
            </div>
            {shopCategories.length.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-6 py-4 text-black text-sm font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors"
                onClick={onLinkClick}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Shop By Texture */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-3 text-xs font-bold text-gray-700 uppercase bg-gray-50">
              Shop By Texture
            </div>
            {shopCategories.texture.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-6 py-4 text-black text-sm font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors"
                onClick={onLinkClick}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

