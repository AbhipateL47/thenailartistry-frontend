import { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { Product, productService } from '@/features/products/services/product.service';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/shared/utils/toast';
import { cn } from '@/shared/utils/cn';

interface StickyAddToCartBarProps {
  product: Product;
}

export const StickyAddToCartBar = ({ product }: StickyAddToCartBarProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const { addItem, openDrawer } = useCart();
  
  const basePrice = productService.getLowestPrice(product);
  const isOnSale = product.isOnSale === true && typeof product.salePercent === 'number' && product.salePercent > 0;
  
  // Calculate final price: if on sale, apply discount to base price
  const finalPrice = isOnSale
    ? Math.round(basePrice - (basePrice * product.salePercent) / 100)
    : basePrice;
  
  const inStock = productService.isInStock(product);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar when user scrolls down more than 300px
      const scrollThreshold = 900;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    addItem({
      id: `${product._id}-${Date.now()}`,
      productId: product._id,
      slug: product.slug,
      name: product.name,
      price: finalPrice,
      image: product.primaryImage,
      quantity,
      variant: 'Both Hands',
    });
    // Toast is handled in CartContext.addItem
    openDrawer();
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 md:hidden transition-transform duration-300",
      isVisible ? "translate-y-0" : "translate-y-full"
    )}>
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
              {isOnSale ? (
                <>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatCurrency(basePrice)}
                  </span>
                  <span className="text-sm font-bold">{formatCurrency(finalPrice)}</span>
                </>
              ) : (
                <span className="text-sm font-bold">{formatCurrency(basePrice)}</span>
              )}
            </div>
          </div>

          {/* Quantity Selector
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
          </div> */}

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

