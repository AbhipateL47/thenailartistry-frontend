import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Loader2 } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { ProductCard } from '@/features/products/components/ProductCard';
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Wishlist() {
  usePageTitle('My Wishlist - Saved Favorites');
  const { wishlist, isLoading, fetchWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist().catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#DD2C6C]" />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#0D0D0D]">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto bg-[#DD2C6C]/10 border border-[#DD2C6C]/20 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-[#DD2C6C]/50" />
            </div>
            <h1 className="text-3xl font-black text-white mb-3">Your Wishlist is Empty</h1>
            <p className="text-white/50 mb-8">
              Save your favourite designs here and come back to them whenever you're ready.
            </p>
            <Button size="lg" asChild className="bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full px-8 shadow-lg shadow-[#DD2C6C]/25">
              <Link to="/products">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-1">My Wishlist</h1>
          <p className="text-white/40 text-sm">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} hideStockStatus />
          ))}
        </div>
      </div>
    </div>
  );
}
