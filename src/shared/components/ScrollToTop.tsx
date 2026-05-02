import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * 
 * WHY THIS IS NEEDED:
 * React Router (BrowserRouter) does NOT automatically scroll to top when navigating
 * between routes. This is by design - React Router preserves scroll position for
 * better UX when using browser back/forward buttons.
 * 
 * However, when clicking links to navigate to NEW pages (like from Home to Products),
 * users expect the page to start at the top, not maintain the previous scroll position.
 * 
 * This component fixes that by scrolling to top whenever the route changes.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      // Scroll to top instantly when route changes
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // Instant scroll, not smooth
      });
      
      // Also scroll the document element (for some browsers)
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      
      // Also scroll the body (for some browsers)
      if (document.body) {
        document.body.scrollTop = 0;
      }
    });
  }, [pathname]);

  return null;
};

