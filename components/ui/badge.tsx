import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary';
  className?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  className,
  style,
  textStyle 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          container: styles.outlineContainer,
          text: styles.outlineText,
        };
      case 'secondary':
        return {
          container: styles.secondaryContainer,
          text: styles.secondaryText,
        };
      default:
        return {
          container: styles.defaultContainer,
          text: styles.defaultText,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <View style={[styles.badge, variantStyles.container, style]}>
      <Text style={[styles.badgeText, variantStyles.text, textStyle]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  defaultContainer: {
    backgroundColor: '#22c55e',
  },
  defaultText: {
    color: '#ffffff',
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#374151',
  },
  outlineText: {
    color: '#9ca3af',
  },
  secondaryContainer: {
    backgroundColor: '#374151',
  },
  secondaryText: {
    color: '#ffffff',
  },
});