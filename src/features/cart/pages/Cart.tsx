import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, Trash2, Sparkles, Tag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { Separator } from '@/components/ui/separator';
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

  useEffect(() => {
    console.log('📄 Cart Page Loaded');
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0D0D0D]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            {/* Empty state */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#DD2C6C]/10 border border-[#DD2C6C]/20 mb-5">
                <ShoppingBag className="h-10 w-10 text-[#DD2C6C]" />
              </div>
              <h1 className="text-2xl font-black text-white mb-2">Your cart is empty</h1>
              <p className="text-white/50 mb-6">
                Browse our most-loved collections and find something you'll obsess over.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Button size="lg" asChild className="bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full px-8 shadow-lg shadow-[#DD2C6C]/25">
                  <Link to="/products">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Shop All
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent rounded-full px-8">
                  <Link to="/products?isOnSale=true">
                    <Tag className="h-4 w-4 mr-2" />
                    View Sale
                  </Link>
                </Button>
              </div>
            </div>

            {featuredProducts.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold mb-5 text-center text-white/40 uppercase tracking-widest">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-black text-white mb-8">Your Cart</h1>

        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {/* Table Header — Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs font-semibold text-white/40 uppercase tracking-widest">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-3 text-right">Total</div>
              <div className="col-span-1" />
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="grid md:grid-cols-12 gap-4 p-4 md:p-0 bg-white/3 md:bg-transparent border border-white/8 md:border-0 rounded-xl md:rounded-none md:border-b md:border-white/8 md:pb-4 items-center"
              >
                {/* Product */}
                <div className="col-span-12 md:col-span-6 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10"
                  />
                  <div className="flex-1">
                    <h6 className="font-semibold text-white mb-1">{item.name}</h6>
                    {item.variant && (
                      <p className="text-xs text-white/40 mb-2">{item.variant}</p>
                    )}
                    <p className="font-semibold text-white/80">{formatCurrency(item.price)}</p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="col-span-6 md:col-span-2 flex md:justify-center">
                  <div className="flex items-center border border-white/15 rounded-lg bg-white/5">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-9 w-9 text-white/60 hover:text-white hover:bg-white/10"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="px-4 font-semibold text-white text-sm">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-9 w-9 text-white/60 hover:text-white hover:bg-white/10"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-5 md:col-span-3 text-left md:text-right">
                  <p className="font-bold text-white text-lg">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>

                {/* Remove */}
                <div className="col-span-1 flex md:justify-end">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white/30 hover:text-red-400 hover:bg-red-500/10"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24 space-y-5">
              <h2 className="text-lg font-black text-white">Order Summary</h2>

              {/* Shipping progress */}
              {subtotal < FREE_SHIPPING_THRESHOLD ? (
                <div className="space-y-2">
                  <p className="text-xs text-white/50">
                    Add{' '}
                    <span className="font-semibold text-[#DD2C6C]">
                      {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)}
                    </span>{' '}
                    more for <span className="font-semibold text-white/70">FREE shipping</span>
                  </p>
                  <Progress
                    value={(subtotal / FREE_SHIPPING_THRESHOLD) * 100}
                    className="h-1.5 bg-white/10 [&>div]:bg-[#DD2C6C]"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                  <span className="font-semibold">🎉 Free shipping unlocked!</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-white/70">Subtotal</span>
                <span className="font-bold text-white text-lg">{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-xs text-white/35">Taxes and shipping calculated at checkout</p>

              <Separator className="bg-white/10" />

              <Button size="lg" className="w-full bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-xl font-bold shadow-lg shadow-[#DD2C6C]/25" asChild>
                <Link to="/checkout">Check Out</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
