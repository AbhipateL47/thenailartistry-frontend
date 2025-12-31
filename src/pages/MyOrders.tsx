import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, Calendar, DollarSign, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { formatCurrency } from '@/utils/formatCurrency';
import { format } from 'date-fns';
import { userService, Order } from '@/services/userService';
import { Skeleton } from '@/components/ui/skeleton';
import { usePageTitle } from '@/hooks/usePageTitle';
import { toast } from '@/utils/toast';
import { useAuth } from '@/contexts/AuthContext';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PAID':
      return 'bg-green-100 text-green-800';
    case 'SHIPPED':
      return 'bg-blue-100 text-blue-800';
    case 'DELIVERED':
      return 'bg-purple-100 text-purple-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    case 'REFUNDED':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'PLACED':
      return 'Placed';
    case 'PAID':
      return 'Paid';
    case 'SHIPPED':
      return 'Shipped';
    case 'DELIVERED':
      return 'Delivered';
    case 'CANCELLED':
      return 'Cancelled';
    case 'REFUNDED':
      return 'Refunded';
    default:
      return status;
  }
};

export default function MyOrders() {
  usePageTitle('My Orders');
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Log page load
  useEffect(() => {
    console.log('📄 My Orders Page Loaded');
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/');
      return;
    }

    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated, authLoading, navigate]);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const ordersData = await userService.getOrders();
      console.log('Orders loaded:', ordersData); // Debug log
      setOrders(ordersData);
    } catch (error: any) {
      console.error('Error loading orders:', error); // Debug log
      toast.error(error.response?.data?.message || 'Failed to load orders');
      setOrders([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'My Orders' }]} />
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <Breadcrumbs items={[{ label: 'My Orders' }]} />

      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-2 md:space-y-3">
          {orders.map((order) => (
            <div
              key={order.orderNumber}
              className="bg-white border border-gray-200/60 rounded-lg p-5 md:p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-pointer group"
              onClick={() => navigate(`/order-confirmation/${order.orderNumber}`)}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left: Order Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start md:items-center justify-between md:justify-start gap-3 md:gap-6 mb-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-lg md:text-xl text-gray-900 mb-1 break-words">
                        Order #{order.orderNumber}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {order.createdAt 
                              ? format(new Date(order.createdAt), 'MMM dd, yyyy')
                              : 'Date not available'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium text-gray-900">
                            {formatCurrency(order.grandTotal || order.totalAmount || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Badge - Prominent */}
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(
                          order.status
                        )} pointer-events-none`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="flex items-center gap-3">
                    {order.itemsPreview && order.itemsPreview.length > 0 ? (
                      <>
                        <div className="flex -space-x-2">
                          {order.itemsPreview.slice(0, 3).map((item, idx) => (
                            <img
                              key={idx}
                              src={item.image || '/placeholder-product.jpg'}
                              alt={item.title || 'Product'}
                              className="w-10 h-10 md:w-12 md:h-12 rounded-md border-2 border-white object-cover shadow-sm"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {order.itemCount || order.items?.length || 0} item
                          {(order.itemCount || order.items?.length || 0) !== 1 ? 's' : ''}
                        </span>
                      </>
                    ) : order.items && order.items.length > 0 ? (
                      <>
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item: any, idx: number) => (
                            <img
                              key={idx}
                              src={item.image || '/placeholder-product.jpg'}
                              alt={item.title || 'Product'}
                              className="w-10 h-10 md:w-12 md:h-12 rounded-md border-2 border-white object-cover shadow-sm"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* Right: Action Arrow */}
                <div className="flex-shrink-0 md:ml-4">
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

