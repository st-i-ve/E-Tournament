import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';

interface QuickActionButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onPress: () => void;
  variant: 'primary' | 'secondary';
  style?: ViewStyle;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon: Icon,
  title,
  description,
  onPress,
  variant,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        variant === 'primary' ? styles.primaryContainer : styles.secondaryContainer,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Icon 
        color="#ffffff" 
        size={20} 
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  primaryContainer: {
    backgroundColor: '#22c55e',
  },
  secondaryContainer: {
    backgroundColor: '#374151',
  },
  icon: {
    marginBottom: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 2,
  },
  description: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});