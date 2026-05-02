import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Order } from '@/features/orders/services/order.service';
import { Review } from '@/features/products/services/review.service';

interface OrderReviewsProps {
  order: Order;
  isDelivered: boolean;
  userReviews: Map<string, Review>;
  onReviewClick: (productId: string) => void;
}

export function OrderReviews({ order, isDelivered, userReviews, onReviewClick }: OrderReviewsProps) {
  if (!isDelivered || !order.items || order.items.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200/60 rounded-xl p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Star className="h-5 w-5 text-gray-500" />
        Rate Your Purchase
      </h2>
      <div className="space-y-4">
        {order.items.map((item: any, index: number) => {
          const productId = item.productId;
          const existingReview = userReviews.get(productId);
          const hasReviewed = !!existingReview;

          return (
            <div key={productId || index} className="flex items-center justify-between p-4 border border-gray-200/60 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <img
                  src={item.image || '/placeholder-product.jpg'}
                  alt={item.title || 'Product'}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.title || 'Product'}</p>
                  {hasReviewed && existingReview && (
                    <div className="mt-1.5 space-y-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < existingReview.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1.5">Reviewed</span>
                      </div>
                      {existingReview.body && (
                        <p className="text-xs text-gray-600 line-clamp-2">{existingReview.body}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant={hasReviewed ? 'outline' : 'default'}
                size="sm"
                className={hasReviewed ? 'border-gray-300' : 'bg-[#DD2C6C] hover:bg-[#c4245f] text-white'}
                onClick={() => onReviewClick(productId)}
              >
                {hasReviewed ? 'Edit Review' : 'Write Review'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

