import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/formatCurrency';
import { Package, Calendar, Clock, CheckCircle2, XCircle, ChevronRight, Truck } from 'lucide-react';
import { format } from 'date-fns';

const statusConfig = {
  pending: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock, label: 'Pending' },
  confirmed: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle2, label: 'Confirmed' },
  processing: { color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: Package, label: 'Processing' },
  shipped: { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Truck, label: 'Shipped' },
  delivered: { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2, label: 'Delivered' },
  cancelled: { color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle, label: 'Cancelled' },
};

export const ProfileOrders = () => {
  const navigate = useNavigate();

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['user-orders'],
    queryFn: userService.getOrders,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 mb-6" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-16 h-16 mx-auto text-red-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load orders</h3>
        <p className="text-gray-500">Please try again later</p>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#DD2C6C]/10 to-[#DD2C6C]/5 rounded-full flex items-center justify-center">
          <Package className="w-12 h-12 text-[#DD2C6C]" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
        <Button asChild className="bg-[#DD2C6C] hover:bg-[#c4245f]">
          <a href="/products">Browse Products</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
        <Badge variant="secondary" className="text-sm">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </Badge>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const status = statusConfig[order.status?.toLowerCase()] || statusConfig.pending;
          const StatusIcon = status.icon;
          const items = order.itemsPreview || order.items || [];
          const itemCount = order.itemCount || items.length;

          return (
            <div
              key={order.orderNumber || order._id}
              onClick={() => navigate(`/profile/orders/${order.orderNumber}`)}
              className="group p-5 rounded-2xl border border-gray-200 hover:border-[#DD2C6C]/30 hover:shadow-lg transition-all cursor-pointer bg-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-gray-900">#{order.orderNumber}</p>
                    <Badge className={`${status.color} border`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Calendar className="w-4 h-4" />
                    {order.createdAt 
                      ? format(new Date(order.createdAt), 'MMM dd, yyyy • hh:mm a')
                      : 'Date not available'}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#DD2C6C]">
                    {formatCurrency(order.grandTotal || order.totalAmount || 0)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              {/* Order Items Preview */}
              {items.length > 0 && (
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="flex -space-x-3">
                    {items.slice(0, 3).map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="w-12 h-12 rounded-lg border-2 border-white bg-gray-100 overflow-hidden"
                      >
                        <img
                          src={item.image || item.product?.images?.[0] || '/placeholder.svg'}
                          alt={item.title || item.product?.name || 'Product'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                      </div>
                    ))}
                    {itemCount > 3 && (
                      <div className="w-12 h-12 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                        +{itemCount - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-sm text-gray-500 truncate">
                    {items.map((i: any) => i.title || i.product?.name || 'Product').join(', ')}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#DD2C6C] transition-colors" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

