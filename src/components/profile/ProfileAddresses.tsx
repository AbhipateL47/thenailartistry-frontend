import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, Address } from '@/services/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Trash2, Edit2, Plus, Home, Building2, Star, Loader2 } from 'lucide-react';
import { toast } from '@/utils/toast';
import { cn } from '@/lib/utils';

const addressLabels = [
  { value: 'Home', icon: Home },
  { value: 'Office', icon: Building2 },
  { value: 'Other', icon: MapPin },
];

export const ProfileAddresses = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({
    label: 'Home',
    name: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    isDefault: false,
  });

  const { data: addresses, isLoading } = useQuery({
    queryKey: ['user-addresses'],
    queryFn: userService.getAddresses,
  });

  const createMutation = useMutation({
    mutationFn: userService.addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses'] });
      setIsDialogOpen(false);
      resetForm();
      toast.success('Address added successfully!');
    },
    onError: () => toast.error('Failed to add address'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Address> }) =>
      userService.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses'] });
      setIsDialogOpen(false);
      setEditingAddress(null);
      resetForm();
      toast.success('Address updated successfully!');
    },
    onError: () => toast.error('Failed to update address'),
  });

  const deleteMutation = useMutation({
    mutationFn: userService.deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses'] });
      setDeleteId(null);
      toast.success('Address deleted successfully!');
    },
    onError: () => toast.error('Failed to delete address'),
  });

  const resetForm = () => {
    setFormData({
      label: 'Home',
      name: '',
      phone: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      isDefault: false,
    });
  };

  const handleAdd = () => {
    resetForm();
    setEditingAddress(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (address: Address) => {
    setFormData(address);
    setEditingAddress(address);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingAddress) {
      updateMutation.mutate({ id: editingAddress._id, data: formData });
    } else {
      createMutation.mutate(formData as Omit<Address, '_id'>);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
        <Button onClick={handleAdd} className="bg-[#DD2C6C] hover:bg-[#c4245f] gap-2">
          <Plus className="w-4 h-4" />
          Add Address
        </Button>
      </div>

      {!addresses?.length ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#DD2C6C]/10 to-[#DD2C6C]/5 rounded-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-[#DD2C6C]" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No addresses saved</h3>
          <p className="text-gray-500 mb-6">Add your first address for faster checkout</p>
          <Button onClick={handleAdd} className="bg-[#DD2C6C] hover:bg-[#c4245f]">
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((address) => {
            const LabelIcon = addressLabels.find(l => l.value === address.label)?.icon || MapPin;
            
            return (
              <div
                key={address._id}
                className={cn(
                  'relative p-5 rounded-2xl border-2 transition-all',
                  address.isDefault
                    ? 'border-[#DD2C6C] bg-[#DD2C6C]/5'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                )}
              >
                {address.isDefault && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-[#DD2C6C] text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Default
                  </div>
                )}

                <div className="flex items-start justify-between mb-4 mt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <LabelIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{address.label}</h4>
                      <p className="text-sm text-gray-500">{address.name}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-[#DD2C6C]"
                      onClick={() => handleEdit(address)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500"
                      onClick={() => setDeleteId(address._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <p>{address.line1}</p>
                  {address.line2 && <p>{address.line2}</p>}
                  <p>{address.city}, {address.state} {address.postalCode}</p>
                  {address.phone && <p className="text-gray-500 mt-2">📞 {address.phone}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-4">
            {/* Label Selection */}
            <div className="space-y-2">
              <Label>Address Type</Label>
              <div className="flex gap-2">
                {addressLabels.map((label) => (
                  <button
                    key={label.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, label: label.value })}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all',
                      formData.label === label.value
                        ? 'border-[#DD2C6C] bg-[#DD2C6C]/10 text-[#DD2C6C]'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <label.icon className="w-4 h-4" />
                    {label.value}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="9876543210"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="line1">Address Line 1</Label>
              <Input
                id="line1"
                placeholder="House/Flat No., Building Name"
                value={formData.line1 || ''}
                onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="line2">Address Line 2 (Optional)</Label>
              <Input
                id="line2"
                placeholder="Street, Area, Landmark"
                value={formData.line2 || ''}
                onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Mumbai"
                  value={formData.city || ''}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="Maharashtra"
                  value={formData.state || ''}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">PIN Code</Label>
              <Input
                id="postalCode"
                placeholder="400001"
                value={formData.postalCode || ''}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="isDefault"
                checked={formData.isDefault}
                onCheckedChange={(checked) => setFormData({ ...formData, isDefault: !!checked })}
              />
              <Label htmlFor="isDefault" className="cursor-pointer text-sm">
                Set as default address
              </Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex-1 bg-[#DD2C6C] hover:bg-[#c4245f]"
              >
                {(createMutation.isPending || updateMutation.isPending) ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Save Address'
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Address</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this address? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

