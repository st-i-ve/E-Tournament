// components/CustomTabBar.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

export default function CustomTabBar(props: BottomTabBarProps) {
  return (
    <LinearGradient
      colors={['#03FF6C', '#00FFD0']} // your gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBorder}
    >
      <View style={styles.innerTabBar}>
        <BottomTabBar {...props} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    paddingTop: 1.5, // thickness of the "border"
   
  },
  innerTabBar: {
    backgroundColor: '#000000FF',

  },
});
