import { X, ShoppingBag, CheckCircle2, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CartItem } from './CartItem';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import {
  Sheet,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';

const FREE_SHIPPING_THRESHOLD = 799;

export const CartDrawer = () => {
  const { items, isDrawerOpen, closeDrawer, subtotal } = useCart();

  return (
    <Sheet open={isDrawerOpen} onOpenChange={closeDrawer}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-0 bg-[#0D0D0D] border-l border-white/10 [&>button]:hidden">
        {/* Header */}
        <div className="bg-[#111111] px-6 py-4 border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold text-white">Shopping Cart</h2>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 mx-4 my-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-white/30" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Your cart is empty</h3>
            <p className="text-sm text-white/45 mb-6">
              Add some beautiful nail sets to get started!
            </p>
            <Button onClick={closeDrawer} asChild className="bg-[#DD2C6C] hover:bg-[#c02560] text-white">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto mx-4 my-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#111111] border-t border-white/10 p-6 space-y-4 flex-shrink-0">
              {/* Free Shipping Progress */}
              {subtotal < FREE_SHIPPING_THRESHOLD ? (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-white/55">
                    <Truck className="h-3.5 w-3.5 text-[#DD2C6C]" />
                    <span>
                      Add{' '}
                      <span className="font-semibold text-[#DD2C6C]">
                        {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)}
                      </span>{' '}
                      more for <span className="font-semibold text-white/80">FREE shipping</span>
                    </span>
                  </div>
                  <Progress
                    value={Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}
                    className="h-1.5 bg-white/10 [&>div]:bg-[#DD2C6C]"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/25 rounded-lg px-3 py-2">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="font-medium">You've unlocked free shipping!</span>
                </div>
              )}

              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/70">Subtotal</span>
                <span className="text-sm font-semibold text-white">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(subtotal)}
                </span>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-11 border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white rounded-lg"
                  asChild
                  onClick={closeDrawer}
                >
                  <Link to="/cart">VIEW CART</Link>
                </Button>
                <Button
                  className="w-full h-11 bg-[#DD2C6C] hover:bg-[#c02560] text-white font-semibold rounded-lg shadow-lg shadow-[#DD2C6C]/20"
                  asChild
                  onClick={closeDrawer}
                >
                  <Link to="/checkout">CHECKOUT</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
