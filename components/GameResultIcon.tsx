import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Check, X, Minus } from 'lucide-react-native';

interface GameResultIconProps {
  result: 'W' | 'L' | 'D';
}

export const GameResultIcon: React.FC<GameResultIconProps> = ({ result }) => {
  const getIconConfig = () => {
    switch (result) {
      case 'W':
        return {
          icon: <Check color="#22c55e" size={12} />,
          style: styles.winIcon,
        };
      case 'L':
        return {
          icon: <X color="#ef4444" size={12} />,
          style: styles.lossIcon,
        };
      case 'D':
        return {
          icon: <Minus color="#f59e0b" size={12} />,
          style: styles.drawIcon,
        };
    }
  };

  const { icon, style } = getIconConfig();

  return (
    <View style={[styles.container, style]}>
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winIcon: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  lossIcon: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  drawIcon: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
});