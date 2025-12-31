import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { toast } from '@/utils/toast';
import { useAuth } from './AuthContext';
import { cartService } from '@/services/cartService';

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
  variantSku?: string;
}

interface CartContextType {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  totalItems: number;
  subtotal: number;
  syncCart: () => Promise<void>;
  reloadCartFromBackend: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  
  // Initialize state - load from localStorage for guests
  const getInitialCart = (): CartItem[] => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.length > 0) {
          return parsedCart;
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
    // Start with empty cart
    return [];
  };

  const [items, setItems] = useState<CartItem[]>(getInitialCart);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const cartLoadedRef = useRef(false);
  const userIdRef = useRef<string | null>(null);

  // Load cart from backend when user is authenticated
  useEffect(() => {
    const loadCartFromBackend = async () => {
      if (!isAuthenticated || !user) {
        // For guests, keep using localStorage
        cartLoadedRef.current = false;
        userIdRef.current = null;
        return;
      }

      // Prevent multiple loads for the same user
      if (cartLoadedRef.current && userIdRef.current === user.id) {
        return;
      }

      // Prevent concurrent loads
      if (isLoadingCart) {
        return;
      }

      setIsLoadingCart(true);
      cartLoadedRef.current = true;
      userIdRef.current = user.id;

      try {
        console.log('🔄 [CART LOAD] Loading cart from backend...');
        const response = await cartService.getCart();
        if (response.success && response.data.items) {
          // Convert backend format to frontend format
          const backendItems: CartItem[] = response.data.items.map((item) => ({
            id: item.id, // Use backend item ID
            productId: item.productId,
            slug: '', // Will be populated if needed
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
            variantSku: item.variantSku,
          }));
          console.log('✅ [CART LOAD] Loaded', backendItems.length, 'items from backend');
          setItems(backendItems);
          // Also save to localStorage for consistency
          localStorage.setItem('cart', JSON.stringify(backendItems));
        } else {
          setItems([]);
          localStorage.removeItem('cart');
        }
      } catch (error) {
        console.error('❌ [CART LOAD] Failed to load cart from backend:', error);
        // Keep using localStorage cart if backend fails
        cartLoadedRef.current = false;
      } finally {
        setIsLoadingCart(false);
      }
    };

    loadCartFromBackend();
  }, [isAuthenticated, user?.id]);

  // Save cart to localStorage whenever it changes (for guests)
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Helper to reload cart from backend
  const reloadCartFromBackend = async () => {
    if (!isAuthenticated) return;
    
    // Prevent concurrent reloads
    if (isLoadingCart) {
      return;
    }

    setIsLoadingCart(true);
    try {
      const response = await cartService.getCart();
      if (response.success && response.data.items) {
        const backendItems: CartItem[] = response.data.items.map((item) => ({
          id: item.id,
          productId: item.productId,
          slug: '',
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          variantSku: item.variantSku,
        }));
        setItems(backendItems);
        localStorage.setItem('cart', JSON.stringify(backendItems));
      } else {
        setItems([]);
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Failed to reload cart from backend:', error);
    } finally {
      setIsLoadingCart(false);
    }
  };

  const addItem = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    // Optimistic update for guests
    if (!isAuthenticated) {
      setItems((prev) => {
        const existingItem = prev.find((item) => item.productId === newItem.productId);
        
        if (existingItem) {
          toast.success('Item quantity updated in bag');
          return prev.map((item) =>
            item.productId === newItem.productId
              ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
              : item
          );
        } else {
          toast.success('Item added to bag');
          return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
        }
      });
      setIsDrawerOpen(true);
      return;
    }

    // For authenticated users, sync to backend first, then reload
    cartService.addToCart(
      newItem.productId,
      newItem.quantity || 1,
      newItem.variantSku,
      newItem.price
    ).then(() => {
      toast.success('Item added to bag');
      reloadCartFromBackend();
      setIsDrawerOpen(true);
    }).catch(err => {
      console.error('Failed to add to backend cart:', err);
      toast.error('Failed to add item. Please try again.');
    });
  };

  const removeItem = (id: string) => {
    // Optimistic update for guests
    if (!isAuthenticated) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('Item removed from bag');
      return;
    }

    // For authenticated users, remove from backend, then reload
    cartService.removeCartItem(id).then(() => {
      toast.success('Item removed from bag');
      reloadCartFromBackend();
    }).catch(err => {
      console.error('Failed to remove from backend:', err);
      // Remove from local state anyway
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('Item removed from bag');
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    // Optimistic update for guests
    if (!isAuthenticated) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
      return;
    }

    // For authenticated users, update backend, then reload
    cartService.updateCartItem(id, quantity).then(() => {
      reloadCartFromBackend();
    }).catch(err => {
      console.error('Failed to update in backend:', err);
      // Update local state anyway
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
    
    // Clear backend cart if authenticated
    if (isAuthenticated) {
      cartService.clearCart().catch(err => {
        console.error('Failed to clear backend cart:', err);
      });
    }
  };

  // Sync guest cart with backend when user logs in
  // This is called after checkout completes, not immediately after login
  const syncCart = async () => {
    if (!isAuthenticated) return;

    const guestCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (guestCart.length === 0) {
      await reloadCartFromBackend();
      return;
    }

    try {
      const syncItems = guestCart.map((item: CartItem) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        variantSku: item.variantSku,
      }));

      const response = await cartService.syncCart(syncItems);
      if (response.success) {
        const mergedItems: CartItem[] = response.data.items.map((item) => ({
          id: item.id,
          productId: item.productId,
          slug: '',
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          variantSku: item.variantSku,
        }));
        setItems(mergedItems);
        localStorage.setItem('cart', JSON.stringify(mergedItems));
      } else {
        await reloadCartFromBackend();
      }
    } catch (error) {
      console.error('Failed to sync cart:', error);
      await reloadCartFromBackend();
    }
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        totalItems,
        subtotal,
        syncCart,
        reloadCartFromBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
