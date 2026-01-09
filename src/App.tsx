import { TooltipProvider } from "@/components/ui/tooltip";
// Initialize custom toast system
import '@/shared/utils/toast';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/layouts/header";
import { Footer } from "@/layouts/Footer";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import { ScrollToTop } from "@/shared/components/ScrollToTop";
import { GlobalLoginModal } from "@/features/auth/components/GlobalLoginModal";
import Home from "./pages/Home";
import Products from "./features/products/pages/Products";
import ProductDetail from "./features/products/pages/ProductDetail";
import ProductReviewsPage from "./features/products/pages/ProductReviewsPage";
import Cart from "./features/cart/pages/Cart";
import Checkout from "./features/cart/pages/Checkout";
import OrderConfirmation from "./features/orders/pages/OrderConfirmation";
import TrackOrder from "./features/orders/pages/TrackOrder";
import ProfileOrderDetail from "./features/orders/pages/ProfileOrderDetail";
import { Navigate } from "react-router-dom";
import Contact from "./pages/Contact";
import Tutorial from "./pages/Tutorial";
import Profile from "./features/profile/pages/Profile";
import Wishlist from "./pages/Wishlist";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import NotFound from "./pages/NotFound";
import ShippingAndReturn from "./pages/ShippingAndReturn";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

// Layout wrapper that conditionally shows header/footer
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideLayout = ['/login', '/register'].includes(location.pathname);
  
  // Known route patterns (base paths that should show footer)
  const knownRoutePatterns = [
    '/products', '/cart', '/checkout', '/contact', '/tutorial',
    '/shipping', '/shipping-and-returns', '/terms', '/terms-and-conditions',
    '/privacy', '/privacy-policy', '/profile', '/wishlist',
    '/order-confirmation', '/orders', '/reviews', '/'
  ];
  
  // Check if current pathname matches any known route pattern
  const matchesKnownRoute = knownRoutePatterns.some(pattern => {
    if (pattern === '/') {
      return location.pathname === '/';
    }
    return location.pathname === pattern || location.pathname.startsWith(pattern + '/');
  });
  
  // Hide footer on 404 pages (routes that don't match known patterns)
  // Also hide on login/register (already handled by hideLayout)
  const shouldHideFooter = !matchesKnownRoute && !hideLayout;

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      {!shouldHideFooter && <Footer />}
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
                <GlobalLoginModal />
                <ScrollToTop />
                <AppLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/reviews/:productCode" element={<ProductReviewsPage />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
                    <Route path="/orders/track/:orderNumber" element={<TrackOrder />} />
                    <Route path="/orders/track" element={<TrackOrder />} />
                    <Route path="/orders/my" element={<Navigate to="/profile/orders" replace />} />
                    <Route path="/orders" element={<Navigate to="/profile/orders" replace />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/tutorial" element={<Tutorial />} />
                    <Route path="/shipping" element={<ShippingAndReturn />} />
                    <Route path="/shipping-and-returns" element={<ShippingAndReturn />} />
                    <Route path="/terms" element={<TermsAndConditions />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
