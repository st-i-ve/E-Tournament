// components/Background.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Background: React.FC = () => {
  return (
    <View style={styles.backgroundContainer}>
      {/* Triangles */}
      <View
        style={[
          styles.triangle,
          {
            top: 80,
            left: 40,
            width: 32,
            height: 32,
            transform: [{ rotate: '45deg' }],
          },
        ]}
      />
      <View
        style={[
          styles.triangle,
          {
            top: '33%',
            right: 80,
            width: 24,
            height: 24,
            transform: [{ rotate: '12deg' }],
          },
        ]}
      />
      <View
        style={[
          styles.triangle,
          {
            bottom: '25%',
            left: '25%',
            width: 40,
            height: 40,
            transform: [{ rotate: '45deg' }],
          },
        ]}
      />

      {/* Circles */}
      <View
        style={[
          styles.circle,
          { top: '25%', left: '33%', width: 48, height: 48 },
        ]}
      />
      <View
        style={[
          styles.circle,
          { bottom: '33%', right: '25%', width: 32, height: 32 },
        ]}
      />
      <View
        style={[styles.circle, { top: '66%', left: 80, width: 24, height: 24 }]}
      />

      {/* Rectangles */}
      <View
        style={[
          styles.rectangle,
          { top: '50%', right: 40, width: 48, height: 32 },
        ]}
      />
      <View
        style={[
          styles.rectangle,
          { bottom: 80, left: '50%', width: 32, height: 48 },
        ]}
      />

      {/* Crossing lines */}
      <View style={[styles.lineVertical, { left: '25%' }]} />
      <View style={[styles.lineHorizontal, { top: '33%' }]} />
      <View style={[styles.lineHorizontal, { top: '66%' }]} />
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
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  triangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.1)',
  },
  circle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 999,
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.1)',
  },
  lineVertical: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  lineHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
});

export default Background;
