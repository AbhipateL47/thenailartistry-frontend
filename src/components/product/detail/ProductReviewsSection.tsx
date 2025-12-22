import { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

interface ProductReviewsSectionProps {
  rating: number;
  reviewCount: number;
  reviews?: Review[];
}

// Mock reviews data - replace with real data from API
const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Sarah M.',
    rating: 5,
    comment: 'Absolutely love these nails! They look so elegant and lasted for weeks. Highly recommend!',
    date: new Date('2024-12-10'),
  },
  {
    id: '2',
    userName: 'Emily R.',
    rating: 5,
    comment: 'Perfect fit and beautiful design. The matte finish is stunning!',
    date: new Date('2024-12-08'),
  },
  {
    id: '3',
    userName: 'Jessica L.',
    rating: 5,
    comment: 'Great quality and easy to apply. Will definitely order again!',
    date: new Date('2024-12-05'),
  },
];

export const ProductReviewsSection = ({ 
  rating, 
  reviewCount, 
  reviews = mockReviews 
}: ProductReviewsSectionProps) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="mb-16">
      <div className="border-b pb-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Customer Review</h2>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">{rating.toFixed(1)}</div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {reviewCount} reviews
                </p>
              </div>
            </div>
          </div>
          <Button className="bg-primary text-white hover:bg-primary/90">
            Write a review
          </Button>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {displayedReviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-sm mb-1">{review.userName}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(review.date, { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
            </div>
          ))}
        </div>

        {reviews.length > 3 && !showAllReviews && (
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => setShowAllReviews(true)}
          >
            See more reviews
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
