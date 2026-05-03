import { Calendar, Copy, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Order } from '@/features/orders/services/order.service';
import { statusConfig } from '../constants/order.constants';

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
    <div className="border-b border-white/10 pb-4 md:pb-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h1 className="text-lg md:text-2xl font-semibold text-white">Order #{order.orderNumber}</h1>
            <button
              onClick={onCopyOrderNumber}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white/40 hover:text-white/70 flex-shrink-0"
              title="Copy order number"
            >
              {copiedOrderNumber ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/40">
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

