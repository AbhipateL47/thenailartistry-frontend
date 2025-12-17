import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Checkout() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/cart" className="hover:text-foreground transition-colors">
          Cart
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Checkout</span>
      </nav>

      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-muted-foreground mb-8">
          This page is under construction. Please check back later.
        </p>
        <Button asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
