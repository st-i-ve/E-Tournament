import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  style?: any;
}

const CountUp: React.FC<CountUpProps> = ({ 
  end, 
  duration = 2000, 
  suffix = "",
  style = {}
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

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

  return <Text style={style}>{count}{suffix}</Text>;
};

export default CountUp;
// Key Changes Made:
// Component Replacement:

// Changed <span> to React Native's <Text> component

// Prop Renaming:

// Renamed className to style to match React Native conventions

// The style prop accepts standard React Native style objects

// Preserved Core Functionality:

// Kept all the animation logic exactly the same

// Maintained the same easing function for smooth counting

// Preserved all props (end, duration, suffix) with identical functionality

// TypeScript Compatibility:

// Updated the interface to reflect React Native prop types

// Maintained all TypeScript type checking

// Usage Example:
// typescript
// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import CountUp from './CountUp';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <CountUp 
//         end={1000} 
//         duration={3000}
//         suffix=" points"
//         style={styles.countText}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   countText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#2ecc71',
//   },
// });

// export default App;
// Additional Features You Could Add:
// Start/Reset Control:

// typescript
// interface CountUpProps {
//   // ... existing props
//   start?: number;
//   reset?: boolean;
// }

// // Then modify the useEffect to handle these new props
// OnComplete Callback:

// typescript
// interface CountUpProps {
//   // ... existing props
//   onComplete?: () => void;
// }

// // Call it when animation completes
// if (progress >= 1 && onComplete) {
//   onComplete();
// }
// Decimal Places:

// typescript
// interface CountUpProps {
//   // ... existing props
//   decimals?: number;
// }

// // Modify the setCount to handle decimals
// setCount(parseFloat((easeOut * end).toFixed(decimals)));