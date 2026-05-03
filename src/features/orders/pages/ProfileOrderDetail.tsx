import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { orderService, Order } from '@/features/orders/services/order.service';
import { Skeleton } from '@/components/ui/skeleton';
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { toast } from '@/shared/utils/toast';
import { useAuth } from '@/contexts/AuthContext';
import { ReviewFormModal } from '@/features/products/components/detail/ReviewFormModal';
import { reviewService, Review } from '@/features/products/services/review.service';
import { useQuery } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { OrderHeader } from '@/features/orders/components/OrderHeader';
import { OrderTimeline } from '@/features/orders/components/OrderTimeline';
import { OrderItems } from '@/features/orders/components/OrderItems';
import { OrderPricing } from '@/features/orders/components/OrderPricing';
import { OrderShippingInfo } from '@/features/orders/components/OrderShippingInfo';
import { OrderPaymentInfo } from '@/features/orders/components/OrderPaymentInfo';
import { OrderTrackingInfo } from '@/features/orders/components/OrderTrackingInfo';
import { OrderRefundInfo } from '@/features/orders/components/OrderRefundInfo';
import { OrderReviews } from '@/features/orders/components/OrderReviews';
import { OrderActions } from '@/features/orders/components/OrderActions';
import { timelineSteps } from '@/features/orders/constants/order.constants';

