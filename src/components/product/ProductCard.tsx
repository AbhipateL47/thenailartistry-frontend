import { Link } from 'react-router-dom';
import { Star, Heart, Eye, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product, productService } from '@/services/productService';
import { formatCurrency, calculateDiscount } from '@/utils/formatCurrency';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/utils/toast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  hideStockStatus?: boolean;
}

export const ProductCard = ({ product, viewMode = 'grid', hideStockStatus = false }: ProductCardProps) => {
  const price = productService.getLowestPrice(product);
  const mrp = productService.getLowestMrp(product);
  const hasDiscount = product.isOnSale && product.salePercent && product.salePercent > 0;
  const discount = hasDiscount ? product.salePercent : (mrp > price ? calculateDiscount(mrp, price) : 0);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem, openDrawer } = useCart();
  const isWishlisted = isInWishlist(product._id);
  const inStock = productService.isInStock(product);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    // Toast is handled in WishlistContext
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product._id,
      productId: product._id,
      slug: product.slug,
      name: product.name,
      price: price,
      image: product.primaryImage,
      quantity: 1,
    });
    // Toast is handled in CartContext.addItem
    openDrawer();
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick view functionality can be added later
  };

  if (viewMode === 'list') {
    return (
      <Link
        to={`/products/${product.slug}`}
        className="group relative bg-transparent overflow-hidden transition-all duration-300 animate-fade-in flex gap-4 p-2"
      >
        {/* Image */}
        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden bg-muted rounded-lg border border-gray-200">
          <img
            src={product.primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            {product.ratingAvg > 0 && (
              <div className="flex items-center gap-1 mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.ratingAvg)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.ratingCount || 0})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-lg">
                {formatCurrency(price)}
              </span>
              {mrp > price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(mrp)}
                </span>
              )}
            </div>
          </div>

          {/* Actions - Always visible in list view */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleWishlistClick}
              className={cn(
                'h-9 w-9',
                isWishlisted && 'text-red-500 hover:text-red-600'
              )}
            >
              <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
            </Button>
            <Button
              onClick={handleAddToCart}
              className="flex-1 h-9 gap-2"
              disabled={!inStock}
            >
              <ShoppingBag className="h-4 w-4" />
              {inStock ? 'Add to Bag' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="group relative bg-transparent overflow-hidden transition-all duration-300 animate-fade-in">
      <Link to={`/products/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted rounded-lg border border-gray-200">
          <img
            src={product.primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Action Icons - Always visible on mobile, hover on desktop */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleWishlistClick}
              className={cn(
                'h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background',
                isWishlisted && 'text-red-500 hover:text-red-600'
              )}
            >
              <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleQuickView}
              className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleAddToCart}
              className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
              disabled={!inStock}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="pt-2 px-1">
          <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Price & Rating Row */}
          <div className="flex items-center justify-between mt-1">
            {/* Price */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm">
                {formatCurrency(price)}
              </span>
              {mrp > price && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(mrp)}
                </span>
              )}
            </div>

            {/* Rating */}
            {product.ratingAvg > 0 && (
              <div className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {product.ratingAvg.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Stock Status */}
          {!inStock && !hideStockStatus && (
            <p className="text-xs text-destructive mt-1">Out of Stock</p>
          )}
        </div>
      </Link>
    </div>
  );
};
