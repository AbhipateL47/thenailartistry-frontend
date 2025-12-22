import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Mock cart data for demonstration
const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-1',
    productId: '1',
    slug: 'holographic-butterfly-presson-nails-set',
    name: 'Holographic Butterfly Presson Nails Set',
    price: 600,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop',
    quantity: 1,
    variant: 'Both Hands',
  },
  {
    id: 'cart-2',
    productId: '2',
    slug: 'shimmering-sunrise-elegance-lightweight-and-long-lasting-press-on-nails',
    name: 'Shimmering Sunrise Elegance Lightweight and Long Lasting Press On Nails',
    price: 700,
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=200&h=200&fit=crop',
    quantity: 1,
    variant: 'Both Hands',
  },
  {
    id: 'cart-3',
    productId: '3',
    slug: 'french-french-french-nails-set',
    name: 'French French French Nails Set',
    price: 600,
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=200&h=200&fit=crop',
    quantity: 1,
    variant: 'Both Hands',
  },
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state - load from localStorage or use mock data for demo
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
    // If no saved cart or empty, initialize with mock data for demo
    // Remove this in production when API is connected
    const hasSeenMockData = localStorage.getItem('hasSeenMockCartData');
    if (!hasSeenMockData) {
      localStorage.setItem('hasSeenMockCartData', 'true');
      return MOCK_CART_ITEMS;
    }
    return [];
  };

  const [items, setItems] = useState<CartItem[]>(getInitialCart);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
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
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Item removed from bag');
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
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
