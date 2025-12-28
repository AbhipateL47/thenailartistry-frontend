import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Loader2 } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Wishlist() {
  usePageTitle('My Wishlist - Saved Favorites');
  const { wishlist, isLoading, fetchWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  // Fetch wishlist data when user navigates to this page or on reload
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist().catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]); // Run when authenticated state changes or on mount

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#DD2C6C]" />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDF8F8] via-pink-50/50 to-purple-50/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-[#DD2C6C]/10 rounded-full flex items-center justify-center">
                <Heart className="h-16 w-16 text-[#DD2C6C]/40" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#1a1a1a]">
              Your Wishlist is Empty
            </h1>
            <p className="text-lg text-[#1a1a1a]/70 mb-8 max-w-md mx-auto">
              Save your favorite products to keep track of items you love. Start exploring our collection!
            </p>
            <Button size="lg" asChild className="bg-[#DD2C6C] hover:bg-[#DD2C6C]/90 text-white">
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
    <div className="min-h-screen bg-[#FDF8F8]">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2">
              My Wishlist
            </h1>
            <p className="text-[#1a1a1a]/70">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} hideStockStatus={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
