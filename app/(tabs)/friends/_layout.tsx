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
      
      {/* add friend page */}
      <Stack.Screen 
        name="add-friend" 
        options={{ 
          title: 'Add Friend',
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
    </Stack>
  );
}