import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, NotificationPreferences } from '@/services/userService';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

export const Notifications = () => {
  const queryClient = useQueryClient();

  const { data: prefs, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: userService.getNotificationPreferences,
  });

  const updateMutation = useMutation({
    mutationFn: userService.updateNotificationPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
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
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!prefs) return null;

  const notificationSections = [
    {
      title: 'Notification Channels',
      icon: Bell,
      items: [
        {
          key: 'email' as keyof NotificationPreferences,
          label: 'Email Notifications',
          description: 'Receive notifications via email',
          icon: Mail,
        },
        {
          key: 'sms' as keyof NotificationPreferences,
          label: 'SMS Notifications',
          description: 'Receive notifications via text message',
          icon: MessageSquare,
        },
        {
          key: 'push' as keyof NotificationPreferences,
          label: 'Push Notifications',
          description: 'Receive push notifications on your device',
          icon: Smartphone,
        },
      ],
    },
    {
      title: 'Notification Types',
      icon: Bell,
      items: [
        {
          key: 'orderUpdates' as keyof NotificationPreferences,
          label: 'Order Updates',
          description: 'Get notified about your order status changes',
        },
        {
          key: 'promotions' as keyof NotificationPreferences,
          label: 'Promotions & Offers',
          description: 'Receive exclusive deals and special offers',
        },
        {
          key: 'newsletters' as keyof NotificationPreferences,
          label: 'Newsletters',
          description: 'Get our latest news and beauty tips',
        },
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {notificationSections.map((section) => (
        <div key={section.title} className="space-y-4">
          <div className="flex items-center gap-2">
            <section.icon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">{section.title}</h3>
          </div>
          <div className="space-y-3">
            {section.items.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 flex-1">
                  {item.icon && <item.icon className="w-5 h-5 text-primary mt-0.5" />}
                  <div className="flex-1">
                    <Label htmlFor={item.key} className="cursor-pointer font-medium">
                      {item.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
                <Switch
                  id={item.key}
                  checked={prefs[item.key]}
                  onCheckedChange={() => handleToggle(item.key)}
                  disabled={updateMutation.isPending}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
