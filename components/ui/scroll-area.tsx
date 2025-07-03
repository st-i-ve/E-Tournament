import React from 'react';
import { ScrollView, View, StyleSheet, ViewStyle } from 'react-native';

interface ScrollAreaProps {
  children: React.ReactNode;
  style?: ViewStyle;
  horizontal?: boolean;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
}

interface ScrollBarProps {
  orientation: 'horizontal' | 'vertical';
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ 
  children, 
  style, 
  horizontal = false,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false
}) => (
  <ScrollView
    style={[styles.scrollArea, style]}
    horizontal={horizontal}
    showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
  >
    {children}
  </ScrollView>
);

export const ScrollBar: React.FC<ScrollBarProps> = ({ orientation }) => (
  <View style={styles.scrollBar} />
);

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
  },
  scrollBar: {
    // This is mainly for web compatibility
    // React Native handles scrollbars automatically
  },
});