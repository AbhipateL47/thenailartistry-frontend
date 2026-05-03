import { useState, useEffect, useRef } from 'react';
import { Logo } from '@/shared/components/Logo';
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
const MARQUEE_BEHAVIOR: 0 | 1 | 2 = 1;

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
  const scrollDirection = useRef<'up' | 'down' | 'none'>('none');
  const scrollAccumulator = useRef(0);

  const handleMarqueeDismiss = () => {
    setIsMarqueeDismissed(true);
  };

  // Track scroll behavior
  useEffect(() => {
    if (MARQUEE_BEHAVIOR === 0) return;

    // How many px must travel in one direction before state changes.
    // Asymmetric: harder to hide, easier to reveal — prevents flicker.
    const HIDE_AFTER = 60;
    const SHOW_AFTER = 30;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (MARQUEE_BEHAVIOR === 2) {
        setIsAtTop(currentScrollY < 10);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Mode 1: direction-based with hysteresis
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Always reveal when back at the very top
      if (currentScrollY <= 10) {
        scrollDirection.current = 'none';
        scrollAccumulator.current = 0;
        setIsScrollingDown(false);
        return;
      }

      if (delta > 0) {
        // Moving down — reset accumulator if direction just changed
        if (scrollDirection.current !== 'down') {
          scrollDirection.current = 'down';
          scrollAccumulator.current = 0;
        }
        scrollAccumulator.current += delta;
        if (scrollAccumulator.current >= HIDE_AFTER) {
          setIsScrollingDown(true);
        }
      } else if (delta < 0) {
        // Moving up — reset accumulator if direction just changed
        if (scrollDirection.current !== 'up') {
          scrollDirection.current = 'up';
          scrollAccumulator.current = 0;
        }
        scrollAccumulator.current += Math.abs(delta);
        if (scrollAccumulator.current >= SHOW_AFTER) {
          setIsScrollingDown(false);
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
    <header className="sticky top-0 z-50 w-full bg-[#0D0D0D] border-b border-white/10">
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
              <Logo className="h-16" variant="dark" />
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

