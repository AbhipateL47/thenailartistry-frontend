import { useEffect } from 'react';

/**
 * Hook to update the document title dynamically
 * @param title - The page title. Can be:
 *   - Simple string: "Shop" → "Shop | The Nail Artistry"
 *   - Full title: "The Nail Artistry - Premium Press-On Nails | Reusable & Salon Quality" → used as-is
 * @param baseTitle - Optional base title (defaults to "The Nail Artistry")
 */
export const usePageTitle = (title: string, baseTitle: string = 'The Nail Artistry') => {
  useEffect(() => {
    // If title already contains the brand name or is a full title, use it as-is
    // Otherwise, format as "{title} | {baseTitle}"
    const fullTitle = title.includes('The Nail Artistry') || title.includes('|')
      ? title
      : title
      ? `${title} | ${baseTitle}`
      : baseTitle;
    
    document.title = fullTitle;

    // Cleanup: reset to default title when component unmounts
    return () => {
      document.title = baseTitle;
    };
  }, [title, baseTitle]);
};

