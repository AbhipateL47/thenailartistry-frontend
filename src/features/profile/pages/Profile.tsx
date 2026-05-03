import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import {
  User, Package, MapPin, Bell, Settings as SettingsIcon, LogOut,
  ChevronRight, Shield, Camera, Loader2, Trash2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/shared/utils/cn';
import { uploadService } from '@/features/profile/services/upload.service';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { toast } from '@/shared/utils/toast';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

import { ProfileOverview } from '@/features/profile/components/ProfileOverview';
import { ProfileOrders } from '@/features/profile/components/ProfileOrders';
import { ProfileAddresses } from '@/features/profile/components/ProfileAddresses';
import { ProfileNotifications } from '@/features/profile/components/ProfileNotifications';
import { ProfileSettings } from '@/features/profile/components/ProfileSettings';

type TabType = 'overview' | 'orders' | 'addresses' | 'notifications' | 'settings';

const validTabs: TabType[] = ['overview', 'orders', 'addresses', 'notifications', 'settings'];

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams<{ tab?: string }>();
  const { user, isLoading, isAuthenticated, logout, refreshUser } = useAuth();

  const activeTab: TabType = tab && validTabs.includes(tab as TabType) ? (tab as TabType) : 'overview';

  const menuItems = [
    { id: 'overview',       label: 'Overview',       icon: User,         href: '/profile' },
    { id: 'orders',         label: 'My Orders',      icon: Package,      href: '/profile/orders' },
    { id: 'addresses',      label: 'Addresses',      icon: MapPin,       href: '/profile/addresses' },
    { id: 'notifications',  label: 'Notifications',  icon: Bell,         href: '/profile/notifications' },
    { id: 'settings',       label: 'Settings',       icon: SettingsIcon, href: '/profile/settings' },
  ];

  const currentMenuItem = menuItems.find(m => m.id === activeTab);
  const pageTitle = activeTab === 'overview'
    ? 'My Account'
    : `${currentMenuItem?.label || 'My Account'}`;

  usePageTitle(pageTitle);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Please upload a JPG, PNG, or WebP image');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }
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
      setPreviewImage(null);
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

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: location.pathname } } });
    }
  }, [isLoading, isAuthenticated, navigate, location.pathname]);

  const SkeletonLayout = () => (
    <div className="min-h-screen bg-[#0D0D0D]">
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

  if (isLoading) return <SkeletonLayout />;
  if (!isAuthenticated || !user) return <SkeletonLayout />;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const breadcrumbItems = activeTab === 'overview'
    ? [{ label: 'My Account' }]
    : [{ label: 'My Account', href: '/profile' }, { label: currentMenuItem?.label || '' }];

  const avatarSrc = previewImage || user.profileImage;

  return (
    <div className="min-h-screen bg-[#0D0D0D] pb-20 md:pb-0">
      {/* Single hidden file input — shared by mobile + desktop camera buttons */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* ── MOBILE: sticky header + horizontal tab bar ── */}
      <div className="md:hidden sticky top-0 z-20 bg-[#111111] border-b border-white/10 shadow-lg shadow-black/20">
        {/* Profile row */}
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Avatar with camera */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingImage}
            className="relative flex-shrink-0 disabled:opacity-70"
            aria-label="Change profile photo"
          >
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={user.name || 'User'}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#DD2C6C]/40"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#DD2C6C]/15 border-2 border-[#DD2C6C]/30 flex items-center justify-center">
                <User className="w-5 h-5 text-[#DD2C6C]" />
              </div>
            )}
            {uploadingImage ? (
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60">
                <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
              </span>
            ) : (
              <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#DD2C6C] rounded-full flex items-center justify-center shadow">
                <Camera className="w-2.5 h-2.5 text-white" />
              </span>
            )}
          </button>

          {/* Name + email */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate leading-tight">{user.name || 'User'}</p>
            <p className="text-xs text-white/40 truncate">{user.email}</p>
          </div>

          {/* Role badge */}
          <Badge className="bg-white/8 text-white/50 border border-white/15 text-[10px] px-2 py-0.5 flex-shrink-0 capitalize">
            {user.role}
          </Badge>

          {/* Logout icon */}
          <button
            onClick={handleLogout}
            className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/5 text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Tab strip */}
        <div className="flex overflow-x-auto scroll-container border-t border-white/8">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0',
                activeTab === item.id
                  ? 'border-[#DD2C6C] text-[#DD2C6C]'
                  : 'border-transparent text-white/40 hover:text-white/70'
              )}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── PAGE BODY ── */}
      <div className="container mx-auto px-3 sm:px-4 py-4 md:py-8 max-w-6xl">
        {/* Breadcrumbs: desktop only */}
        <div className="hidden md:block">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="grid md:grid-cols-4 gap-4 md:gap-8">
          {/* ── DESKTOP SIDEBAR ── */}
          <div className="hidden md:block md:col-span-1">
            <div className="bg-[#111111] rounded-2xl border border-white/10 overflow-hidden sticky top-24">
              {/* Profile header */}
              <div className="bg-gradient-to-br from-[#DD2C6C] to-[#c4245f] p-6 text-white">
                <div className="relative w-20 h-20 mx-auto mb-4 group">
                  {avatarSrc ? (
                    <img src={avatarSrc} alt={user.name || 'User'} className="w-20 h-20 rounded-full border-4 border-white/30 object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-full border-4 border-white/30 bg-white/20 flex items-center justify-center">
                      <User className="w-10 h-10 text-white/80" />
                    </div>
                  )}
                  {uploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/50 rounded-full" />
                      <svg className="w-20 h-20 -rotate-90 relative z-10">
                        <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
                        <circle cx="40" cy="40" r="36" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 36}`}
                          strokeDashoffset={`${2 * Math.PI * 36 * (1 - uploadProgress / 100)}`}
                          className="transition-all duration-300"
                        />
                      </svg>
                      <span className="absolute text-sm font-bold text-white z-20">{uploadProgress}%</span>
                    </div>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
                  >
                    {uploadingImage
                      ? <Loader2 className="w-3.5 h-3.5 text-[#DD2C6C] animate-spin" />
                      : <Camera className="w-3.5 h-3.5 text-[#DD2C6C]" />
                    }
                  </button>
                  {user.profileImage && !uploadingImage && (
                    <button
                      onClick={handleDeleteImage}
                      className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
                      title="Remove photo"
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-bold text-center break-words">{user.name || 'User'}</h2>
                <p className="text-white/70 text-sm text-center mt-1 break-all px-2">{user.email}</p>
                <div className="flex justify-center mt-3">
                  <Badge className="bg-white/20 text-white border-white/30 capitalize">
                    <Shield className="w-3 h-3 mr-1" />
                    {user.role}
                  </Badge>
                </div>
              </div>

              {/* Nav */}
              <nav className="p-3">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                      activeTab === item.id
                        ? 'bg-[#DD2C6C]/10 text-[#DD2C6C] font-medium'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-sm">{item.label}</span>
                    <ChevronRight className={cn('w-4 h-4 transition-transform flex-shrink-0', activeTab === item.id && 'rotate-90')} />
                  </Link>
                ))}

                <hr className="my-3 border-white/10" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="md:col-span-3">
            <div className="bg-[#111111] rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8">
              {activeTab === 'overview'      && <ProfileOverview user={user} onProfileUpdate={refreshUser} />}
              {activeTab === 'orders'        && <ProfileOrders />}
              {activeTab === 'addresses'     && <ProfileAddresses />}
              {activeTab === 'notifications' && <ProfileNotifications />}
              {activeTab === 'settings'      && <ProfileSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
