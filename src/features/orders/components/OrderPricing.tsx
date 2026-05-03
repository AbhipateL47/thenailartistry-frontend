import { formatCurrency } from '@/shared/utils/formatCurrency';
import { Order } from '@/features/orders/services/order.service';

interface OrderPricingProps {
  order: Order;
}

export function OrderPricing({ order }: OrderPricingProps) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-4 md:p-8">
      <h2 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6">Price Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-base">
          <span className="text-white/60">Items Total</span>
          <span className="font-medium text-white">{formatCurrency(order.subTotal || 0)}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-base text-green-400">
            <span>Discount</span>
            <span className="font-medium">-{formatCurrency(order.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-base">
          <span className="text-white/60">Shipping</span>
          <span className="font-medium text-white">
            {order.shippingFee === 0 ? 'Free' : formatCurrency(order.shippingFee || 0)}
          </span>
        </div>
        {order.tax > 0 && (
          <div className="flex justify-between text-base">
            <span className="text-white/60">Tax</span>
            <span className="font-medium text-white">{formatCurrency(order.tax || 0)}</span>
          </div>
        )}
        <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Total Paid</span>
          <span className="text-2xl md:text-3xl font-bold text-primary">
            {formatCurrency(order.grandTotal || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

