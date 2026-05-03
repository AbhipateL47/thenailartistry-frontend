import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService, Order } from '@/features/profile/services/user.service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { Package, Calendar, Clock, CheckCircle2, XCircle, ChevronRight, Truck, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/shared/utils/toast';

const statusConfig = {
  pending: { color: 'bg-amber-500/10 text-amber-400 border-amber-500/30', icon: Clock, label: 'Pending' },
  confirmed: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/30', icon: CheckCircle2, label: 'Confirmed' },
  processing: { color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30', icon: Package, label: 'Processing' },
  shipped: { color: 'bg-purple-500/10 text-purple-400 border-purple-500/30', icon: Truck, label: 'Shipped' },
  delivered: { color: 'bg-green-500/10 text-green-400 border-green-500/30', icon: CheckCircle2, label: 'Delivered' },
  cancelled: { color: 'bg-red-500/10 text-red-400 border-red-500/30', icon: XCircle, label: 'Cancelled' },
};

export const ProfileOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);

  const loadOrders = async (page: number = 1, append: boolean = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await userService.getOrders(page, 5);
      
      if (append) {
        setOrders(prev => [...prev, ...response.data]);
      } else {
        setOrders(response.data);
      }
      
      setCurrentPage(response.pagination.page);
      setHasMore(response.pagination.hasMore);
      setTotalOrders(response.pagination.total);
    } catch (error: any) {
      console.error('Error loading orders:', error);
      toast.error(error.response?.data?.message || 'Failed to load orders');
      if (!append) {
        setOrders([]);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      loadOrders(currentPage + 1, true);
    }
  };

  useEffect(() => {
    loadOrders(1, false);
  }, []);

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


  if (!orders?.length) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#DD2C6C]/10 to-[#DD2C6C]/5 rounded-full flex items-center justify-center">
          <Package className="w-12 h-12 text-[#DD2C6C]" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
        <p className="text-white/50 mb-6">Start shopping to see your orders here</p>
        <Button asChild className="bg-[#DD2C6C] hover:bg-[#c4245f]">
          <a href="/products">Browse Products</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">My Orders</h2>
        <Badge variant="secondary" className="text-sm">
          {totalOrders || orders.length} {(totalOrders || orders.length) === 1 ? 'order' : 'orders'}
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
              className="group p-4 md:p-5 rounded-2xl border border-white/10 hover:border-[#DD2C6C]/30 hover:shadow-lg transition-all cursor-pointer bg-[#0D0D0D]"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <p className="font-semibold text-white text-sm">#{order.orderNumber}</p>
                    <Badge className={`${status.color} border text-xs`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    <span>
                      {order.createdAt
                        ? format(new Date(order.createdAt), 'MMM dd, yyyy')
                        : 'Date not available'}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-[#DD2C6C]">
                    {formatCurrency(order.grandTotal || order.totalAmount || 0)}
                  </p>
                  <p className="text-xs text-white/40">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              {/* Order Items Preview */}
              {items.length > 0 && (
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="flex -space-x-3">
                    {items.slice(0, 3).map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="w-12 h-12 rounded-lg border-2 border-[#111111] bg-white/10 overflow-hidden"
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
                      <div className="w-12 h-12 rounded-lg border-2 border-[#111111] bg-white/10 flex items-center justify-center text-sm font-medium text-white/60">
                        +{itemCount - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-sm text-white/50 truncate">
                    {items.map((i: any) => i.title || i.product?.name || 'Product').join(', ')}
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-[#DD2C6C] transition-colors" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-6 pb-4">
          <Button
            onClick={loadMore}
            disabled={isLoadingMore}
            variant="outline"
            className="min-w-[120px]"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

