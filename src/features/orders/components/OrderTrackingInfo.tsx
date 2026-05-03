import { Truck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Order } from '@/features/orders/services/order.service';

interface OrderTrackingInfoProps {
  order: Order;
  orderStatus: string;
  isCancelled: boolean;
}

export function OrderTrackingInfo({ order, orderStatus, isCancelled }: OrderTrackingInfoProps) {
  const showShippedTracking = !isCancelled && orderStatus === 'SHIPPED' && order.tracking;
  const showDeliveredTracking = !isCancelled && orderStatus === 'DELIVERED' && order.tracking;

  if (!showShippedTracking && !showDeliveredTracking) return null;

  const TrackingBlock = ({ showDelivered }: { showDelivered: boolean }) => (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-4 md:p-8">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Truck className="h-5 w-5 text-white/50" />
        Tracking Information
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/60">Courier</span>
          <span className="text-sm font-medium text-white">{order.tracking!.courier}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/60">Tracking ID</span>
          <span className="font-mono text-sm font-semibold text-white">{order.tracking!.trackingId}</span>
        </div>
        {order.tracking!.trackingUrl ? (
          <div className="pt-2">
            <Button
              className="bg-primary hover:bg-primary-hover text-white"
              size="sm"
              asChild
            >
              <a href={order.tracking!.trackingUrl} target="_blank" rel="noopener noreferrer">
                Track Shipment <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        ) : (
          <div className="pt-2">
            <Button
              className="bg-white/10 text-white/40 cursor-not-allowed"
              size="sm"
              disabled
            >
              Track Shipment <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
            <p className="text-xs text-white/40 mt-2">Tracking link not available</p>
          </div>
        )}
        {showDelivered && order.deliveredAt && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-sm font-medium text-green-400">
              ✓ Delivered on {format(new Date(order.deliveredAt), 'MMMM dd, yyyy')}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {showShippedTracking && <TrackingBlock showDelivered={false} />}
      {showDeliveredTracking && <TrackingBlock showDelivered={true} />}
    </>
  );
}
