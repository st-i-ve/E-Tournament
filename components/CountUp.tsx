import React, { useEffect, useState } from 'react';
import { Text, TextStyle } from 'react-native';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  style?: TextStyle;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1000,
  suffix = '',
  prefix = '',
  style,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <Text style={style}>
      {prefix}{count}{suffix}
    </Text>
  );
};

export default CountUp;