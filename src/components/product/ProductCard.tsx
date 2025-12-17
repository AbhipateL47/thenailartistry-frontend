import { Link } from 'react-router-dom';
import { Star, Heart, Eye, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/services/productService';
import { formatCurrency, calculateDiscount } from '@/utils/formatCurrency';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discount = hasDiscount ? calculateDiscount(product.price, product.salePrice) : 0;
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem, openDrawer } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      quantity: 1,
    });
    toast.success('Item added to bag');
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
        to={`/products/${product.id}`}
        className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 animate-fade-in flex gap-4 p-4"
      >
        {/* Image */}
        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden bg-muted rounded-md">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {hasDiscount && (
            <Badge variant="destructive" className="absolute top-2 left-2 text-xs">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating!)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.reviews || 0})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-lg">
                {formatCurrency(product.salePrice || product.price)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(product.price)}
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
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Bag
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 animate-fade-in">
      <Link to={`/products/${product.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {hasDiscount && (
            <Badge
              variant="destructive"
              className="absolute top-2 left-2 font-semibold"
            >
              -{discount}%
            </Badge>
          )}

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
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              {formatCurrency(product.salePrice || product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <p className="text-xs text-destructive mt-2">Out of Stock</p>
          )}
        </div>
      </Link>
    </div>
  );
};
