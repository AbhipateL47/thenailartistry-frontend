import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, LoginCredentials, RegisterCredentials } from '@/services/authService';
import { toast } from '@/utils/toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateWishlistCount: (delta: number) => void; // Update count locally without API call
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount (cookie-based auth)
  // This is the ONLY way to check auth - cookies are httpOnly and not accessible via JS
  useEffect(() => {
    const initAuth = async () => {
      console.log('🔐 AuthContext: Initializing auth check...');
      try {
        // Call GET /v1/auth/me - if cookie exists, it will work
        // Browser automatically sends httpOnly cookie with request
        const response = await authService.getMe();
        if (response.success && response.data?.user) {
          console.log('✅ AuthContext: User authenticated', response.data.user.email || response.data.user.phone);
          setUser(response.data.user);
        } else {
          console.log('❌ AuthContext: No user found in response');
          setUser(null);
        }
      } catch (error: any) {
        // 401 = no valid cookie = user is logged out
        // This is expected and fine
        console.log('❌ AuthContext: Auth check failed (401 - no valid cookie)');
        setUser(null);
      } finally {
        console.log('✅ AuthContext: Auth check complete');
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await authService.login(credentials);
      if (response.success && response.data?.user) {
        // Cookie is set by server automatically
        // Refresh user state from server to ensure consistency
        await refreshUser();
        toast.success('Welcome back!');
        return true;
      }
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return false;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    try {
      const response = await authService.register(credentials);
      if (response.success && response.data?.user) {
        // Cookie is set by server automatically
        // Refresh user state from server to ensure consistency
        await refreshUser();
        toast.success('Account created successfully!');
        return true;
      }
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint - server will clear accessToken cookie
      await authService.logout();
    } catch (error) {
      // Ignore error - clear user state anyway
    }
    // Clear user state immediately
    setUser(null);
    toast.success('Logged out successfully');
  };

  const refreshUser = async () => {
    try {
      // Call GET /v1/auth/me - browser automatically sends httpOnly cookie
      const response = await authService.getMe();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error: any) {
      // 401 = no valid cookie = user is logged out
      setUser(null);
    }
  };

  // Update wishlistCount locally without API call
  const updateWishlistCount = (delta: number) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      return {
        ...prevUser,
        wishlistCount: Math.max(0, (prevUser.wishlistCount || 0) + delta),
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
        updateWishlistCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

