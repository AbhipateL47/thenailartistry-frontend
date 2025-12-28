import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import { wishlistService } from '@/services/wishlistService';
import { Product } from '@/services/productService';
import { useAuth } from './AuthContext';
import { toast } from '@/utils/toast';

interface WishlistContextType {
  wishlist: Product[];
  isLoading: boolean;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => Promise<void>;
  clearWishlist: () => Promise<void>;
  fetchWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, updateWishlistCount } = useAuth();

  // Simple state for wishlist - no cache, just plain state
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  // Fallback to localStorage for guest users
  const [guestWishlist, setGuestWishlist] = useState<Product[]>(() => {
    if (isAuthenticated) return [];
    const saved = localStorage.getItem('guestWishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Save guest wishlist to localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('guestWishlist', JSON.stringify(guestWishlist));
    }
  }, [guestWishlist, isAuthenticated]);

  // Use API wishlist if authenticated, otherwise use guest wishlist
  const currentWishlist = isAuthenticated ? wishlist : guestWishlist;

  // Function to manually fetch wishlist (called from Wishlist page or on auth)
  const fetchWishlist = async () => {
    if (isAuthenticated && user?.id) {
      setIsLoading(true);
      try {
        // Simple fetch - no cache, just get data and set it
        const data = await wishlistService.getWishlist();
        setWishlist(data);
        setHasFetched(true);
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
        setWishlist([]);
      } finally {
        setIsLoading(false);
      }
    }
    // Guest users don't need fetch as they use localStorage
  };

  // Fetch wishlist when user becomes authenticated (for product pages to show correct wishlist state)
  useEffect(() => {
    if (isAuthenticated && user?.id && !hasFetched) {
      fetchWishlist().catch(console.error);
    }
    // Reset hasFetched when user logs out
    if (!isAuthenticated) {
      setHasFetched(false);
      setWishlist([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.id]);

  // Add to wishlist mutation - only make toggle API call, update count locally
  const addMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.addToWishlist(productId),
    onSuccess: () => {
      // Update wishlistCount locally (increment by 1)
      updateWishlistCount(1);
      toast.success('Added to wishlist');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to add to wishlist');
    },
  });

  // Remove from wishlist mutation - simple, no cache
  const removeMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.removeFromWishlist(productId),
    onSuccess: (_, productId) => {
      // Update state by removing the item
      setWishlist((old) => old.filter(p => p._id !== productId));
      // Update count
      updateWishlistCount(-1);
      toast.success('Removed from wishlist');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to remove from wishlist');
    },
  });

  // Toggle wishlist mutation - only make toggle API call, update count locally
  const toggleMutation = useMutation({
    mutationFn: ({ productId, product }: { productId: string; product: Product }) => 
      wishlistService.toggleWishlist(productId),
    onSuccess: (data, { productId, product }) => {
      // Check if it was added or removed based on current state
      const isCurrentlyInWishlist = wishlist.some(p => p._id === productId);
      
      if (isCurrentlyInWishlist) {
        // Was removed - filter it out
        setWishlist((old) => old.filter(p => p._id !== productId));
        updateWishlistCount(-1);
      } else {
        // Was added - add to state so icon updates immediately
        setWishlist((old) => [...old, product]);
        updateWishlistCount(1);
      }
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update wishlist');
    },
  });

  // Clear wishlist mutation
  const clearMutation = useMutation({
    mutationFn: () => wishlistService.clearWishlist(),
    onSuccess: () => {
      // Clear state
      setWishlist([]);
      // Update count to 0
      if (user && user.wishlistCount) {
        updateWishlistCount(-user.wishlistCount);
      }
      toast.success('Wishlist cleared');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to clear wishlist');
    },
  });

  const addToWishlist = async (product: Product) => {
    if (isAuthenticated) {
      // Only make toggle API call, no refetch
      await addMutation.mutateAsync(product._id);
    } else {
      // Guest user - use localStorage
      if (!guestWishlist.find((p) => p._id === product._id)) {
        setGuestWishlist((prev) => [...prev, product]);
        toast.success('Added to wishlist');
      }
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (isAuthenticated) {
      await removeMutation.mutateAsync(productId);
    } else {
      // Guest user - use localStorage
      setGuestWishlist((prev) => prev.filter((item) => item._id !== productId));
      toast.success('Removed from wishlist');
    }
  };

  const isInWishlist = (productId: string) => {
    return currentWishlist.some((item) => item._id === productId);
  };

  const toggleWishlist = async (product: Product) => {
    if (isAuthenticated) {
      // Only make toggle API call, no refetch - pass product so we can update state
      await toggleMutation.mutateAsync({ productId: product._id, product });
    } else {
      // Guest user - use localStorage
      if (isInWishlist(product._id)) {
        removeFromWishlist(product._id);
      } else {
        addToWishlist(product);
      }
    }
  };

  const clearWishlist = async () => {
    if (isAuthenticated) {
      await clearMutation.mutateAsync();
    } else {
      // Guest user - use localStorage
      setGuestWishlist([]);
      toast.success('Wishlist cleared');
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: currentWishlist,
        isLoading: isLoading && isAuthenticated,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
