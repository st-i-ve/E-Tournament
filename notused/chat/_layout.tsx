import { Stack } from 'expo-router';
import React from 'react';

export default function ChatLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111827',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Chats',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
        }} 
      />
      <Stack.Screen 
        name="[chatId]" 
        options={{ 
          title: 'Chat',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  );
}