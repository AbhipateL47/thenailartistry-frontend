import { Link } from 'react-router-dom';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { Order } from '@/features/orders/services/order.service';

interface OrderItemsProps {
  order: Order;
}

export function OrderItems({ order }: OrderItemsProps) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-4 md:p-8">
      <h2 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6">Items Purchased</h2>
      {order.items && order.items.length > 0 ? (
        <div className="space-y-4 md:space-y-6">
          {order.items.map((item: any, index: number) => {
            const productId = item.productId;

            return (
              <div key={item.productId || index} className={`flex gap-3 md:gap-5 ${index < order.items.length - 1 ? 'pb-4 md:pb-6 border-b border-white/10' : ''}`}>
                <Link
                  to={`/products/${productId}`}
                  target="_blank"
                  className="flex-shrink-0"
                >
                  <img
                    src={item.image || '/placeholder-product.jpg'}
                    alt={item.title || 'Product'}
                    className="w-20 h-20 md:w-28 md:h-28 rounded-lg object-cover hover:opacity-90 transition-opacity shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                    }}
                  />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/products/${productId}`}
                      target="_blank"
                      className="font-semibold text-base md:text-lg text-white hover:text-[#DD2C6C] transition-colors block mb-1"
                    >
                      {item.title || 'Product'}
                    </Link>
                    {item.variantSku && (
                      <p className="text-sm text-white/50 mb-3">
                        {item.variantSku}
                      </p>
                    )}
                    <p className="text-sm text-white/50">
                      Quantity: {item.qty || item.quantity || 1} × {formatCurrency(item.unitPrice || item.price || 0)}
                    </p>
                  </div>
                  <p className="font-semibold text-lg text-white mt-2">
                    {formatCurrency(item.totalPrice || ((item.unitPrice || item.price || 0) * (item.qty || item.quantity || 1)))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-white/50">No items found in this order.</p>
      )}
    </div>
  );
}

