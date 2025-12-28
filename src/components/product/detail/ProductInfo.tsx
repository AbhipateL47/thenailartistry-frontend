import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product, productService } from '@/services/productService';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductSalesInfo } from './components/ProductSalesInfo';
import { ProductRating } from './components/ProductRating';
import { ProductDeliveryTimeline } from './components/ProductDeliveryTimeline';
import { toast } from '@/utils/toast';
import { cn } from '@/lib/utils';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedVariant, setSelectedVariant] = useState<string>('Both Hands');
  const { addItem, openDrawer } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const price = productService.getLowestPrice(product);
  const mrp = productService.getLowestMrp(product);
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
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
      price: price,
      image: product.primaryImage,
      quantity: 1,
      variant: selectedVariant,
    });
    toast.success('Item added to bag');
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
      price: price,
      mrp: mrp,
    });
    // Toast is handled in WishlistContext
  };

  return (
    <div className="space-y-6">
      {/* Product Name */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
        
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
        <span className="text-3xl font-bold">
          {formatCurrency(price)}
        </span>
        {mrp > price && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              {formatCurrency(mrp)}
            </span>
            {discountPercent > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discountPercent}%
              </Badge>
            )}
          </>
        )}
      </div>

      {/* Type Selector */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Type: {selectedVariant}
        </label>
        <div className="flex gap-2">
          {['Both Hands', 'Single Hand'].map((variant) => (
            <Button
              key={variant}
              variant={selectedVariant === variant ? 'default' : 'outline'}
              onClick={() => setSelectedVariant(variant)}
              size="sm"
              className={cn(
                "text-xs px-4 py-1.5 h-auto",
                selectedVariant === variant 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "bg-white border-2 hover:bg-gray-50"
              )}
            >
              {variant}
            </Button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1 bg-primary text-white hover:bg-primary/90"
          onClick={handleBuyNow}
          disabled={!inStock}
        >
          BUY IT NOW
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1 border-2"
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          ADD TO CART
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="px-4"
          onClick={handleWishlistToggle}
        >
          <Heart className={cn('h-5 w-5', isWishlisted && 'fill-red-500 text-red-500')} />
        </Button>
      </div>

      {/* Delivery Timeline */}
      <ProductDeliveryTimeline />
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
