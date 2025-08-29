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
    </Stack>
  );
}