export default function ProfileOrderDetail() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedOrderNumber, setCopiedOrderNumber] = useState(false);
  const [reviewModalProductId, setReviewModalProductId] = useState<string | null>(null);
  const [userReviews, setUserReviews] = useState<Map<string, Review>>(new Map());
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);


  // Fetch user's reviews for products in this order
  const { data: myReviews } = useQuery({
    queryKey: ['my-reviews', order?._id],
    queryFn: async () => {
      try {
        const response = await reviewService.getMyReviews(1, 100);
        return response.data;
      } catch (error) {
        return [];
      }
    },
    enabled: isAuthenticated && order?.status === 'DELIVERED',
  });

  // Map reviews by productId, filtering by orderId
  useEffect(() => {
    if (myReviews && order?._id) {
      const reviewMap = new Map<string, Review>();
      myReviews.forEach((review) => {
        // Only include reviews for this specific order
        if (review.orderId === order._id) {
          const productId = typeof review.productId === 'string' ? review.productId : review.productId._id;
          reviewMap.set(productId, review);
        }
      });
      setUserReviews(reviewMap);
    }
  }, [myReviews, order?._id]);

  // Update page title
  usePageTitle(order?.orderNumber ? `Order ${order.orderNumber}` : 'Order Details');

  // Fetch order details
  const fetchOrder = useCallback(async () => {
    if (!orderNumber || authLoading) return;

    if (!isAuthenticated) {
      navigate('/profile/orders');
      return;
    }

    setIsLoading(true);
    try {
      const fetchedOrder = await orderService.getOrderByNumber(orderNumber);
      setOrder(fetchedOrder);
    } catch (error: any) {
      console.error('Error loading order:', error);
      if (error.response?.status === 404 || error.response?.status === 403) {
        toast.error('Order not found or you do not have access to this order');
      } else {
        toast.error(error.response?.data?.message || 'Failed to load order details');
      }
      navigate('/profile/orders');
    } finally {
      setIsLoading(false);
    }
  }, [orderNumber, isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // Copy order number to clipboard
  const handleCopyOrderNumber = async () => {
    if (!order?.orderNumber) return;
    try {
      await navigator.clipboard.writeText(order.orderNumber);
      setCopiedOrderNumber(true);
      toast.success('Order number copied to clipboard');
      setTimeout(() => setCopiedOrderNumber(false), 2000);
    } catch (error) {
      toast.error('Failed to copy order number');
    }
  };

  // Handle order cancellation
  const handleCancelOrder = async () => {
    if (!order?.orderNumber || isCancelling) return;

    setIsCancelling(true);
    try {
      // Backend now accepts orderNumber (which is unique) directly
      const response = await orderService.cancelOrder(order.orderNumber);
      toast.success('Order cancelled successfully');
      setShowCancelModal(false);
      
      // Refetch order details
      const fetchedOrder = await orderService.getOrderByNumber(order.orderNumber);
      setOrder(fetchedOrder);
    } catch (error: any) {
      console.error('Error cancelling order:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Failed to cancel order. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsCancelling(false);
    }
  };

  // Get current status index for timeline
  const getCurrentStatusIndex = () => {
    if (!order?.status) return -1;
    const status = order.status.toUpperCase();
    
    // For CANCELLED or REFUNDED orders, stop timeline at the last actual completed step
    // Don't show any progress beyond what was actually completed before cancellation
    if (status === 'CANCELLED' || status === 'REFUNDED') {
      // Check payment status to determine if order reached PAID before cancellation
      const paymentStatus = order.payment?.status?.toUpperCase();
      
      // If payment was successful (paid), order reached PAID status before cancellation
      if (paymentStatus === 'PAID' || paymentStatus === 'SUCCESS') {
        // Return index of PAID step (which is index 1 in timelineSteps: PLACED=0, PAID=1)
        return 1; // PAID is the second step (index 1)
      } else {
        // Order was only PLACED, didn't reach PAID before cancellation
        return 0; // PLACED is the first step (index 0)
      }
    }
    
    // For active orders, find the current step index in timelineSteps array
    const stepIndex = timelineSteps.findIndex(step => step.key === status);
    return stepIndex >= 0 ? stepIndex : -1;
  };

  const currentStatusIndex = getCurrentStatusIndex();

  // Get payment method label
  const getPaymentMethodLabel = (method?: string) => {
    switch (method?.toLowerCase()) {
      case 'razorpay':
      case 'card':
        return 'Card / Razorpay';
      case 'upi':
        return 'UPI';
      case 'netbanking':
        return 'Net Banking';
      case 'cod':
        return 'Cash on Delivery';
      default:
        return method || 'N/A';
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-4 md:py-8">
        <Breadcrumbs items={[
          { label: 'My Account', href: '/profile' },
          { label: 'My Orders', href: '/profile/orders' },
          { label: 'Order Details' }
        ]} />
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-8">Unable to load order details.</p>
        <Button onClick={() => navigate('/profile/orders')}>Back to Orders</Button>
      </div>
    );
  }

  const orderStatus = order.status?.toUpperCase() || 'PLACED';
  const isDelivered = orderStatus === 'DELIVERED';
  const isCancelled = (order.status?.toUpperCase() === 'CANCELLED' || order.status?.toUpperCase() === 'REFUNDED');
  // Match backend exactly: cancellableStatuses = ['PLACED', 'PAID']
  const canCancel = order.status && ['PLACED', 'PAID'].includes(order.status);

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <Breadcrumbs items={[
        { label: 'My Account', href: '/profile' },
        { label: 'My Orders', href: '/profile/orders' },
        { label: `Order ${order.orderNumber}` }
      ]} />

      <div className="max-w-5xl mx-auto space-y-8">
        <OrderHeader 
          order={order} 
          copiedOrderNumber={copiedOrderNumber}
          onCopyOrderNumber={handleCopyOrderNumber}
        />

        <OrderTimeline 
          order={order}
          currentStatusIndex={currentStatusIndex}
          isCancelled={isCancelled}
        />

        <OrderItems order={order} />

        <OrderPricing order={order} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OrderShippingInfo order={order} />
          <OrderPaymentInfo 
            order={order}
            getPaymentMethodLabel={getPaymentMethodLabel}
            getPaymentStatusColor={getPaymentStatusColor}
          />
        </div>

        <OrderTrackingInfo 
          order={order}
          orderStatus={orderStatus}
          isCancelled={isCancelled}
        />

        <OrderRefundInfo 
          order={order}
          orderStatus={orderStatus}
        />

        <OrderReviews 
          order={order}
          isDelivered={isDelivered}
          userReviews={userReviews}
          onReviewClick={setReviewModalProductId}
        />

        <OrderActions 
          order={order}
          orderStatus={orderStatus}
          canCancel={canCancel}
          isCancelling={isCancelling}
          onCancelClick={() => setShowCancelModal(true)}
        />

        {/* Back Button */}
        <div className="flex justify-center pt-4">
          <Button variant="ghost" onClick={() => navigate('/profile/orders')} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModalProductId && order?._id && (
        <ReviewFormModal
          productId={reviewModalProductId}
          orderId={order._id}
          isOpen={!!reviewModalProductId}
          onClose={() => setReviewModalProductId(null)}
          existingReview={userReviews.get(reviewModalProductId) || null}
          isOrderReview={true}
          onSuccess={async () => {
            setReviewModalProductId(null);
            // Refetch order details to get updated reviews
            await fetchOrder();
            // Also refresh user reviews
            try {
              const response = await reviewService.getMyReviews(1, 100);
              const reviewMap = new Map<string, Review>();
              if (order?._id) {
                response.data.forEach((review) => {
                  // Only include reviews for this specific order
                  if (review.orderId === order._id) {
                    const productId = typeof review.productId === 'string' ? review.productId : review.productId._id;
                    reviewMap.set(productId, review);
                  }
                });
              }
              setUserReviews(reviewMap);
            } catch (error) {
              console.error('Error refreshing reviews:', error);
            }
          }}
        />
      )}

      {/* Cancel Order Confirmation Modal */}
      <AlertDialog open={showCancelModal} onOpenChange={setShowCancelModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order?
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCancelling}>Keep Order</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelOrder}
              disabled={isCancelling}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isCancelling ? 'Cancelling...' : 'Confirm Cancel'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
