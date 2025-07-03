import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  sliced?: boolean;
  pressable?: boolean;
  onPress?: () => void;
}

export default function GlassCard({ 
  children, 
  style, 
  intensity = 20, 
  sliced = false,
  pressable = false,
  onPress 
}: GlassCardProps) {
  const CardComponent = pressable ? MotiView : View;
  
  const pressableProps = pressable ? {
    from: { scale: 1 },
    animate: { scale: 1 },
    whileTap: { scale: 0.95 },
    transition: { type: 'timing', duration: 150 },
    onTouchEnd: onPress,
  } : {};

  return (
    <CardComponent
      style={[
        styles.container,
        sliced && styles.sliced,
        style
      ]}
      {...pressableProps}
    >
      <BlurView
        intensity={intensity}
        style={[
          styles.blur,
          sliced && styles.slicedBorder
        ]}
      >
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.2)',
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  sliced: {
    borderTopRightRadius: 0,
  },
  blur: {
    flex: 1,
    borderRadius: 15,
  },
  slicedBorder: {
    borderTopRightRadius: 0,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});