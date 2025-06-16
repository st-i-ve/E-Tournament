
import React from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({ 
  text, 
  className = "", 
  delay = 0.1 
}) => {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block animate-fade-in opacity-0"
          style={{
            animationDelay: `${index * delay}s`,
            animationFillMode: "forwards"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
