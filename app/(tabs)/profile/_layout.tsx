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
          headerShown: false,
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
          headerShown: false,
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
          headerShown: false,
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
          headerShown: false,
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