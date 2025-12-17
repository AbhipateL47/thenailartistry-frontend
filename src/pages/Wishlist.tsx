import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">
          Save your favorite products to keep track of items you love.
        </p>
        <Link
          to="/products"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <p className="text-muted-foreground mb-8">
        You have {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
