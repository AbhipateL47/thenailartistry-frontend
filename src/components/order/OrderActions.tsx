import { Link } from 'react-router-dom';
import { X, Truck, MessageCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Order } from '@/services/orderService';

interface OrderActionsProps {
  order: Order;
  orderStatus: string;
  canCancel: boolean;
  isCancelling: boolean;
  onCancelClick: () => void;
}

export function OrderActions({ order, orderStatus, canCancel, isCancelling, onCancelClick }: OrderActionsProps) {
  return (
    <div className="bg-white border border-gray-200/60 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Need Help?</h2>
          <p className="text-sm text-gray-500">Contact our support team for assistance</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          {canCancel && (
            <Button 
              variant="outline" 
              size="sm" 
              className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={onCancelClick}
              disabled={isCancelling}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel Order
            </Button>
          )}
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
          <Button variant="ghost" size="sm" asChild>
            <Link to="/products">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reorder
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

