import { useState, useEffect } from 'react';
import { Star, ChevronDown, ThumbsUp, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { reviewService, Review } from '@/services/reviewService';
import { useAuth } from '@/contexts/AuthContext';
import { ReviewFormModal } from './ReviewFormModal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ProductReviewsSectionProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

export const ProductReviewsSection = ({
  productId,
  rating,
  reviewCount,
}: ProductReviewsSectionProps) => {
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchReviews = async (page: number = 1, append: boolean = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await reviewService.getProductReviews(productId, page, 5);
      if (append) {
        setReviews((prev) => [...prev, ...response.data]);
      } else {
        setReviews(response.data);
      }
      setCurrentPage(response.pagination.page);
      setTotalPages(response.pagination.pages);
      setHasMore(response.pagination.page < response.pagination.pages);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews(1, false);
    }
  }, [productId]);

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      fetchReviews(currentPage + 1, true);
    }
  };

  const handleReviewSubmitted = () => {
    // Refresh reviews after submission
    fetchReviews(1, false);
    setShowReviewForm(false);
  };

  const getUserName = (review: Review): string => {
    if (typeof review.userId === 'object' && review.userId) {
      return review.userId.name || 'Anonymous';
    }
    return 'Anonymous';
  };

  const getUserImage = (review: Review): string | undefined => {
    if (typeof review.userId === 'object' && review.userId) {
      return review.userId.profileImage;
    }
    return undefined;
  };

  return (
    <>
      <div className="mb-6 md:mb-16">
        <Accordion type="single" collapsible className="border rounded-lg">
          <AccordionItem value="reviews" className="border-none">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <span className="text-lg font-semibold">Customer Reviews</span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{rating.toFixed(1)}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                          }`}
                      />
                    ))}
                  </div>
                  <span>({reviewCount})</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="hidden md:block">
                    <h2 className="text-2xl font-bold mb-2">Customer Review</h2>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold">{rating.toFixed(1)}</div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < Math.floor(rating)
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
                  {isAuthenticated && (
                    <Button
                      className="bg-primary text-white hover:bg-primary/90 text-sm md:text-base"
                      onClick={() => setShowReviewForm(true)}
                    >
                      Write a review
                    </Button>
                  )}
                </div>

                {/* Reviews List */}
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No reviews yet. Be the first to review this product!</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 md:space-y-6">
                      {reviews.map((review) => (
                        <div key={review._id} className="border-b pb-3 md:pb-4 last:border-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start gap-3 flex-1">
                              {/* User Avatar */}
                              {getUserImage(review) ? (
                                <img
                                  src={getUserImage(review)}
                                  alt={getUserName(review)}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                  <span className="text-sm font-medium">
                                    {getUserName(review).charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="font-medium text-sm mb-1">{getUserName(review)}</p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${i < review.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-muted-foreground'
                                          }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Review Title */}
                          {review.title && (
                            <h4 className="font-medium text-sm mb-1 mt-2">{review.title}</h4>
                          )}

                          {/* Review Body */}
                          {review.body && (
                            <p className="text-sm text-muted-foreground mt-1 md:mt-2">{review.body}</p>
                          )}

                          {/* Review Images */}
                          {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mt-3 flex-wrap">
                              {review.images.map((image, index) => (
                                <button
                                  key={index}
                                  className="relative w-20 h-20 rounded-md overflow-hidden border border-muted hover:opacity-80 transition-opacity"
                                  onClick={() => window.open(image, '_blank')}
                                >
                                  <img
                                    src={image}
                                    alt={`Review image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Helpful Button */}
                          <div className="flex items-center gap-4 mt-2 md:mt-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs text-muted-foreground hover:text-foreground"
                              onClick={() => reviewService.markHelpful(review._id).then(() => {
                                // Update local state
                                setReviews((prev) =>
                                  prev.map((r) =>
                                    r._id === review._id
                                      ? { ...r, helpfulCount: r.helpfulCount + 1 }
                                      : r
                                  )
                                );
                              })}
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              Helpful ({review.helpfulCount})
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                      <Button
                        variant="outline"
                        className="mt-6 w-full"
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                      >
                        {isLoadingMore ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            Load more reviews
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </>
                )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewFormModal
          productId={productId}
          isOpen={showReviewForm}
          onClose={() => setShowReviewForm(false)}
          onSuccess={handleReviewSubmitted}
        />
      )}
    </>
  );
};
