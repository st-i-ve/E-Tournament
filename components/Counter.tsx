
import React, { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react-native';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 99,
  className = "" 
}) => {
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
        const newValue = Math.round(startValue + (difference * progress));
        
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
    <div className={`flex items-center bg-gray-800/50 rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={decrement}
        disabled={value <= min}
        className="flex items-center justify-center w-10 h-10 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="h-3 w-3 text-white" />
      </button>
      
      <div className="flex items-center justify-center min-w-[50px] h-10">
        <span 
          className={`text-lg font-bold text-white transition-all duration-200 ${
            isAnimating ? 'scale-110 text-green-400' : 'scale-100'
          }`}
        >
          {displayValue}
        </span>
      </div>
      
      <button
        onClick={increment}
        disabled={value >= max}
        className="flex items-center justify-center w-10 h-10 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="h-3 w-3 text-white" />
      </button>
    </div>
  );
};

export default Counter;
