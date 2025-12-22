import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function Wishlist() {
  usePageTitle('My Wishlist - Saved Favorites');
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Wishlist' }]} />
        <div className="text-center py-16">
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
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />
      <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
      <p className="text-muted-foreground mb-8">
        You have {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map((item) => (
          <ProductCard 
            key={item._id} 
            product={{
              _id: item._id,
              slug: item.slug,
              name: item.name,
              primaryImage: item.primaryImage,
              variants: [],
              title: item.name,
              description: '',
              tags: [],
              gallery: [],
              ratingAvg: 0,
              ratingCount: 0,
              isFeatured: false,
              isOnSale: false,
              createdAt: '',
              updatedAt: '',
            }} 
          />
        ))}
      </div>
    </div>
  );
}
