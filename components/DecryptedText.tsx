import React, { useEffect, useState } from 'react';
import { Text, TextStyle } from 'react-native';

interface DecryptedTextProps {
  text: string;
  style?: TextStyle;
  interval?: number;
  className?: string;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  style,
  interval = 50,
  className,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => {
          const newText = text.slice(0, currentIndex + 1);
          const randomSuffix = Array.from({ length: Math.max(0, text.length - currentIndex - 1) }, () =>
            characters[Math.floor(Math.random() * characters.length)]
          ).join('');
          return newText + randomSuffix;
        });
        setCurrentIndex(prev => prev + 1);
      }, interval);

      return () => clearTimeout(timer);
    } else {
      setDisplayText(text);
    }
  }, [currentIndex, text, interval, characters]);

  return (
    <Text style={style} className={className}>
      {displayText}
    </Text>
  );
};