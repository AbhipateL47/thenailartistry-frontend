import { Package, Truck, ShieldCheck } from 'lucide-react';
import { format, addDays } from 'date-fns';

export const ProductDeliveryTimeline = () => {
  const today = new Date();
  const orderConfirmed = addDays(today, 0);
  const shipped = addDays(today, 1);
  const delivered = addDays(today, 7);

  return (
    <div className="border-t border-white/10 pt-4 space-y-3">
      <div className="flex items-center gap-3 text-sm text-white/50">
        <Package className="h-5 w-5 text-[#DD2C6C]/70 flex-shrink-0" />
        <span>Order Confirmed - {format(orderConfirmed, 'do MMM')}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-white/50">
        <Truck className="h-5 w-5 text-[#DD2C6C]/70 flex-shrink-0" />
        <span>Shipped - {format(shipped, 'do MMM')}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-white/50">
        <ShieldCheck className="h-5 w-5 text-[#DD2C6C]/70 flex-shrink-0" />
        <span>At Your Doorstep - {format(delivered, 'do MMM')}</span>
      </div>
    </div>
  );
};
