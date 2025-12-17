import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { announcementService, Announcement } from '@/services/announcementService';
import { Button } from '@/components/ui/button';

interface MarqueeProps {
  className?: string;
  speed?: number; // Animation duration in seconds
  onDismiss?: () => void; // Callback when marquee is dismissed
}

// Fallback announcements if API fails
const FALLBACK_ANNOUNCEMENTS: Announcement[] = [
  { _id: 'fallback-1', text: 'Festive Sale Ending Soon - Shop Now!', order: 0 },
  { _id: 'fallback-2', text: 'Woww! Getting 20% off on design nails', order: 1 },
];

export const Marquee = ({ className = '', speed = 30, onDismiss }: MarqueeProps) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Fetch announcements from API
    const fetchAnnouncements = async () => {
      setIsLoading(true);
      try {
        const data = await announcementService.getAnnouncements();
        
        // Use API data if available, otherwise use fallback
        if (data && data.length > 0) {
          setAnnouncements(data);
        } else {
          // If API returns empty, use fallback
          setAnnouncements(FALLBACK_ANNOUNCEMENTS);
        }
      } catch (error) {
        console.error('Failed to load announcements:', error);
        // Use fallback announcements on error
        setAnnouncements(FALLBACK_ANNOUNCEMENTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.(); // Notify parent component
  };

  // Don't render if loading, dismissed, or no announcements
  if (isLoading || isDismissed || announcements.length === 0) {
    return null;
  }

  // Create truly seamless infinite marquee
  // Duplicate announcements multiple times to ensure smooth continuous scroll
  // With 4 sets, animation moves -25% (one set width) for perfect seamless loop
  const duplicatedAnnouncements: Announcement[] = [];
  // Create 4 identical sets for seamless infinite scrolling
  for (let i = 0; i < 4; i++) {
    announcements.forEach((announcement) => {
      duplicatedAnnouncements.push(announcement);
    });
  }

  return (
    <div className={`overflow-hidden whitespace-nowrap relative ${className}`}>
      {/* Close button - positioned first so marquee starts after it */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground z-10 flex-shrink-0"
        onClick={handleDismiss}
        aria-label="Close marquee"
      >
        <X className="h-4 w-4" />
      </Button>
      
      {/* Marquee content - starts after close button with padding */}
      <div className="pr-12 overflow-hidden">
        <div
          className="flex animate-marquee-infinite"
          style={{
            animationDuration: `${speed}s`,
            willChange: 'transform',
          }}
        >
          {duplicatedAnnouncements.map((announcement, index) => (
            <span
              key={`${announcement._id}-${index}`}
              className="inline-block px-8 flex-shrink-0 whitespace-nowrap"
            >
              {announcement.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

