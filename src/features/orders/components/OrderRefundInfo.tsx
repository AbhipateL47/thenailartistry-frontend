import { RotateCcw, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/features/orders/services/order.service';

interface OrderRefundInfoProps {
  order: Order;
  orderStatus: string;
}

export function OrderRefundInfo({ order, orderStatus }: OrderRefundInfoProps) {
  if (orderStatus !== 'CANCELLED' || !order.refundStatus) return null;

  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-4 md:p-8">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <RotateCcw className="h-5 w-5 text-white/50" />
        Refund Information
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">Refund Status</span>
          <Badge 
            variant="outline" 
            className={`${
              order.refundStatus === 'PENDING'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : order.refundStatus === 'PROCESSING'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : order.refundStatus === 'COMPLETED'
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {order.refundStatus === 'PENDING' && 'Refund pending'}
            {order.refundStatus === 'PROCESSING' && 'Refund is being processed'}
            {order.refundStatus === 'COMPLETED' && 'Refund completed'}
            {order.refundStatus === 'FAILED' && 'Refund failed'}
          </Badge>
        </div>
        <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-white/60">
              Refunds may take 5–7 business days to reflect in your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

