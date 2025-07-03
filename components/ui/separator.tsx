import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  style?: ViewStyle;
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ 
  orientation = 'horizontal', 
  style,
  className 
}) => {
  return (
    <View 
      style={[
        styles.separator,
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        style,
      ]} 
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#374151',
  },
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});