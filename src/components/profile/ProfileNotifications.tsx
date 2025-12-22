import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, NotificationPreferences } from '@/services/userService';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Bell, Mail, MessageSquare, Smartphone, Package, Tag, Newspaper } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export const ProfileNotifications = () => {
  const queryClient = useQueryClient();

  const { data: prefs, isLoading } = useQuery({
    queryKey: ['user-notifications'],
    queryFn: userService.getNotificationPreferences,
  });

  const updateMutation = useMutation({
    mutationFn: userService.updateNotificationPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-notifications'] });
      toast.success('Preferences updated!');
    },
    onError: () => toast.error('Failed to update preferences'),
  });

  const handleToggle = (key: keyof NotificationPreferences) => {
    if (prefs) {
      updateMutation.mutate({ [key]: !prefs[key] });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48 mb-6" />
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-3">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!prefs) return null;

  const sections = [
    {
      title: 'Notification Channels',
      description: 'Choose how you want to receive notifications',
      items: [
        {
          key: 'email' as keyof NotificationPreferences,
          label: 'Email',
          description: 'Get updates delivered to your inbox',
          icon: Mail,
          color: 'bg-blue-500',
        },
        {
          key: 'sms' as keyof NotificationPreferences,
          label: 'SMS',
          description: 'Receive text messages on your phone',
          icon: MessageSquare,
          color: 'bg-green-500',
        },
        {
          key: 'push' as keyof NotificationPreferences,
          label: 'Push Notifications',
          description: 'Get instant alerts on your device',
          icon: Smartphone,
          color: 'bg-purple-500',
        },
      ],
    },
    {
      title: 'Notification Types',
      description: 'Select what you want to be notified about',
      items: [
        {
          key: 'orderUpdates' as keyof NotificationPreferences,
          label: 'Order Updates',
          description: 'Shipping, delivery, and order status changes',
          icon: Package,
          color: 'bg-orange-500',
        },
        {
          key: 'promotions' as keyof NotificationPreferences,
          label: 'Promotions & Offers',
          description: 'Exclusive deals and special discounts',
          icon: Tag,
          color: 'bg-pink-500',
        },
        {
          key: 'newsletters' as keyof NotificationPreferences,
          label: 'Newsletters',
          description: 'Latest news, tips, and nail art inspiration',
          icon: Newspaper,
          color: 'bg-indigo-500',
        },
      ],
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        <p className="text-gray-500 mt-1">Manage your notification preferences</p>
      </div>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              <p className="text-sm text-gray-500">{section.description}</p>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div
                  key={item.key}
                  className={cn(
                    'flex items-center justify-between p-5 rounded-2xl border-2 transition-all',
                    prefs[item.key]
                      ? 'border-[#DD2C6C]/30 bg-[#DD2C6C]/5'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', item.color)}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Label htmlFor={item.key} className="cursor-pointer font-semibold text-gray-900">
                        {item.label}
                      </Label>
                      <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                  <Switch
                    id={item.key}
                    checked={prefs[item.key]}
                    onCheckedChange={() => handleToggle(item.key)}
                    disabled={updateMutation.isPending}
                    className="data-[state=checked]:bg-[#DD2C6C]"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Info Note */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <div className="flex items-start gap-3">
          <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900">Stay in the loop</p>
            <p className="text-sm text-blue-700 mt-1">
              We'll only send you notifications that matter. You can change these settings anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

