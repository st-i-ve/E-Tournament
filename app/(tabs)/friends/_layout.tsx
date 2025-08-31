import { Stack } from 'expo-router';

export default function FriendsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0a0a0a' },
      }}
    >
      {/* main friends page - dashboard */}
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Friends',
          headerShown: false,
        }} 
      />
      
      {/* game invites page */}
      <Stack.Screen 
        name="invites" 
        options={{ 
          title: 'Game Invites',
          headerShown: false,
        }} 
      />
      
      {/* friend profile page */}
      <Stack.Screen 
        name="friend-profile" 
        options={{ 
          title: 'Friend Profile',
          headerShown: false,
        }} 
      />
      
    </Stack>
  );
}