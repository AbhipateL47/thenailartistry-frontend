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
    <div className="bg-white border border-gray-200/60 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-gray-500" />
        Payment Information
      </h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Payment Method</span>
          <span className="font-medium text-gray-900">{getPaymentMethodLabel(order.payment?.method)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Payment Status</span>
          <span className={`font-medium ${getPaymentStatusColor(order.payment?.status)}`}>
            {order.payment?.status?.toUpperCase() || order.status}
          </span>
        </div>
        {(order as any).paidAt && (
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Date</span>
            <span className="font-medium text-gray-900">
              {format(new Date((order as any).paidAt), 'MMM dd, yyyy')}
            </span>
          </div>
        )}
        {order.payment?.status === 'failed' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              Payment failed. Please contact support if you believe this is an error.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

