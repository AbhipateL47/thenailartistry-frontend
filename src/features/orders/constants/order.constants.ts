import { Clock, CheckCircle2, Truck, CheckCircle, XCircle } from 'lucide-react';

export const statusConfig: Record<string, { color: string; label: string; icon: any }> = {
  PLACED: { color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', label: 'Placed', icon: Clock },
  PAID: { color: 'bg-green-500/10 text-green-400 border-green-500/30', label: 'Paid', icon: CheckCircle2 },
  SHIPPED: { color: 'bg-purple-500/10 text-purple-400 border-purple-500/30', label: 'Shipped', icon: Truck },
  DELIVERED: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', label: 'Delivered', icon: CheckCircle },
  CANCELLED: { color: 'bg-red-500/10 text-red-400 border-red-500/30', label: 'Cancelled', icon: XCircle },
  REFUNDED: { color: 'bg-white/5 text-white/50 border-white/15', label: 'Refunded', icon: XCircle },
};

export const timelineSteps = [
  { key: 'PLACED', label: 'Order Placed', icon: Clock },
  { key: 'PAID', label: 'Payment Confirmed', icon: CheckCircle2 },
  { key: 'SHIPPED', label: 'Shipped', icon: Truck },
  { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
];

