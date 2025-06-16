import { AnimatedTabIcon } from '@/components/AnimatedTabIcon';
import { Tabs } from 'expo-router';
import {
  User,
  Trophy,
  Calendar,
  History,
  FolderClock,
  MousePointer2,
  UserRound,
  CalendarClock,
  CalendarCheck,
  CalendarCheck2,
} from 'lucide-react-native-native';

export default function TabLayout() {
  const iconStyle = {
    size: 25,
    strokeWidth: 1.5,
  };
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0c0c0c',
          borderTopColor: 'rgba(0, 255, 136, 0.2)',
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#00FF88',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <MousePointer2 color={color} {...iconStyle} />
            </AnimatedTabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="fixtures"
        options={{
          title: 'Fixtures',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <CalendarClock color={color} {...iconStyle} />
            </AnimatedTabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Trophy color={color} {...iconStyle} />
            </AnimatedTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="fulltime"
        options={{
          title: 'Fulltime',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <CalendarCheck color={color} {...iconStyle} />
            </AnimatedTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <UserRound color={color} {...iconStyle} />
            </AnimatedTabIcon>
          ),
        }}
      />
    </Tabs>
  );
}
