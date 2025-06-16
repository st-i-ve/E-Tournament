import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface QuickActionButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon: Icon,
  title,
  description,
  onPress,
  variant = 'primary',
}) => {
  const scaleValue = new Animated.Value(1);
  const shimmerValue = new Animated.Value(0);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const startShimmerAnimation = () => {
    shimmerValue.setValue(0);
    Animated.timing(shimmerValue, {
      toValue: 1,
      duration: 700,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const shimmerTranslateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        startShimmerAnimation();
        onPress();
      }}
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
      ]}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        {/* Shimmer Effect */}
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [
                { translateX: shimmerTranslateX },
                { skewX: '20deg' },
              ],
            },
          ]}
        />

        {/* Icon Container */}
        <View
          style={[
            styles.iconContainer,
            variant === 'primary'
              ? styles.primaryIconContainer
              : styles.secondaryIconContainer,
          ]}
        >
          <Icon
            size={16}
            color={variant === 'primary' ? '#FFFFFF' : '#F3F4F6'}
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              variant === 'primary' ? styles.primaryText : styles.secondaryText,
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.description,
              variant === 'primary'
                ? styles.primaryDescription
                : styles.secondaryDescription,
            ]}
          >
            {description}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 'auto',
    padding: 12,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  primaryButton: {
    backgroundColor: '#16A34A', // green-600
  },
  secondaryButton: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#1F2937', // gray-800
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconContainer: {
    padding: 6,
    borderRadius: 999,
    marginBottom: 8,
    alignSelf: 'center',
  },
  primaryIconContainer: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)', // green-500/20
  },
  secondaryIconContainer: {
    backgroundColor: 'rgba(55, 65, 81, 0.2)', // gray-700/20
  },
  textContainer: {
    paddingHorizontal: 2,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#F3F4F6', // gray-100
  },
  description: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
    textAlign: 'center',
  },
  primaryDescription: {
    opacity: 0.8,
    color: '#FFFFFF',
  },
  secondaryDescription: {
    opacity: 0.8,
    color: '#F3F4F6',
  },
});

export default QuickActionButton;
