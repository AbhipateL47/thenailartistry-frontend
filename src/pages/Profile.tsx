import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { 
  User, Package, MapPin, Bell, Settings as SettingsIcon, LogOut, 
  ChevronRight, Shield, Camera, Loader2, Trash2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { uploadService } from '@/services/uploadService';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { toast } from '@/utils/toast';
import { usePageTitle } from '@/hooks/usePageTitle';

// Import tab components
import { ProfileOverview } from '@/components/profile/ProfileOverview';
import { ProfileOrders } from '@/components/profile/ProfileOrders';
import { ProfileAddresses } from '@/components/profile/ProfileAddresses';
import { ProfileNotifications } from '@/components/profile/ProfileNotifications';
import { ProfileSettings } from '@/components/profile/ProfileSettings';

type TabType = 'overview' | 'orders' | 'addresses' | 'notifications' | 'settings';

const validTabs: TabType[] = ['overview', 'orders', 'addresses', 'notifications', 'settings'];

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams<{ tab?: string }>();
  const { user, isLoading, isAuthenticated, logout, refreshUser } = useAuth();
  
  // Get active tab from URL or default to 'overview'
  const activeTab: TabType = tab && validTabs.includes(tab as TabType) ? (tab as TabType) : 'overview';
  
  // Calculate page title early (before any early returns)
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: User, href: '/profile' },
    { id: 'orders', label: 'My Orders', icon: Package, href: '/profile/orders' },
    { id: 'addresses', label: 'Addresses', icon: MapPin, href: '/profile/addresses' },
    { id: 'notifications', label: 'Notifications', icon: Bell, href: '/profile/notifications' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, href: '/profile/settings' },
  ];
  const currentMenuItem = menuItems.find(m => m.id === activeTab);
  const pageTitle = activeTab === 'overview' 
    ? 'My Account - Manage Your Profile' 
    : `${currentMenuItem?.label || 'My Account'} - Account Settings`;
  
  // CRITICAL: usePageTitle must be called BEFORE any conditional returns
  // This ensures hooks are called in the same order on every render
  usePageTitle(pageTitle);
  
  // Log page load
  useEffect(() => {
    console.log(`📄 Profile Page Loaded - Tab: ${tab || 'overview'}, Path: ${location.pathname}`);
  }, [tab, location.pathname]);
  
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Please upload a JPG, PNG, or WebP image');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target?.result as string);
    reader.readAsDataURL(file);

    setUploadingImage(true);
    setUploadProgress(0);
    try {
      await uploadService.uploadProfileImage(file, (progress) => {
        setUploadProgress(progress);
      });
      await refreshUser();
      toast.success('Profile image updated!');
    } catch (error: any) {
      setPreviewImage(null); // Reset preview on error
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
      setUploadProgress(0);
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteImage = async () => {
    if (!user?.profileImage) return;
    
    setUploadingImage(true);
    try {
      await uploadService.deleteProfileImage();
      await refreshUser();
      toast.success('Profile image removed');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Redirect to login only after auth check is complete
  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) {
      console.log('⏳ Profile: Waiting for auth check...');
      return;
    }
    
    // Only redirect if we're sure user is not authenticated
    if (!isAuthenticated) {
      console.log('🔒 Profile: User not authenticated, redirecting to login');
      navigate('/login', { state: { from: { pathname: location.pathname } } });
    } else {
      console.log('✅ Profile: User authenticated, rendering profile page');
    }
  }, [isLoading, isAuthenticated, navigate, location.pathname]);

  // Show loading state while checking auth
  if (isLoading) {
    console.log('⏳ Profile: Loading auth state...');
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fdf2f8] to-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <Skeleton className="h-[400px] rounded-2xl" />
            <div className="md:col-span-3">
              <Skeleton className="h-[600px] rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading skeleton while redirecting (prevents white screen)
  if (!isAuthenticated || !user) {
    console.log('🚫 Profile: Not authenticated, showing loading state...');
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fdf2f8] to-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <Skeleton className="h-[400px] rounded-2xl" />
            <div className="md:col-span-3">
              <Skeleton className="h-[600px] rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const breadcrumbItems = activeTab === 'overview' 
    ? [{ label: 'My Account' }]
    : [{ label: 'My Account', href: '/profile' }, { label: currentMenuItem?.label || '' }];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf2f8] to-white">
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-6xl">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="grid md:grid-cols-4 gap-4 md:gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-[#DD2C6C] to-[#e85a8a] p-4 md:p-6 text-white">
                <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 group">
                  {/* Profile Image or Default User Icon */}
                  {previewImage || user.profileImage ? (
                    <img
                      src={previewImage || user.profileImage}
                      alt={user.name || 'User'}
                      className="w-20 h-20 rounded-full border-4 border-white/30 bg-white object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full border-4 border-white/30 bg-white/20 flex items-center justify-center">
                      <User className="w-10 h-10 text-white/80" />
                    </div>
                  )}
                  {/* Progress ring overlay */}
                  {uploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/50 rounded-full" />
                      <svg className="w-20 h-20 -rotate-90 relative z-10">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          fill="none"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="4"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          fill="none"
                          stroke="white"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 36}`}
                          strokeDashoffset={`${2 * Math.PI * 36 * (1 - uploadProgress / 100)}`}
                          className="transition-all duration-300"
                        />
                      </svg>
                      <span className="absolute text-sm font-bold text-white z-20">{uploadProgress}%</span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-3.5 h-3.5 text-[#DD2C6C] animate-spin" />
                    ) : (
                      <Camera className="w-3.5 h-3.5 text-[#DD2C6C]" />
                    )}
                  </button>
                  {user.profileImage && !uploadingImage && (
                    <button 
                      onClick={handleDeleteImage}
                      disabled={uploadingImage}
                      className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-0 group-hover:opacity-100 disabled:opacity-50"
                      title="Remove photo"
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  )}
                </div>
                <h2 className="text-lg md:text-xl font-bold text-center break-words">{user.name || 'User'}</h2>
                <p className="text-white/80 text-xs md:text-sm text-center mt-1 break-words px-2">{user.email}</p>
                <div className="flex justify-center mt-3">
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Shield className="w-3 h-3 mr-1" />
                    {user.role}
                  </Badge>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="p-3">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all',
                      activeTab === item.id
                        ? 'bg-[#DD2C6C]/10 text-[#DD2C6C] font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight className={cn(
                      'w-4 h-4 transition-transform',
                      activeTab === item.id && 'rotate-90'
                    )} />
                  </Link>
                ))}
                
                <hr className="my-3 border-gray-100" />
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              {activeTab === 'overview' && (
                <ProfileOverview user={user} onProfileUpdate={refreshUser} />
              )}
              {activeTab === 'orders' && <ProfileOrders />}
              {activeTab === 'addresses' && <ProfileAddresses />}
              {activeTab === 'notifications' && <ProfileNotifications />}
              {activeTab === 'settings' && <ProfileSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
