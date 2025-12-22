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

export default function OrderConfirmation() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(location.state?.orderData ? null : null);
  const [isLoading, setIsLoading] = useState(!location.state?.orderData);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (location.state?.orderData) {
      // Order data passed from checkout
      setOrder(location.state.orderData as any);
      setIsLoading(false);
    } else if (orderNumber) {
      // Fetch order by number (for direct access)
      // Note: This would require email verification
      // For now, we'll just show a message
    }
  }, [orderNumber, location.state]);

  // Get order data (from state or location)
  const orderData = order || (location.state?.orderData as any);

  // Update page title
  usePageTitle(orderData?.orderNumber ? `Order Confirmed - ${orderData.orderNumber}` : 'Order Confirmation');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!order && !location.state?.orderData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Please enter your email to view order details.
        </p>
        <div className="max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <Button onClick={() => {
            if (orderNumber && email) {
              orderService.getOrderByNumber(orderNumber, email)
                .then(setOrder)
                .catch(() => {
                  alert('Order not found or email mismatch');
                });
            }
          }}>
            View Order
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Order Confirmation' }]} />

      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground">
            Your order has been confirmed and will be processed shortly.
          </p>
        </div>

        {/* Order Number */}
        <div className="bg-primary/10 border-2 border-primary rounded-lg p-6 mb-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">Order Number</p>
          <p className="text-3xl font-bold text-primary">{orderData.orderNumber}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Order placed on {format(new Date(orderData.createdAt || Date.now()), 'MMMM dd, yyyy')}
          </p>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Shipping Address */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Address
            </h2>
            <div className="text-sm space-y-1">
              <p className="font-medium">{orderData.shippingAddress?.fullName}</p>
              <p>{orderData.shippingAddress?.addressLine1}</p>
              {orderData.shippingAddress?.addressLine2 && (
                <p>{orderData.shippingAddress.addressLine2}</p>
              )}
              <p>
                {orderData.shippingAddress?.city}, {orderData.shippingAddress?.state}{' '}
                {orderData.shippingAddress?.postalCode}
              </p>
              <p>{orderData.shippingAddress?.country}</p>
              <p className="mt-3 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {orderData.shippingAddress?.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {orderData.shippingAddress?.email || orderData.guestEmail}
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5" />
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
                {orderData.payment?.method === 'cod' ? 'Cash on Delivery' : orderData.payment?.method}
              </p>
              <p className="text-sm text-muted-foreground mt-2">Status: {orderData.status}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Order Items</h2>
          <div className="space-y-4">
            {orderData.items?.map((item: any, index: number) => (
              <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.qty} × {formatCurrency(item.unitPrice)}
                  </p>
                </div>
                <p className="font-semibold">{formatCurrency(item.totalPrice)}</p>
              </div>
            ))}
          </div>
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

