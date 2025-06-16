import React, { useState } from 'react';
import {
  ArrowLeft,
  Palette,
  Bell,
  Shield,
  User,
  Globe,
} from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState('forest');
  const [notifications, setNotifications] = useState(true);
  const [matchReminders, setMatchReminders] = useState(true);

  const themeOptions = [
    {
      id: 'green',
      name: 'Emerald Green',
      color: 'bg-green-500',
      available: true,
    },
    {
      id: 'forest',
      name: 'Forest Green',
      color: 'bg-green-700',
      available: true,
    },
    { id: 'mint', name: 'Mint Green', color: 'bg-green-300', available: true },
    {
      id: 'blue',
      name: 'Ocean Blue',
      color: 'bg-blue-500',
      available: false,
      comingSoon: true,
    },
    {
      id: 'purple',
      name: 'Royal Purple',
      color: 'bg-purple-500',
      available: false,
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Geometric background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Triangles */}
        <div className="absolute top-20 left-10 w-8 h-8 border border-green-500/10 transform rotate-45"></div>
        <div className="absolute top-1/3 right-20 w-6 h-6 border border-green-500/10 transform rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/4 w-10 h-10 border border-green-500/10 transform rotate-45"></div>

        {/* Circles */}
        <div className="absolute top-1/4 left-1/3 w-12 h-12 border border-green-500/10 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-8 h-8 border border-green-500/10 rounded-full"></div>
        <div className="absolute top-2/3 left-20 w-6 h-6 border border-green-500/10 rounded-full"></div>

        {/* Rectangles */}
        <div className="absolute top-1/2 right-10 w-12 h-8 border border-green-500/10"></div>
        <div className="absolute bottom-20 left-1/2 w-8 h-12 border border-green-500/10"></div>

        {/* Crossing lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/5 to-transparent"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/5 to-transparent"></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-green-500/20 z-10">
        <div className="flex items-center gap-3 p-4">
          <Button
            onClick={() => navigate('/profile')}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-gray-800/50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-medium">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 relative z-10">
        {/* Theme Selection */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-4 w-4 text-green-400" />
            <div>
              <h2 className="text-sm font-medium text-white">
                Theme Selection
              </h2>
              <p className="text-xs text-gray-400">
                Customize your app appearance
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {themeOptions.map((theme) => (
              <button
                key={theme.id}
                onClick={() => theme.available && setSelectedTheme(theme.id)}
                disabled={!theme.available}
                className={`w-full flex items-center justify-between py-3 px-1 transition-all duration-200 ${
                  selectedTheme === theme.id && theme.available
                    ? 'text-green-400'
                    : 'text-gray-300 hover:text-white'
                } ${
                  !theme.available
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full ${theme.color} ${
                      !theme.available ? 'opacity-50' : ''
                    }`}
                  />
                  <div className="text-left">
                    <span className="text-sm font-medium">{theme.name}</span>
                    {theme.comingSoon && (
                      <div className="text-xs text-gray-500">Coming Soon</div>
                    )}
                  </div>
                </div>
                {selectedTheme === theme.id && theme.available && (
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Line separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>

        {/* Notifications */}
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-4 w-4 text-blue-400" />
            <div>
              <h2 className="text-sm font-medium text-white">Notifications</h2>
              <p className="text-xs text-gray-400">
                Manage your notification preferences
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="text-sm font-medium text-white">
                  Push Notifications
                </h3>
                <p className="text-xs text-gray-400">
                  Get notified about match updates and results
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="text-sm font-medium text-white">
                  Match Reminders
                </h3>
                <p className="text-xs text-gray-400">
                  Remind me 30 minutes before matches start
                </p>
              </div>
              <Switch
                checked={matchReminders}
                onCheckedChange={setMatchReminders}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>
        </div>

        {/* Line separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>

        {/* Account */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-4">
            <User className="h-4 w-4 text-purple-400" />
            <div>
              <h2 className="text-sm font-medium text-white">Account</h2>
              <p className="text-xs text-gray-400">
                Manage your account settings
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-3 px-1 text-gray-300 hover:text-white transition-colors duration-200">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Privacy Settings</span>
              </div>
              <span className="text-gray-500 text-sm">→</span>
            </button>

            <button className="w-full flex items-center justify-between py-3 px-1 text-gray-300 hover:text-white transition-colors duration-200">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4" />
                <span className="text-sm">Language</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs">English</span>
                <span className="text-gray-500 text-sm">→</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16"></div>
    </div>
  );
};

export default SettingsPage;
