import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
}

export const ProductRating = ({ rating, reviewCount }: ProductRatingProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) || (i === Math.floor(rating) && rating % 1 >= 0.5)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-white/20'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-white/50">
        {rating.toFixed(1)} ({reviewCount})
      </span>
    </div>
  );
};
