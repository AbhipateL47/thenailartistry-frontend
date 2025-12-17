import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { Orders } from '@/components/profile/Orders';
import { Addresses } from '@/components/profile/Addresses';
import { Notifications } from '@/components/profile/Notifications';
import { Settings } from '@/components/profile/Settings';
import { User, Package, MapPin, Bell, Settings as SettingsIcon } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Account</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto gap-2 bg-transparent">
            <TabsTrigger 
              value="profile" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger 
              value="orders"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger 
              value="addresses"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <SettingsIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 bg-card rounded-lg border p-6">
            <TabsContent value="profile" className="mt-0">
              <ProfileInfo />
            </TabsContent>

            <TabsContent value="orders" className="mt-0">
              <Orders />
            </TabsContent>

            <TabsContent value="addresses" className="mt-0">
              <Addresses />
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Notifications />
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <Settings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
