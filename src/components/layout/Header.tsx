import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Marquee } from '@/components/common/Marquee';
import { Logo } from '@/components/common/Logo';
import {
  Sheet,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopSubmenuOpen, setShopSubmenuOpen] = useState(false);
  const [shopSubmenuTimeout, setShopSubmenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMouseOverShop, setIsMouseOverShop] = useState(false);
  const [isMouseOverSubmenu, setIsMouseOverSubmenu] = useState(false);
  const [isMarqueeDismissed, setIsMarqueeDismissed] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const { wishlist } = useWishlist();

  const handleMarqueeDismiss = () => {
    setIsMarqueeDismissed(true);
  };

  // Close submenu only when mouse leaves both SHOP button and submenu
  useEffect(() => {
    if (!isMouseOverShop && !isMouseOverSubmenu && shopSubmenuOpen) {
      const timeout = setTimeout(() => {
        if (!isMouseOverShop && !isMouseOverSubmenu) {
          setShopSubmenuOpen(false);
        }
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isMouseOverShop, isMouseOverSubmenu, shopSubmenuOpen]);

  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const shopCategories = {
    category: [
      { href: '/products?category=bestsellers', label: 'Best Sellers', searchQuery: 'best sellers' },
      { href: '/products?search=french nails', label: 'French nails', searchQuery: 'french nails' },
      { href: '/products?category=casual', label: 'Casual Wear Nails', searchQuery: 'casual wear nails' },
      { href: '/products?search=toe nails', label: 'Toe Nails', searchQuery: 'toe nails' },
      { href: '/products?search=ombre nails', label: 'Ombre Nails', searchQuery: 'ombre nails' },
    ],
    shape: [
      { href: '/products?shape=coffin', label: 'Coffin Nails' },
      { href: '/products?shape=stiletto', label: 'Stiletto Nails' },
      { href: '/products?shape=square', label: 'Square Nails' },
      { href: '/products?shape=round', label: 'Round Nails' },
      { href: '/products?shape=almond', label: 'Almond Nails' },
      { href: '/products?shape=ballerina', label: 'Ballerina Nails' },
    ],
    occasion: [
      { href: '/products?occasion=casual', label: 'Casual Nails' },
      { href: '/products?occasion=party', label: 'Party Nails' },
      { href: '/products?occasion=wedding', label: 'Wedding Nails' },
      { href: '/products?occasion=formal', label: 'Formal Nails' },
      { href: '/products?occasion=holiday', label: 'Holiday Nails' },
    ],
    color: [
      { href: '/products?color=pink', label: 'Pink' },
      { href: '/products?color=red', label: 'Red' },
      { href: '/products?color=pastel', label: 'Pastel' },
      { href: '/products?color=gold', label: 'Gold' },
      { href: '/products?color=nude', label: 'Nude' },
      { href: '/products?color=others', label: 'Others' },
    ],
    length: [
      { href: '/products?length=short', label: 'Short Nails' },
      { href: '/products?length=medium', label: 'Medium Nails' },
      { href: '/products?length=long', label: 'Long Nails' },
    ],
    texture: [
      { href: '/products?texture=matte', label: 'Matte Nails' },
      { href: '/products?texture=glossy', label: 'Glossy Nails' },
      { href: '/products?texture=glitter', label: 'Glitter Nails' },
    ],
  };

  const navLinks = [
    { href: '/', label: 'HOME' },
    { 
      href: '/products', 
      label: 'SHOP',
      hasDropdown: true,
    },
    { href: '/products?category=Sale', label: 'SALE' },
    { href: '/products?category=Designer', label: 'DESIGNER NAILS' },
    { href: '/tutorial', label: 'TUTORIAL' },
    { href: '/blog', label: 'BLOG' },
    { href: '/contact', label: 'CONTACT US' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* Top banner - Marquee */}
      {!isMarqueeDismissed && (
        <div className="bg-[#DD2C6C] text-white py-2 px-4 text-sm font-medium">
          <Marquee speed={5} onDismiss={handleMarqueeDismiss} />
        </div>
      )}

      {/* Main header - Desktop */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo className="h-16" />
            </div>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => {
                if (link.hasDropdown && link.label === 'SHOP') {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setShopDropdownOpen(true)}
                      onMouseLeave={() => setShopDropdownOpen(false)}
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
                      
                      {/* Large Multi-Column Dropdown */}
                      {shopDropdownOpen && (
                        <div 
                          className="absolute top-full left-0 mt-0 w-[900px] max-w-[calc(100vw-2rem)] bg-white border border-gray-200 shadow-lg rounded-md py-6 px-8 z-50"
                          onMouseEnter={() => setShopDropdownOpen(true)}
                          onMouseLeave={() => setShopDropdownOpen(false)}
                        >
                          <div className="grid grid-cols-7 gap-6">
                            {/* Shop All - Prominent */}
                            <div className="col-span-1">
                              <Link
                                to="/products"
                                className="text-lg font-bold text-gray-900 hover:text-[#DD2C6C] transition-colors block mb-4"
                                onClick={() => setShopDropdownOpen(false)}
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
                                      onClick={() => setShopDropdownOpen(false)}
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
                                      onClick={() => setShopDropdownOpen(false)}
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
                                      onClick={() => setShopDropdownOpen(false)}
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
                                      onClick={() => setShopDropdownOpen(false)}
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
                                        onClick={() => setShopDropdownOpen(false)}
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
                                        onClick={() => setShopDropdownOpen(false)}
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
                      )}
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

            {/* Right section: Search, User, Wishlist, Cart */}
            <div className="flex items-center gap-3 xl:gap-4">
              {/* Search bar */}
              <div className="relative hidden lg:flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="I'm looking for..."
                  className="w-48 xl:w-64 pl-9 pr-4 h-9 rounded-full border-gray-300 text-sm focus:border-[#DD2C6C] focus:ring-1 focus:ring-[#DD2C6C]"
                />
              </div>

              {/* User icon */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 hover:bg-gray-100 rounded-full"
                asChild
              >
                <Link to="/profile">
                  <User className="h-5 w-5 text-gray-700" />
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
                onClick={openDrawer}
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
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden">
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
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10"
                onClick={openDrawer}
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
          </div>
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
            {navLinks.map((link, index) => {
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

          {/* Bottom Action Buttons */}
          <div className="flex-shrink-0 p-6 space-y-3 bg-white border-t border-gray-200">
            <Button 
              className="w-full bg-black text-white hover:bg-black/90 h-12 rounded-md font-medium uppercase text-sm"
              onClick={() => setMobileMenuOpen(false)}
              asChild
            >
              <Link to="/profile">LOG IN</Link>
            </Button>
            <Button 
              variant="outline" 
              className="w-full bg-white text-black border-black hover:bg-gray-50 h-12 rounded-md font-medium uppercase text-sm"
              onClick={() => setMobileMenuOpen(false)}
              asChild
            >
              <Link to="/profile">CREATE ACCOUNT</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Shop Submenu - Sheet */}
      <Sheet open={shopSubmenuOpen} onOpenChange={setShopSubmenuOpen}>
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
            setShopSubmenuOpen(true);
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
                onClick={() => {
                  setShopSubmenuOpen(false);
                }}
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
              onClick={() => {
                setShopSubmenuOpen(false);
                setMobileMenuOpen(false);
              }}
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
                  onClick={() => {
                    setShopSubmenuOpen(false);
                    setMobileMenuOpen(false);
                  }}
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
                  onClick={() => {
                    setShopSubmenuOpen(false);
                    setMobileMenuOpen(false);
                  }}
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
                  onClick={() => {
                    setShopSubmenuOpen(false);
                    setMobileMenuOpen(false);
                  }}
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
                  onClick={() => {
                    setShopSubmenuOpen(false);
                    setMobileMenuOpen(false);
                  }}
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
                  onClick={() => {
                    setShopSubmenuOpen(false);
                    setMobileMenuOpen(false);
                  }}
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
                  onClick={() => {
                    setShopSubmenuOpen(false);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};
