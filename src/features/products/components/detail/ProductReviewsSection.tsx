import { useState, useEffect } from 'react';
import { Star, CheckCircle2, ArrowRight, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewService, Review, ReviewsResponse } from '@/features/products/services/review.service';
import { useAuth } from '@/contexts/AuthContext';
import { ReviewFormModal } from './ReviewFormModal';
import { cn } from '@/shared/utils/cn';
import { toast } from '@/shared/utils/toast';

interface ProductReviewsSectionProps {
  productId: string;
  productCode?: string;
  rating: number;
  reviewCount: number;
  ratingDistribution?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export const ProductReviewsSection = ({
  productId,
  productCode,
  rating,
  reviewCount,
  ratingDistribution,
}: ProductReviewsSectionProps) => {
  const { isAuthenticated, openLoginModal } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [topReview, setTopReview] = useState<Review | null>(null);

  // Fetch top 3 rated reviews for the preview
  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ['product-reviews-preview', productId],
    queryFn: ({ signal }) => reviewService.getProductReviews(productId, 1, 3, 'rating_desc'),
    enabled: !!productId && reviewCount > 0,
  });

  useEffect(() => {
    if (reviewsData?.data && reviewsData.data.length > 0) {
      // Get the top-rated review for the featured quote
      setTopReview(reviewsData.data[0]);
    }
  }, [reviewsData]);

  const handleReviewSubmitted = () => {
    // Refresh reviews after submission
    setShowReviewForm(false);
  };

  const handleLoadMoreReviews = () => {
    navigate(`/reviews/${productId}`);
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

  const getUserInitials = (name: string): string => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Calculate percentage for rating distribution
  const getRatingPercentage = (star: keyof typeof ratingDistribution): number => {
    if (!ratingDistribution || reviewCount === 0) return 0;
    return Math.round((ratingDistribution[star] / reviewCount) * 100);
  };

  const handleMarkHelpful = async (reviewId: string) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    // Get current review data from cached data
    const queryKey = ['product-reviews-preview', productId];

    const currentData = queryClient.getQueryData<ReviewsResponse>(queryKey);
    const currentReview = currentData?.data?.find((r) => r._id === reviewId);
    if (!currentReview) return;

    const currentCount = currentReview.helpfulCount || 0;
    const currentIsHelpful = currentReview.isHelpful || false;

    // Calculate new values (toggle)
    const newIsHelpful = !currentIsHelpful;
    const newCount = newIsHelpful ? currentCount + 1 : Math.max(0, currentCount - 1);

    // Optimistically update React Query cache (toggle state and count)
    queryClient.setQueryData<ReviewsResponse>(queryKey, (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        data: oldData.data.map((review: Review) =>
          review._id === reviewId
            ? { ...review, helpfulCount: newCount, isHelpful: newIsHelpful }
            : review
        ),
      };
    });

    try {
      // Call backend API to toggle vote
      const response = await reviewService.markHelpful(reviewId);

      // Update with server response (in case of any discrepancy)
      queryClient.setQueryData<ReviewsResponse>(queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((review: Review) =>
            review._id === reviewId
              ? {
                ...review,
                helpfulCount: response.data.helpfulCount,
                isHelpful: response.data.isHelpful
              }
              : review
          ),
        };
      });

      // Show success toast only when marking as helpful (not when unmarking)
      if (response.data.isHelpful) {
        toast.success('Thanks for your feedback');
      }
    } catch (error: any) {
      // Rollback React Query cache on error
      queryClient.setQueryData<ReviewsResponse>(queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((review: Review) =>
            review._id === reviewId
              ? {
                ...review,
                helpfulCount: currentCount,
                isHelpful: currentIsHelpful
              }
              : review
          ),
        };
      });

      const errorMessage = error?.response?.data?.message || 'Failed to update vote. Please try again.';
      toast.error(errorMessage);
    }
  };

  const reviews = reviewsData?.data || [];

  return (
    <>
      <div className="my-12 md:my-20 mb-16 md:mb-24">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Panel - Customer Reviews Summary (col-4) */}
          <div className="lg:col-span-4">
            {isLoading ? (
              <div className="bg-white/5 rounded-xl border border-white/10 p-6 lg:p-8 space-y-6 sticky top-[88px]">
                {/* Title Skeleton */}
                <Skeleton className="h-8 w-48 mb-2" />

                {/* Overall Rating Skeleton */}
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="h-14 w-16" />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-5 w-5 rounded" />
                      ))}
                    </div>
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>

                {/* Featured Quote Skeleton */}
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-5 border border-pink-100 space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>

                {/* Rating Distribution Skeleton */}
                <div className="space-y-2.5">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2.5">
                      <Skeleton className="h-3 w-3" />
                      <Skeleton className="flex-1 h-2 rounded-full" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  ))}
                </div>

                {/* Write a Review Button Skeleton */}
                {isAuthenticated && (
                  <Skeleton className="h-12 w-full rounded-lg" />
                )}
              </div>
            ) : (
              <div className="bg-white/5 rounded-xl border border-white/10 p-6 lg:p-8 space-y-6 sticky top-[88px]">
                {/* Title */}
                <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>

                {/* Overall Rating */}
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-white">{rating.toFixed(1)}</div>
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(rating) || (i === Math.floor(rating) && rating % 1 >= 0.5)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-white/50">Based on {reviewCount} reviews</p>
                  </div>
                </div>

                {/* Featured Quote */}
                {topReview && (
                  <div className="bg-[#DD2C6C]/8 rounded-xl p-5 border border-[#DD2C6C]/20 relative">
                    <div className="absolute top-3 right-3 text-3xl font-bold text-[#DD2C6C]/20">
                      {topReview.helpfulCount > 0 ? topReview.helpfulCount : '99'}
                    </div>
                    <p className="text-sm text-white/75 leading-relaxed pr-10 mb-2">
                      "{topReview.body || topReview.title || 'Great product!'}"
                    </p>
                    {topReview.orderId && (
                      <p className="text-xs text-white/45 font-medium">– Verified Buyer</p>
                    )}
                  </div>
                )}

                {/* Rating Distribution */}
                {ratingDistribution && reviewCount > 0 && (
                  <div className="space-y-2.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const percentage = getRatingPercentage(star as keyof typeof ratingDistribution);
                      return (
                        <div
                          key={star}
                          onClick={() =>
                            navigate(`/reviews/${productId}?rating=${star}`)
                          }
                          className="flex items-center gap-2.5 cursor-pointer">
                          <span className="text-xs font-medium text-white/55 w-3">{star}★</span>
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#DD2C6C] rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-white/45 w-10 text-right">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Write a Review Button */}
                {isAuthenticated && (
                  <Button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full bg-[#DD2C6C] hover:bg-[#DD2C6C]/90 text-white py-5 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    Write a Review
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Individual Reviews (col-8) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              {isLoading ? (
                <Skeleton className="h-5 w-48" />
              ) : (
                <h3 className="text-base font-semibold text-white">
                  Showing {reviews.length} of {reviewCount} Reviews
                </h3>
              )}
            </div>

            {/* Reviews List */}
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {/* Avatar Skeleton */}
                      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />

                      <div className="flex-1 space-y-2">
                        {/* Name and Rating Skeleton */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-24" />
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-3.5 w-3.5 rounded" />
                              ))}
                            </div>
                          </div>
                          <Skeleton className="h-3 w-16" />
                        </div>

                        {/* Verified Buyer Badge Skeleton */}
                        <Skeleton className="h-5 w-28 rounded" />
                      </div>
                    </div>

                    {/* Review Title Skeleton */}
                    <Skeleton className="h-4 w-3/4 mb-2" />

                    {/* Review Body Skeleton */}
                    <div className="space-y-2 mb-3">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                    </div>

                    {/* Review Images Skeleton (optional) */}
                    <div className="flex gap-2 mt-3">
                      <Skeleton className="w-16 h-16 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12 text-white/50 bg-white/5 rounded-xl border border-white/10 p-8">
                <p>No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-white/5 rounded-xl border border-white/10 p-5 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        {/* User Avatar */}
                        {getUserImage(review) ? (
                          <img
                            src={getUserImage(review)}
                            alt={getUserName(review)}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold text-white">
                              {getUserInitials(getUserName(review))}
                            </span>
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          {/* User Name and Rating Row */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-sm text-white">{getUserName(review)}</p>
                              <div className="flex items-center gap-0.5 flex-shrink-0">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3.5 w-3.5 ${i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                      }`}
                                  />
                                ))}
                              </div>
                            </div>
                            {/* Time - positioned at top right */}
                            <span className="text-xs text-white/35 whitespace-nowrap flex-shrink-0">
                              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          {/* Verified Buyer Badge */}
                          {review.orderId && (
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/15 text-green-400 text-[10px] font-medium rounded border border-green-500/25">
                                <CheckCircle2 className="h-2.5 w-2.5" />
                                VERIFIED BUYER
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Review Title */}
                      {review.title && (
                        <h4 className="font-semibold text-sm text-white mb-2">{review.title}</h4>
                      )}

                      {/* Review Body */}
                      {review.body && (
                        <p className="text-sm text-white/65 leading-relaxed mb-3">{review.body}</p>
                      )}

                      {/* Review Images */}
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mt-3 mb-3">
                          {review.images.slice(0, 3).map((image, index) => (
                            <button
                              key={index}
                              className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/15 hover:border-[#DD2C6C] transition-colors flex-shrink-0"
                              onClick={() => window.open(image, '_blank')}
                              aria-label={`View review image ${index + 1} in new tab`}
                            >
                              <img
                                src={image}
                                alt={`Review image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Helpfulness */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/8">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkHelpful(review._id)}
                          className={cn(
                            "h-8 px-3 text-sm transition-colors",
                            review.isHelpful
                              ? "text-[#DD2C6C] hover:text-[#DD2C6C] hover:bg-[#DD2C6C]/10 bg-[#DD2C6C]/5"
                              : "text-white/40 hover:text-white hover:bg-white/10"
                          )}
                          aria-label={review.isHelpful ? "Remove helpful vote" : "Mark review as helpful"}
                          aria-pressed={review.isHelpful}
                        >
                          <ThumbsUp className={cn(
                            "h-4 w-4 mr-1.5",
                            review.isHelpful && "fill-[#DD2C6C] text-[#DD2C6C]"
                          )} />
                          <span className="font-medium">Helpful</span>
                          {review.helpfulCount > 0 && (
                            <span className={cn(
                              "ml-1.5",
                              review.isHelpful ? "text-[#DD2C6C]" : "text-muted-foreground"
                            )}>
                              ({review.helpfulCount})
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Reviews Button */}
                {reviewCount > reviews.length && (
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      onClick={handleLoadMoreReviews}
                      className="text-[#DD2C6C] hover:text-[#DD2C6C]/90 hover:bg-[#DD2C6C]/10 py-4 text-sm font-semibold transition-all mt-4"
                    >
                      Load More Reviews
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
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
