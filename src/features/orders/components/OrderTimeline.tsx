import { XCircle } from 'lucide-react';
import { Order } from '@/features/orders/services/order.service';
import { timelineSteps } from '../constants/order.constants';

interface OrderTimelineProps {
  order: Order;
  currentStatusIndex: number;
  isCancelled: boolean;
}

export function OrderTimeline({ order, currentStatusIndex, isCancelled }: OrderTimelineProps) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-4 md:p-8">
      {isCancelled && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-red-400">
            <XCircle className="h-5 w-5" />
            <p className="font-semibold">This order has been cancelled</p>
          </div>
        </div>
      )}
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-white/10">
            <div 
              className={`h-full transition-all duration-500 ${
                isCancelled ? 'bg-red-300' : 'bg-gradient-to-r from-[#DD2C6C] to-[#c4245f]'
              }`}
              style={{ 
                width: currentStatusIndex >= 0 
                  ? `${Math.min((currentStatusIndex / (timelineSteps.length - 1)) * 100, 100)}%` 
                  : '0%' 
              }}
            />
          </div>
          
          <div className="relative flex justify-between">
            {timelineSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index <= currentStatusIndex && currentStatusIndex >= 0;
              const isCurrent = index === currentStatusIndex;

              return (
                <div key={step.key} className="flex flex-col items-center flex-1">
                  <div
                    className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full transition-all mb-3 ${
                      isCompleted
                        ? isCurrent
                          ? isCancelled
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 scale-110'
                            : 'bg-gradient-to-br from-[#DD2C6C] to-[#c4245f] text-white shadow-lg shadow-[#DD2C6C]/30 scale-110'
                          : isCancelled
                            ? 'bg-red-300 text-white shadow-md'
                            : 'bg-green-500 text-white shadow-md'
                        : 'bg-white/10 text-white/30'
                    }`}
                  >
                    <StepIcon className="h-7 w-7" />
                  </div>
                  <p
                    className={`text-sm font-semibold text-center ${
                      isCompleted
                        ? isCurrent
                          ? 'text-[#DD2C6C]'
                          : 'text-white/70'
                        : 'text-white/30'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10">
            <div 
              className={`w-full transition-all duration-500 ${
                isCancelled ? 'bg-red-300' : 'bg-gradient-to-b from-[#DD2C6C] to-[#c4245f]'
              }`}
              style={{ 
                height: currentStatusIndex >= 0 
                  ? `${Math.min((currentStatusIndex / (timelineSteps.length - 1)) * 100, 100)}%` 
                  : '0%' 
              }}
            />
          </div>
          
          <div className="space-y-6">
            {timelineSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index <= currentStatusIndex && currentStatusIndex >= 0;
              const isCurrent = index === currentStatusIndex;

              return (
                <div key={step.key} className="relative flex items-start gap-4">
                  <div
                    className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                      isCompleted
                        ? isCurrent
                          ? isCancelled
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                            : 'bg-gradient-to-br from-[#DD2C6C] to-[#c4245f] text-white shadow-lg shadow-[#DD2C6C]/30'
                          : isCancelled
                            ? 'bg-red-300 text-white'
                            : 'bg-green-500 text-white'
                        : 'bg-white/10 text-white/30'
                    }`}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 pt-1.5">
                    <p
                      className={`font-semibold ${
                        isCompleted
                          ? isCurrent
                            ? 'text-[#DD2C6C]'
                            : 'text-white'
                          : 'text-white/30'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

