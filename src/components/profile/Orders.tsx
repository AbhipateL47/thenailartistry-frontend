import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userService, Order } from '@/services/userService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/formatCurrency';
import { Package, Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  processing: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  shipped: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  delivered: 'bg-green-500/10 text-green-600 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
};

export const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: userService.getOrders,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-lg border">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
        <p className="text-muted-foreground">Start shopping to see your orders here</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 animate-fade-in">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedOrder(order)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <p className="font-semibold text-foreground">Order #{order.id}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(order.date), 'MMM dd, yyyy')}
                </div>
              </div>
              <Badge className={statusColors[order.status]} variant="outline">
                {order.status.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
              </p>
              <p className="font-bold text-primary">{formatCurrency(order.total)}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details - #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(selectedOrder.date), 'MMMM dd, yyyy')}
                </div>
                <Badge className={statusColors[selectedOrder.status]} variant="outline">
                  {selectedOrder.status.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Items</h4>
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-lg bg-muted/50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-muted/50">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Delivery Address</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(selectedOrder.total)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
