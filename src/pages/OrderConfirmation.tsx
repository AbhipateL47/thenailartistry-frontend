import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { formatCurrency } from '@/utils/formatCurrency';
import { orderService, Order } from '@/services/orderService';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { usePageTitle } from '@/hooks/usePageTitle';
import { toast } from '@/utils/toast';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

export default function OrderConfirmation() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');

  // Log page load
  useEffect(() => {
    console.log(`📄 Order Confirmation Page Loaded - Order: ${orderNumber || 'N/A'}`);
  }, [orderNumber]);

  // Handle email submission for guest orders
  const handleEmailSubmit = async () => {
    if (orderNumber && email) {
      setIsLoading(true);
      try {
        const fetchedOrder = await orderService.getOrderByNumber(orderNumber, email);
        setOrder(fetchedOrder);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Order not found or email mismatch');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fetch order on page load if orderNumber is available
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderNumber) return;

      // Always fetch from API to get complete order details
      // location.state might only have orderNumber, not full details
      setIsLoading(true);
      try {
        // If user is authenticated, fetch without email
        // If not authenticated, we'll need email (handled in the UI below)
        if (isAuthenticated && user) {
          const fetchedOrder = await orderService.getOrderByNumber(orderNumber);
          setOrder(fetchedOrder);
        } else {
          // For guest users, try to get email from location.state or URL params
          const emailFromState = (location.state?.orderData as any)?.guestEmail;
          const urlParams = new URLSearchParams(window.location.search);
          const emailParam = urlParams.get('email') || emailFromState;
          
          if (emailParam) {
            const fetchedOrder = await orderService.getOrderByNumber(orderNumber, emailParam);
            setOrder(fetchedOrder);
          }
          // If no email, will show email input form below
        }
      } catch (error: any) {
        // If 403 or 404, user needs to provide email (for guest orders)
        if (error.response?.status === 403 || error.response?.status === 404) {
          // Will show email input form
          console.log('Order fetch failed, will show email input:', error.response?.data?.message);
        } else {
          toast.error(error.response?.data?.message || 'Failed to load order');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber, isAuthenticated, user]);

  // Get order data
  const orderData = order;

  // Update page title
  usePageTitle(orderData?.orderNumber ? `Order Confirmed - ${orderData.orderNumber}` : 'Order Confirmation');

  // Debug: Log order data to help diagnose issues
  useEffect(() => {
    if (orderData) {
      console.log('Order data loaded:', {
        orderNumber: orderData.orderNumber,
        hasItems: !!orderData.items?.length,
        hasShippingAddress: !!orderData.shippingAddress,
        status: orderData.status,
        fullOrder: orderData,
      });
    }
  }, [orderData]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!order && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-8">
          {!isAuthenticated 
            ? 'Please enter your email to view order details.'
            : 'Unable to load order details. Please try again.'}
        </p>
        {!isAuthenticated && (
          <div className="max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mb-4"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && email && orderNumber) {
                  handleEmailSubmit();
                }
              }}
            />
            <Button 
              onClick={handleEmailSubmit}
              disabled={!email || isLoading}
            >
              {isLoading ? 'Loading...' : 'View Order'}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <Breadcrumbs items={[{ label: 'Order Confirmation' }]} />

      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-6 md:mb-8">
          <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-green-500 mx-auto mb-3 md:mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-sm md:text-base text-muted-foreground px-4">
            Your order has been confirmed and will be processed shortly.
          </p>
        </div>

        {/* Order Number */}
        <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 md:p-6 mb-6 md:mb-8 text-center">
          <p className="text-xs md:text-sm text-muted-foreground mb-2">Order Number</p>
          <p className="text-xl md:text-3xl font-bold text-primary break-all">{orderData.orderNumber}</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-2">
            Order placed on {format(new Date(orderData.createdAt || Date.now()), 'MMMM dd, yyyy')}
          </p>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Shipping Address */}
          <div className="bg-white border rounded-lg p-4 md:p-6">
            <h2 className="text-base md:text-lg font-bold mb-3 md:mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 md:h-5 md:w-5" />
              Shipping Address
            </h2>
            {orderData.shippingAddress ? (
              <div className="text-sm space-y-1">
                <p className="font-medium">{orderData.shippingAddress.fullName || 'N/A'}</p>
                <p>{orderData.shippingAddress.addressLine1 || ''}</p>
                {orderData.shippingAddress.addressLine2 && (
                  <p>{orderData.shippingAddress.addressLine2}</p>
                )}
                <p>
                  {orderData.shippingAddress.city || ''}, {orderData.shippingAddress.state || ''}{' '}
                  {orderData.shippingAddress.postalCode || (orderData.shippingAddress as any).pincode || ''}
                </p>
                <p>{orderData.shippingAddress.country || 'India'}</p>
                {orderData.shippingAddress.phone && (
                  <p className="mt-3 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {orderData.shippingAddress.phone}
                  </p>
                )}
                {(orderData.shippingAddress.email || orderData.guestEmail) && (
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {orderData.shippingAddress.email || orderData.guestEmail}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Shipping address not available</p>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white border rounded-lg p-4 md:p-6">
            <h2 className="text-base md:text-lg font-bold mb-3 md:mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 md:h-5 md:w-5" />
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(orderData.subTotal || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {orderData.shippingFee === 0 ? 'Free' : formatCurrency(orderData.shippingFee || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatCurrency(orderData.tax || 0)}</span>
              </div>
              {orderData.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(orderData.discount)}</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(orderData.grandTotal || 0)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
              <p className="font-medium capitalize">
                {orderData.payment?.method === 'cod' 
                  ? 'Cash on Delivery' 
                  : orderData.payment?.method === 'upi'
                  ? 'UPI'
                  : orderData.payment?.method === 'card'
                  ? 'Card'
                  : orderData.payment?.method === 'netbanking'
                  ? 'Net Banking'
                  : orderData.payment?.method || 'N/A'}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Payment Status: <span className="font-medium capitalize text-green-600">
                  {orderData.payment?.status === 'paid' ? 'Paid' : orderData.payment?.status || orderData.status}
                </span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Order Status: <span className="font-medium">{orderData.status || 'PAID'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border rounded-lg p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="text-base md:text-lg font-bold mb-3 md:mb-4">Order Items</h2>
          {orderData.items && orderData.items.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {orderData.items.map((item: any, index: number) => (
                <div key={item.productId || index} className="flex gap-3 md:gap-4 pb-3 md:pb-4 border-b last:border-0">
                  <img
                    src={item.image || '/placeholder-product.jpg'}
                    alt={item.title || 'Product'}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-md object-cover flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm md:text-base mb-1 break-words">{item.title || 'Product'}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">
                      Quantity: {item.qty || item.quantity || 1} × {formatCurrency(item.unitPrice || item.price || 0)}
                    </p>
                    <p className="font-semibold text-sm md:text-base">
                      {formatCurrency(item.totalPrice || ((item.unitPrice || item.price || 0) * (item.qty || item.quantity || 1)))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs md:text-sm text-muted-foreground">No items found in this order.</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
          <Button asChild>
            <Link to={`/orders/track/${orderData.orderNumber}`}>Track Order</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

