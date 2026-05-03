import { Heart, Lock, RefreshCw, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product, productService } from '@/features/products/services/product.service';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductSalesInfo } from './components/ProductSalesInfo';
import { ProductRating } from './components/ProductRating';
import { ProductDeliveryTimeline } from './components/ProductDeliveryTimeline';
import { toast } from '@/shared/utils/toast';
import { cn } from '@/shared/utils/cn';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { addItem, openDrawer } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const basePrice = productService.getLowestPrice(product);
  const isOnSale = product.isOnSale === true && typeof product.salePercent === 'number' && product.salePercent > 0;
  
  // Calculate final price: if on sale, apply discount to base price
  const finalPrice = isOnSale
    ? Math.round(basePrice - (basePrice * product.salePercent) / 100)
    : basePrice;
  const isWishlisted = isInWishlist(product._id);
  const inStock = productService.isInStock(product);
  
  // Get real sales data from product
  const soldCount = product.salesData?.soldIn24Hours || 0;
  const stockCount = product.salesData?.totalStock || 0;
  const isLowStock = product.salesData?.isLowStock || false;

  const handleAddToCart = () => {
    addItem({
      id: `${product._id}-${Date.now()}`,
      productId: product._id,
      slug: product.slug,
      name: product.name,
      price: finalPrice,
      image: product.primaryImage,
      quantity: 1,
    });
    // Toast is handled in CartContext.addItem
    openDrawer();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout would go here
  };

  const handleWishlistToggle = () => {
    toggleWishlist({
      _id: product._id,
      slug: product.slug,
      name: product.name,
      primaryImage: product.primaryImage,
      price: finalPrice,
    } as any);
    // Toast is handled in WishlistContext
  };

  return (
    <div className="space-y-6">
      {/* Product Name */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-white">{product.name}</h1>
        
        {/* Sales Info */}
        {soldCount > 0 && (
          <ProductSalesInfo soldCount={soldCount} stockCount={isLowStock ? stockCount : undefined} />
        )}
        
        {/* Rating */}
        <div className="mt-3">
          <ProductRating 
            rating={product.ratingAvg || 0} 
            reviewCount={product.ratingCount || 0} 
          />
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        {isOnSale ? (
          <>
            <span className="text-xl text-white/40 line-through">
              {formatCurrency(basePrice)}
            </span>
            <span className="text-3xl font-bold text-white">
              {formatCurrency(finalPrice)}
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-white">
            {formatCurrency(basePrice)}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1 bg-[#DD2C6C] text-white hover:bg-[#c02560]"
          onClick={handleBuyNow}
          disabled={!inStock}
        >
          BUY IT NOW
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1 border-white/20 bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          ADD TO CART
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="px-4 border-white/20 bg-transparent text-white/70 hover:bg-white/10 hover:text-white"
          onClick={handleWishlistToggle}
        >
          <Heart className={cn('h-5 w-5', isWishlisted && 'fill-red-500 text-red-500')} />
        </Button>
      </div>

      {/* Delivery Timeline */}
      <ProductDeliveryTimeline />

      {/* Trust signals */}
      <div className="pt-4 border-t border-white/10 border-dashed flex flex-wrap gap-4">
        <div className="flex items-center gap-1.5 text-xs text-white/45">
          <Lock className="h-3.5 w-3.5 text-[#DD2C6C]" />
          <span>Secure Checkout via Razorpay</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/45">
          <RefreshCw className="h-3.5 w-3.5 text-[#DD2C6C]" />
          <span>Easy Returns</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/45">
          <Award className="h-3.5 w-3.5 text-[#DD2C6C]" />
          <span>Genuine Products</span>
        </div>
      </div>
    </div>
  );
};

export const ProductInfoSkeleton = () => {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-10 w-1/3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 w-12" />
      </div>
      <div className="space-y-3 pt-4 border-t">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
};
