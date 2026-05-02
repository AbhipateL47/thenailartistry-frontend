import { Link } from 'react-router-dom';
import { Star, Heart, Eye, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product, productService } from '@/features/products/services/product.service';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/shared/utils/cn';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  hideStockStatus?: boolean;
  onQuickView?: (product: Product) => void;
  loading?: 'lazy' | 'eager';
}

export const ProductCard = ({
  product,
  viewMode = 'grid',
  hideStockStatus = false,
  onQuickView,
  loading = 'lazy',
}: ProductCardProps) => {
  const basePrice = productService.getLowestPrice(product);
  const isOnSale = product.isOnSale === true && typeof product.salePercent === 'number' && product.salePercent > 0;

  const finalPrice = isOnSale
    ? Math.round(basePrice - (basePrice * product.salePercent) / 100)
    : basePrice;

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem, openDrawer } = useCart();
  const isWishlisted = isInWishlist(product._id);
  const inStock = productService.isInStock(product);
  const hoverImage = product.gallery?.[0];

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product._id,
      productId: product._id,
      slug: product.slug,
      name: product.name,
      price: finalPrice,
      image: product.primaryImage,
      quantity: 1,
    });
    openDrawer();
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  if (viewMode === 'list') {
    return (
      <Link
        to={`/products/${product.slug}`}
        className="group relative bg-transparent overflow-hidden transition-all duration-300 animate-fade-in flex gap-4 p-2"
      >
        {/* Image */}
        <div className="relative overflow-hidden w-32 h-32 flex-shrink-0 bg-muted rounded-lg border border-gray-200">
          <img
            src={product.primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading={loading}
          />
          {isOnSale && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {product.salePercent}% off
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

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

            <div className="flex items-center gap-2 mb-2">
              {isOnSale ? (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatCurrency(basePrice)}
                  </span>
                  <span className="font-bold text-lg">
                    {formatCurrency(finalPrice)}
                  </span>
                </>
              ) : (
                <span className="font-bold text-lg">
                  {formatCurrency(basePrice)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleWishlistClick}
              className={cn('h-9 w-9', isWishlisted && 'text-red-500 hover:text-red-600')}
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
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-muted rounded-lg border border-gray-200">
          {/* Primary image */}
          <img
            src={product.primaryImage}
            alt={product.name}
            className={cn(
              'w-full h-full object-cover transition-all duration-500',
              hoverImage
                ? 'group-hover:opacity-0 group-hover:scale-105'
                : 'group-hover:scale-105'
            )}
            loading={loading}
          />

          {/* Hover second image */}
          {hoverImage && (
            <img
              src={hoverImage}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-500"
              loading="lazy"
            />
          )}

          {/* Sale badge */}
          {isOnSale && (
            <div className="absolute top-2 left-2 bg-[#DD2C6C] text-white text-xs px-2 py-1 rounded-full z-10">
              -{product.salePercent}%
            </div>
          )}

          {/* Out-of-stock overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
              <Badge variant="outline" className="bg-white text-xs font-medium">
                Out of Stock
              </Badge>
            </div>
          )}

          {/* Action icons — always visible on mobile, hover on desktop */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 z-20 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
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
            {onQuickView && (
              <Button
                variant="secondary"
                size="icon"
                onClick={handleQuickView}
                className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
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

          {/* Price & Rating */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5">
              {isOnSale ? (
                <>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatCurrency(basePrice)}
                  </span>
                  <span className="font-semibold text-sm">
                    {formatCurrency(finalPrice)}
                  </span>
                </>
              ) : (
                <span className="font-semibold text-sm">
                  {formatCurrency(basePrice)}
                </span>
              )}
            </div>

            {product.ratingAvg > 0 && (
              <div className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {product.ratingAvg.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Add to Bag — hover on desktop, always visible on mobile */}
          <div className="mt-2 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-200">
            <Button
              onClick={handleAddToCart}
              disabled={!inStock}
              size="sm"
              className="w-full h-8 text-xs gap-1.5 rounded-md"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {inStock ? 'Add to Bag' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
