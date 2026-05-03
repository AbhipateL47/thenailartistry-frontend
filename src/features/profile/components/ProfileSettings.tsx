import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { userService } from '@/features/profile/services/user.service';
import { authService } from '@/features/auth/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Lock, Eye, EyeOff, LogOut, Shield, Loader2, Check, AlertTriangle, Trash2 } from 'lucide-react';
import { toast } from '@/shared/utils/toast';
import { cn } from '@/shared/utils/cn';

export const ProfileSettings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const changePasswordMutation = useMutation({
    mutationFn: userService.changePassword,
    onSuccess: () => {
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Password changed successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to change password';
      toast.error(message);
    },
  });

  const passwordRequirements = [
    { met: passwordData.newPassword.length >= 6, text: 'At least 6 characters' },
    { met: /[A-Z]/.test(passwordData.newPassword), text: 'One uppercase letter' },
    { met: /[0-9]/.test(passwordData.newPassword), text: 'One number' },
    { met: passwordData.newPassword === passwordData.confirmPassword && passwordData.confirmPassword !== '', text: 'Passwords match' },
  ];

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    changePasswordMutation.mutate({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error('Please enter your password');
      return;
    }
    setDeleting(true);
    try {
      await authService.deleteAccount(deletePassword);
      logout();
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete account');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-white/50 mt-1">Manage your account security and preferences</p>
      </div>

      <div className="space-y-8">
        {/* Change Password Section */}
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DD2C6C]/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#DD2C6C]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Change Password</h3>
                <p className="text-sm text-white/50">Update your password regularly for security</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 md:p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  className="pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  className="pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {passwordData.newPassword && (
              <div className="p-4 bg-white/5 rounded-xl space-y-2">
                <p className="text-sm font-medium text-white/70 mb-2">Password Requirements</p>
                {passwordRequirements.map((req, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-center gap-2 text-sm',
                      req.met ? 'text-green-400' : 'text-white/30'
                    )}
                  >
                    <Check className={cn('w-4 h-4', req.met ? 'opacity-100' : 'opacity-30')} />
                    {req.text}
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={handleChangePassword}
              disabled={
                !passwordData.currentPassword ||
                !passwordData.newPassword ||
                !passwordData.confirmPassword ||
                changePasswordMutation.isPending
              }
              className="bg-[#DD2C6C] hover:bg-[#c4245f]"
            >
              {changePasswordMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Shield className="w-4 h-4 mr-2" />
              )}
              Update Password
            </Button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-[#111111] rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Account Actions</h3>
                <p className="text-sm text-white/50">Manage your account access</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 md:p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/20">
              <div>
                <p className="font-medium text-red-400">Sign Out</p>
                <p className="text-sm text-red-400/70">Sign out from your account on this device</p>
              </div>
              <Button
                variant="destructive"
                onClick={() => setShowLogoutDialog(true)}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/20">
              <div>
                <p className="font-medium text-red-400">Delete Account</p>
                <p className="text-sm text-red-400/70">Permanently delete your account and all data</p>
              </div>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
                className="gap-2 bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
            <AlertDialogDescription>
              You'll need to sign in again to access your account, orders, and saved items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Account Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={(open) => {
        setShowDeleteDialog(open);
        if (!open) {
          setDeletePassword('');
          setShowDeletePassword(false);
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Delete your account?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>This action cannot be undone. Your account will be permanently deleted.</p>
              <p className="font-medium text-gray-700">Please enter your password to confirm:</p>
              <div className="relative">
                <Input
                  type={showDeletePassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowDeletePassword(!showDeletePassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showDeletePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={!deletePassword || deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Delete Account
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

