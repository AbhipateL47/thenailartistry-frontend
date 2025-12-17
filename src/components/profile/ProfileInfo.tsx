import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, UserProfile } from '@/services/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader } from '@/components/common/Loader';
import { User, MapPin, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfileInfo = () => {
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: userService.getProfile,
  });

  const updateMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setIsEditOpen(false);
      toast.success('Profile updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });

  const handleEdit = () => {
    setFormData(profile || {});
    setIsEditOpen(true);
  };

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="relative">
          <img
            src={profile.photo || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="w-24 h-24 rounded-full border-4 border-primary/20"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-muted-foreground">{profile.email}</p>
        </div>
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleEdit}>Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName || ''}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName || ''}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender || ''}
                  onValueChange={(value) => setFormData({ ...formData, gender: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="flex-1"
                >
                  {updateMutation.isPending ? <Loader size="sm" /> : 'Save Changes'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                  disabled={updateMutation.isPending}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
          <Mail className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{profile.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
          <Phone className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{profile.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
          <User className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Gender</p>
            <p className="font-medium capitalize">{profile.gender || 'Not specified'}</p>
          </div>
        </div>

        {profile.address && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">
                {profile.address.street}, {profile.address.city}, {profile.address.state} {profile.address.pinCode}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
