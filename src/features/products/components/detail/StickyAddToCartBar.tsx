import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { Product, productService } from '@/features/products/services/product.service';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/shared/utils/cn';

interface StickyAddToCartBarProps {
  product: Product;
}

export const StickyAddToCartBar = ({ product }: StickyAddToCartBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { addItem, openDrawer } = useCart();

  const basePrice = productService.getLowestPrice(product);
  const isOnSale = product.isOnSale === true && typeof product.salePercent === 'number' && product.salePercent > 0;
  const finalPrice = isOnSale
    ? Math.round(basePrice - (basePrice * product.salePercent) / 100)
    : basePrice;
  const inStock = productService.isInStock(product);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible((window.scrollY || document.documentElement.scrollTop) > 900);
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
      quantity: 1,
      variant: 'Both Hands',
    });
    openDrawer();
  };

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-white/10 shadow-2xl z-50 md:hidden transition-transform duration-300",
      isVisible ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <img
            src={product.primaryImage}
            alt={product.name}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-white/10"
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{product.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              {isOnSale ? (
                <>
                  <span className="text-xs text-white/35 line-through">{formatCurrency(basePrice)}</span>
                  <span className="text-sm font-bold text-white">{formatCurrency(finalPrice)}</span>
                </>
              ) : (
                <span className="text-sm font-bold text-white">{formatCurrency(basePrice)}</span>
              )}
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="bg-[#DD2C6C] hover:bg-[#c02560] text-white flex-shrink-0 shadow-lg shadow-[#DD2C6C]/20"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  );
};
