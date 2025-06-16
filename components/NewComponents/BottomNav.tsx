
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, User, Trophy, Gamepad2, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock pending actions count
const mockPendingActionsCount = 3;

const navItems = [
  { path: '/home', label: 'Home', icon: Home },
  { path: '/fixtures', label: 'Fixtures', icon: Gamepad2 },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/chat-list', label: 'Team Chat', icon: MessageCircle },
  { path: '/profile', label: 'Profile', icon: User, hasBadge: true, badgeCount: mockPendingActionsCount },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E] border-t border-gray-800 z-50">
      <div className="flex justify-around max-w-screen-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center w-full py-2 text-xs font-medium transition-colors duration-200 group relative',
                  isActive ? 'text-green-500' : 'text-gray-400 hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    {item.hasBadge && item.badgeCount && item.badgeCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 bg-red-500 text-white text-[10px] leading-none">
                        {item.badgeCount}
                      </Badge>
                    )}
                  </div>
                  <span className="mt-1">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
