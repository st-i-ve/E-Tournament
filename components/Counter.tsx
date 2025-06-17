import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  style?: object;
}

const Counter: React.FC<CounterProps> = ({
  value,
  onChange,
  min = 0,
  max = 99,
  style = {},
}) => {
  const navigation = useNavigation();
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (displayValue !== value) {
      setIsAnimating(true);

      const duration = 300;
      const steps = Math.abs(value - displayValue);
      const stepDuration = duration / Math.max(steps, 1);

      let currentStep = 0;
      const startValue = displayValue;
      const difference = value - startValue;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const newValue = Math.round(startValue + difference * progress);

        setDisplayValue(newValue);

        if (currentStep >= steps) {
          clearInterval(timer);
          setDisplayValue(value);
          setIsAnimating(false);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [value, displayValue]);

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
        onPress={decrement}
        disabled={value <= min}
        style={[styles.button, value <= min && styles.disabledButton]}
      >
        <Minus size={14} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.valueContainer}>
        <Text style={[styles.valueText, isAnimating && styles.animatingValue]}>
          {displayValue}
        </Text>
      </View>

      <TouchableOpacity
        onPress={increment}
        disabled={value >= max}
        style={[styles.button, value >= max && styles.disabledButton]}
      >
        <Plus size={14} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  disabledButton: {
    opacity: 0.5,
  },
  valueContainer: {
    minWidth: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  animatingValue: {
    transform: [{ scale: 1.1 }],
    color: '#4ade80',
  },
});

export default Counter;
