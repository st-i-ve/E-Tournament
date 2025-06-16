import React from 'react';
import { View, Text, StyleProp, TextStyle } from 'react-native';
import { MotiView } from 'moti';

interface SplitTextProps {
  text: string;
  style?: StyleProp<TextStyle>;
  delay?: number;
  duration?: number;
  animationType?: 'fade' | 'slide' | 'scale';
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  style = {},
  delay = 0.1,
  duration = 500,
  animationType = 'fade',
}) => {
  // Animation variants
  const getAnimationProps = (index: number) => {
    const baseProps = {
      from: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        type: 'timing',
        delay: index * delay * 1000,
        duration,
      },
    };

    switch (animationType) {
      case 'slide':
        return {
          ...baseProps,
          from: { opacity: 0, translateY: 20 },
          animate: { opacity: 1, translateY: 0 },
        };
      case 'scale':
        return {
          ...baseProps,
          from: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
        };
      default: // fade
        return baseProps;
    }
  };

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {text.split('').map((char, index) => (
        <MotiView key={`${char}-${index}`} {...getAnimationProps(index)}>
          <Text style={style}>{char === ' ' ? '\u00A0' : char}</Text>
        </MotiView>
      ))}
    </View>
  );
};

export default SplitText;
// Basic usage
{/* <SplitText 
  text="Hello World" 
  style={{ color: 'white', fontSize: 24 }} 
/>

// With custom animation
<SplitText
  text="Animated Text"
  style={{ fontWeight: 'bold', color: '#3B82F6' }}
  animationType="slide"
  delay={0.05}
  duration={300}
/>

// In a header
<SplitText
  text="Welcome to the App"
  style={{
    fontSize: 32,
    color: 'white',
    fontFamily: 'Inter-Bold',
    marginBottom: 16
  }}
  animationType="scale"
/> */}