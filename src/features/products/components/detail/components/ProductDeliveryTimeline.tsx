import { Package, Truck, ShieldCheck } from 'lucide-react';
import { format, addDays } from 'date-fns';

export const ProductDeliveryTimeline = () => {
  const today = new Date();
  const orderConfirmed = addDays(today, 0);
  const shipped = addDays(today, 1);
  const delivered = addDays(today, 7);

  return (
    <div className="border-t pt-4 space-y-3">
      <div className="flex items-center gap-3 text-sm">
        <Package className="h-5 w-5 text-muted-foreground" />
        <span>Order Confirmed - {format(orderConfirmed, 'do MMM')}</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Truck className="h-5 w-5 text-muted-foreground" />
        <span>Shipped - {format(shipped, 'do MMM')}</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
        <span>At Your Doorstep - {format(delivered, 'do MMM')}</span>
      </div>
    </div>
  );
};

