import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { View } from 'react-native';

const AnimatedIcon = Animated.createAnimatedComponent(View);

export const AnimatedTabIcon = ({ children, focused }: any) => {
  const scale = useSharedValue(focused ? 1.2 : 1);

  // Animate on focus change
  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1, {
      damping: 5,
      stiffness: 150,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return <AnimatedIcon style={animatedStyle}>{children}</AnimatedIcon>;
};
