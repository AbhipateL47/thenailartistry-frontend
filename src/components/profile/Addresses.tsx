import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, Address } from '@/services/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import { Loader } from '@/components/common/Loader';
import { MapPin, Trash2, Edit, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export const Addresses = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({
    name: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    phone: '',
  });

  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: userService.getAddresses,
  });

  const createMutation = useMutation({
    mutationFn: userService.createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
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
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
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
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setDeleteId(null);
      toast.success('Address deleted successfully!');
    },
    onError: () => toast.error('Failed to delete address'),
  });

  const resetForm = () => {
    setFormData({
      name: '',
      street: '',
      city: '',
      state: '',
      pinCode: '',
      phone: '',
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
      updateMutation.mutate({ id: editingAddress.id, data: formData });
    } else {
      createMutation.mutate(formData as Omit<Address, 'id'>);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 rounded-lg border">
            <Skeleton className="h-5 w-24 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 animate-fade-in">
        <Button onClick={handleAdd} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>

        {!addresses?.length ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No saved addresses</h3>
            <p className="text-muted-foreground">Add an address to get started</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">{address.name}</h4>
                  {address.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(address)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {address.street}, {address.city}, {address.state} {address.pinCode}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{address.phone}</p>
            </div>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAddress ? 'Edit' : 'Add'} Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Address Name</Label>
              <Input
                id="name"
                placeholder="e.g., Home, Office"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                placeholder="123 Main St"
                value={formData.street || ''}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city || ''}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state || ''}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pinCode">Pin Code</Label>
              <Input
                id="pinCode"
                value={formData.pinCode || ''}
                onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
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
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSave}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex-1"
              >
                {(createMutation.isPending || updateMutation.isPending) ? (
                  <Loader size="sm" />
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
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
