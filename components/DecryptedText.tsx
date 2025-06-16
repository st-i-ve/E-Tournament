
import React, { useState, useEffect } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  interval?: number;
}

const DecryptedText: React.FC<DecryptedTextProps> = ({ 
  text, 
  className = "", 
  interval = 50 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => {
          const randomChar = characters[Math.floor(Math.random() * characters.length)];
          const newText = text.slice(0, currentIndex) + randomChar + text.slice(currentIndex + 1);
          return newText;
        });

        const revealTimeout = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(prev => prev + 1);
        }, interval);

        return () => clearTimeout(revealTimeout);
      }, interval);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, interval, characters]);

  return <span className={className}>{displayText}</span>;
};

export default DecryptedText;
