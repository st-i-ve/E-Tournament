import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  style,
  textStyle,
  className,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'ghost':
        return {
          container: styles.ghostContainer,
          text: styles.ghostText,
        };
      case 'outline':
        return {
          container: styles.outlineContainer,
          text: styles.outlineText,
        };
      default:
        return {
          container: styles.defaultContainer,
          text: styles.defaultText,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          container: styles.smContainer,
          text: styles.smText,
        };
      case 'lg':
        return {
          container: styles.lgContainer,
          text: styles.lgText,
        };
      case 'icon':
        return {
          container: styles.iconContainer,
          text: styles.iconText,
        };
      default:
        return {
          container: styles.defaultSizeContainer,
          text: styles.defaultSizeText,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles.container,
        sizeStyles.container,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.buttonText, variantStyles.text, sizeStyles.text, textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  // Variants
  defaultContainer: {
    backgroundColor: '#22c55e',
  },
  defaultText: {
    color: '#ffffff',
  },
  ghostContainer: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: '#ffffff',
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#374151',
  },
  outlineText: {
    color: '#ffffff',
  },
  // Sizes
  defaultSizeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  defaultSizeText: {
    fontSize: 12,
  },
  smContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  smText: {
    fontSize: 11,
  },
  lgContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  lgText: {
    fontSize: 14,
  },
  iconContainer: {
    width: 36,
    height: 36,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  iconText: {
    fontSize: 12,
  },
  disabled: {
    opacity: 0.5,
  },
});