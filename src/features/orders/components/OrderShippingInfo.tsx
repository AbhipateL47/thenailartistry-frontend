import { MapPin } from 'lucide-react';
import { Order } from '@/features/orders/services/order.service';

interface OrderShippingInfoProps {
  order: Order;
}

export function OrderShippingInfo({ order }: OrderShippingInfoProps) {
  if (!order.shippingAddress) return null;

  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-4 md:p-6">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-white/50" />
        Shipping Address
      </h2>
      <div className="text-sm space-y-2 text-white/70">
        <p className="font-semibold text-base text-white">{order.shippingAddress.fullName || 'N/A'}</p>
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
          <p className="mt-4 text-white/50">
            {order.shippingAddress.phone}
          </p>
        )}
        {(order.shippingAddress.email || order.guestEmail) && (
          <p className="text-white/40">
            {order.shippingAddress.email || order.guestEmail}
          </p>
        )}
      </div>
    </div>
  );
}

