import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Star, ArrowLeft, Search, CheckCircle2, X, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import debounce from 'lodash.debounce';
import { productService } from '@/features/products/services/product.service';
import { reviewService, Review, ReviewsResponse } from '@/features/products/services/review.service';
import { useAuth } from '@/contexts/AuthContext';
import { ReviewFormModal } from '@/features/products/components/detail/ReviewFormModal';
import { YouMayAlsoLikeSection } from '@/features/products/components/detail/YouMayAlsoLikeSection';
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { cn } from '@/shared/utils/cn';
import { toast } from '@/shared/utils/toast';

export default function ProductReviewsPage() {
  const { productCode } = useParams<{ productCode: string }>();
  const { isAuthenticated, openLoginModal } = useAuth();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const limit = 10;

  // Get state from URL params (sync with URL)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
  const sort = (searchParams.get('sort') as 'rating_desc' | 'rating_asc' | 'latest' | 'oldest') || 'latest';
  const ratingParam = searchParams.get('rating');
  const ratingNum = ratingParam ? parseInt(ratingParam, 10) : null;
  // Validate rating is between 1-5, otherwise set to null
  const rating = (ratingNum && ratingNum >= 1 && ratingNum <= 5) ? ratingNum : null;
  const searchQuery = searchParams.get('search') || '';
  const filter = (searchParams.get('filter') as 'all' | 'photos' | 'verified' | '5stars') || 'all';

  // Local state for search input (for immediate UI updates)
  const [searchInputValue, setSearchInputValue] = useState(searchQuery);

  // Sync local search input with URL param when it changes externally
  useEffect(() => {
    setSearchInputValue(searchQuery);
  }, [searchQuery]);

  // Create debounced function to update URL params
  const debouncedUpdateSearch = useRef(
    debounce((value: string) => {
      updateSearchParams({ search: value, page: 1 });
    }, 500)
  ).current;

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedUpdateSearch.cancel();
    };
  }, [debouncedUpdateSearch]);

  // Clean invalid rating from URL if present
  useEffect(() => {
    if (ratingParam && rating === null) {
      // Invalid rating in URL, clean it
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('rating');
      setSearchParams(newParams, { replace: true });
    }
  }, [ratingParam, rating, searchParams, setSearchParams]);

  // Update URL params helper
  const updateSearchParams = (updates: { page?: number; sort?: string; rating?: number | null; search?: string; filter?: string }) => {
    const newParams = new URLSearchParams(searchParams);

    if (updates.page !== undefined) {
      if (updates.page === 1) {
        newParams.delete('page');
      } else {
        newParams.set('page', updates.page.toString());
      }
    }

    if (updates.sort !== undefined) {
      if (updates.sort === 'latest') {
        newParams.delete('sort');
      } else {
        newParams.set('sort', updates.sort);
      }
    }

    if (updates.rating !== undefined) {
      if (updates.rating === null || updates.rating === 0) {
        newParams.delete('rating');
      } else {
        newParams.set('rating', updates.rating.toString());
      }
    }

    if (updates.search !== undefined) {
      if (!updates.search || updates.search.trim() === '') {
        newParams.delete('search');
      } else {
        newParams.set('search', updates.search.trim());
      }
    }

    if (updates.filter !== undefined) {
      if (updates.filter === 'all') {
        newParams.delete('filter');
      } else {
        newParams.set('filter', updates.filter);
      }
    }

    setSearchParams(newParams, { replace: true });
  };

  // Fetch product by productCode
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', productCode],
    queryFn: ({ signal }) => productService.getProduct(productCode!, signal),
    enabled: !!productCode,
  });

  // Fetch reviews with pagination, filters, search, and rating from backend
  const { data: reviewsData, isLoading: isLoadingReviews } = useQuery({
    queryKey: [
      'product-reviews-full',
      product?._id,
      page,
      sort,
      filter,
      searchQuery,
      rating,
    ],
    queryFn: ({ signal }) => reviewService.getProductReviews(
      product!._id,
      page,
      limit,
      sort,
      filter,
      searchQuery,
      rating,
      signal
    ),
    enabled: !!product?._id,
  });

  // Fetch recommendations
  const { data: recommendations, isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ['product-recommendations', product?._id],
    queryFn: ({ signal }) => productService.getRecommendations(product!._id, 5, signal),
    enabled: !!product?._id,
  });

  usePageTitle(product ? `Reviews for ${product.name} - The Nail Artistry` : 'Product Reviews');

  // Use reviews directly from backend response (optimistic updates handled via React Query cache)
  const reviews = reviewsData?.data || [];

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

  const getRatingPercentage = (star: number): number => {
    if (!product?.ratingDistribution || !product.ratingCount || product.ratingCount === 0) return 0;
    return Math.round((product.ratingDistribution[star as keyof typeof product.ratingDistribution] / product.ratingCount) * 100);
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    // Optionally refresh reviews
  };

  // Handle star rating filter click
  const handleStarRatingClick = (star: number) => {
    if (rating === star) {
      // If already selected, clear the filter
      updateSearchParams({ rating: null, page: 1 });
    } else {
      // Set new rating filter and reset page
      updateSearchParams({ rating: star, page: 1 });
    }
  };

  // Handle clear rating filter
  const handleClearRatingFilter = () => {
    updateSearchParams({ rating: null, page: 1 });
  };

  const handleMarkHelpful = async (reviewId: string) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    // Get current review data from cached data
    const queryKey = [
      'product-reviews-full',
      product?._id,
      page,
      sort,
      filter,
      searchQuery,
      rating,
    ];

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

  if (isLoadingProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-4 w-64 mb-6" />
        <Skeleton className="h-32 w-full mb-8" />
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="lg:col-span-8">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/products" className="text-primary hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Use backend pagination total as single source of truth for filtered results
  const totalReviews = reviewsData?.pagination?.total || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Products', href: '/products' },
          { label: product.name, href: `/products/${product.slug}` },
          { label: 'Reviews' }
        ]}
      />

      {/* Product Review Header */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white/8 border-2 border-white/15">
              <img
                src={product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <Link
              to={`/products/${product.slug}`}
              className="text-sm text-white/45 hover:text-white inline-flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Product Details
            </Link>
            <h1 className="text-2xl font-bold mb-2">Reviews for {product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.round(product.ratingAvg || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-white/20"
                    )}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">
                {product.ratingAvg?.toFixed(1) || '0.0'} ({product.ratingCount || 0} Reviews)
              </span>
            </div>
          </div>

          {/* Write Review Button */}
          {isAuthenticated && (
            <Button
              onClick={() => setShowReviewForm(true)}
              className="bg-[#DD2C6C] hover:bg-[#DD2C6C]/90 text-white"
            >
              Write a Review
            </Button>
          )}
        </div>
      </div>

      {/* Main Content: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12">
        {/* Left Column: Rating Snapshot */}
        <div className="lg:col-span-4">
          <div className="bg-white/5 rounded-xl border border-white/10 p-6 lg:p-8 space-y-6 sticky top-[88px]">
            <h2 className="text-xl font-bold">Rating Snapshot</h2>

            {/* Overall Rating */}
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-white">{product.ratingAvg?.toFixed(1) || '0.0'}</div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.ratingAvg || 0) || (i === Math.floor(product.ratingAvg || 0) && product.ratingAvg % 1 >= 0.5)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-white/20'
                        }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-white/55">Based on {product.ratingCount || 0} reviews</p>
              </div>
            </div>

            {/* Rating Distribution */}
            {product.ratingDistribution && (
              <div className="space-y-2.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const percentage = getRatingPercentage(star);
                  const isActive = rating === star;
                  const isDefault = rating === null; // no filter selected

                  const isHighlighted = isDefault || isActive;

                  return (
                    <div
                      key={star}
                      onClick={() => handleStarRatingClick(star)}
                      role="button"
                      aria-pressed={isActive}
                      aria-label={`Filter reviews by ${star} star rating`}
                      className="flex items-center gap-2.5 cursor-pointer"
                    >
                      {/* Star label */}
                      <span
                        className={cn(
                          "text-sm font-medium w-6 transition-colors text-white"
                        )}
                      >
                        {star}★
                      </span>

                      {/* Progress bar */}
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-colors",
                            isHighlighted ? "bg-[#DD2C6C]" : "bg-white/30"
                          )}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      {/* Percentage */}
                      <span
                        className={cn(
                          "text-xs w-10 text-right transition-colors text-white/45"
                        )}
                      >
                        {percentage}%
                      </span>
                    </div>
                  );
                })}

                {/* Clear rating filter (centered) */}
                {rating !== null && (
                  <div className="flex justify-center pt-1">
                    <button
                      onClick={handleClearRatingFilter}
                      className="text-sm text-[#DD2C6C] hover:underline font-medium"
                    >
                      Clear rating filter
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Rating Distribution */}
            {/* {product.ratingDistribution && (
              <div className="space-y-2.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const percentage = getRatingPercentage(star);
                  const isActive = rating === star;
                  return (
                    <>
                      <div key={star} className="flex items-center gap-2.5">
                        <span className="text-sm font-medium w-6">{star}★</span>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#DD2C6C] rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/45 w-10 text-right">{percentage}%</span>
                      </div>
                    </>
                  );
                })}
              </div>
            )} */}

            {/* Write Review Section */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="font-semibold mb-2">Review this product</h3>
              <p className="text-sm text-white/45 mb-4">
                Share your thoughts with other customers. It helps them make better decisions!
              </p>
              {isAuthenticated ? (
                <Button
                  onClick={() => setShowReviewForm(true)}
                  variant="outline"
                  className="w-full border-[#DD2C6C] text-[#DD2C6C] hover:bg-[#DD2C6C] hover:text-white"
                >
                  Write a Review
                </Button>
              ) : (
                <Button
                  onClick={openLoginModal}
                  variant="outline"
                  className="w-full border-[#DD2C6C] text-[#DD2C6C] hover:bg-[#DD2C6C] hover:text-white"
                >
                  Sign in to Review
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Individual Reviews */}
        <div className="lg:col-span-8 space-y-4">
          {/* Search and Filters */}
          <div className="bg-white/5 rounded-xl border border-white/10 p-4 space-y-4">
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <Input
                type="search"
                placeholder="Search reviews..."
                value={searchInputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  // Update local state immediately for responsive UI
                  setSearchInputValue(value);
                  // Debounce URL update
                  debouncedUpdateSearch(value);
                }}
                className="pl-9 pr-9"
              />
              {searchInputValue && (
                <button
                  onClick={() => {
                    setSearchInputValue('');
                    updateSearchParams({ search: '', page: 1 });
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/55"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateSearchParams({ filter: 'all', page: 1 })}
                className={cn('hover:bg-white/10 hover:text-white', filter === 'all' ? 'bg-white/15 text-white' : '')}
              >
                All Reviews
              </Button>
              <Button
                variant={filter === 'photos' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateSearchParams({ filter: 'photos', page: 1 })}
                className={cn('hover:bg-white/10 hover:text-white', filter === 'photos' ? 'bg-white/15 text-white' : '')}
              >
                With Photos
              </Button>
              <Button
                variant={filter === 'verified' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateSearchParams({ filter: 'verified', page: 1 })}
                className={cn('hover:bg-white/10 hover:text-white', filter === 'verified' ? 'bg-white/15 text-white' : '')}
              >
                Verified Buyers
              </Button>
              <Button
                variant={rating === 5 ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  if (rating === 5) {
                    updateSearchParams({ rating: null, filter: filter === '5stars' ? 'all' : filter, page: 1 });
                  } else {
                    updateSearchParams({ rating: 5, filter: 'all', page: 1 });
                  }
                }}
                className={cn('hover:bg-white/10 hover:text-white', rating === 5 ? 'bg-white/15 text-white' : '')}
              >
                5 Stars Only
              </Button>

              {/* Sort Dropdown */}
              <div className="ml-auto">
                <Select
                  value={sort}
                  onValueChange={(value: 'rating_desc' | 'rating_asc' | 'latest' | 'oldest') => {
                    updateSearchParams({ sort: value, page: 1 });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="rating_desc">Highest Rated</SelectItem>
                    <SelectItem value="rating_asc">Lowest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          {isLoadingReviews ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-white/5 rounded-xl border border-white/10 p-12 text-center">
              <p className="text-white/45">No reviews found matching your filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review: Review) => {
                const userName = getUserName(review);
                const userImage = getUserImage(review);
                const isVerified = !!review.orderId;

                return (
                  <div key={review._id} className="bg-white/5 rounded-xl border border-white/10 p-5 hover:shadow-md transition-shadow">
                    {/* User Info */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#DD2C6C]/10 flex items-center justify-center flex-shrink-0">
                        {userImage ? (
                          <img src={userImage} alt={userName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="text-[#DD2C6C] font-semibold text-sm">{getUserInitials(userName)}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{userName}</span>
                          {isVerified && (
                            <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              VERIFIED
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/45">
                          {isVerified && <span>Verified Buyer</span>}
                          {isVerified && <span>•</span>}
                          <span>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-white/20"
                          )}
                        />
                      ))}
                    </div>

                    {/* Review Title */}
                    {review.title && (
                      <h3 className="font-semibold mb-2">{review.title}</h3>
                    )}

                    {/* Review Body */}
                    {review.body && (
                      <p className="text-sm text-white/45 mb-3 whitespace-pre-line">{review.body}</p>
                    )}

                    {/* Review Images */}
                    {/* TODO: Replace window.open with a lightbox/modal component for better UX */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {review.images.map((image, index) => (
                          <button
                            key={index}
                            className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10 hover:border-[#DD2C6C] transition-colors flex-shrink-0"
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
                            review.isHelpful ? "text-[#DD2C6C]" : "text-white/45"
                          )}>
                            ({review.helpfulCount})
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {reviewsData && reviewsData.pagination && reviewsData.pagination.pages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-white/45">
                Showing {((page - 1) * limit) + 1} - {Math.min(page * limit, totalReviews)} of {totalReviews} review{totalReviews !== 1 ? 's' : ''}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateSearchParams({ page: Math.max(1, page - 1) })}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateSearchParams({ page: Math.min(reviewsData.pagination.pages, page + 1) })}
                  disabled={page >= reviewsData.pagination.pages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customers Also Bought - Recommendations */}
      <YouMayAlsoLikeSection
        products={recommendations || []}
        isLoading={isLoadingRecommendations}
        title="Customers also bought"
      />

      {/* Review Form Modal */}
      {showReviewForm && product && (
        <ReviewFormModal
          productId={product._id}
          isOpen={showReviewForm}
          onClose={() => setShowReviewForm(false)}
          onSuccess={handleReviewSubmitted}
        />
      )}
    </div>
  );
}