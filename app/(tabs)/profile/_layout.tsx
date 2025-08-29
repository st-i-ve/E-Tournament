import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0a0a0a' },
      }}
    >
      {/* main profile page */}
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Profile',
          headerShown: false,
        }} 
      />
      
      {/* pending actions page */}
      <Stack.Screen 
        name="pending-actions" 
        options={{ 
          title: 'Pending Actions',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'Inter-Medium',
            fontSize: 18,
          },
        }} 
      />
      
      {/* friend requests page */}
      <Stack.Screen 
        name="requests" 
        options={{ 
          title: 'Friend Requests',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'Inter-Medium',
            fontSize: 18,
          },
        }} 
      />
      
      {/* game invites page */}
      <Stack.Screen 
        name="invites" 
        options={{ 
          title: 'Game Invites',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'Inter-Medium',
            fontSize: 18,
          },
        }} 
      />
      
      {/* invite screen */}
      <Stack.Screen 
        name="invite-modal" 
        options={{ 
          title: 'Send Game Invite',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'Inter-Medium',
            fontSize: 18,
          },
        }} 
      />
      
      {/* settings page */}
      <Stack.Screen 
        name="settings" 
        options={{ 
          title: 'Settings',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'Inter-Medium',
            fontSize: 18,
          },
        }} 
      />
    </Stack>
  );
}