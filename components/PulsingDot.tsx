import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

const PulsingDot = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const createPulseAnimation = () => {
      return Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.6,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]);
    };

    const runAnimation = () => {
      createPulseAnimation().start(() => {
        runAnimation();
      });
    };

    runAnimation();
  }, [scaleAnim, opacityAnim]);

  return (
    <Animated.View
      style={[
        styles.glowingDot,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  glowingDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 12,
  },
});

export default PulsingDot;