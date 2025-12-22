import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userService, Order } from '@/services/userService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/formatCurrency';
import { Package, Calendar, MapPin, Truck, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
          const status = statusConfig[order.status] || statusConfig.pending;
          const StatusIcon = status.icon;

          return (
            <div
              key={order._id}
              onClick={() => setSelectedOrder(order)}
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
                    {format(new Date(order.createdAt), 'MMM dd, yyyy • hh:mm a')}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#DD2C6C]">
                    {formatCurrency(order.totalAmount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="flex -space-x-3">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-lg border-2 border-white bg-gray-100 overflow-hidden"
                    >
                      <img
                        src={item.product?.images?.[0] || '/placeholder.svg'}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-12 h-12 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex-1 text-sm text-gray-500 truncate">
                  {order.items.map(i => i.product?.name).join(', ')}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#DD2C6C] transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Order #{selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6 mt-4">
              {/* Status & Date */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">
                    {format(new Date(selectedOrder.createdAt), 'MMMM dd, yyyy')}
                  </span>
                </div>
                <Badge className={`${statusConfig[selectedOrder.status]?.color} border`}>
                  {statusConfig[selectedOrder.status]?.label}
                </Badge>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-gray-50">
                      <img
                        src={item.product?.images?.[0] || '/placeholder.svg'}
                        alt={item.product?.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.product?.name}</p>
                        {item.variant && (
                          <p className="text-sm text-gray-500">Variant: {item.variant}</p>
                        )}
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              {selectedOrder.shippingAddress && (
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#DD2C6C] mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Shipping Address</p>
                      <p className="text-gray-600 text-sm">
                        {selectedOrder.shippingAddress.name}<br />
                        {selectedOrder.shippingAddress.line1}
                        {selectedOrder.shippingAddress.line2 && `, ${selectedOrder.shippingAddress.line2}`}<br />
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tracking */}
              {selectedOrder.trackingNumber && (
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-900">Tracking Number</p>
                      <p className="text-purple-700">{selectedOrder.trackingNumber}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-900">Total Amount</p>
                  <p className="text-2xl font-bold text-[#DD2C6C]">
                    {formatCurrency(selectedOrder.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

