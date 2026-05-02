import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, Trash2, Sparkles, Tag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { Separator } from '@/components/ui/separator';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/features/products/services/product.service';
import { ProductCard } from '@/features/products/components/ProductCard';
import { Progress } from '@/components/ui/progress';

const FREE_SHIPPING_THRESHOLD = 799;

export default function Cart() {
  usePageTitle('Shopping Cart - Review Your Items');
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  const { data: featuredProducts = [] } = useQuery({
    queryKey: ['featuredProducts-cart-empty'],
    queryFn: () => productService.getFeaturedProducts(4),
    staleTime: 5 * 60 * 1000,
    enabled: items.length === 0,
  });

  // Log page load
  useEffect(() => {
    console.log('📄 Cart Page Loaded');
  }, []);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Empty state header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFF5F8] mb-4">
              <ShoppingBag className="h-10 w-10 text-[#DD2C6C]" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Browse our most-loved collections and find something you'll obsess over.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Button size="lg" asChild className="bg-[#DD2C6C] hover:bg-[#c42460] text-white">
                <Link to="/products">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Shop All
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/products?isOnSale=true">
                  <Tag className="h-4 w-4 mr-2" />
                  View Sale
                </Link>
              </Button>
            </div>
          </div>

          {/* Featured products grid */}
          {featuredProducts.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-center text-muted-foreground">
                You might love these
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featuredProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <Breadcrumbs items={[{ label: 'Cart' }]} />

      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Your Cart</h1>

      {/* Cart Layout */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4 md:space-y-6">
          {/* Table Header - Desktop Only */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
            <div className="col-span-1"></div>
          </div>

          {/* Cart Items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="grid md:grid-cols-12 gap-4 p-4 md:p-0 border md:border-0 rounded-lg md:rounded-none items-center"
            >
              {/* Product Info */}
              <div className="col-span-12 md:col-span-6 flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h6 className="font-semibold mb-1">{item.name}</h6>
                  {item.variant && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.variant}
                    </p>
                  )}
                  <p className="font-semibold">{formatCurrency(item.price)}</p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="col-span-6 md:col-span-2 flex md:justify-center">
                <div className="flex items-center border rounded-md">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 font-medium">{item.quantity}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Price */}
              <div className="col-span-5 md:col-span-3 text-left md:text-right">
                <p className="font-semibold text-lg">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>

              {/* Remove Button */}
              <div className="col-span-1 flex md:justify-end">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-muted/30 rounded-lg p-6 sticky top-24 space-y-6">
            <h2 className="text-xl font-bold">Order Summary</h2>

            {/* Free shipping progress */}
            {subtotal < FREE_SHIPPING_THRESHOLD ? (
              <div className="space-y-1.5">
                <p className="text-xs text-gray-600">
                  Add{' '}
                  <span className="font-semibold text-[#DD2C6C]">
                    {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)}
                  </span>{' '}
                  more for <span className="font-semibold">FREE shipping</span>
                </p>
                <Progress
                  value={(subtotal / FREE_SHIPPING_THRESHOLD) * 100}
                  className="h-1.5 bg-gray-200 [&>div]:bg-[#DD2C6C]"
                />
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-100 rounded-md px-3 py-2">
                <span className="font-medium">🎉 Free shipping unlocked!</span>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold">Subtotal</span>
                <span className="font-bold">{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Taxes and shipping calculated at checkout
              </p>
            </div>

            <Separator />

            <Button size="lg" className="w-full" asChild>
              <Link to="/checkout">Check Out</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
