import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { CartItem } from './CartItem';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils/formatCurrency';
import {
  Sheet,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';

export const CartDrawer = () => {
  const { items, isDrawerOpen, closeDrawer, subtotal } = useCart();

  return (
    <Sheet open={isDrawerOpen} onOpenChange={closeDrawer}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-0 bg-gray-100 [&>button]:hidden">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Shopping Cart</h2>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-700" />
            </Button>
          </SheetClose>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 bg-white m-4 rounded-lg">
            <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Your cart is empty</h3>
            <p className="text-sm text-gray-600 mb-6">
              Add some beautiful nail sets to get started!
            </p>
            <Button onClick={closeDrawer} asChild className="bg-[#DD2C6C] hover:bg-[#DD2C6C]/90">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto bg-white m-4 rounded-lg">
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Footer - Fixed at bottom */}
            <div className="bg-white border-t border-gray-200 p-6 space-y-4 flex-shrink-0">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Subtotal</span>
                <span className="text-sm font-semibold text-gray-900">
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
                  className="w-full h-11 border-gray-300 text-gray-900 hover:bg-gray-50 rounded-md"
                  asChild
                  onClick={closeDrawer}
                >
                  <Link to="/cart">VIEW CART</Link>
                </Button>
                <Button
                  className="w-full h-11 bg-gray-900 text-white hover:bg-gray-800 rounded-md"
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
