import { Truck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Order } from '@/services/orderService';

interface OrderTrackingInfoProps {
  order: Order;
  orderStatus: string;
  isCancelled: boolean;
}

export function OrderTrackingInfo({ order, orderStatus, isCancelled }: OrderTrackingInfoProps) {
  // Show tracking section ONLY if status is SHIPPED and tracking exists, OR status is DELIVERED and tracking exists
  const showShippedTracking = !isCancelled && orderStatus === 'SHIPPED' && order.tracking;
  const showDeliveredTracking = !isCancelled && orderStatus === 'DELIVERED' && order.tracking;

  if (!showShippedTracking && !showDeliveredTracking) return null;

  return (
    <>
      {showShippedTracking && (
        <div className="bg-white border border-gray-200/60 rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5 text-gray-500" />
            Tracking Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Courier</span>
              <span className="text-sm font-medium text-gray-900">{order.tracking!.courier}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tracking ID</span>
              <span className="font-mono text-sm font-semibold text-gray-900">{order.tracking!.trackingId}</span>
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
                  className="bg-gray-300 text-gray-600 cursor-not-allowed" 
                  size="sm"
                  disabled
                >
                  Track Shipment <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                <p className="text-xs text-gray-500 mt-2">Tracking link not available</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showDeliveredTracking && (
        <div className="bg-white border border-gray-200/60 rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5 text-gray-500" />
            Tracking Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Courier</span>
              <span className="text-sm font-medium text-gray-900">{order.tracking!.courier}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tracking ID</span>
              <span className="font-mono text-sm font-semibold text-gray-900">{order.tracking!.trackingId}</span>
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
                  className="bg-gray-300 text-gray-600 cursor-not-allowed" 
                  size="sm"
                  disabled
                >
                  Track Shipment <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                <p className="text-xs text-gray-500 mt-2">Tracking link not available</p>
              </div>
            )}
            {order.deliveredAt && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">
                  ✓ Delivered on {format(new Date(order.deliveredAt), 'MMMM dd, yyyy')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

