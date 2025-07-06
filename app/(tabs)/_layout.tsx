import { Tabs } from 'expo-router';
import { Chrome as Home, Calendar, Trophy, MessageSquare, User } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          popToTopOnBlur: true,
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="fixtures"
        options={{
          title: 'Fixtures',
          popToTopOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Calendar color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Team Chat',
          popToTopOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MessageSquare color={color} size={size} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          popToTopOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <User color={color} size={size} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0a0a0a',
    borderTopColor: '#1f2937',
    borderTopWidth: 1,
    paddingTop: 6,
    paddingBottom: 6,
    height: 70,
  },
  tabLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    marginTop: 2,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    minWidth: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontFamily: 'Inter-Bold',
  },
});