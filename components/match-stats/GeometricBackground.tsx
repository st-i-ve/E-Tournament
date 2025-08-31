import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GeometricBackgroundProps } from '@/types/matchStats';

export const GeometricBackground: React.FC<GeometricBackgroundProps> = () => {
  return (
    <View style={styles.backgroundContainer}>
      <View style={[styles.geometricShape, styles.shape1]} />
      <View style={[styles.geometricShape, styles.shape2]} />
      <View style={[styles.geometricShape, styles.shape3]} />
      <View style={[styles.geometricShape, styles.shape4]} />
      <View style={[styles.geometricShape, styles.shape5]} />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  geometricShape: {
    position: 'absolute',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 20,
  },
  shape1: {
    width: 100,
    height: 100,
    top: 100,
    left: -30,
    transform: [{ rotate: '45deg' }],
  },
  shape2: {
    width: 60,
    height: 60,
    top: 200,
    right: -20,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 30,
  },
  shape3: {
    width: 80,
    height: 80,
    top: 400,
    left: 20,
    transform: [{ rotate: '30deg' }],
  },
  shape4: {
    width: 120,
    height: 40,
    top: 600,
    right: 10,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    transform: [{ rotate: '-15deg' }],
  },
  shape5: {
    width: 50,
    height: 50,
    top: 300,
    left: '50%',
    marginLeft: -25,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    borderRadius: 25,
  },
});