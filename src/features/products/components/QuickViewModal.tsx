import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ArrowRight, Lock, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product, productService } from '@/features/products/services/product.service';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/shared/utils/cn';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal = ({ product, onClose }: QuickViewModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, openDrawer } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    setSelectedImage(0);
  }, [product?._id]);

  if (!product) return null;

  const images = [product.primaryImage, ...(product.gallery || [])];
  const basePrice = productService.getLowestPrice(product);
  const isOnSale =
    product.isOnSale === true &&
    typeof product.salePercent === 'number' &&
    product.salePercent > 0;
  const finalPrice = isOnSale
    ? Math.round(basePrice - (basePrice * product.salePercent) / 100)
    : basePrice;
  const isWishlisted = isInWishlist(product._id);
  const inStock = productService.isInStock(product);

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
    openDrawer();
    onClose();
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] md:max-h-[80vh]">
          {/* Left: Image */}
          <div className="bg-gray-50 p-4 flex flex-col">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted flex-1">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {isOnSale && (
                <div className="absolute top-3 left-3 bg-[#DD2C6C] text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  -{product.salePercent}%
                </div>
              )}
              {!inStock && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                  <Badge variant="outline" className="bg-white">Out of Stock</Badge>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      'flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all',
                      selectedImage === i
                        ? 'border-[#DD2C6C] ring-2 ring-[#DD2C6C]/20'
                        : 'border-transparent hover:border-gray-300'
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="p-6 flex flex-col gap-4 overflow-y-auto">
            {/* Name & Rating */}
            <div>
              <h2 className="text-xl font-bold leading-tight mb-2">{product.name}</h2>
              {product.ratingAvg > 0 && (
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-3.5 w-3.5',
                          i < Math.round(product.ratingAvg)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-200'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.ratingCount || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 flex-wrap">
              {isOnSale ? (
                <>
                  <span className="text-2xl font-bold">{formatCurrency(finalPrice)}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatCurrency(basePrice)}
                  </span>
                  <Badge className="bg-[#DD2C6C]/10 text-[#DD2C6C] border-[#DD2C6C]/20 text-xs font-semibold">
                    {product.salePercent}% OFF
                  </Badge>
                </>
              ) : (
                <span className="text-2xl font-bold">{formatCurrency(basePrice)}</span>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2 mt-auto">
              <Button
                className="flex-1 gap-2 bg-primary text-white hover:bg-primary/90"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                <ShoppingBag className="h-4 w-4" />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleWishlist(product)}
                className={cn(isWishlisted && 'text-red-500 border-red-200 hover:text-red-600')}
              >
                <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
              </Button>
            </div>

            {/* View Full Details */}
            <Link
              to={`/products/${product.slug}`}
              onClick={onClose}
              className="flex items-center gap-1.5 text-sm text-[#DD2C6C] hover:underline font-medium"
            >
              View Full Details <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Mini trust row */}
            <div className="flex flex-wrap gap-3 pt-3 border-t border-dashed text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-primary" /> Secure Checkout
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw className="h-3 w-3 text-primary" /> Easy Returns
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
