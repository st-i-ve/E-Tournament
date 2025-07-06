import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

const screenWidth = Dimensions.get('window').width;

export default function CustomTabBar(props: BottomTabBarProps) {
  const { state } = props;
  const activeIndex = state.index;
  const tabCount = state.routes.length;

  // Calculate position of active tab center (0 to 1)
  const activePosition = (activeIndex + 0.5) / tabCount;

  return (
    <LinearGradient
      colors={['black', '#03FF6C', 'black']} // fade in/out
      locations={[
        Math.max(0, activePosition - 0.2),
        activePosition,
        Math.min(1, activePosition + 0.2),
      ]}
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
    padding: 1.5,
  
  },
  innerTabBar: {
    backgroundColor: '#0E0E0EFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
