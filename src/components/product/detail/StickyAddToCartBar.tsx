import { useState } from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatCurrency';
import { Product, productService } from '@/services/productService';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface StickyAddToCartBarProps {
  product: Product;
}

export const StickyAddToCartBar = ({ product }: StickyAddToCartBarProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openDrawer } = useCart();
  
  const price = productService.getLowestPrice(product);
  const mrp = productService.getLowestMrp(product);
  const inStock = productService.isInStock(product);

  const handleAddToCart = () => {
    addItem({
      id: `${product._id}-${Date.now()}`,
      productId: product._id,
      slug: product.slug,
      name: product.name,
      price: price,
      image: product.primaryImage,
      quantity,
      variant: 'Both Hands',
    });
    toast.success('Item added to bag');
    openDrawer();
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 md:hidden">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <img
            src={product.primaryImage}
            alt={product.name}
            className="w-16 h-16 rounded-md object-cover flex-shrink-0"
          />

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{product.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold">{formatCurrency(price)}</span>
              {mrp > price && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(mrp)}
                </span>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center border rounded-md">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-none rounded-l-md"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium px-3 w-8 text-center">{quantity}</span>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-none rounded-r-md"
              onClick={increaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="bg-primary text-white hover:bg-primary/90 flex-shrink-0"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  );
};

