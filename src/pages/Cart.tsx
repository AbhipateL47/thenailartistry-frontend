import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatCurrency';
import { Separator } from '@/components/ui/separator';

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button size="lg" asChild>
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Your Shopping Cart</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-2 text-center">Your Cart</h1>
      <p className="text-center text-muted-foreground mb-8">
        Home / Your Shopping Cart
      </p>

      {/* Cart Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
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
                  <h3 className="font-semibold mb-1">{item.name}</h3>
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
        <div className="lg:col-span-1">
          <div className="bg-muted/30 rounded-lg p-6 sticky top-24 space-y-6">
            <h2 className="text-xl font-bold">Subtotal</h2>
            
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
