import { CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { Order } from '@/features/orders/services/order.service';

interface OrderPaymentInfoProps {
  order: Order;
  getPaymentMethodLabel: (method?: string) => string;
  getPaymentStatusColor: (status?: string) => string;
}

export function OrderPaymentInfo({ order, getPaymentMethodLabel, getPaymentStatusColor }: OrderPaymentInfoProps) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-4 md:p-6">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-white/50" />
        Payment Information
      </h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-white/60">Payment Method</span>
          <span className="font-medium text-white">{getPaymentMethodLabel(order.payment?.method)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Payment Status</span>
          <span className={`font-medium ${getPaymentStatusColor(order.payment?.status)}`}>
            {order.payment?.status?.toUpperCase() || order.status}
          </span>
        </div>
        {(order as any).paidAt && (
          <div className="flex justify-between">
            <span className="text-white/60">Payment Date</span>
            <span className="font-medium text-white">
              {format(new Date((order as any).paidAt), 'MMM dd, yyyy')}
            </span>
          </div>
        )}
        {order.payment?.status === 'failed' && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-400">
              Payment failed. Please contact support if you believe this is an error.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

