import { Calendar, Copy, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Order } from '@/services/orderService';
import { statusConfig } from './orderConstants';

interface OrderHeaderProps {
  order: Order;
  copiedOrderNumber: boolean;
  onCopyOrderNumber: () => void;
}

export function OrderHeader({ order, copiedOrderNumber, onCopyOrderNumber }: OrderHeaderProps) {
  const orderStatus = order.status?.toUpperCase() || 'PLACED';
  const statusInfo = statusConfig[orderStatus] || statusConfig.PLACED;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="bg-white border-b border-gray-200 pb-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Order #{order.orderNumber}</h1>
            <button
              onClick={onCopyOrderNumber}
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
  );
}

