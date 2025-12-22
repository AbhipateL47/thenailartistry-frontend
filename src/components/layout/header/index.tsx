import { useState, useEffect, useRef } from 'react';
import { Logo } from '@/components/common/Logo';
import { HeaderAnnouncement } from './components/HeaderAnnouncement';
import { DesktopNavigation } from './components/DesktopNavigation';
import { MobileNavigation } from './components/MobileNavigation';
import { HeaderActions } from './components/HeaderActions';

/**
 * MARQUEE_BEHAVIOR flag:
 * 0 = Always visible (no scroll behavior)
 * 1 = Hide on scroll down, show on scroll up
 * 2 = Only visible at top of page
 */
const MARQUEE_BEHAVIOR: 0 | 1 | 2 = 2;

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopSubmenuOpen, setShopSubmenuOpen] = useState(false);
  const [shopSubmenuTimeout, setShopSubmenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMouseOverShop, setIsMouseOverShop] = useState(false);
  const [isMouseOverSubmenu, setIsMouseOverSubmenu] = useState(false);
  const [isMarqueeDismissed, setIsMarqueeDismissed] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  
  // Scroll states
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);

  const handleMarqueeDismiss = () => {
    setIsMarqueeDismissed(true);
  };

  // Track scroll behavior
  useEffect(() => {
    if (MARQUEE_BEHAVIOR === 0) return; // No scroll tracking needed

    const SCROLL_THRESHOLD = 10;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (MARQUEE_BEHAVIOR === 2) {
        // Mode 2: Only at top
        setIsAtTop(currentScrollY < 10);
      } else if (MARQUEE_BEHAVIOR === 1) {
        // Mode 1: Scroll direction based
        const scrollDiff = currentScrollY - lastScrollY.current;
        
        // Only update if scrolled enough to prevent shivering
        if (scrollDiff > SCROLL_THRESHOLD && currentScrollY > 50) {
          setIsScrollingDown(true);
          lastScrollY.current = currentScrollY;
        } else if (scrollDiff < -SCROLL_THRESHOLD) {
          setIsScrollingDown(false);
          lastScrollY.current = currentScrollY;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if marquee should show
  const showMarquee = () => {
    if (MARQUEE_BEHAVIOR === 0) return true;
    if (MARQUEE_BEHAVIOR === 1) return !isScrollingDown;
    if (MARQUEE_BEHAVIOR === 2) return isAtTop;
    return true;
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

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* Top banner - Marquee */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          showMarquee() ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <HeaderAnnouncement 
          isDismissed={isMarqueeDismissed} 
          onDismiss={handleMarqueeDismiss} 
        />
      </div>

      {/* Main header - Desktop & Tablet */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo className="h-16" />
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="flex-1 flex justify-center">
              <DesktopNavigation
                shopDropdownOpen={shopDropdownOpen}
                onShopMouseEnter={() => setShopDropdownOpen(true)}
                onShopMouseLeave={() => setShopDropdownOpen(false)}
                onShopLinkClick={() => setShopDropdownOpen(false)}
              />
            </div>

            {/* Right section: Search, User, Wishlist, Cart */}
            <HeaderActions />
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <MobileNavigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        shopSubmenuOpen={shopSubmenuOpen}
        setShopSubmenuOpen={setShopSubmenuOpen}
        isMouseOverShop={isMouseOverShop}
        setIsMouseOverShop={setIsMouseOverShop}
        isMouseOverSubmenu={isMouseOverSubmenu}
        setIsMouseOverSubmenu={setIsMouseOverSubmenu}
        shopSubmenuTimeout={shopSubmenuTimeout}
        setShopSubmenuTimeout={setShopSubmenuTimeout}
      />
    </header>
  );
};

