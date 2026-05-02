import { Link } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';
import { shopCategories } from '@/shared/constants/navigation';

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
        className="w-full sm:w-[320px] p-0 flex flex-col bg-[#0D0D0D] border-r border-white/10 [&>button]:hidden"
        overlayClassName="bg-black/50"
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
        {/* Header */}
        <div className="bg-[#111111] border-b border-white/10 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-white text-lg font-semibold uppercase tracking-wider">Shop</h2>
          </div>
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

        {/* Shop Links */}
        <nav className="flex-1 overflow-y-auto bg-[#0D0D0D]">
          {/* Shop All */}
          <Link
            to="/products"
            className="block px-6 py-4 text-white font-semibold text-sm uppercase border-b border-white/10 hover:bg-white/5 hover:text-[#DD2C6C] transition-colors"
            onClick={onLinkClick}
          >
            Shop All
          </Link>

          {[
            { label: 'Shop By Category', items: shopCategories.category, useSearch: true },
            { label: 'Shop By Shape', items: shopCategories.shape, useSearch: false },
            { label: 'Shop By Occasion', items: shopCategories.occasion, useSearch: false },
            { label: 'Shop By Color', items: shopCategories.color, useSearch: false },
            { label: 'Shop By Length', items: shopCategories.length, useSearch: false },
            { label: 'Shop By Texture', items: shopCategories.texture, useSearch: false },
          ].map(({ label, items, useSearch }) => (
            <div key={label} className="border-b border-white/10">
              <div className="px-6 py-2.5 text-[10px] font-bold text-white/35 uppercase tracking-widest bg-white/3">
                {label}
              </div>
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={useSearch && (item as any).searchQuery
                    ? `/products?search=${encodeURIComponent((item as any).searchQuery)}`
                    : item.href}
                  className="block px-6 py-3.5 text-white/65 text-sm border-b border-white/5 hover:bg-white/5 hover:text-white transition-colors last:border-0"
                  onClick={onLinkClick}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
