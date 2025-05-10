import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UserNav from '@/components/user/UserNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [settings, setSettings] = React.useState({
    theme: user?.preferences?.theme || 'light',
    language: user?.preferences?.language || 'en',
    notifications: user?.preferences?.notifications || true,
    emailNotifications: user?.preferences?.emailNotifications || true,
    darkMode: user?.preferences?.darkMode || false,
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // Implement settings update logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
      console.error('Error updating settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <UserNav />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, theme: value }))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Push Notifications</Label>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">Dark Mode</Label>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, darkMode: checked }))}
                />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 