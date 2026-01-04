import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils/formatCurrency';
import { Order } from '@/services/orderService';

interface OrderItemsProps {
  order: Order;
}

export function OrderItems({ order }: OrderItemsProps) {
  return (
    <div className="bg-white border border-gray-200/60 rounded-xl p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Items Purchased</h2>
      {order.items && order.items.length > 0 ? (
        <div className="space-y-6">
          {order.items.map((item: any, index: number) => {
            const productId = item.productId;

            return (
              <div key={item.productId || index} className={`flex gap-5 ${index < order.items.length - 1 ? 'pb-6 border-b border-gray-100' : ''}`}>
                <Link
                  to={`/products/${productId}`}
                  target="_blank"
                  className="flex-shrink-0"
                >
                  <img
                    src={item.image || '/placeholder-product.jpg'}
                    alt={item.title || 'Product'}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover hover:opacity-90 transition-opacity shadow-sm"
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
                      className="font-semibold text-lg text-gray-900 hover:text-primary transition-colors block mb-1.5"
                    >
                      {item.title || 'Product'}
                    </Link>
                    {item.variantSku && (
                      <p className="text-sm text-gray-500 mb-3">
                        {item.variantSku}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Quantity: {item.qty || item.quantity || 1} × {formatCurrency(item.unitPrice || item.price || 0)}
                    </p>
                  </div>
                  <p className="font-semibold text-lg text-gray-900 mt-2">
                    {formatCurrency(item.totalPrice || ((item.unitPrice || item.price || 0) * (item.qty || item.quantity || 1)))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No items found in this order.</p>
      )}
    </div>
  );
}

