import { formatCurrency } from '@/shared/utils/formatCurrency';
import { Order } from '@/features/orders/services/order.service';

interface OrderPricingProps {
  order: Order;
}

export function OrderPricing({ order }: OrderPricingProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200/60 rounded-xl p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Price Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Items Total</span>
          <span className="font-medium text-gray-900">{formatCurrency(order.subTotal || 0)}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-base text-green-600">
            <span>Discount</span>
            <span className="font-medium">-{formatCurrency(order.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            {order.shippingFee === 0 ? 'Free' : formatCurrency(order.shippingFee || 0)}
          </span>
        </div>
        {order.tax > 0 && (
          <div className="flex justify-between text-base">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium text-gray-900">{formatCurrency(order.tax || 0)}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total Paid</span>
          <span className="text-3xl font-bold text-primary">
            {formatCurrency(order.grandTotal || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

