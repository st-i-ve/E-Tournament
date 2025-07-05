import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  style?: any;
}

export const Counter: React.FC<CounterProps> = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 99,
  style 
}) => {
  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        style={[styles.button, value <= min && styles.buttonDisabled]}
        onPress={decrement}
        disabled={value <= min}
      >
        <Minus color={value <= min ? "#6b7280" : "#ffffff"} size={16} />
      </TouchableOpacity>
      
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.button, value >= max && styles.buttonDisabled]}
        onPress={increment}
        disabled={value >= max}
      >
        <Plus color={value >= max ? "#6b7280" : "#ffffff"} size={16} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#4b5563',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#374151',
  },
  valueContainer: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 48,
    alignItems: 'center',
  },
  value: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
});