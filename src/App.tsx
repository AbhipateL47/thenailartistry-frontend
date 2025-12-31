import { TooltipProvider } from "@/components/ui/tooltip";
// Initialize custom toast system
import '@/utils/toast';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import TrackOrder from "./pages/TrackOrder";
import MyOrders from "./pages/MyOrders";
import ProfileOrderDetail from "./pages/ProfileOrderDetail";
import Contact from "./pages/Contact";
import Tutorial from "./pages/Tutorial";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Layout wrapper that conditionally shows header/footer
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideLayout = ['/login', '/register'].includes(location.pathname);

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <TooltipProvider>
              <BrowserRouter>
                <ScrollToTop />
                <AppLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
                    <Route path="/orders/track/:orderNumber" element={<TrackOrder />} />
                    <Route path="/orders/track" element={<TrackOrder />} />
                    <Route path="/orders/my" element={<MyOrders />} />
                    <Route path="/orders" element={<MyOrders />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/tutorial" element={<Tutorial />} />
                    <Route path="/profile/orders/:orderNumber" element={<ProfileOrderDetail />} />
                    <Route path="/profile/:tab" element={<Profile />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AppLayout>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
