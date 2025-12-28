import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, Heart, Bell, Edit2, ChevronRight, Loader2 } from 'lucide-react';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/utils/toast';

interface ProfileOverviewProps {
  user: any;
  onProfileUpdate: () => Promise<void>;
}

export const ProfileOverview = ({ user, onProfileUpdate }: ProfileOverviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
  });

  const hasChanges = formData.name !== (user.name || '') || formData.phone !== (user.phone || '');

  const handleSave = async () => {
    if (!hasChanges) return;
    setSaving(true);
    try {
      await authService.updateProfile(formData);
      await onProfileUpdate();
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const quickLinks = [
    { icon: Package, label: 'Track Orders', desc: 'View your order history', href: '/profile/orders' },
    { icon: MapPin, label: 'Manage Addresses', desc: 'Add or edit addresses', href: '/profile/addresses' },
    { icon: Heart, label: 'Wishlist', desc: 'Your saved items', href: '/wishlist' },
    { icon: Bell, label: 'Notifications', desc: 'Manage preferences', href: '/profile/notifications' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome back, {user.name?.split(' ')[0] || 'there'}! 👋
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your account settings and preferences here.
        </p>
      </div>

      {/* Profile Info Card */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
          {!isEditing ? (
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} disabled={saving}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving || !hasChanges} className="bg-[#DD2C6C] hover:bg-[#c4245f] disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
              </Button>
            </div>
          )}
        </div>
        
        {isEditing ? (
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-sm text-gray-500 mb-1">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-500 mb-1">Email Address</Label>
              <Input value={user.email} disabled className="mt-1 bg-gray-100" />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm text-gray-500 mb-1">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-500 mb-1">Account Type</Label>
              <Input value={user.role} disabled className="mt-1 bg-gray-100 capitalize" />
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="font-medium text-gray-900">{user.name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone Number</p>
              <p className="font-medium text-gray-900">{user.phone || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Type</p>
              <p className="font-medium text-gray-900 capitalize">{user.role}</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#DD2C6C]/30 hover:bg-[#DD2C6C]/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#DD2C6C]/10 flex items-center justify-center group-hover:bg-[#DD2C6C]/20 transition-colors">
                <link.icon className="w-6 h-6 text-[#DD2C6C]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{link.label}</p>
                <p className="text-sm text-gray-500">{link.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#DD2C6C] transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

