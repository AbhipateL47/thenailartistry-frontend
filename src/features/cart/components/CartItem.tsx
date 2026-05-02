import { Minus, Plus, Trash2, Pencil } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
      {/* Thumbnail */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 rounded-lg object-cover flex-shrink-0 border border-white/10"
      />

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-white mb-1 line-clamp-2">{item.name}</h4>
        {item.variant && (
          <p className="text-xs text-white/45 mb-2">{item.variant}</p>
        )}
        <p className="font-semibold text-sm text-white mb-3">
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(item.price)}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center border border-white/15 bg-white/5 rounded-lg w-fit">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10 rounded-none rounded-l-lg"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium text-white w-8 text-center">{item.quantity}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10 rounded-none rounded-r-lg"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex flex-col gap-2 items-end flex-shrink-0">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-white/40 hover:text-red-400 hover:bg-red-500/10"
          onClick={() => removeItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/10"
          asChild
        >
          <Link to={`/products/${item.slug}`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
