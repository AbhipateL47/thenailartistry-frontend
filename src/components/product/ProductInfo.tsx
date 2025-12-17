import { useState } from 'react';
import { Minus, Plus, Star, Heart, Package, Truck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/services/productService';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>('Both Hands');
  const { addItem } = useCart();

  const handleAddToBag = () => {
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      quantity,
      variant: selectedVariant,
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="space-y-6">
      {/* Product Name & Rating */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating?.toFixed(1)} ({product.reviews || 0} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold">
          {formatCurrency(product.salePrice || product.price)}
        </span>
        {product.salePrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              {formatCurrency(product.price)}
            </span>
            <Badge variant="destructive" className="text-xs">
              -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
            </Badge>
          </>
        )}
      </div>

      {/* Stock Status */}
      {product.inStock ? (
        <p className="text-sm text-green-600 font-medium">
          ✓ In Stock - Ready to ship
        </p>
      ) : (
        <p className="text-sm text-destructive font-medium">Out of Stock</p>
      )}

      {/* Description */}
      <div className="border-t pt-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Variant Selector */}
      <div>
        <label className="text-sm font-medium mb-2 block">Type: {selectedVariant}</label>
        <div className="flex gap-2">
          {['Both Hands', 'Single Hand'].map((variant) => (
            <Button
              key={variant}
              variant={selectedVariant === variant ? 'default' : 'outline'}
              onClick={() => setSelectedVariant(variant)}
              className="flex-1"
            >
              {variant}
            </Button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Quantity:</span>
        <div className="flex items-center border rounded-md">
          <Button
            size="icon"
            variant="ghost"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-6 font-medium">{quantity}</span>
          <Button size="icon" variant="ghost" onClick={increaseQuantity}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1"
          onClick={handleAddToBag}
          disabled={!product.inStock}
        >
          Add to Bag
        </Button>
        <Button size="lg" variant="outline" className="px-4">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      {/* Buy Now Button */}
      <Button size="lg" variant="secondary" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
        Buy It Now
      </Button>

      {/* Features */}
      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Package className="h-5 w-5 text-muted-foreground" />
          <span>Order Confirmed - 4th Nov</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-5 w-5 text-muted-foreground" />
          <span>Shipped - 5th Nov</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          <span>At Your Doorstep - 13th Nov</span>
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
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-20 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 w-12" />
      </div>
    </div>
  );
};
