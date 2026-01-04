import { Clock, CheckCircle2, Truck, CheckCircle, XCircle } from 'lucide-react';

export const statusConfig: Record<string, { color: string; label: string; icon: any }> = {
  PLACED: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Placed', icon: Clock },
  PAID: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Paid', icon: CheckCircle2 },
  SHIPPED: { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Shipped', icon: Truck },
  DELIVERED: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Delivered', icon: CheckCircle },
  CANCELLED: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Cancelled', icon: XCircle },
  REFUNDED: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Refunded', icon: XCircle },
};

export const timelineSteps = [
  { key: 'PLACED', label: 'Order Placed', icon: Clock },
  { key: 'PAID', label: 'Payment Confirmed', icon: CheckCircle2 },
  { key: 'SHIPPED', label: 'Shipped', icon: Truck },
  { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
];

