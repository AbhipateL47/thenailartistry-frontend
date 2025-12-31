import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Clock, XCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { formatCurrency } from '@/utils/formatCurrency';
import { orderService } from '@/services/orderService';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { usePageTitle } from '@/hooks/usePageTitle';
import { toast } from '@/utils/toast';
import { useQuery } from '@tanstack/react-query';

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Clock },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
];

const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function TrackOrder() {
  const { orderNumber: paramOrderNumber } = useParams<{ orderNumber: string }>();
  const [orderNumber, setOrderNumber] = useState(paramOrderNumber || '');
  const [email, setEmail] = useState('');
  const [trackingOrderNumber, setTrackingOrderNumber] = useState(paramOrderNumber || '');

  usePageTitle(trackingOrderNumber ? `Track Order - ${trackingOrderNumber}` : 'Track Your Order');

  // Fetch order details
  const { data: order, isLoading: isLoadingOrder, error: orderError } = useQuery({
    queryKey: ['order', trackingOrderNumber, email],
    queryFn: () => orderService.getOrderByNumber(trackingOrderNumber, email || undefined),
    enabled: !!trackingOrderNumber && (!!email || !paramOrderNumber),
    retry: false,
  });

  // Fetch tracking info
  const { data: trackInfo, isLoading: isLoadingTrack } = useQuery({
    queryKey: ['track-order', trackingOrderNumber],
    queryFn: () => orderService.trackOrder(trackingOrderNumber),
    enabled: !!trackingOrderNumber,
    retry: false,
  });

  const handleTrack = () => {
    if (!orderNumber.trim()) {
      toast.error('Please enter an order number');
      return;
    }
    setTrackingOrderNumber(orderNumber.trim());
  };

  const currentStatusIndex = order?.status ? statusOrder.indexOf(order.status) : -1;

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <Breadcrumbs items={[{ label: 'Track Order' }]} />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Track Your Order</h1>

        {/* Order Lookup Form */}
        {!paramOrderNumber && (
          <div className="bg-white border rounded-lg p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Enter Order Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input
                  id="orderNumber"
                  placeholder="NAIL-20240101-1234"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email (for guest orders)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Required if you placed the order as a guest
                </p>
              </div>
              <Button onClick={handleTrack} className="w-full">
                Track Order
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {(isLoadingOrder || isLoadingTrack) && (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        )}

        {/* Error State */}
        {orderError && trackingOrderNumber && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">Order Not Found</h3>
            <p className="text-red-700 mb-4">
              {orderError instanceof Error ? orderError.message : 'Could not find order with the provided details.'}
            </p>
            {!paramOrderNumber && (
              <Button variant="outline" onClick={() => {
                setTrackingOrderNumber('');
                setOrderNumber('');
                setEmail('');
              }}>
                Try Again
              </Button>
            )}
          </div>
        )}

        {/* Order Tracking Info */}
        {trackInfo && !orderError && (
          <div className="bg-white border rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Order {trackInfo.orderNumber}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Placed on {format(new Date(trackInfo.createdAt), 'MMMM dd, yyyy')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold">{formatCurrency(trackInfo.grandTotal)}</p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-6">
                {statusSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const stepIndex = statusOrder.indexOf(step.key);
                  const isActive = stepIndex <= currentStatusIndex && currentStatusIndex >= 0;
                  const isCurrent = stepIndex === currentStatusIndex;

                  return (
                    <div key={step.key} className="relative flex items-start gap-4">
                      <div
                        className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                          isActive
                            ? isCurrent
                              ? 'bg-primary text-white'
                              : 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <StepIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 pt-1">
                        <p
                          className={`font-semibold ${
                            isActive ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        >
                          {step.label}
                        </p>
                        {isCurrent && (
                          <p className="text-sm text-primary mt-1">Current Status</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Full Order Details */}
        {order && !orderError && (
          <div className="space-y-6">
            {/* Order Items */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items?.map((item: any, index: number) => (
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

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </h2>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && (
                    <p>{order.shippingAddress.addressLine2}</p>
                  )}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
              {order.orderNumber && (
                <Button asChild>
                  <Link to={`/order-confirmation/${order.orderNumber}`}>View Order Details</Link>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* No Order Number Entered */}
        {!trackingOrderNumber && !paramOrderNumber && (
          <div className="bg-muted/30 border rounded-lg p-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Enter Order Number to Track</h3>
            <p className="text-muted-foreground">
              Use the form above to track your order status
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

