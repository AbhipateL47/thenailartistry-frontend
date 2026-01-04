import { MapPin } from 'lucide-react';
import { Order } from '@/services/orderService';

interface OrderShippingInfoProps {
  order: Order;
}

export function OrderShippingInfo({ order }: OrderShippingInfoProps) {
  if (!order.shippingAddress) return null;

  return (
    <div className="bg-white border border-gray-200/60 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-gray-500" />
        Shipping Address
      </h2>
      <div className="text-sm space-y-2 text-gray-700">
        <p className="font-semibold text-base text-gray-900">{order.shippingAddress.fullName || 'N/A'}</p>
        <p>{order.shippingAddress.addressLine1 || ''}</p>
        {order.shippingAddress.addressLine2 && (
          <p>{order.shippingAddress.addressLine2}</p>
        )}
        <p>
          {order.shippingAddress.city || ''}, {order.shippingAddress.state || ''}{' '}
          {order.shippingAddress.postalCode || (order.shippingAddress as any).pincode || ''}
        </p>
        <p>{order.shippingAddress.country || 'India'}</p>
        {order.shippingAddress.phone && (
          <p className="mt-4 text-gray-600">
            {order.shippingAddress.phone}
          </p>
        )}
        {(order.shippingAddress.email || order.guestEmail) && (
          <p className="text-gray-600">
            {order.shippingAddress.email || order.guestEmail}
          </p>
        )}
      </div>
    </div>
  );
}

