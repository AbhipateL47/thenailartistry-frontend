import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle, Package, Truck, MapPin, Phone, Mail, ArrowLeft, Calendar, 
  DollarSign, Copy, Check, CreditCard, FileText, MessageCircle, RefreshCw,
  Clock, CheckCircle2, XCircle, Star, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { formatCurrency } from '@/utils/formatCurrency';
import { orderService, Order } from '@/services/orderService';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { usePageTitle } from '@/hooks/usePageTitle';
import { toast } from '@/utils/toast';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { ReviewFormModal } from '@/components/product/detail/ReviewFormModal';
import { reviewService, Review } from '@/services/reviewService';
import { useQuery } from '@tanstack/react-query';

// Status configuration
const statusConfig: Record<string, { color: string; label: string; icon: any }> = {
  PLACED: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Placed', icon: Clock },
  PAID: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Paid', icon: CheckCircle2 },
  SHIPPED: { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Shipped', icon: Truck },
  DELIVERED: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Delivered', icon: CheckCircle },
  CANCELLED: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Cancelled', icon: XCircle },
  REFUNDED: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Refunded', icon: XCircle },
};

// Timeline steps (matching backend enum: PLACED, PAID, SHIPPED, DELIVERED)
const timelineSteps = [
  { key: 'PLACED', label: 'Order Placed', icon: Clock },
  { key: 'PAID', label: 'Payment Confirmed', icon: CheckCircle2 },
  { key: 'SHIPPED', label: 'Shipped', icon: Truck },
  { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
];

const statusOrder = ['PLACED', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];

export default function ProfileOrderDetail() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedOrderNumber, setCopiedOrderNumber] = useState(false);
  const [reviewModalProductId, setReviewModalProductId] = useState<string | null>(null);
  const [userReviews, setUserReviews] = useState<Map<string, Review>>(new Map());

  // Log page load
  useEffect(() => {
    console.log(`📄 Profile Order Detail Page Loaded - Order: ${orderNumber || 'N/A'}`);
  }, [orderNumber]);

  // Fetch user's reviews for products in this order
  const { data: myReviews } = useQuery({
    queryKey: ['my-reviews'],
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

  // Map reviews by productId
  useEffect(() => {
    if (myReviews) {
      const reviewMap = new Map<string, Review>();
      myReviews.forEach((review) => {
        const productId = typeof review.productId === 'string' ? review.productId : review.productId._id;
        reviewMap.set(productId, review);
      });
      setUserReviews(reviewMap);
    }
  }, [myReviews]);

  // Update page title
  usePageTitle(order?.orderNumber ? `Order ${order.orderNumber}` : 'Order Details');

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
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
    };

    fetchOrder();
  }, [orderNumber, isAuthenticated, authLoading, navigate]);

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

  // Get current status index for timeline
  const getCurrentStatusIndex = () => {
    if (!order?.status) return -1;
    return statusOrder.indexOf(order.status.toUpperCase());
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
  const statusInfo = statusConfig[orderStatus] || statusConfig.PLACED;
  const StatusIcon = statusInfo.icon;
  const isDelivered = orderStatus === 'DELIVERED';

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <Breadcrumbs items={[
        { label: 'My Account', href: '/profile' },
        { label: 'My Orders', href: '/profile/orders' },
        { label: `Order ${order.orderNumber}` }
      ]} />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* 1. ORDER HEADER */}
        <div className="bg-white border-b border-gray-200 pb-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Order #{order.orderNumber}</h1>
                <button
                  onClick={handleCopyOrderNumber}
                  className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                  title="Copy order number"
                >
                  {copiedOrderNumber ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {order.createdAt 
                      ? format(new Date(order.createdAt), 'MMMM dd, yyyy • hh:mm a')
                      : 'Date not available'}
                  </span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className={`${statusInfo.color} border text-base font-semibold flex items-center gap-2 px-4 py-2`}>
              <StatusIcon className="h-5 w-5" />
              {statusInfo.label}
            </Badge>
          </div>
        </div>

        {/* 2. ORDER STATUS TIMELINE - HERO */}
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200/60 rounded-xl p-6 md:p-8">
          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Progress line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200">
                <div 
                  className="h-full bg-gradient-to-r from-[#DD2C6C] to-[#c4245f] transition-all duration-500"
                  style={{ 
                    width: currentStatusIndex >= 0 
                      ? `${(currentStatusIndex / (timelineSteps.length - 1)) * 100}%` 
                      : '0%' 
                  }}
                />
              </div>
              
              <div className="relative flex justify-between">
                {timelineSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const stepStatusIndex = statusOrder.indexOf(step.key);
                  const isCompleted = stepStatusIndex <= currentStatusIndex && currentStatusIndex >= 0;
                  const isCurrent = stepStatusIndex === currentStatusIndex;
                  const isFuture = stepStatusIndex > currentStatusIndex;

                  return (
                    <div key={step.key} className="flex flex-col items-center flex-1">
                      <div
                        className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full transition-all mb-3 ${
                          isCompleted
                            ? isCurrent
                              ? 'bg-gradient-to-br from-[#DD2C6C] to-[#c4245f] text-white shadow-lg shadow-[#DD2C6C]/30 scale-110'
                              : 'bg-green-500 text-white shadow-md'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <StepIcon className="h-7 w-7" />
                      </div>
                      <p
                        className={`text-sm font-semibold text-center ${
                          isCompleted 
                            ? isCurrent 
                              ? 'text-[#DD2C6C]' 
                              : 'text-gray-700'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200">
                <div 
                  className="w-full bg-gradient-to-b from-[#DD2C6C] to-[#c4245f] transition-all duration-500"
                  style={{ 
                    height: currentStatusIndex >= 0 
                      ? `${(currentStatusIndex / (timelineSteps.length - 1)) * 100}%` 
                      : '0%' 
                  }}
                />
              </div>
              
              <div className="space-y-6">
                {timelineSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const stepStatusIndex = statusOrder.indexOf(step.key);
                  const isCompleted = stepStatusIndex <= currentStatusIndex && currentStatusIndex >= 0;
                  const isCurrent = stepStatusIndex === currentStatusIndex;
                  const isFuture = stepStatusIndex > currentStatusIndex;

                  return (
                    <div key={step.key} className="relative flex items-start gap-4">
                      <div
                        className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                          isCompleted
                            ? isCurrent
                              ? 'bg-gradient-to-br from-[#DD2C6C] to-[#c4245f] text-white shadow-lg shadow-[#DD2C6C]/30'
                              : 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <StepIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <p
                          className={`font-semibold ${
                            isCompleted 
                              ? isCurrent 
                                ? 'text-primary' 
                                : 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 3. ITEMS PURCHASED */}
        <div className="bg-white border border-gray-200/60 rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Items Purchased</h2>
          {order.items && order.items.length > 0 ? (
            <div className="space-y-6">
              {order.items.map((item: any, index: number) => {
                const productId = item.productId;
                const existingReview = userReviews.get(productId);
                const hasReviewed = !!existingReview;

                return (
                  <div key={item.productId || index} className={`flex gap-5 ${index < order.items.length - 1 ? 'pb-6 border-b border-gray-100' : ''}`}>
                    <Link
                      to={`/products/${productId}`}
                      target="_blank"
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.image || '/placeholder-product.jpg'}
                        alt={item.title || 'Product'}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover hover:opacity-90 transition-opacity shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                        }}
                      />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/products/${productId}`}
                          target="_blank"
                          className="font-semibold text-lg text-gray-900 hover:text-primary transition-colors block mb-1.5"
                        >
                          {item.title || 'Product'}
                        </Link>
                        {item.variantSku && (
                          <p className="text-sm text-gray-500 mb-3">
                            {item.variantSku}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">
                          Quantity: {item.qty || item.quantity || 1} × {formatCurrency(item.unitPrice || item.price || 0)}
                        </p>
                      </div>
                      <p className="font-semibold text-lg text-gray-900 mt-2">
                        {formatCurrency(item.totalPrice || ((item.unitPrice || item.price || 0) * (item.qty || item.quantity || 1)))}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No items found in this order.</p>
          )}
        </div>

        {/* 4. PRICE BREAKDOWN - SUMMARY PANEL */}
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200/60 rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Price Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-base">
              <span className="text-gray-600">Items Total</span>
              <span className="font-medium text-gray-900">{formatCurrency(order.subTotal || 0)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-base text-green-600">
                <span>Discount</span>
                <span className="font-medium">-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-900">
                {order.shippingFee === 0 ? 'Free' : formatCurrency(order.shippingFee || 0)}
              </span>
            </div>
            {order.tax > 0 && (
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-900">{formatCurrency(order.tax || 0)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total Paid</span>
              <span className="text-3xl font-bold text-primary">
                {formatCurrency(order.grandTotal || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* 5. SHIPPING & PAYMENT INFO - TWO COLUMN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="bg-white border border-gray-200/60 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                Shipping Address
              </h2>
              <div className="text-sm space-y-2 text-gray-700">
                <p className="font-semibold text-base text-gray-900">{order.shippingAddress.fullName || 'N/A'}</p>
                <p>{order.shippingAddress.addressLine1 || ''}</p>
                {order.shippingAddress.addressLine2 && (
                  <p>{order.shippingAddress.addressLine2}</p>
                )}
                <p>
                  {order.shippingAddress.city || ''}, {order.shippingAddress.state || ''}{' '}
                  {order.shippingAddress.postalCode || (order.shippingAddress as any).pincode || ''}
                </p>
                <p>{order.shippingAddress.country || 'India'}</p>
                {order.shippingAddress.phone && (
                  <p className="mt-4 text-gray-600">
                    {order.shippingAddress.phone}
                  </p>
                )}
                {(order.shippingAddress.email || order.guestEmail) && (
                  <p className="text-gray-600">
                    {order.shippingAddress.email || order.guestEmail}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Payment Information */}
          <div className="bg-white border border-gray-200/60 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-500" />
              Payment Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium text-gray-900">{getPaymentMethodLabel(order.payment?.method)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status</span>
                <span className={`font-medium ${getPaymentStatusColor(order.payment?.status)}`}>
                  {order.payment?.status?.toUpperCase() || order.status}
                </span>
              </div>
              {(order as any).paidAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date</span>
                  <span className="font-medium text-gray-900">
                    {format(new Date((order as any).paidAt), 'MMM dd, yyyy')}
                  </span>
                </div>
              )}
              {order.payment?.status === 'failed' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    Payment failed. Please contact support if you believe this is an error.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 7. TRACKING INFORMATION */}
        <div className="bg-white border border-gray-200/60 rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5 text-gray-500" />
            Tracking Information
          </h2>
          {(orderStatus === 'SHIPPED' || orderStatus === 'DELIVERED') && (order as any).trackingNumber ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tracking ID</span>
                <span className="font-mono text-sm font-semibold text-gray-900">{(order as any).trackingNumber}</span>
              </div>
              {(order as any).courierName && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Courier</span>
                  <span className="text-sm font-medium text-gray-900">{(order as any).courierName}</span>
                </div>
              )}
              {(order as any).trackingUrl && (
                <div className="pt-2">
                  <Button 
                    className="bg-primary hover:bg-primary-hover text-white" 
                    size="sm" 
                    asChild
                  >
                    <a href={(order as any).trackingUrl} target="_blank" rel="noopener noreferrer">
                      Track Shipment <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              )}
              {isDelivered && (order as any).deliveredAt && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    ✓ Delivered on {format(new Date((order as any).deliveredAt), 'MMMM dd, yyyy')}
                  </p>
                </div>
              )}
            </div>
          ) : (orderStatus === 'SHIPPED' || orderStatus === 'DELIVERED') ? (
            <div className="py-4">
              <p className="text-sm text-gray-500">Tracking information will be available soon.</p>
            </div>
          ) : (
            <div className="py-4">
              <p className="text-sm text-gray-500">
                Tracking will be available once your order is shipped. We'll notify you when it's on the way.
              </p>
            </div>
          )}
        </div>

        {/* 9. RATINGS & REVIEWS - Only if DELIVERED */}
        {isDelivered && order.items && order.items.length > 0 && (
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
                          <div className="flex items-center gap-1 mt-1.5">
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
                        )}
                      </div>
                    </div>
                    <Button
                      variant={hasReviewed ? 'outline' : 'default'}
                      size="sm"
                      className={hasReviewed ? 'border-gray-300' : 'bg-[#DD2C6C] hover:bg-[#c4245f] text-white'}
                      onClick={() => setReviewModalProductId(productId)}
                    >
                      {hasReviewed ? 'Edit Review' : 'Write Review'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 8. SUPPORT & ACTIONS */}
        <div className="bg-white border border-gray-200/60 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Need Help?</h2>
              <p className="text-sm text-gray-500">Contact our support team for assistance</p>
            </div>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              {(orderStatus === 'SHIPPED' || orderStatus === 'DELIVERED') && (
                <Button 
                  className="bg-[#DD2C6C] hover:bg-[#c4245f] text-white" 
                  size="sm" 
                  asChild
                >
                  <Link to={`/orders/track/${order.orderNumber}`}>
                    <Truck className="h-4 w-4 mr-2" />
                    Track Order
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="sm" className="border-gray-300" asChild>
                <a href={`mailto:support@thenailartistry.store?subject=Order ${order.orderNumber}`}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </a>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/products')}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reorder
              </Button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center pt-4">
          <Button variant="ghost" onClick={() => navigate('/profile/orders')} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModalProductId && (
        <ReviewFormModal
          productId={reviewModalProductId}
          isOpen={!!reviewModalProductId}
          onClose={() => setReviewModalProductId(null)}
          existingReview={userReviews.get(reviewModalProductId) || null}
          onSuccess={async () => {
            setReviewModalProductId(null);
            // Refresh user reviews
            try {
              const response = await reviewService.getMyReviews(1, 100);
              const reviewMap = new Map<string, Review>();
              response.data.forEach((review) => {
                const productId = typeof review.productId === 'string' ? review.productId : review.productId._id;
                reviewMap.set(productId, review);
              });
              setUserReviews(reviewMap);
            } catch (error) {
              console.error('Error refreshing reviews:', error);
            }
          }}
        />
      )}
    </div>
  );
}
