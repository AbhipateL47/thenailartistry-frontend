import { useState, useEffect } from 'react';
import { Star, X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { reviewService, CreateReviewRequest, UpdateReviewRequest, Review } from '@/features/products/services/review.service';
import { uploadService } from '@/features/profile/services/upload.service';
import { toast } from '@/shared/utils/toast';

interface ReviewFormModalProps {
  productId: string;
  orderId?: string; // Required for order-based reviews
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  existingReview?: Review | null;
  isOrderReview?: boolean; // If true, use simplified order-based review form
}

export const ReviewFormModal = ({
  productId,
  orderId,
  isOpen,
  onClose,
  onSuccess,
  existingReview,
  isOrderReview = false,
}: ReviewFormModalProps) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState(existingReview?.title || '');
  const [body, setBody] = useState(existingReview?.body || '');
  const [comment, setComment] = useState(existingReview?.body || '');
  const [images, setImages] = useState<string[]>(existingReview?.images || []);
  const [uploadingImages, setUploadingImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form when existingReview changes
  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setTitle(existingReview.title || '');
      setBody(existingReview.body || '');
      setComment(existingReview.body || '');
      setImages(existingReview.images || []);
    } else {
      setRating(0);
      setTitle('');
      setBody('');
      setComment('');
      setImages([]);
    }
  }, [existingReview]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const maxImages = 5;
    const remainingSlots = maxImages - images.length;
    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    for (const file of filesToUpload) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload only image files');
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        continue;
      }

      const tempId = `temp-${Date.now()}-${Math.random()}`;
      setUploadingImages((prev) => [...prev, tempId]);

      try {
        const response = await uploadService.uploadReviewImage(file);
        setImages((prev) => [...prev, response.imageUrl]);
        toast.success('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
      } finally {
        setUploadingImages((prev) => prev.filter((id) => id !== tempId));
      }
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isOrderReview && orderId) {
        // Order-based review (verified purchase)
        if (existingReview) {
          // Update existing review - for now, we'll use the update endpoint
          // Note: Update endpoint may need to be adjusted for order-based reviews
          const updateData: UpdateReviewRequest = {
            rating,
            body: comment.trim() || undefined,
          };
          await reviewService.updateReview(existingReview._id, updateData);
          toast.success('Review updated successfully!');
        } else {
          // Create new order-based review
          const reviewData: CreateReviewRequest = {
            orderId,
            productId,
            rating,
            comment: comment.trim() || undefined,
          };
          await reviewService.createReview(reviewData);
          toast.success('Review submitted successfully!');
        }
      } else {
        // Product page review (legacy - not used in order details)
        if (existingReview) {
          const updateData: UpdateReviewRequest = {
            rating,
            title: title.trim() || undefined,
            body: body.trim() || undefined,
            images: images.length > 0 ? images : undefined,
          };
          await reviewService.updateReview(existingReview._id, updateData);
          toast.success('Review updated successfully!');
        } else {
          // This path should not be used for order reviews
          toast.error('Order ID is required for reviews');
          return;
        }
      }
      
      // Reset form
      if (!existingReview) {
        setRating(0);
        setTitle('');
        setBody('');
        setComment('');
        setImages([]);
      }
      
      onSuccess();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      const errorMessage = error?.response?.data?.message || `Failed to ${existingReview ? 'update' : 'submit'} review`;
      
      // Handle specific error codes
      if (error?.response?.status === 403) {
        toast.error('You can review only delivered orders');
      } else if (error?.response?.status === 409) {
        toast.error('You have already reviewed this product');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setRating(0);
      setTitle('');
      setBody('');
      setComment('');
      setImages([]);
      setUploadingImages([]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Rating <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-white/45'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-white/45">
                  {rating} {rating === 1 ? 'star' : 'stars'}
                </span>
              )}
            </div>
          </div>

          {/* Order-based review: Comment only */}
          {isOrderReview ? (
            <div>
              <Label htmlFor="review-comment" className="text-base font-medium mb-2 block">
                Comment (Optional)
              </Label>
              <Textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                rows={5}
                maxLength={1000}
              />
              <p className="text-xs text-white/45 mt-1">
                {comment.length}/1000 characters
              </p>
            </div>
          ) : (
            <>
              {/* Title */}
              <div>
                <Label htmlFor="review-title" className="text-base font-medium mb-2 block">
                  Review Title (Optional)
                </Label>
                <Input
                  id="review-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your review a title"
                  maxLength={100}
                />
              </div>

              {/* Body */}
              <div>
                <Label htmlFor="review-body" className="text-base font-medium mb-2 block">
                  Your Review (Optional)
                </Label>
                <Textarea
                  id="review-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Share your experience with this product..."
                  rows={5}
                  maxLength={1000}
                />
                <p className="text-xs text-white/45 mt-1">
                  {body.length}/1000 characters
                </p>
              </div>
            </>
          )}

          {/* Images - Only for product page reviews, not order reviews */}
          {!isOrderReview && (
          <div>
            <Label className="text-base font-medium mb-2 block">
              Photos (Optional)
            </Label>
            <div className="space-y-3">
              {/* Image Upload Button */}
              {images.length < 5 && (
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploadingImages.length > 0}
                    className="hidden"
                    id="review-images"
                  />
                  <Label
                    htmlFor="review-images"
                    className="flex items-center justify-center gap-2 border-2 border-dashed border-muted-foreground/25 rounded-md p-4 cursor-pointer hover:border-primary transition-colors"
                  >
                    <Upload className="h-5 w-5 text-white/45" />
                    <span className="text-sm text-white/45">
                      Upload photos ({images.length}/5)
                    </span>
                  </Label>
                </div>
              )}

              {/* Uploading Indicator */}
              {uploadingImages.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-white/45">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading {uploadingImages.length} image(s)...
                </div>
              )}

              {/* Uploaded Images */}
              {images.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Review ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-md border border-muted"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-white/45 mt-2">
              You can upload up to 5 photos. Max size: 5MB per image.
            </p>
          </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || rating === 0}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {existingReview ? 'Updating...' : 'Submitting...'}
                </>
              ) : (
                existingReview ? 'Update Review' : 'Submit Review'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

