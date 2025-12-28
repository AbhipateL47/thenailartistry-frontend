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
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

