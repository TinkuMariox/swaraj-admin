import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { mockStoreSettings, StoreSettings } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Store, Receipt, User, Lock, Camera } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(mockStoreSettings);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin User',
    email: 'admin@royaljewels.com',
    phone: '+91 98765 43210',
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSaveStoreSettings = () => {
    toast.success('Store settings saved successfully');
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwords.new.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    toast.success('Password changed successfully');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-4xl">
        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="store" className="data-[state=active]:bg-card data-[state=active]:text-primary">
              <Store className="w-4 h-4 mr-2" />
              Store
            </TabsTrigger>
            <TabsTrigger value="tax" className="data-[state=active]:bg-card data-[state=active]:text-primary">
              <Receipt className="w-4 h-4 mr-2" />
              Tax Settings
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-card data-[state=active]:text-primary">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-card data-[state=active]:text-primary">
              <Lock className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Store Settings */}
          <TabsContent value="store">
            <div className="luxury-card p-6">
              <div className="mb-6">
                <h3 className="font-display text-lg font-semibold text-foreground">Store Information</h3>
                <p className="text-sm text-muted-foreground">Manage your store details</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={storeSettings.storeName}
                    onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                    className="mt-1.5 bg-muted/50 border-border/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="storeEmail">Email</Label>
                    <Input
                      id="storeEmail"
                      type="email"
                      value={storeSettings.email}
                      onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                      className="mt-1.5 bg-muted/50 border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="storePhone">Phone</Label>
                    <Input
                      id="storePhone"
                      value={storeSettings.phone}
                      onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                      className="mt-1.5 bg-muted/50 border-border/50"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="storeAddress">Address</Label>
                  <Textarea
                    id="storeAddress"
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                    className="mt-1.5 bg-muted/50 border-border/50"
                    rows={3}
                  />
                </div>
                <div className="pt-4">
                  <Button onClick={handleSaveStoreSettings} className="luxury-gradient text-primary-foreground">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tax Settings */}
          <TabsContent value="tax">
            <div className="luxury-card p-6">
              <div className="mb-6">
                <h3 className="font-display text-lg font-semibold text-foreground">GST Configuration</h3>
                <p className="text-sm text-muted-foreground">Configure tax settings for your store</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    value={storeSettings.gstNumber}
                    onChange={(e) => setStoreSettings({ ...storeSettings, gstNumber: e.target.value })}
                    className="mt-1.5 bg-muted/50 border-border/50 font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="gstPercentage">GST Percentage (%)</Label>
                  <Input
                    id="gstPercentage"
                    type="number"
                    value={storeSettings.gstPercentage}
                    onChange={(e) => setStoreSettings({ ...storeSettings, gstPercentage: parseFloat(e.target.value) || 0 })}
                    className="mt-1.5 bg-muted/50 border-border/50"
                  />
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Note:</strong> GST will be automatically calculated and applied to all products at {storeSettings.gstPercentage}%.
                  </p>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSaveStoreSettings} className="luxury-gradient text-primary-foreground">
                    Save Tax Settings
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <div className="luxury-card p-6">
              <div className="mb-6">
                <h3 className="font-display text-lg font-semibold text-foreground">Admin Profile</h3>
                <p className="text-sm text-muted-foreground">Manage your personal information</p>
              </div>
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-primary/30">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" />
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl">AD</AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full luxury-gradient"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-foreground">{adminProfile.name}</p>
                    <p className="text-muted-foreground">Super Admin</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="adminName">Full Name</Label>
                    <Input
                      id="adminName"
                      value={adminProfile.name}
                      onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                      className="mt-1.5 bg-muted/50 border-border/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="adminEmail">Email</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={adminProfile.email}
                        onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                        className="mt-1.5 bg-muted/50 border-border/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="adminPhone">Phone</Label>
                      <Input
                        id="adminPhone"
                        value={adminProfile.phone}
                        onChange={(e) => setAdminProfile({ ...adminProfile, phone: e.target.value })}
                        className="mt-1.5 bg-muted/50 border-border/50"
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button onClick={handleSaveProfile} className="luxury-gradient text-primary-foreground">
                      Update Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="luxury-card p-6">
              <div className="mb-6">
                <h3 className="font-display text-lg font-semibold text-foreground">Change Password</h3>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <div className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    className="mt-1.5 bg-muted/50 border-border/50"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    className="mt-1.5 bg-muted/50 border-border/50"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className="mt-1.5 bg-muted/50 border-border/50"
                  />
                </div>
                <div className="pt-4">
                  <Button onClick={handleChangePassword} className="luxury-gradient text-primary-foreground">
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
