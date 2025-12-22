import { AlertCircle } from 'lucide-react';

interface ProductSalesInfoProps {
  soldCount?: number;
  stockCount?: number;
}

export const ProductSalesInfo = ({ soldCount, stockCount }: ProductSalesInfoProps) => {
  const isLowStock = stockCount !== undefined && stockCount <= 5;

  return (
    <div className="space-y-2">
      {soldCount !== undefined && soldCount > 0 && (
        <p className="text-sm text-muted-foreground">
          {soldCount} sold in last 24 hours
        </p>
      )}
      {isLowStock && (
        <p className="text-sm font-medium text-orange-600 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          Hurry Up! Only {stockCount} left in stock!
        </p>
      )}
    </div>
  );
};

